"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createFallbackSlug,
  estimateReadingTime,
  formatDisplayDate,
  parseTags,
  slugify,
  tagsToInput,
  type BlogPostRecord,
  type ContentStatus,
  type ContentVisibility,
} from "@/app/lib/studio-types";
import { useStudioSession } from "@/app/components/studio/useStudioSession";
import {
  StudioErrorState,
  StudioLoadingState,
  StudioLoginRequired,
} from "@/app/components/studio/StudioFeedback";

interface BlogFormState {
  title: string;
  slug: string;
  summary: string;
  contentMd: string;
  tagsInput: string;
  coverImageUrl: string;
  canonicalUrl: string;
  visibility: ContentVisibility;
  pinned: boolean;
  publishedAt: string | null;
}

function createDefaultFormState(): BlogFormState {
  return {
    title: "",
    slug: "",
    summary: "",
    contentMd: "# 새 포스트\n\n여기서부터 작성해 보세요.",
    tagsInput: "",
    coverImageUrl: "",
    canonicalUrl: "",
    visibility: "public",
    pinned: false,
    publishedAt: null,
  };
}

export default function BlogEditorClient({ postId }: { postId?: string | null }) {
  const router = useRouter();
  const { supabase, user, isAdmin, loading, error } = useStudioSession();
  const [form, setForm] = useState<BlogFormState>(createDefaultFormState);
  const [status, setStatus] = useState<ContentStatus>("draft");
  const [loadingPost, setLoadingPost] = useState(Boolean(postId));
  const [submitting, setSubmitting] = useState<"idle" | "draft" | "published" | "delete">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [ownerId, setOwnerId] = useState<string | null>(null);

  useEffect(() => {
    if (slugTouched) {
      return;
    }

    setForm((prev) => ({
      ...prev,
      slug: slugify(prev.title),
    }));
  }, [form.title, slugTouched]);

  useEffect(() => {
    if (!postId || !user) {
      setLoadingPost(false);
      return;
    }

    let active = true;

    const loadPost = async () => {
      try {
        setLoadingPost(true);
        const { data, error: fetchError } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("id", postId)
          .maybeSingle();

        if (fetchError) {
          throw fetchError;
        }

        if (!active) {
          return;
        }

        if (!data) {
          setFormError("수정할 블로그 포스트를 찾지 못했습니다.");
          return;
        }

        const record = data as BlogPostRecord;

        if (!isAdmin && record.author_user_id !== user.id) {
          setFormError("본인이 작성한 블로그 포스트만 수정할 수 있습니다.");
          return;
        }

        setOwnerId(record.author_user_id);
        setStatus(record.status);
        setForm({
          title: record.title,
          slug: record.slug,
          summary: record.summary,
          contentMd: record.content_md,
          tagsInput: tagsToInput(record.tags ?? []),
          coverImageUrl: record.cover_image_url ?? "",
          canonicalUrl: record.canonical_url ?? "",
          visibility: record.visibility,
          pinned: record.pinned,
          publishedAt: record.published_at,
        });
        setSlugTouched(true);
      } catch (caughtError) {
        if (!active) {
          return;
        }

        setFormError(
          caughtError instanceof Error ? caughtError.message : "포스트 정보를 불러오지 못했습니다."
        );
      } finally {
        if (active) {
          setLoadingPost(false);
        }
      }
    };

    void loadPost();

    return () => {
      active = false;
    };
  }, [isAdmin, postId, supabase, user]);

  const updateField = <Key extends keyof BlogFormState>(key: Key, value: BlogFormState[Key]) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validate = () => {
    if (!form.title.trim()) {
      return "제목은 필수입니다.";
    }

    if (!form.summary.trim()) {
      return "요약은 필수입니다.";
    }

    if (!form.contentMd.trim()) {
      return "본문은 비워 둘 수 없습니다.";
    }

    return null;
  };

  const handleSave = async (nextStatus: ContentStatus) => {
    if (!user) {
      return;
    }

    const validationMessage = validate();
    if (validationMessage) {
      setFormError(validationMessage);
      return;
    }

    setSubmitting(nextStatus === "published" ? "published" : "draft");
    setFormError(null);
    setMessage(null);

    const normalizedSlug =
      slugify(form.slug.trim()) || slugify(form.title) || createFallbackSlug("post");
    const publishedAt =
      nextStatus === "published" ? form.publishedAt ?? new Date().toISOString() : null;

    const payload = {
      author_user_id: ownerId ?? user.id,
      slug: normalizedSlug,
      title: form.title.trim(),
      summary: form.summary.trim(),
      content_md: form.contentMd,
      tags: parseTags(form.tagsInput),
      cover_image_url: form.coverImageUrl.trim() || null,
      canonical_url: form.canonicalUrl.trim() || null,
      reading_time_minutes: estimateReadingTime(form.contentMd),
      pinned: form.pinned,
      status: nextStatus,
      visibility: form.visibility,
      published_at: publishedAt,
    };

    try {
      if (postId) {
        const { data, error: updateError } = await supabase
          .from("blog_posts")
          .update(payload)
          .eq("id", postId)
          .select("id")
          .single();

        if (updateError) {
          throw updateError;
        }

        if (!data) {
          throw new Error("업데이트 결과를 확인하지 못했습니다.");
        }
      } else {
        const { data, error: insertError } = await supabase
          .from("blog_posts")
          .insert(payload)
          .select("id, author_user_id")
          .single();

        if (insertError) {
          throw insertError;
        }

        const nextId = data?.id;
        setOwnerId(data?.author_user_id ?? user.id);

        if (nextId) {
          router.replace(`/studio/editor?postId=${nextId}`);
        }
      }

      setStatus(nextStatus);
      setForm((prev) => ({
        ...prev,
        slug: normalizedSlug,
        publishedAt,
      }));
      setMessage(nextStatus === "published" ? "포스트를 발행했습니다." : "초안을 저장했습니다.");
    } catch (caughtError) {
      setFormError(caughtError instanceof Error ? caughtError.message : "저장 중 오류가 발생했습니다.");
    } finally {
      setSubmitting("idle");
    }
  };

  const handleDelete = async () => {
    if (!postId) {
      return;
    }

    const confirmed = window.confirm("이 블로그 포스트를 삭제할까요?");
    if (!confirmed) {
      return;
    }

    setSubmitting("delete");
    setFormError(null);
    setMessage(null);

    try {
      const { error: deleteError } = await supabase.from("blog_posts").delete().eq("id", postId);

      if (deleteError) {
        throw deleteError;
      }

      router.push("/studio/blog");
    } catch (caughtError) {
      setFormError(caughtError instanceof Error ? caughtError.message : "삭제 중 오류가 발생했습니다.");
      setSubmitting("idle");
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
        title="블로그 에디터는 로그인이 필요합니다"
        description="브라우저에서 직접 Supabase에 연결합니다. 로그인 후 블로그 포스트를 작성하거나 수정할 수 있습니다."
      />
    );
  }

  if (loadingPost) {
    return <StudioLoadingState message="포스트 정보를 불러오는 중입니다..." />;
  }

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-background-light font-display text-slate-900 antialiased dark:bg-background-dark dark:text-slate-100">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-4">
          <Link
            href="/studio/blog"
            className="flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-primary"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            목록으로
          </Link>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">edit_note</span>
            <span className="text-sm font-semibold">
              {postId ? "블로그 포스트 수정" : "새 블로그 포스트 작성"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void handleSave("draft")}
            disabled={submitting !== "idle"}
            className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            <span className="material-symbols-outlined text-lg">save</span>
            저장(Draft)
          </button>
          <button
            type="button"
            onClick={() => void handleSave("published")}
            disabled={submitting !== "idle"}
            className="flex items-center gap-2 rounded-lg bg-primary px-4 py-1.5 text-sm font-bold text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="material-symbols-outlined text-lg">rocket_launch</span>
            발행(Publish)
          </button>
          {postId ? (
            <button
              type="button"
              onClick={() => void handleDelete()}
              disabled={submitting !== "idle"}
              className="flex items-center gap-2 rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900/40 dark:text-red-300 dark:hover:bg-red-950/30"
            >
              <span className="material-symbols-outlined text-lg">delete</span>
              삭제
            </button>
          ) : null}
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 overflow-hidden">
          <section className="flex min-w-0 flex-1 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2 dark:border-slate-800 dark:bg-slate-800/50">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Editor</span>
              <span className="text-xs font-medium text-slate-400">
                상태: <strong className="uppercase text-slate-600 dark:text-slate-300">{status}</strong>
              </span>
            </div>

            <input
              type="text"
              value={form.title}
              onChange={(event) => updateField("title", event.target.value)}
              placeholder="제목을 입력하세요"
              className="border-b border-slate-200 bg-transparent px-6 py-5 text-3xl font-bold tracking-tight outline-none placeholder:text-slate-300 dark:border-slate-800"
            />

            <textarea
              className="flex-1 w-full resize-none bg-transparent p-6 font-mono text-sm leading-relaxed text-slate-800 outline-none dark:text-slate-300"
              spellCheck={false}
              placeholder="# 마크다운 내용을 입력하세요"
              value={form.contentMd}
              onChange={(event) => updateField("contentMd", event.target.value)}
            />
          </section>

          <aside className="w-[360px] shrink-0 overflow-y-auto border-l border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-950/30">
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">메타데이터</h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  slug, 공개 여부, 태그와 같은 게시글 메타 정보를 함께 관리합니다.
                </p>
              </div>

              <label className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Slug</span>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(event) => {
                    setSlugTouched(true);
                    updateField("slug", slugify(event.target.value));
                  }}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900"
                />
                <p className="text-[11px] text-slate-400">영문 소문자, 숫자, 하이픈만 저장됩니다.</p>
              </label>

              <label className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Summary</span>
                <textarea
                  value={form.summary}
                  onChange={(event) => updateField("summary", event.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tags</span>
                <input
                  type="text"
                  value={form.tagsInput}
                  onChange={(event) => updateField("tagsInput", event.target.value)}
                  placeholder="ai, rag, backend"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Visibility</span>
                <select
                  value={form.visibility}
                  onChange={(event) => updateField("visibility", event.target.value as ContentVisibility)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </label>

              <label className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Cover Image URL</span>
                <input
                  type="text"
                  value={form.coverImageUrl}
                  onChange={(event) => updateField("coverImageUrl", event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900"
                />
              </label>

              <label className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Canonical URL</span>
                <input
                  type="text"
                  value={form.canonicalUrl}
                  onChange={(event) => updateField("canonicalUrl", event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900"
                />
              </label>

              <label className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm dark:border-slate-700 dark:bg-slate-900">
                <input
                  type="checkbox"
                  checked={form.pinned}
                  onChange={(event) => updateField("pinned", event.target.checked)}
                  className="size-4 rounded border-slate-300 text-primary focus:ring-primary"
                />
                <span className="font-medium">홈에서 우선 노출</span>
              </label>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Preview Snapshot</h4>
                <p className="mt-3 text-xs font-medium text-slate-400">
                  읽는 시간 약 {estimateReadingTime(form.contentMd)}분
                </p>
                <p className="mt-2 text-xs text-slate-500">마지막 발행: {formatDisplayDate(form.publishedAt)}</p>
              </div>

              {message ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-300">
                  {message}
                </div>
              ) : null}

              {formError ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 dark:border-red-900/40 dark:bg-red-950/20 dark:text-red-300">
                  {formError}
                </div>
              ) : null}
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
