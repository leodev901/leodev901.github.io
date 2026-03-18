import Link from "next/link";
import { supabase } from "../lib/supabase";



export const metadata = {
    title: "Leo Studio - Management Dashboard",
};



export default async function StudioDashboard() {

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return (
            <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark">
                <div className="layout-container flex h-full grow flex-col">
                    <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Please log in to access the studio</h1>
                            <Link href="/learning/auth" className="mt-4 inline-block px-4 py-2 bg-primary text-white rounded-lg">Log in</Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden bg-background-light dark:bg-background-dark">
            <div className="layout-container flex h-full grow flex-col">
                {/* Top Navigation Bar */}
                <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-3 lg:px-10">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="flex items-center gap-3 text-primary">
                            <div className="size-8 flex items-center justify-center bg-primary/10 rounded-lg">
                                <span className="material-symbols-outlined text-primary">terminal</span>
                            </div>
                            <h2 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">Leo Studio</h2>
                        </Link>
                        <label className="hidden md:flex flex-col min-w-64 !h-10 max-w-md">
                            <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-slate-100 dark:bg-slate-800 border border-transparent focus-within:border-primary/50 transition-all">
                                <div className="text-slate-500 flex items-center justify-center pl-4 rounded-l-lg" data-icon="search">
                                    <span className="material-symbols-outlined text-[20px]">search</span>
                                </div>
                                <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-0 border-none bg-transparent h-full placeholder:text-slate-500 px-3 text-sm font-normal" placeholder="Search content, tags, or projects..." defaultValue="" />
                            </div>
                        </label>
                    </div>
                    <div className="flex flex-1 justify-end gap-4 items-center">
                        <nav className="hidden lg:flex items-center gap-6 mr-4">
                            <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="#">Dashboard</a>
                            <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="#">Analytics</a>
                            <a className="text-slate-600 dark:text-slate-400 text-sm font-medium hover:text-primary transition-colors" href="#">Settings</a>
                        </nav>
                        <div className="flex gap-2">
                            <Link href="/studio/editor" className="flex min-w-[120px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold transition-all hover:bg-primary/90 shadow-sm">
                                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                                <span className="truncate">새 블로그 글</span>
                            </Link>
                            <button className="flex min-w-[100px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-10 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-bold transition-all hover:bg-slate-50 dark:hover:bg-slate-700">
                                <span className="material-symbols-outlined text-[18px]">bookmark</span>
                                <span className="truncate">새 스크랩</span>
                            </button>
                        </div>
                        <div className="ml-2 bg-slate-200 dark:bg-slate-700 rounded-full size-10 border-2 border-white dark:border-slate-800 overflow-hidden">
                            <div className="w-full h-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center">
                                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">person</span>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="flex-1 px-6 py-8 lg:px-40">
                    <div className="layout-content-container flex flex-col max-w-6xl mx-auto flex-1 gap-6">
                        {/* Page Header & Tabs */}
                        <div className="flex flex-col gap-4">
                            <div className="flex items-end justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Content Management</h1>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Manage your technical writings and collected resources.</p>
                                </div>
                            </div>
                            <div className="border-b border-slate-200 dark:border-slate-800">
                                <div className="flex gap-8">
                                    <a className="flex items-center gap-2 border-b-2 border-primary text-primary pb-3 pt-2 transition-all" href="#">
                                        <span className="text-sm font-bold">Draft</span>
                                        <span className="bg-primary/10 px-2 py-0.5 rounded-full text-[11px]">3</span>
                                    </a>
                                    <a className="flex items-center gap-2 border-b-2 border-transparent text-slate-500 dark:text-slate-400 pb-3 pt-2 hover:text-slate-700 dark:hover:text-slate-200 transition-all" href="#">
                                        <span className="text-sm font-bold">Published</span>
                                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-[11px]">12</span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Content Table Container */}
                        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                                            <th className="px-6 py-4 text-slate-600 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider w-[45%]">Title</th>
                                            <th className="px-6 py-4 text-slate-600 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Type</th>
                                            <th className="px-6 py-4 text-slate-600 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Tags</th>
                                            <th className="px-6 py-4 text-slate-600 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Last Updated</th>
                                            <th className="px-6 py-4 text-slate-600 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Status</th>
                                            <th className="px-6 py-4 text-slate-600 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col gap-1">
                                                    <a className="text-slate-900 dark:text-white font-semibold text-sm hover:text-primary transition-colors" href="#">System Design Deep Dive: Scaling to 1M Users</a>
                                                    <span className="text-xs text-slate-400 truncate max-w-md">Exploring the transition from monolithic to microservices architecture...</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                                                    Blog
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-wrap gap-1.5">
                                                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-medium border border-slate-200 dark:border-slate-700">Architecture</span>
                                                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-medium border border-slate-200 dark:border-slate-700">Backend</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-slate-500 dark:text-slate-400 text-xs font-medium">
                                                2023-10-24
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <span className="size-2 rounded-full bg-amber-400"></span>
                                                    <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Draft</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <button className="text-slate-400 hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined text-[20px]">edit_note</span>
                                                </button>
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col gap-1">
                                                    <a className="text-slate-900 dark:text-white font-semibold text-sm hover:text-primary transition-colors" href="#">React 19 Concurrent Rendering Performance Tips</a>
                                                    <span className="text-xs text-slate-400 truncate max-w-md">Optimizing heavy UI components using the new hook patterns...</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                                                    Blog
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-wrap gap-1.5">
                                                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-medium border border-slate-200 dark:border-slate-700">Frontend</span>
                                                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-medium border border-slate-200 dark:border-slate-700">Performance</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-slate-500 dark:text-slate-400 text-xs font-medium">
                                                2023-10-20
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <span className="size-2 rounded-full bg-amber-400"></span>
                                                    <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Draft</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <button className="text-slate-400 hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined text-[20px]">edit_note</span>
                                                </button>
                                            </td>
                                        </tr>

                                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                                            <td className="px-6 py-5">
                                                <div className="flex flex-col gap-1">
                                                    <a className="text-slate-900 dark:text-white font-semibold text-sm hover:text-primary transition-colors" href="#">K8s Cluster Setup Best Practices (Self-hosted)</a>
                                                    <span className="text-xs text-slate-400 truncate max-w-md">A curated list of networking and security configurations for production...</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-800">
                                                    Scrap
                                                </span>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex flex-wrap gap-1.5">
                                                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-medium border border-slate-200 dark:border-slate-700">DevOps</span>
                                                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-medium border border-slate-200 dark:border-slate-700">K8s</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-slate-500 dark:text-slate-400 text-xs font-medium">
                                                2023-10-18
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center gap-2">
                                                    <span className="size-2 rounded-full bg-amber-400"></span>
                                                    <span className="text-xs text-slate-600 dark:text-slate-400 font-medium">Draft</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-right">
                                                <button className="text-slate-400 hover:text-primary transition-colors">
                                                    <span className="material-symbols-outlined text-[20px]">edit_note</span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Empty State / Pagination Placeholder */}
                            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center">
                                <span className="text-xs text-slate-500 dark:text-slate-400">Showing 3 drafts</span>
                                <div className="flex gap-2">
                                    <button className="p-1 rounded border border-slate-200 dark:border-slate-700 text-slate-400 cursor-not-allowed">
                                        <span className="material-symbols-outlined text-[18px]">chevron_left</span>
                                    </button>
                                    <button className="p-1 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">chevron_right</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Floating Action Button for Mobile */}
                        <div className="fixed bottom-8 right-8 lg:hidden">
                            <Link href="/studio/editor" className="flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-xl hover:scale-105 active:scale-95 transition-transform">
                                <span className="material-symbols-outlined text-[28px]">add</span>
                            </Link>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="px-6 py-6 lg:px-40 border-t border-slate-200 dark:border-slate-800 text-center">
                    <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">© 2024 Leo Studio — Professional Content Management</p>
                </footer>
            </div>
        </div>
    );
}
