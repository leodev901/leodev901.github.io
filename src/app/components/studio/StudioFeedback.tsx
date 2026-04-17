"use client";

import LoginTrigger from "@/app/components/auth/LoginTrigger";

export function StudioLoadingState({ message }: { message: string }) {
  return (
    <div className="flex min-h-[320px] items-center justify-center">
      <div className="rounded-2xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="material-symbols-outlined animate-pulse">sync</span>
        </div>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{message}</p>
      </div>
    </div>
  );
}

export function StudioErrorState({ message }: { message: string }) {
  return (
    <div className="flex min-h-[320px] items-center justify-center">
      <div className="max-w-md rounded-2xl border border-red-200 bg-red-50 px-8 py-10 text-center shadow-sm dark:border-red-900/40 dark:bg-red-950/20">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-300">
          <span className="material-symbols-outlined">error</span>
        </div>
        <p className="text-sm font-medium text-red-700 dark:text-red-200">{message}</p>
      </div>
    </div>
  );
}

export function StudioLoginRequired({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-[420px] items-center justify-center">
      <div className="max-w-lg rounded-2xl border border-slate-200 bg-white px-8 py-10 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
          <span className="material-symbols-outlined">lock</span>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{description}</p>
        <div className="mt-6">
          <LoginTrigger className="inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary/90">
            <span className="material-symbols-outlined mr-2 text-[18px]">login</span>
            로그인
          </LoginTrigger>
        </div>
      </div>
    </div>
  );
}
