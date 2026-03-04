"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function Header() {
    const pathname = usePathname();
    const { theme, setTheme, resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const navLinks = [
        { name: "Home", href: "/", icon: "home" },
        { name: "About", href: "/about", icon: "person" },
        { name: "Portfolio", href: "/portfolio", icon: "work" },
        { name: "Projects", href: "/projects", icon: "history" },
        { name: "Blog", href: "/blog", icon: "article" },
        { name: "Scrap", href: "/scrap", icon: "bookmark" },
    ];

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
                <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 lg:px-8">
                    <Link className="flex items-center gap-2 group z-50" href="/">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-500/20 dark:text-blue-400 dark:group-hover:bg-blue-500 dark:group-hover:text-white">
                            <span className="material-symbols-outlined text-xl">terminal</span>
                        </div>
                        <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">leodev901</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6">
                        <nav className="flex items-center gap-8 mr-4">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-blue-600 dark:after:bg-blue-500 after:transition-transform after:duration-300 ${isActive
                                            ? "text-slate-900 dark:text-slate-100 after:scale-x-100"
                                            : "text-slate-500 dark:text-slate-400 after:scale-x-0 hover:after:scale-x-100"
                                            }`}
                                    >
                                        {link.name}
                                    </Link>
                                );
                            })}
                            <Link
                                href="/contact"
                                className={`text-sm font-medium transition-colors hover:text-blue-600 dark:hover:text-blue-400 relative py-1 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-blue-600 dark:after:bg-blue-500 after:transition-transform after:duration-300 ${pathname.startsWith('/contact')
                                    ? "text-slate-900 dark:text-slate-100 after:scale-x-100"
                                    : "text-slate-500 dark:text-slate-400 after:scale-x-0 hover:after:scale-x-100"
                                    }`}
                            >
                                Contact
                            </Link>
                        </nav>

                        {/* Dark Mode Toggle - Desktop */}
                        {mounted && (
                            <button
                                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                                className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white transition-colors"
                                aria-label="Toggle Dark Mode"
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    {resolvedTheme === "dark" ? "light_mode" : "dark_mode"}
                                </span>
                            </button>
                        )}
                    </div>

                    {/* Mobile Controls */}
                    <div className="flex items-center gap-2 md:hidden z-50">
                        {/* Dark Mode Toggle - Mobile */}
                        {mounted && (
                            <button
                                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                                className="flex h-10 w-10 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                                aria-label="Toggle Dark Mode"
                            >
                                <span className="material-symbols-outlined text-[20px]">
                                    {resolvedTheme === "dark" ? "light_mode" : "dark_mode"}
                                </span>
                            </button>
                        )}

                    </div>
                </div>
            </header>

            {/* Mobile Bottom Navigation Bar */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/90 pb-safe">
                <div className="flex h-[64px] items-center justify-around px-2">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${isActive
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-slate-500 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-300"
                                    }`}
                            >
                                <span className="material-symbols-outlined text-[24px]">
                                    {link.icon}
                                </span>
                                <span className="text-[10px] font-medium leading-none">{link.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </nav>

            {/* Global style trick to prevent content from hiding behind bottom nav */}
            <style jsx global>{`
            @media (max-width: 767px) {
                body {
                    padding-bottom: 64px;
                    padding-bottom: calc(64px + env(safe-area-inset-bottom));
                }
            }
        `}</style>
        </>
    );
}
