"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  formatDisplayDate,
  formatRelativeDate,
  type BlogPostRecord,
  type ContentStatus,
  type ContentVisibility,
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
type SearchField = "all" | "title" | "tags" | "content" | "slug";
type SortOption = "updated_desc" | "published_desc" | "title_asc";

type QueryState = {
  q: string;
  field: SearchField;
  status: "all" | ContentStatus;
  visibility: "all" | ContentVisibility;
  sort: SortOption;
  page: number;
};

const PAGE_SIZE = 30;
const defaultQueryState: QueryState = {
  q: "",
  field: "all",
  status: "all",
  visibility: "all",
  sort: "updated_desc",
  page: 1,
};

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

function parseQueryState() {
  if (typeof window === "undefined") return defaultQueryState;

  const params = new URLSearchParams(window.location.search);
  const page = Number(params.get("page") ?? "1");
  return {
    q: params.get("q") ?? "",
    field: (params.get("field") as SearchField) || "all",
    status: (params.get("status") as QueryState["status"]) || "all",
    visibility: (params.get("visibility") as QueryState["visibility"]) || "all",
    sort: (params.get("sort") as SortOption) || "updated_desc",
    page: Number.isFinite(page) && page > 0 ? page : 1,
  };
}

function toSearch(state: QueryState) {
  const params = new URLSearchParams();
  if (state.q.trim()) params.set("q", state.q.trim());
  if (state.field !== "all") params.set("field", state.field);
  if (state.status !== "all") params.set("status", state.status);
  if (state.visibility !== "all") params.set("visibility", state.visibility);
  if (state.sort !== "updated_desc") params.set("sort", state.sort);
  if (state.page > 1) params.set("page", String(state.page));
  return params.toString();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applyQueryOptions(query: any, state: QueryState) {
  let next = query;
  if (state.status !== "all") next = next.eq("status", state.status);
  if (state.visibility !== "all") next = next.eq("visibility", state.visibility);

  if (state.sort === "published_desc") return next.order("published_at", { ascending: false, nullsFirst: false });
  if (state.sort === "title_asc") return next.order("title", { ascending: true });
  return next.order("updated_at", { ascending: false });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applyBlogSearch(query: any, field: SearchField, term: string) {
  const like = `%${term}%`;
  if (field === "title") return query.ilike("title", like);
  if (field === "slug") return query.ilike("slug", like);
  if (field === "tags") return query.contains("tags", [term]);
  if (field === "content") return query.or(`summary.ilike.${like},content_md.ilike.${like}`);
  return query.or(`title.ilike.${like},slug.ilike.${like},summary.ilike.${like},content_md.ilike.${like}`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function applyScrapSearch(query: any, field: SearchField, term: string) {
  const like = `%${term}%`;
  if (field === "title") return query.or(`title.ilike.${like},source.ilike.${like}`);
  if (field === "slug") return query.ilike("slug", like);
  if (field === "tags") return query.contains("tags", [term]);
  if (field === "content") return query.or(`one_line_summary.ilike.${like},comment_md.ilike.${like},url.ilike.${like}`);
  return query.or(`title.ilike.${like},slug.ilike.${like},source.ilike.${like},one_line_summary.ilike.${like},comment_md.ilike.${like},url.ilike.${like}`);
}

function getEditHref(content: StudioContentRecord) {
  return content.contentType === "blog" ? `/studio/editor?postId=${content.id}` : `/studio/scrap/edit?scrapId=${content.id}`;
}

export default function StudioDashboardClient({ defaultType = "all" }: { defaultType?: DashboardContentType }) {
  const pathname = usePathname();
  const { supabase, user, isAdmin, loading, error } = useStudioSession();
  const [queryState, setQueryState] = useState<QueryState>(parseQueryState);
  const [queryInput, setQueryInput] = useState(parseQueryState().q);
  const [items, setItems] = useState<StudioContentRecord[]>([]);
  const [recentItems, setRecentItems] = useState<StudioContentRecord[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isFetching, setIsFetching] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
  const hasSearch = queryState.q.trim().length > 0;

  useEffect(() => {
    if (defaultType === "all" || typeof window === "undefined") return;
    const search = toSearch(queryState);
    window.history.replaceState(null, "", search ? `${pathname}?${search}` : pathname);
  }, [defaultType, pathname, queryState]);

  const fetchWorkspace = useCallback(async () => {
    if (!user) {
      setRecentItems([]);
      setIsFetching(false);
      return;
    }

    setIsFetching(true);
    setFetchError(null);

    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let blogQuery: any = supabase
        .from("blog_posts")
        .select("id, author_user_id, slug, title, summary, tags, status, visibility, published_at, created_at, updated_at")
        .order("updated_at", { ascending: false })
        .limit(4);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let scrapQuery: any = supabase
        .from("scraps")
        .select("id, author_user_id, slug, title, source, one_line_summary, tags, status, visibility, published_at, created_at, updated_at")
        .order("updated_at", { ascending: false })
        .limit(4);

      if (!isAdmin) {
        blogQuery = blogQuery.eq("author_user_id", user.id);
        scrapQuery = scrapQuery.eq("author_user_id", user.id);
      }

      const [{ data: blogRows, error: blogError }, { data: scrapRows, error: scrapError }] = await Promise.all([blogQuery, scrapQuery]);
      if (blogError) throw blogError;
      if (scrapError) throw scrapError;

      const merged = [
        ...mapBlogPostsToContents((blogRows ?? []) as BlogPostRecord[]),
        ...mapScrapsToContents((scrapRows ?? []) as ScrapRecord[]),
      ].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

      setRecentItems(merged.slice(0, 6));
    } catch (caughtError) {
      setFetchError(caughtError instanceof Error ? caughtError.message : "최근 작업을 불러오지 못했습니다.");
    } finally {
      setIsFetching(false);
    }
  }, [isAdmin, supabase, user]);

  const fetchCollection = useCallback(async () => {
    if (!user || defaultType === "all") {
      setItems([]);
      setTotalCount(0);
      setIsFetching(false);
      return;
    }

    setIsFetching(true);
    setFetchError(null);

    try {
      const from = (queryState.page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let query: any =
        defaultType === "blog"
          ? supabase
              .from("blog_posts")
              .select("id, author_user_id, slug, title, summary, tags, status, visibility, published_at, created_at, updated_at", { count: "exact" })
          : supabase
              .from("scraps")
              .select("id, author_user_id, slug, title, source, one_line_summary, tags, status, visibility, published_at, created_at, updated_at", { count: "exact" });

      if (!isAdmin) query = query.eq("author_user_id", user.id);
      query = applyQueryOptions(query, queryState);

      if (hasSearch) {
        query = defaultType === "blog" ? applyBlogSearch(query, queryState.field, queryState.q.trim()) : applyScrapSearch(query, queryState.field, queryState.q.trim());
      }

      const { data, count, error: queryError } = await query.range(from, to);
      if (queryError) throw queryError;

      setItems(defaultType === "blog" ? mapBlogPostsToContents((data ?? []) as BlogPostRecord[]) : mapScrapsToContents((data ?? []) as ScrapRecord[]));
      setTotalCount(count ?? 0);
    } catch (caughtError) {
      setFetchError(caughtError instanceof Error ? caughtError.message : "콘텐츠 목록을 불러오지 못했습니다.");
      setItems([]);
      setTotalCount(0);
    } finally {
      setIsFetching(false);
    }
  }, [defaultType, hasSearch, isAdmin, queryState, supabase, user]);

  useEffect(() => {
    if (loading) return;
    if (defaultType === "all") void fetchWorkspace();
    else void fetchCollection();
  }, [defaultType, fetchCollection, fetchWorkspace, loading]);

  const updateQueryState = (patch: Partial<QueryState>, resetPage = false) => {
    setQueryState((prev) => ({ ...prev, ...patch, page: resetPage ? 1 : patch.page ?? prev.page }));
  };

  const handleDelete = async (content: StudioContentRecord) => {
    if (!window.confirm(`"${content.title}" 항목을 삭제할까요?`)) return;
    setDeletingId(content.id);

    try {
      const table = content.contentType === "blog" ? "blog_posts" : "scraps";
      const { error: deleteError } = await supabase.from(table).delete().eq("id", content.id);
      if (deleteError) throw deleteError;
      if (defaultType === "all") await fetchWorkspace();
      else await fetchCollection();
    } catch (caughtError) {
      window.alert(caughtError instanceof Error ? caughtError.message : "삭제 중 오류가 발생했습니다.");
    } finally {
      setDeletingId(null);
    }
  };

  const overviewCards = useMemo(
    () => [
      { href: "/studio/blog", title: "Blog Posts", desc: "최근 30개 + 서버 검색", icon: "edit_note" },
      { href: "/studio/scrap", title: "Scraps", desc: "출처/태그 기준 검색", icon: "delete_outline" },
      { href: "/studio/settings", title: "Settings", desc: "홈/포트폴리오 자산 UI", icon: "settings" },
    ],
    []
  );

  if (loading) return <StudioLoadingState message="Studio 세션을 확인하는 중입니다..." />;
  if (error) return <StudioErrorState message={error} />;
  if (!user) {
    return <StudioLoginRequired title="Studio 로그인 필요" description="브라우저에서 Supabase와 연결해 글과 스크랩을 검색하고 수정합니다." />;
  }
  if (isFetching) {
    return <StudioLoadingState message={defaultType === "all" ? "작업 공간을 불러오는 중입니다..." : "콘텐츠 목록을 불러오는 중입니다..."} />;
  }

  if (defaultType === "all") {
    return (
      <div className="mx-auto w-full max-w-6xl p-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">Workspace</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">전체 목록 대신 최근 작업과 주요 관리 화면으로 빠르게 이동하는 허브로 정리했습니다.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/studio/editor" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">New Blog Post</Link>
            <Link href="/studio/scrap/new" className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold dark:border-slate-700">New Scrap</Link>
          </div>
        </div>

        {fetchError ? <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{fetchError}</div> : null}

        <div className="grid gap-4 md:grid-cols-3">
          {overviewCards.map((card) => (
            <Link key={card.href} href={card.href} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-primary/30 dark:border-slate-800 dark:bg-slate-900">
              <span className="material-symbols-outlined text-primary">{card.icon}</span>
              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">{card.title}</h3>
              <p className="mt-2 text-sm text-slate-500">{card.desc}</p>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-800">
            <div>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Recent Activity</h3>
              <p className="mt-1 text-xs text-slate-500">최근 수정한 항목만 보여줍니다.</p>
            </div>
            <button type="button" onClick={() => void fetchWorkspace()} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold dark:border-slate-700">Refresh</button>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentItems.length === 0 ? (
              <div className="px-6 py-14 text-center text-sm text-slate-500">최근 작업 항목이 없습니다.</div>
            ) : (
              recentItems.map((content) => (
                <div key={`${content.contentType}-${content.id}`} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="rounded bg-slate-100 px-2 py-0.5 dark:bg-slate-800">{content.contentType}</span>
                      <span>{formatRelativeDate(content.updatedAt)}</span>
                    </div>
                    <p className="mt-1 truncate text-sm font-semibold text-slate-900 dark:text-slate-100">{content.title}</p>
                    <p className="mt-1 line-clamp-1 text-xs text-slate-500">{content.previewText}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={getEditHref(content)} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold dark:border-slate-700">Edit</Link>
                    <button type="button" disabled={deletingId === content.id} onClick={() => void handleDelete(content)} className="rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:hover:bg-red-950/20">
                      {deletingId === content.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-6xl p-8">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">{defaultType === "blog" ? "Blog Posts" : "Scraps"}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">검색어 없이 열면 최근 30개만 불러오고, 검색을 실행하면 서버에서 다시 조회합니다.</p>
        </div>
        <Link href={defaultType === "blog" ? "/studio/editor" : "/studio/scrap/new"} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">
          {defaultType === "blog" ? "New Blog Post" : "New Scrap"}
        </Link>
      </div>

      {fetchError ? <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{fetchError}</div> : null}

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="grid gap-3 lg:grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,0.8fr))]">
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Search</span>
            <div className="flex gap-2">
              <input value={queryInput} onChange={(e) => setQueryInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") updateQueryState({ q: queryInput.trim() }, true); }} placeholder={queryState.field === "tags" ? "정확한 태그 입력" : "검색어 입력"} className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 dark:border-slate-700 dark:bg-slate-900" />
              <button type="button" onClick={() => updateQueryState({ q: queryInput.trim() }, true)} className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">Search</button>
            </div>
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Field</span>
            <select value={queryState.field} onChange={(e) => updateQueryState({ field: e.target.value as SearchField }, true)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
              <option value="all">전체</option>
              <option value="title">{defaultType === "blog" ? "제목" : "제목/출처"}</option>
              <option value="tags">태그</option>
              <option value="content">본문/요약</option>
              <option value="slug">Slug</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Status</span>
            <select value={queryState.status} onChange={(e) => updateQueryState({ status: e.target.value as QueryState["status"] }, true)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
              <option value="all">All</option>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Visibility</span>
            <select value={queryState.visibility} onChange={(e) => updateQueryState({ visibility: e.target.value as QueryState["visibility"] }, true)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
              <option value="all">All</option>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Sort</span>
            <select value={queryState.sort} onChange={(e) => updateQueryState({ sort: e.target.value as SortOption }, true)} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
              <option value="updated_desc">최근 수정순</option>
              <option value="published_desc">최근 발행순</option>
              <option value="title_asc">제목순</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 text-xs text-slate-500 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-slate-100 px-2.5 py-1 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">{hasSearch ? "서버 검색 모드" : "기본 최근 30개"}</span>
            <span>검색 결과는 URL에 유지되어 다시 돌아왔을 때 그대로 복원됩니다.</span>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => { setQueryInput(""); setQueryState(defaultQueryState); }} className="rounded-lg border border-slate-200 px-3 py-1.5 font-semibold dark:border-slate-700">Reset</button>
            <button type="button" onClick={() => void fetchCollection()} className="rounded-lg border border-slate-200 px-3 py-1.5 font-semibold dark:border-slate-700">Refresh</button>
          </div>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 text-xs text-slate-500 dark:border-slate-800">
          <span>총 {totalCount}건</span>
          <span>{queryState.page} / {totalPages} page</span>
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {items.length === 0 ? (
            <div className="px-6 py-16 text-center text-sm text-slate-500">검색 결과가 없습니다.</div>
          ) : (
            items.map((content) => (
              <div key={`${content.contentType}-${content.id}`} className="flex flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
                    <span className="rounded bg-slate-100 px-2 py-0.5 dark:bg-slate-800">{content.contentType}</span>
                    <span>{content.status}</span>
                    <span>{content.visibility}</span>
                    <span>수정 {formatRelativeDate(content.updatedAt)}</span>
                  </div>
                  <Link href={getEditHref(content)} className="mt-2 block truncate text-sm font-semibold text-slate-900 hover:text-primary dark:text-slate-100">{content.title}</Link>
                  <p className="mt-1 truncate font-mono text-[11px] text-slate-400">/{content.contentType}/{content.slug}</p>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{content.previewText}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {content.tags.length > 0 ? content.tags.map((tag) => <span key={`${content.id}-${tag}`} className="rounded border border-primary/20 bg-primary/5 px-1.5 py-0.5 text-[10px] font-medium text-primary">{tag}</span>) : <span className="text-[11px] text-slate-400">태그 없음</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="hidden text-right text-xs text-slate-500 md:block">
                    <div>{formatDisplayDate(content.updatedAt)}</div>
                    <div className="mt-1 text-slate-400">{formatDisplayDate(content.createdAt)}</div>
                  </div>
                  <Link href={getEditHref(content)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold dark:border-slate-700">Edit</Link>
                  <button type="button" disabled={deletingId === content.id} onClick={() => void handleDelete(content)} className="rounded-lg px-3 py-2 text-xs font-semibold text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50 dark:hover:bg-red-950/20">
                    {deletingId === content.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-slate-200 bg-slate-50 px-6 py-4 dark:border-slate-800 dark:bg-slate-800/50">
          <button type="button" disabled={queryState.page <= 1} onClick={() => updateQueryState({ page: queryState.page - 1 })} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold disabled:opacity-50 dark:border-slate-700">이전</button>
          <button type="button" disabled={queryState.page >= totalPages} onClick={() => updateQueryState({ page: queryState.page + 1 })} className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold disabled:opacity-50 dark:border-slate-700">다음</button>
        </div>
      </div>
    </div>
  );
}
