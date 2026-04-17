"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  formatRelativeDate,
  type BlogPostRecord,
  type ScrapRecord,
  type StudioContentRecord,
} from "@/app/lib/studio-types";
import { useStudioSession } from "@/app/components/studio/useStudioSession";
import {
  StudioErrorState,
  StudioLoadingState,
  StudioLoginRequired,
} from "@/app/components/studio/StudioFeedback";

type DashboardContentType = "all" | "blog" | "scrap";

function mapBlogPostsToContents(rows: BlogPostRecord[]): StudioContentRecord[] {
  return rows.map((row) => ({
    id: row.id,
    contentType: "blog",
    authorUserId: row.author_user_id,
    slug: row.slug,
    title: row.title,
    previewText: row.summary,
    tags: row.tags ?? [],
    status: row.status,
    visibility: row.visibility,
    updatedAt: row.updated_at,
    createdAt: row.created_at,
    publishedAt: row.published_at,
  }));
}

function mapScrapsToContents(rows: ScrapRecord[]): StudioContentRecord[] {
  return rows.map((row) => ({
    id: row.id,
    contentType: "scrap",
    authorUserId: row.author_user_id,
    slug: row.slug,
    title: row.title?.trim() ? row.title : row.source,
    previewText: row.one_line_summary,
    tags: row.tags ?? [],
    status: row.status,
    visibility: row.visibility,
    updatedAt: row.updated_at,
    createdAt: row.created_at,
    publishedAt: row.published_at,
  }));
}

