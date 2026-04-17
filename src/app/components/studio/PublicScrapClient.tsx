"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/app/lib/supabase-browser";
import { formatDisplayDate, type ScrapRecord } from "@/app/lib/studio-types";

export default function PublicScrapClient() {
  const supabase = useMemo(() => createClient(), []);
  const [scraps, setScraps] = useState<ScrapRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSource, setActiveSource] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadScraps = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from("scraps")
          .select("*")
          .eq("status", "published")
          .eq("visibility", "public")
          .order("published_at", { ascending: false });

        if (fetchError) {
          throw fetchError;
        }

        if (active) {
          setScraps((data ?? []) as ScrapRecord[]);
        }
      } catch (caughtError) {
        if (!active) {
          return;
        }

        const message =
          caughtError instanceof Error ? caughtError.message : "스크랩을 불러오지 못했습니다.";
        setError(message);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadScraps();

    return () => {
      active = false;
    };
  }, [supabase]);

  const sources = useMemo(() => {
    return Array.from(new Set(scraps.map((item) => item.source))).sort();
  }, [scraps]);

  const filteredScraps = useMemo(() => {
    return scraps.filter((scrap) => {
      if (activeSource !== "all" && scrap.source !== activeSource) {
        return false;
      }

      if (!searchTerm.trim()) {
        return true;
      }

      const normalized = searchTerm.trim().toLowerCase();
      return (
        (scrap.title ?? "").toLowerCase().includes(normalized) ||
        scrap.source.toLowerCase().includes(normalized) ||
        scrap.one_line_summary.toLowerCase().includes(normalized) ||
        (scrap.tags ?? []).some((tag) => tag.toLowerCase().includes(normalized))
      );
    });
  }, [activeSource, scraps, searchTerm]);

  return (
    <main className="flex-1 w-full px-6 md:px-12 py-12 max-w-6xl mx-auto">
      <div className="mb-12 border-b border-slate-100 dark:border-slate-800 pb-8">
        <div className="flex items-start gap-4 mb-4">
          <div className="size-12 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-500 dark:text-slate-400">
            <span className="material-symbols-outlined text-[32px]">bookmark</span>
          </div>
          <div>
            <h1 className="text-[2rem] md:text-[2.5rem] font-bold tracking-tight text-slate-900 dark:text-white mb-2">Scrap</h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              읽은 자료를 단순 링크로 쌓지 않고, 한 줄 요약과 짧은 코멘트까지 붙여 정리한 공개 스크랩입니다.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveSource("all")}
            className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
              activeSource === "all"
                ? "bg-primary text-white"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            All Sources
          </button>
          {sources.map((source) => (
            <button
              key={source}
              type="button"
              onClick={() => setActiveSource(source)}
              className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                activeSource === source
                  ? "bg-primary text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
              }`}
            >
              {source}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="스크랩 검색..."
          className="w-full max-w-sm rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-primary dark:border-slate-700 dark:bg-slate-900"
        />
      </div>

      {loading ? (
        <p className="text-slate-500 dark:text-slate-400">스크랩을 불러오는 중입니다...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : filteredScraps.length === 0 ? (
        <p className="text-slate-500 dark:text-slate-400">조건에 맞는 스크랩이 없습니다.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredScraps.map((scrap) => (
            <article
              key={scrap.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                <span>{scrap.source}</span>
                <span>•</span>
                <time>{formatDisplayDate(scrap.published_at ?? scrap.created_at)}</time>
              </div>
              <h2 className="mt-3 text-xl font-bold text-slate-900 dark:text-white">
                {scrap.title?.trim() ? scrap.title : scrap.source}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate-700 dark:text-slate-300">
                {scrap.one_line_summary}
              </p>
              {scrap.comment_md ? (
                <div className="mt-4 rounded-xl bg-slate-50 px-4 py-4 text-sm leading-7 text-slate-600 dark:bg-slate-800/60 dark:text-slate-300 whitespace-pre-wrap">
                  {scrap.comment_md}
                </div>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-2">
                {(scrap.tags ?? []).map((tag) => (
                  <span
                    key={`${scrap.id}-${tag}`}
                    className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={scrap.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                원문 보기
                <span className="material-symbols-outlined !text-base">open_in_new</span>
              </a>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
