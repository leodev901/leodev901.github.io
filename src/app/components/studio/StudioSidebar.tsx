"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/app/lib/supabase-browser";
import LogoutButton from "@/app/components/auth/LogoutButton";
import LoginTrigger from "@/app/components/auth/LoginTrigger";

type NavItem = {
  href: string;
  label: string;
  icon: string;
  isActive: (pathname: string) => boolean;
};

const primaryNavItems: NavItem[] = [
  {
    href: "/studio",
    label: "Workspace",
    icon: "space_dashboard",
    isActive: (pathname) => pathname === "/studio",
  },
  {
    href: "/studio/blog",
    label: "Blog Posts",
    icon: "edit_note",
    isActive: (pathname) => pathname.startsWith("/studio/blog") || pathname.startsWith("/studio/editor"),
  },
  {
    href: "/studio/scrap",
    label: "Scraps",
    icon: "delete_outline",
    isActive: (pathname) => pathname.startsWith("/studio/scrap"),
  },
];

const adminNavItems: NavItem[] = [
  {
    href: "/studio/settings",
    label: "Settings",
    icon: "settings",
    isActive: (pathname) => pathname === "/studio/settings",
  },
];

function getNavItemClass(isActive: boolean) {
  return `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
    isActive
      ? "bg-primary/10 text-primary"
      : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
  }`;
}

export default function StudioSidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data: { user: currentUser } }) => {
      setUser(currentUser);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <aside className="fixed z-20 flex h-full w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary p-1.5 text-white">
            <span className="material-symbols-outlined">layers</span>
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-slate-900 dark:text-slate-100">
              CMS Studio
            </h1>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
              Search Workspace
            </p>
          </div>
        </div>
        <Link
          href="/"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <span className="material-symbols-outlined !text-[16px]">arrow_outward</span>
          Public Site
        </Link>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {primaryNavItems.map((item) => {
          const isActive = item.isActive(pathname);

          return (
            <Link key={item.href} href={item.href} className={getNavItemClass(isActive)}>
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}

        <div className="px-3 pb-2 pt-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
          Admin
        </div>

        {adminNavItems.map((item) => {
          const isActive = item.isActive(pathname);

          return (
            <Link key={item.href} href={item.href} className={getNavItemClass(isActive)}>
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {user ? (
        <div className="border-t border-slate-100 p-4 dark:border-slate-800">
          <div className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-300 dark:bg-slate-700">
              <span className="material-symbols-outlined text-sm text-slate-500 dark:text-slate-400">
                person
              </span>
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-xs font-semibold text-slate-900 dark:text-slate-100">
                {user.email?.split("@")[0]}
              </p>
              <p className="truncate text-[10px] text-slate-500">{user.email}</p>
            </div>

            <LogoutButton className="flex items-center justify-center rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20">
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </LogoutButton>
          </div>
        </div>
      ) : (
        <div className="border-t border-slate-100 p-4 dark:border-slate-800">
          <LoginTrigger className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary/10 p-2 text-sm font-bold text-primary transition-all hover:bg-primary hover:text-white">
            <span className="material-symbols-outlined text-[18px]">login</span>
            로그인
          </LoginTrigger>
        </div>
      )}
    </aside>
  );
}
