"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useDeferredValue, useEffect, useMemo, useState } from "react";
import { createClient } from "@/app/lib/supabase-browser";
import { formatDisplayDate, type BlogPostRecord } from "@/app/lib/studio-types";

const PAGE_SIZE = 24;
const BLOG_LIST_COLUMNS =
  "id, slug, title, summary, tags, published_at, created_at, reading_time_minutes";

type SearchScope = "loaded" | "all";

interface BlogListItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  published_at: string | null;
  created_at: string;
  reading_time_minutes: number;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderInlineMarkdown(value: string) {
  return escapeHtml(value)
    .replace(/!\[([^\]]*)\]\((https?:\/\/[^)\s]+)\)/g, '<img src="$2" alt="$1" />')
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/__([^_]+)__/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/_([^_]+)_/g, "<em>$1</em>")
    .replace(/~~([^~]+)~~/g, "<del>$1</del>");
}

function isTableSeparatorLine(line: string) {
  return /^\|?(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?$/.test(line.trim());
}

function parseTableRow(line: string) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function renderTable(lines: string[]) {
  if (lines.length < 2) {
    return `<p>${renderInlineMarkdown(lines.join(" "))}</p>`;
  }

  const headerCells = parseTableRow(lines[0]);
  const bodyRows = lines.slice(2).map(parseTableRow);

  const headerHtml = headerCells.map((cell) => `<th>${renderInlineMarkdown(cell)}</th>`).join("");
  const bodyHtml = bodyRows
    .map(
      (row) =>
        `<tr>${row.map((cell) => `<td>${renderInlineMarkdown(cell)}</td>`).join("")}</tr>`
    )
    .join("");

  return `<table><thead><tr>${headerHtml}</tr></thead><tbody>${bodyHtml}</tbody></table>`;
}

function renderMarkdownToHtml(markdown: string) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: string[] = [];
  let paragraphBuffer: string[] = [];
  let unorderedListItems: string[] = [];
  let orderedListItems: string[] = [];
  let blockquoteBuffer: string[] = [];
  let codeBuffer: string[] = [];
  let codeLanguage = "";
  let inCodeBlock = false;
  let tableBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length === 0) {
      return;
    }

    blocks.push(`<p>${renderInlineMarkdown(paragraphBuffer.join("<br />"))}</p>`);
    paragraphBuffer = [];
  };

  const flushUnorderedList = () => {
    if (unorderedListItems.length === 0) {
      return;
    }

    blocks.push(
      `<ul>${unorderedListItems
        .map((item) => `<li>${renderInlineMarkdown(item)}</li>`)
        .join("")}</ul>`
    );
    unorderedListItems = [];
  };

  const flushOrderedList = () => {
    if (orderedListItems.length === 0) {
      return;
    }

    blocks.push(
      `<ol>${orderedListItems
        .map((item) => `<li>${renderInlineMarkdown(item)}</li>`)
        .join("")}</ol>`
    );
    orderedListItems = [];
  };

  const flushBlockquote = () => {
    if (blockquoteBuffer.length === 0) {
      return;
    }

    blocks.push(
      `<blockquote>${blockquoteBuffer
        .map((line) => renderInlineMarkdown(line))
        .join("<br />")}</blockquote>`
    );
    blockquoteBuffer = [];
  };

  const flushCodeBlock = () => {
    if (codeBuffer.length === 0) {
      return;
    }

    const languageClass = codeLanguage ? ` class="language-${escapeHtml(codeLanguage)}"` : "";
    blocks.push(`<pre><code${languageClass}>${escapeHtml(codeBuffer.join("\n"))}</code></pre>`);
    codeBuffer = [];
    codeLanguage = "";
  };

  const flushTable = () => {
    if (tableBuffer.length === 0) {
      return;
    }

    blocks.push(renderTable(tableBuffer));
    tableBuffer = [];
  };

  for (let index = 0; index < lines.length; index += 1) {
    const rawLine = lines[index];
    const line = rawLine.trim();

    if (rawLine.trimStart().startsWith("```")) {
      flushParagraph();
      flushUnorderedList();
      flushOrderedList();
      flushBlockquote();
      flushTable();

      if (inCodeBlock) {
        flushCodeBlock();
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
        codeLanguage = rawLine.trimStart().slice(3).trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeBuffer.push(rawLine);
      continue;
    }

    const nextLine = lines[index + 1]?.trim() ?? "";
    const isTableHeader = line.includes("|") && isTableSeparatorLine(nextLine);
    const isTableRow = tableBuffer.length > 0 && line.includes("|");

    if (isTableHeader) {
      flushParagraph();
      flushUnorderedList();
      flushOrderedList();
      flushBlockquote();
      tableBuffer.push(line, nextLine);
      index += 1;
      continue;
    }

    if (isTableRow) {
      tableBuffer.push(line);
      continue;
    }

    flushTable();

    if (!line) {
      flushParagraph();
      flushUnorderedList();
      flushOrderedList();
      flushBlockquote();
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(line)) {
      flushParagraph();
      flushUnorderedList();
      flushOrderedList();
      flushBlockquote();
      blocks.push("<hr />");
      continue;
    }

    const headingMatch = rawLine.trimStart().match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      flushUnorderedList();
      flushOrderedList();
      flushBlockquote();
      const level = headingMatch[1].length;
      blocks.push(`<h${level}>${renderInlineMarkdown(headingMatch[2])}</h${level}>`);
      continue;
    }

    const orderedMatch = rawLine.trimStart().match(/^\d+\.\s+(.+)$/);
    if (orderedMatch) {
      flushParagraph();
      flushUnorderedList();
      flushBlockquote();
      orderedListItems.push(orderedMatch[1]);
      continue;
    }

    const unorderedMatch = rawLine.trimStart().match(/^[-*]\s+(.+)$/);
    if (unorderedMatch) {
      flushParagraph();
      flushOrderedList();
      flushBlockquote();
      unorderedListItems.push(unorderedMatch[1]);
      continue;
    }

    const blockquoteMatch = rawLine.trimStart().match(/^>\s?(.*)$/);
    if (blockquoteMatch) {
      flushParagraph();
      flushUnorderedList();
      flushOrderedList();
      blockquoteBuffer.push(blockquoteMatch[1]);
      continue;
    }

    paragraphBuffer.push(line);
  }

  flushParagraph();
  flushUnorderedList();
  flushOrderedList();
  flushBlockquote();
  flushTable();
  flushCodeBlock();

  return blocks.join("");
}