export default function StudioDashboardClient({
  defaultType = "all",
}: {
  defaultType?: DashboardContentType;
}) {
  const { supabase, user, isAdmin, loading, error } = useStudioSession();
  const [contents, setContents] = useState<StudioContentRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "draft" | "published" | "archived">("all");
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchContents = useCallback(async () => {
    if (!user) {
      setContents([]);
      setIsFetching(false);
      return;
    }

    setIsFetching(true);
    setFetchError(null);

    try {
      const blogQuery = supabase
        .from("blog_posts")
        .select(
          "id, author_user_id, slug, title, summary, tags, status, visibility, published_at, created_at, updated_at"
        )
        .order("updated_at", { ascending: false });

      const scrapQuery = supabase
        .from("scraps")
        .select(
          "id, author_user_id, slug, title, source, one_line_summary, tags, status, visibility, published_at, created_at, updated_at"
        )
        .order("updated_at", { ascending: false });

      const resolvedBlogQuery = isAdmin ? blogQuery : blogQuery.eq("author_user_id", user.id);
      const resolvedScrapQuery = isAdmin ? scrapQuery : scrapQuery.eq("author_user_id", user.id);

      const [{ data: blogRows, error: blogError }, { data: scrapRows, error: scrapError }] =
        await Promise.all([resolvedBlogQuery, resolvedScrapQuery]);

      if (blogError) {
        throw blogError;
      }

      if (scrapError) {
        throw scrapError;
      }

      const merged = [
        ...mapBlogPostsToContents((blogRows ?? []) as BlogPostRecord[]),
        ...mapScrapsToContents((scrapRows ?? []) as ScrapRecord[]),
      ].sort((left, right) => {
        const rightTime = new Date(right.updatedAt).getTime();
        const leftTime = new Date(left.updatedAt).getTime();
        return rightTime - leftTime;
      });

      setContents(merged);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "콘텐츠 목록을 불러오지 못했습니다.";
      setFetchError(message);
    } finally {
      setIsFetching(false);
    }
  }, [isAdmin, supabase, user]);

  useEffect(() => {
    if (loading) {
      return;
    }

    void fetchContents();
  }, [fetchContents, loading]);

  const filteredContents = useMemo(() => {
    return contents.filter((content) => {
      if (defaultType !== "all" && content.contentType !== defaultType) {
        return false;
      }

      if (statusFilter !== "all" && content.status !== statusFilter) {
        return false;
      }

      if (!searchTerm.trim()) {
        return true;
      }

      const normalized = searchTerm.trim().toLowerCase();
      return (
        content.title.toLowerCase().includes(normalized) ||
        content.slug.toLowerCase().includes(normalized) ||
        content.tags.some((tag) => tag.toLowerCase().includes(normalized))
      );
    });
  }, [contents, defaultType, searchTerm, statusFilter]);

  const handleDelete = async (content: StudioContentRecord) => {
    const confirmed = window.confirm(`"${content.title}" 항목을 삭제할까요? 이 작업은 되돌릴 수 없습니다.`);
    if (!confirmed) {
      return;
    }

    setDeletingId(content.id);

    try {
      const table = content.contentType === "blog" ? "blog_posts" : "scraps";
      const { error: deleteError } = await supabase.from(table).delete().eq("id", content.id);

      if (deleteError) {
        throw deleteError;
      }

      setContents((prev) => prev.filter((item) => item.id !== content.id));
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "삭제 중 오류가 발생했습니다.";
      window.alert(message);
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <StudioLoadingState message="Studio 세션을 확인하는 중입니다..." />;
  }

  if (error) {
    return <StudioErrorState message={error} />;
  }

  if (!user) {
    return (
      <StudioLoginRequired
        title="Studio 로그인이 필요합니다"
        description="브라우저에서 직접 Supabase에 연결해 콘텐츠를 관리합니다. 로그인 후 본인 글을 작성하거나 수정할 수 있습니다."
      />
    );
  }

  if (isFetching) {
    return <StudioLoadingState message="콘텐츠 목록을 불러오는 중입니다..." />;
  }

  const heading =
    defaultType === "blog"
      ? "Blog Posts"
      : defaultType === "scrap"
        ? "Scraps"
        : "Content Manager";

  const description =
    defaultType === "blog"
      ? "블로그 포스트만 모아서 관리합니다."
      : defaultType === "scrap"
        ? "링크 스크랩과 메모를 모아서 관리합니다."
        : "블로그와 스크랩 전체를 한 번에 관리합니다.";

  return (
    <div className="mx-auto w-full max-w-6xl p-8">
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="mb-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {heading}
          </h2>
          <p className="max-w-2xl text-slate-500">{description}</p>
          <p className="mt-2 text-xs font-medium text-slate-400">
            {isAdmin ? "admin 권한으로 전체 콘텐츠를 관리 중입니다." : "본인이 작성한 콘텐츠만 표시됩니다."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/studio/scrap/new"
            className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold transition-all hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
          >
            <span className="material-symbols-outlined !text-lg">add</span>
            New Scrap
          </Link>
          <Link
            href="/studio/editor"
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
          >
            <span className="material-symbols-outlined !text-lg">edit</span>
            New Blog Post
          </Link>
        </div>
      </div>

      {fetchError ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-300">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined !text-lg">error</span>
            <div>
              <p className="font-semibold">콘텐츠 목록을 불러오지 못했습니다.</p>
              <p className="mt-1 text-xs opacity-80">{fetchError}</p>
            </div>
          </div>
        </div>
      ) : null}

      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-3 border-b border-slate-200 dark:border-slate-800">
          {[
            { key: "all", label: "All Status" },
            { key: "draft", label: "Drafts" },
            { key: "published", label: "Published" },
            { key: "archived", label: "Archived" },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setStatusFilter(item.key as "all" | "draft" | "published" | "archived")}
              className={`border-b-2 pb-3 text-sm transition-colors ${
                statusFilter === item.key
                  ? "border-primary font-semibold text-primary"
                  : "border-transparent font-medium text-slate-500 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-sm">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <span className="material-symbols-outlined !text-lg">search</span>
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="제목, slug, tag 검색..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-10 pr-4 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-800/50">
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Tags</th>
              <th className="px-6 py-4">Last Updated</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredContents.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center">
                  <div className="mx-auto max-w-sm">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-800">
                      <span className="material-symbols-outlined">description</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      표시할 콘텐츠가 없습니다
                    </h3>
                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                      새 글이나 스크랩을 작성하면 이 목록에 나타납니다.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredContents.map((content) => {
                const editHref =
                  content.contentType === "blog"
                    ? `/studio/editor?postId=${content.id}`
                    : `/studio/scrap/edit?scrapId=${content.id}`;

                return (
                  <tr
                    key={`${content.contentType}-${content.id}`}
                    className="group transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/30"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {content.title}
                        </span>
                        <span className="font-mono text-[11px] tracking-tight text-slate-400">
                          /{content.contentType === "blog" ? "blog" : "scrap"}/{content.slug}
                        </span>
                        <span className="mt-1 line-clamp-1 text-xs text-slate-500">
                          {content.previewText}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-tighter ${
                          content.contentType === "blog"
                            ? "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-500"
                        }`}
                      >
                        {content.contentType === "blog" ? "Blog" : "Scrap"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {content.tags.length > 0 ? (
                          content.tags.map((tag) => (
                            <span
                              key={`${content.id}-${tag}`}
                              className="rounded border border-primary/20 bg-primary/5 px-1.5 py-0.5 text-[10px] font-medium text-primary"
                            >
                              {tag}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-slate-400">No tags</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {formatRelativeDate(content.updatedAt)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span
                          className={`size-2 rounded-full ${
                            content.status === "published"
                              ? "bg-emerald-500"
                              : content.status === "archived"
                                ? "bg-slate-400"
                                : "bg-amber-500"
                          }`}
                        />
                        <span className="text-xs font-medium capitalize">{content.status}</span>
                        <span className="text-[10px] uppercase text-slate-400">{content.visibility}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                        <Link
                          href={editHref}
                          className="flex items-center p-1 transition-colors hover:text-primary"
                        >
                          <span className="material-symbols-outlined !text-base">edit</span>
                        </Link>
                        <button
                          type="button"
                          disabled={deletingId === content.id}
                          onClick={() => void handleDelete(content)}
                          className="p-1 text-slate-400 transition-colors hover:text-red-500 disabled:opacity-50"
                        >
                          <span className="material-symbols-outlined !text-base">
                            {deletingId === content.id ? "hourglass_top" : "delete"}
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>

        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/50">
          <span className="text-xs font-medium tracking-tight text-slate-500">
            Showing {filteredContents.length} of {contents.length} entries
          </span>
          <button
            type="button"
            onClick={() => void fetchContents()}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-white dark:border-slate-700 dark:hover:bg-slate-900"
          >
            <span className="material-symbols-outlined !text-sm">refresh</span>
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
}
