"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createFallbackSlug,
  slugify,
  tagsToInput,
  parseTags,
  formatDisplayDate,
  type ContentStatus,
  type ContentVisibility,
  type ScrapRecord,
} from "@/app/lib/studio-types";
import { useStudioSession } from "@/app/components/studio/useStudioSession";
import {
  StudioErrorState,
  StudioLoadingState,
  StudioLoginRequired,
} from "@/app/components/studio/StudioFeedback";

interface ScrapFormState {
  url: string;
  title: string;
  source: string;
  slug: string;
  oneLineSummary: string;
  commentMd: string;
  tagsInput: string;
  scrapDate: string;
  visibility: ContentVisibility;
  ogTitle: string;
  ogImageUrl: string;
}

function createDefaultScrapFormState(): ScrapFormState {
  return {
    url: "",
    title: "",
    source: "",
    slug: "",
    oneLineSummary: "",
    commentMd: "",
    tagsInput: "",
    scrapDate: new Date().toISOString().slice(0, 10),
    visibility: "public",
    ogTitle: "",
    ogImageUrl: "",
  };
}

export default function ScrapEditorClient({ scrapId }: { scrapId?: string | null }) {
  const router = useRouter();
  const { supabase, user, isAdmin, loading, error } = useStudioSession();
  const [form, setForm] = useState<ScrapFormState>(createDefaultScrapFormState);
  const [status, setStatus] = useState<ContentStatus>("draft");
  const [loadingScrap, setLoadingScrap] = useState(Boolean(scrapId));
  const [submitting, setSubmitting] = useState<"idle" | "draft" | "published" | "delete">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [ownerId, setOwnerId] = useState<string | null>(null);
  const [publishedAt, setPublishedAt] = useState<string | null>(null);

  useEffect(() => {
    if (slugTouched) {
      return;
    }

    const sourceValue = form.title.trim() || form.source.trim();
    setForm((prev) => ({
      ...prev,
      slug: slugify(sourceValue),
    }));
  }, [form.source, form.title, slugTouched]);

  useEffect(() => {
    if (!scrapId || !user) {
      setLoadingScrap(false);
      return;
    }

    let active = true;

    const loadScrap = async () => {
      try {
        setLoadingScrap(true);
        const { data, error: fetchError } = await supabase
          .from("scraps")
          .select("*")
          .eq("id", scrapId)
          .maybeSingle();

        if (fetchError) {
          throw fetchError;
        }

        if (!active) {
          return;
        }

        if (!data) {
          setFormError("수정할 스크랩을 찾지 못했습니다.");
          return;
        }

        const record = data as ScrapRecord;

        if (!isAdmin && record.author_user_id !== user.id) {
          setFormError("본인이 작성한 스크랩만 수정할 수 있습니다.");
          return;
        }

        setOwnerId(record.author_user_id);
        setStatus(record.status);
        setPublishedAt(record.published_at);
        setForm({
          url: record.url,
          title: record.title ?? "",
          source: record.source,
          slug: record.slug,
          oneLineSummary: record.one_line_summary,
          commentMd: record.comment_md ?? "",
          tagsInput: tagsToInput(record.tags ?? []),
          scrapDate: record.scrap_date,
          visibility: record.visibility,
          ogTitle: record.og_title ?? "",
          ogImageUrl: record.og_image_url ?? "",
        });
        setSlugTouched(true);
      } catch (caughtError) {
        if (!active) {
          return;
        }

        const nextMessage =
          caughtError instanceof Error
            ? caughtError.message
            : "스크랩 정보를 불러오지 못했습니다.";
        setFormError(nextMessage);
      } finally {
        if (active) {
          setLoadingScrap(false);
        }
      }
    };

    void loadScrap();

    return () => {
      active = false;
    };
  }, [isAdmin, scrapId, supabase, user]);

  const updateField = <Key extends keyof ScrapFormState>(key: Key, value: ScrapFormState[Key]) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const validate = () => {
    if (!form.url.trim()) {
      return "원문 URL은 필수입니다.";
    }

    if (!form.source.trim()) {
      return "출처(source)는 필수입니다.";
    }

    if (!form.oneLineSummary.trim()) {
      return "한 줄 요약은 필수입니다.";
    }

    const nextSlug = slugify(form.slug.trim()) || slugify(form.title || form.source);
    if (!nextSlug) {
      return "slug를 만들 수 없습니다.";
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
      slugify(form.slug.trim()) ||
      slugify(form.title || form.source) ||
      createFallbackSlug("scrap");
    const nextPublishedAt = nextStatus === "published" ? publishedAt ?? new Date().toISOString() : null;

    const payload = {
      author_user_id: ownerId ?? user.id,
      slug: normalizedSlug,
      url: form.url.trim(),
      title: form.title.trim() || null,
      source: form.source.trim(),
      one_line_summary: form.oneLineSummary.trim(),
      comment_md: form.commentMd.trim() || null,
      tags: parseTags(form.tagsInput),
      scrap_date: form.scrapDate,
      visibility: form.visibility,
      og_title: form.ogTitle.trim() || null,
      og_image_url: form.ogImageUrl.trim() || null,
      status: nextStatus,
      published_at: nextPublishedAt,
    };

    try {
      if (scrapId) {
        const { data, error: updateError } = await supabase
          .from("scraps")
          .update(payload)
          .eq("id", scrapId)
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
          .from("scraps")
          .insert(payload)
          .select("id, author_user_id")
          .single();

        if (insertError) {
          throw insertError;
        }

        const nextId = data?.id;
        setOwnerId(data?.author_user_id ?? user.id);

        if (nextId) {
          router.replace(`/studio/scrap/edit?scrapId=${nextId}`);
        }
      }

      setStatus(nextStatus);
      setPublishedAt(nextPublishedAt);
      setForm((prev) => ({
        ...prev,
        slug: normalizedSlug,
      }));
      setMessage(nextStatus === "published" ? "스크랩을 발행했습니다." : "스크랩 초안을 저장했습니다.");
    } catch (caughtError) {
      const nextMessage =
        caughtError instanceof Error ? caughtError.message : "저장 중 오류가 발생했습니다.";
      setFormError(nextMessage);
    } finally {
      setSubmitting("idle");
    }
  };

  const handleDelete = async () => {
    if (!scrapId) {
      return;
    }

    const confirmed = window.confirm("이 스크랩을 삭제할까요?");
    if (!confirmed) {
      return;
    }

    setSubmitting("delete");
    setFormError(null);
    setMessage(null);

    try {
      const { error: deleteError } = await supabase.from("scraps").delete().eq("id", scrapId);

      if (deleteError) {
        throw deleteError;
      }

      router.push("/studio/scrap");
    } catch (caughtError) {
      const nextMessage =
        caughtError instanceof Error ? caughtError.message : "삭제 중 오류가 발생했습니다.";
      setFormError(nextMessage);
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
        title="스크랩 에디터 로그인 필요"
        description="정적 페이지 환경에서도 Supabase를 통해 실제 저장이 가능합니다. 로그인 후 스크랩을 작성하거나 수정할 수 있습니다."
      />
    );
  }

  if (loadingScrap) {
    return <StudioLoadingState message="스크랩 정보를 불러오는 중입니다..." />;
  }

  return (
    <div className="flex min-h-screen flex-col overflow-hidden bg-background-light font-display text-slate-900 antialiased dark:bg-background-dark dark:text-slate-100">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-4">
          <Link href="/studio/scrap" className="flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-primary">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            목록으로
          </Link>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">bookmark</span>
            <span className="text-sm font-semibold">
              {scrapId ? "뉴스 스크랩 수정" : "새로운 뉴스 스크랩 작성"}
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
          {scrapId ? (
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
        <section className="flex min-w-0 flex-1 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
          <div className="grid grid-cols-1 gap-4 border-b border-slate-200 bg-slate-50 px-6 py-5 dark:border-slate-800 dark:bg-slate-800/50">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Original URL</span>
                <input
                  type="text"
                  value={form.url}
                  onChange={(event) => updateField("url", event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900"
                />
              </label>
              <label className="block space-y-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Source</span>
                <input
                  type="text"
                  value={form.source}
                  onChange={(event) => updateField("source", event.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900"
                />
              </label>
            </div>

            <label className="block space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Title</span>
              <input
                type="text"
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                placeholder="원문 제목 또는 스크랩 제목"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">One-line Summary</span>
              <textarea
                value={form.oneLineSummary}
                onChange={(event) => updateField("oneLineSummary", event.target.value)}
                rows={3}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900"
              />
            </label>

            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Comment (Markdown)</span>
              <span className="text-xs font-medium text-slate-400">
                상태: <strong className="uppercase text-slate-600 dark:text-slate-300">{status}</strong>
              </span>
            </div>

            <textarea
              className="min-h-[320px] w-full resize-none rounded-2xl border border-slate-200 bg-white p-5 font-mono text-sm leading-relaxed outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900"
              spellCheck={false}
              placeholder="내 코멘트를 마크다운으로 남겨보세요..."
              value={form.commentMd}
              onChange={(event) => updateField("commentMd", event.target.value)}
            />
          </div>
        </section>

        <aside className="w-[360px] shrink-0 overflow-y-auto border-l border-slate-200 bg-slate-50/80 p-5 dark:border-slate-800 dark:bg-slate-950/30">
          <div className="space-y-5">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">스크랩 메타데이터</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                공개 여부, 태그, OG 정보를 함께 관리해서 공개 Scrap 페이지와 연결합니다.
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
            </label>

            <label className="block space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Tags</span>
              <input
                type="text"
                value={form.tagsInput}
                onChange={(event) => updateField("tagsInput", event.target.value)}
                placeholder="news, ai, rag"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Scrap Date</span>
              <input
                type="date"
                value={form.scrapDate}
                onChange={(event) => updateField("scrapDate", event.target.value)}
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
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">OG Title</span>
              <input
                type="text"
                value={form.ogTitle}
                onChange={(event) => updateField("ogTitle", event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900"
              />
            </label>

            <label className="block space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">OG Image URL</span>
              <input
                type="text"
                value={form.ogImageUrl}
                onChange={(event) => updateField("ogImageUrl", event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900"
              />
            </label>

            <div className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white">Preview Snapshot</h4>
              <p className="mt-3 text-xs text-slate-500">
                마지막 발행: {formatDisplayDate(publishedAt)}
              </p>
              <a
                href={form.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-primary hover:underline"
              >
                원문 링크 열기
                <span className="material-symbols-outlined !text-sm">open_in_new</span>
              </a>
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
      </main>
    </div>
  );
}