function MarkdownArticle({ markdown }: { markdown: string }) {
  const html = useMemo(() => renderMarkdownToHtml(markdown), [markdown]);

  return (
    <div
      className="
        blog-markdown
        [&_a]:text-primary [&_a]:underline-offset-2 hover:[&_a]:underline
        [&_blockquote]:border-l-4 [&_blockquote]:border-slate-200 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-500
        [&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.95em]
        [&_del]:text-slate-400
        [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:text-3xl [&_h1]:font-bold
        [&_h2]:mb-3 [&_h2]:mt-8 [&_h2]:text-2xl [&_h2]:font-bold
        [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-semibold
        [&_hr]:my-8 [&_hr]:border-slate-200
        [&_img]:my-6 [&_img]:rounded-xl
        [&_li]:my-1
        [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6
        [&_p]:my-4 [&_p]:leading-8
        [&_pre]:my-5 [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:bg-slate-950 [&_pre]:p-4 [&_pre]:text-slate-100
        [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-sm
        [&_strong]:font-semibold
        [&_table]:my-6 [&_table]:w-full [&_table]:border-collapse [&_table]:overflow-hidden [&_table]:rounded-xl
        [&_tbody_tr]:border-b [&_tbody_tr]:border-slate-200
        [&_td]:border [&_td]:border-slate-200 [&_td]:px-3 [&_td]:py-2 [&_td]:align-top
        [&_th]:border [&_th]:border-slate-200 [&_th]:bg-slate-50 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left
        [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6
        text-[15px] leading-7 text-slate-700 dark:[&_blockquote]:border-slate-700 dark:[&_code]:bg-slate-800 dark:[&_hr]:border-slate-800 dark:[&_tbody_tr]:border-slate-800 dark:[&_td]:border-slate-800 dark:[&_th]:border-slate-800 dark:[&_th]:bg-slate-800/60 dark:text-slate-300
      "
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default function PublicBlogClient() {
  const supabase = useMemo(() => createClient(), []);
  const searchParams = useSearchParams();
  const selectedSlug = searchParams.get("post");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTag, setActiveTag] = useState<string>("all");
  const [scope, setScope] = useState<SearchScope>("loaded");
  const [loadedPosts, setLoadedPosts] = useState<BlogListItem[]>([]);
  const [serverPosts, setServerPosts] = useState<BlogListItem[]>([]);
  const [loadedPage, setLoadedPage] = useState(0);
  const [serverPage, setServerPage] = useState(0);
  const [hasMoreLoaded, setHasMoreLoaded] = useState(true);
  const [hasMoreServer, setHasMoreServer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [detailError, setDetailError] = useState<string | null>(null);
  const [detailPost, setDetailPost] = useState<BlogPostRecord | null>(null);
  const deferredSearchTerm = useDeferredValue(searchTerm.trim());

  const fetchBlogList = useCallback(
    async ({
      page,
      search,
      tag,
    }: {
      page: number;
      search: string;
      tag: string;
    }) => {
      let query = supabase
        .from("blog_posts")
        .select(BLOG_LIST_COLUMNS)
        .eq("status", "published")
        .eq("visibility", "public")
        .order("published_at", { ascending: false })
        .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);

      if (tag !== "all") {
        query = query.contains("tags", [tag]);
      }

      if (search) {
        const sanitized = search.replaceAll(",", " ").replaceAll("%", "");
        query = query.or(
          `title.ilike.%${sanitized}%,summary.ilike.%${sanitized}%,content_md.ilike.%${sanitized}%`
        );
      }

      const { data, error: fetchError } = await query;

      if (fetchError) {
        throw fetchError;
      }

      return (data ?? []) as BlogListItem[];
    },
    [supabase]
  );

  useEffect(() => {
    let active = true;

    const loadInitialPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const rows = await fetchBlogList({ page: 0, search: "", tag: "all" });

        if (!active) {
          return;
        }

        setLoadedPosts(rows);
        setLoadedPage(1);
        setHasMoreLoaded(rows.length === PAGE_SIZE);
      } catch (caughtError) {
        if (!active) {
          return;
        }

        setError(caughtError instanceof Error ? caughtError.message : "블로그 글을 불러오지 못했습니다.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadInitialPosts();

    return () => {
      active = false;
    };
  }, [fetchBlogList]);

  useEffect(() => {
    if (scope !== "all") {
      return;
    }

    let active = true;

    const loadServerPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const rows = await fetchBlogList({
          page: 0,
          search: deferredSearchTerm,
          tag: activeTag,
        });

        if (!active) {
          return;
        }

        setServerPosts(rows);
        setServerPage(1);
        setHasMoreServer(rows.length === PAGE_SIZE);
      } catch (caughtError) {
        if (!active) {
          return;
        }

        setError(caughtError instanceof Error ? caughtError.message : "전체 글 검색에 실패했습니다.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadServerPosts();

    return () => {
      active = false;
    };
  }, [activeTag, deferredSearchTerm, fetchBlogList, scope]);

  useEffect(() => {
    if (!selectedSlug) {
      setDetailPost(null);
      setDetailError(null);
      return;
    }

    let active = true;

    const loadDetail = async () => {
      try {
        setDetailLoading(true);
        setDetailError(null);

        const { data, error: fetchError } = await supabase
          .from("blog_posts")
          .select("*")
          .eq("status", "published")
          .eq("visibility", "public")
          .eq("slug", selectedSlug)
          .maybeSingle();

        if (fetchError) {
          throw fetchError;
        }

        if (!active) {
          return;
        }

        if (!data) {
          setDetailError("선택한 글을 찾지 못했습니다.");
          setDetailPost(null);
          return;
        }

        setDetailPost(data as BlogPostRecord);
      } catch (caughtError) {
        if (!active) {
          return;
        }

        setDetailError(caughtError instanceof Error ? caughtError.message : "상세 글을 불러오지 못했습니다.");
      } finally {
        if (active) {
          setDetailLoading(false);
        }
      }
    };

    void loadDetail();

    return () => {
      active = false;
    };
  }, [selectedSlug, supabase]);

  const quickFilteredPosts = useMemo(() => {
    const normalized = deferredSearchTerm.toLowerCase();

    return loadedPosts.filter((post) => {
      if (activeTag !== "all" && !(post.tags ?? []).includes(activeTag)) {
        return false;
      }

      if (!normalized) {
        return true;
      }

      return (
        post.title.toLowerCase().includes(normalized) ||
        post.summary.toLowerCase().includes(normalized) ||
        post.slug.toLowerCase().includes(normalized) ||
        (post.tags ?? []).some((tag) => tag.toLowerCase().includes(normalized))
      );
    });
  }, [activeTag, deferredSearchTerm, loadedPosts]);

  const visiblePosts = scope === "all" ? serverPosts : quickFilteredPosts;
  const tagSourcePosts = scope === "all" ? serverPosts : quickFilteredPosts;
  const availableTags = useMemo(() => {
    return Array.from(new Set(tagSourcePosts.flatMap((post) => post.tags ?? []))).sort();
  }, [tagSourcePosts]);
  const hasMore = scope === "all" ? hasMoreServer : hasMoreLoaded;

  const resultSummary =
    scope === "all"
      ? `전체 글 기준 ${visiblePosts.length}건`
      : `현재 로딩된 ${loadedPosts.length}건 중 ${visiblePosts.length}건`;

  const handleLoadMore = async () => {
    try {
      setLoadingMore(true);
      setError(null);

      if (scope === "all") {
        const rows = await fetchBlogList({
          page: serverPage,
          search: deferredSearchTerm,
          tag: activeTag,
        });

        setServerPosts((prev) => [...prev, ...rows]);
        setServerPage((prev) => prev + 1);
        setHasMoreServer(rows.length === PAGE_SIZE);
        return;
      }

      const rows = await fetchBlogList({ page: loadedPage, search: "", tag: "all" });
      setLoadedPosts((prev) => [...prev, ...rows]);
      setLoadedPage((prev) => prev + 1);
      setHasMoreLoaded(rows.length === PAGE_SIZE);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "추가 글을 불러오지 못했습니다.");
    } finally {
      setLoadingMore(false);
    }
  };

  const selectedTagLabel = activeTag === "all" ? "All Posts" : `# ${activeTag}`;

  return (
    <div className="mx-auto flex w-full max-w-[1400px] flex-1 flex-col md:flex-row">
      <aside className="w-full shrink-0 border-r border-slate-200 bg-slate-50/50 px-4 py-8 dark:border-slate-800 dark:bg-slate-900/30 md:sticky md:top-16 md:min-h-[calc(100vh-4rem)] md:w-72">
        <div className="mb-6 px-2">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-400">Explorer</h3>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2 text-slate-400">
              <span className="material-symbols-outlined text-[18px]">search</span>
            </span>
            <input
              className="w-full rounded-md border border-slate-200 bg-white py-2 pl-8 pr-3 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-800 dark:placeholder:text-slate-600"
              placeholder={
                scope === "all" ? "제목, 요약, 본문 전체 검색..." : "제목, 요약, 태그 빠른검색..."
              }
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          <div className="mt-3 flex rounded-lg bg-slate-100 p-1 dark:bg-slate-800">
            <button
              type="button"
              onClick={() => setScope("loaded")}
              className={`flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                scope === "loaded"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                  : "text-slate-500"
              }`}
            >
              빠른검색
            </button>
            <button
              type="button"
              onClick={() => setScope("all")}
              className={`flex-1 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                scope === "all"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white"
                  : "text-slate-500"
              }`}
            >
              서버검색
            </button>
          </div>
          <p className="mt-2 text-xs text-slate-400">{resultSummary}</p>
        </div>

        <nav className="space-y-1">
          <button
            onClick={() => setActiveTag("all")}
            className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors ${
              activeTag === "all"
                ? "bg-slate-200/50 text-slate-900 dark:bg-slate-800 dark:text-white"
                : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">article</span>
            All Posts
          </button>
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-sm transition-colors ${
                activeTag === tag
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">tag</span>
              {tag}
            </button>
          ))}
        </nav>
      </aside>

      <main className="w-full max-w-4xl flex-1 px-6 py-12 md:px-12">
        <div className="mb-12 border-b border-slate-100 pb-8 dark:border-slate-800">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400">
              <span className="material-symbols-outlined text-[28px]">article</span>
            </div>
            <div>
              <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-[2.5rem]">
                Blog
              </h1>
              <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">
                다시 찾아보기 좋은 기술 메모와 기록을 모아둔 아카이브입니다.
              </p>
            </div>
          </div>
        </div>

        {error ? <p className="mb-6 text-sm text-red-500">{error}</p> : null}

        {selectedSlug ? (
          detailLoading ? (
            <p className="text-sm text-slate-500 dark:text-slate-400">상세 글을 불러오는 중입니다...</p>
          ) : detailError ? (
            <div className="space-y-4">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                <span className="material-symbols-outlined !text-base">arrow_back</span>
                목록으로
              </Link>
              <p className="text-sm text-red-500">{detailError}</p>
            </div>
          ) : detailPost ? (
            <article className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                <span className="material-symbols-outlined !text-base">arrow_back</span>
                목록으로
              </Link>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500 dark:text-slate-400">
                <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{selectedTagLabel}</span>
                <time>{formatDisplayDate(detailPost.published_at ?? detailPost.created_at)}</time>
                <span>·</span>
                <span>{detailPost.reading_time_minutes} min read</span>
              </div>
              <h2 className="mt-4 text-[2rem] font-bold tracking-tight text-slate-900 dark:text-white">
                {detailPost.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">
                {detailPost.summary}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {(detailPost.tags ?? []).map((tag) => (
                  <button
                    key={`${detailPost.id}-${tag}`}
                    type="button"
                    onClick={() => setActiveTag(tag)}
                    className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
              <div className="mt-8 border-t border-dashed border-slate-200 pt-8 dark:border-slate-800">
                <MarkdownArticle markdown={detailPost.content_md} />
              </div>
            </article>
          ) : null
        ) : loading ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">블로그 글을 불러오는 중입니다...</p>
        ) : visiblePosts.length === 0 ? (
          <p className="text-sm text-slate-500 dark:text-slate-400">조건에 맞는 게시글이 없습니다.</p>
        ) : (
          <div className="space-y-6">
            {visiblePosts.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="mb-3 flex flex-wrap items-center gap-3 text-[12px] font-medium text-slate-500 dark:text-slate-400">
                  <time>{formatDisplayDate(post.published_at ?? post.created_at)}</time>
                  <span>·</span>
                  <span>{post.reading_time_minutes} min read</span>
                </div>
                <Link href={`/blog?post=${encodeURIComponent(post.slug)}`} className="block">
                  <h3 className="text-xl font-bold text-slate-900 transition-colors hover:text-primary dark:text-white">
                    {post.title}
                  </h3>
                </Link>
                <p className="mt-3 text-[15px] leading-7 text-slate-600 dark:text-slate-400">{post.summary}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(post.tags ?? []).map((tag) => (
                    <button
                      key={`${post.id}-${tag}`}
                      type="button"
                      onClick={() => setActiveTag(tag)}
                      className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </article>
            ))}

            {hasMore ? (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => void handleLoadMore()}
                  disabled={loadingMore}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 disabled:opacity-60 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {loadingMore ? "불러오는 중..." : "더보기"}
                </button>
              </div>
            ) : null}
          </div>
        )}
      </main>
    </div>
  );
}
