import React from "react";
import Link from "next/link";

export default function LearningLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-600 text-white shadow-md">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex min-h-16 flex-col gap-3 py-3 lg:flex-row lg:items-center lg:justify-between lg:py-0">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-8">
              <Link href="/learning" className="text-xl font-bold transition hover:text-indigo-200">
                Learning Lab
              </Link>

              <div className="flex flex-wrap gap-2 lg:gap-1">
                <Link
                  href="/learning/todo"
                  className="rounded-md px-3 py-2 text-sm font-medium transition hover:bg-indigo-500"
                >
                  Todo
                </Link>
                <Link
                  href="/learning/board"
                  className="rounded-md px-3 py-2 text-sm font-medium transition hover:bg-indigo-500"
                >
                  File Board
                </Link>
                <Link
                  href="/learning/board2"
                  className="rounded-md px-3 py-2 text-sm font-medium text-green-200 transition hover:bg-indigo-500"
                >
                  DB Board
                </Link>
                <Link
                  href="/learning/realtimesub"
                  className="rounded-md px-3 py-2 text-sm font-medium text-pink-200 transition hover:bg-indigo-500"
                >
                  Realtime
                </Link>
                <Link
                  href="/learning/sse"
                  className="rounded-md px-3 py-2 text-sm font-medium text-emerald-200 transition hover:bg-indigo-500"
                >
                  AI Stream UI
                </Link>
                <Link
                  href="/learning/storage"
                  className="rounded-md px-3 py-2 text-sm font-medium text-orange-200 transition hover:bg-indigo-500"
                >
                  Storage
                </Link>
                <Link
                  href="/learning/auth"
                  className="rounded-md px-3 py-2 text-sm font-medium text-violet-200 transition hover:bg-indigo-500"
                >
                  Auth
                </Link>
                <Link
                  href="/learning/blog"
                  className="rounded-md px-3 py-2 text-sm font-medium text-cyan-200 transition hover:bg-indigo-500"
                >
                  Blog Lab
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Link
                href="/studio"
                className="inline-flex items-center gap-2 rounded-lg bg-white/12 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                <span className="material-symbols-outlined !text-[18px]">dashboard</span>
                Open Studio
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="w-full">{children}</main>
    </div>
  );
}
