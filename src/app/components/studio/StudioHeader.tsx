"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function getHeaderMeta(pathname: string) {
  if (pathname === "/studio") {
    return {
      section: "Workspace",
      description: "최근 작업과 관리 화면으로 빠르게 이동합니다.",
    };
  }

  if (pathname.startsWith("/studio/blog") || pathname.startsWith("/studio/editor")) {
    return {
      section: "Blog Posts",
      description: "최근 30개 기본 목록과 서버 검색으로 블로그 글을 찾고 수정합니다.",
    };
  }

  if (pathname.startsWith("/studio/scrap")) {
    return {
      section: "Scraps",
      description: "스크랩과 메모를 검색하고 상태별로 정리합니다.",
    };
  }

  if (pathname === "/studio/settings") {
    return {
      section: "Settings",
      description: "홈페이지 자산과 운영용 설정 UI를 준비합니다.",
    };
  }

  return {
    section: "Studio",
    description: "콘텐츠 작업 공간",
  };
}

export default function StudioHeader() {
  const pathname = usePathname();
  const meta = getHeaderMeta(pathname);

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-8 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
      <div className="min-w-0">
        <div className="flex items-center gap-3 text-sm text-slate-500">
          <Link href="/studio" className="transition-colors hover:text-slate-900 dark:hover:text-slate-300">
            Studio
          </Link>
          <span className="material-symbols-outlined !text-xs">chevron_right</span>
          <span className="truncate font-medium tracking-tight text-slate-900 dark:text-slate-100">
            {meta.section}
          </span>
        </div>
        <p className="mt-1 text-xs text-slate-500">{meta.description}</p>
      </div>

      <div className="hidden items-center gap-2 md:flex">
        <Link
          href="/learning"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <span className="material-symbols-outlined !text-[16px]">open_in_new</span>
          View Learning
        </Link>
      </div>
    </header>
  );
}
