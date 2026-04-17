"use client";

import React from "react";

export default function Contact() {
    const [copied, setCopied] = React.useState(false);
    const email = "admin@leodev901.onmicrosoft.com";

    const copyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <main className="flex-1 flex flex-col items-center py-12 px-4 md:px-10 lg:px-40 w-full">
            <div className="layout-content-container flex flex-col max-w-[1120px] mx-auto w-full flex-1 gap-12">
                <div className="flex flex-col gap-6 items-start">
                    <div className="flex flex-col gap-2">
                        <span className="text-primary font-bold tracking-wider uppercase text-sm">Get in touch</span>
                        <h1 className="text-slate-900 dark:text-white text-4xl md:text-[3.2rem] font-black leading-[1.08] tracking-[-0.033em]">
                            Let&apos;s Build Together
                        </h1>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-normal leading-relaxed max-w-[720px]">
                        Currently available for freelance projects and open to full-time opportunities. Whether you need a full-stack overhaul, an AI integration strategy, or just want to discuss the latest in tech, my inbox is open.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 w-full mt-4">
                    <div className="md:col-span-7 lg:col-span-8 flex flex-col gap-6 order-2 md:order-1">
                        <div className="p-8 lg:p-10 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 relative overflow-hidden">
                            <form className="flex flex-col gap-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="name">Name</label>
                                        <input className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" id="name" placeholder="John Doe" type="text" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="email">Email</label>
                                        <input className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" id="email" placeholder="john@example.com" type="email" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="subject">Subject</label>
                                    <div className="relative">
                                        <input className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all" id="subject" placeholder="Project Inquiry: AI Dashboard" type="text" />
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300" htmlFor="message">Message</label>
                                    <textarea className="w-full h-40 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none" id="message" placeholder="Tell me about your project, timeline, and goals..."></textarea>
                                </div>
                                <div className="pt-2 flex items-center justify-between">
                                    <p className="text-sm text-slate-500 dark:text-slate-400 hidden sm:block">Typical response time: 24h</p>
                                    <button className="flex items-center justify-center gap-2 rounded-xl bg-primary hover:bg-blue-600 text-white font-bold px-8 py-3.5 transition-all shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer" type="button">
                                        <span>Send Message</span>
                                        <span className="material-symbols-outlined text-sm">send</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="md:col-span-5 lg:col-span-4 flex flex-col gap-8 order-1 md:order-2">
                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">How I Work</h3>
                            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800">
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm mb-4">
                                    I specialize in building scalable web applications and integrating AI solutions. My approach is collaborative and transparent.
                                </p>
                                <ul className="flex flex-col gap-3">
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">check_circle</span>
                                        <span className="text-sm text-slate-700 dark:text-slate-200 font-medium">Clear scoping &amp; milestones</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">check_circle</span>
                                        <span className="text-sm text-slate-700 dark:text-slate-200 font-medium">Regular async updates</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">check_circle</span>
                                        <span className="text-sm text-slate-700 dark:text-slate-200 font-medium">Code ownership transfer</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Contact Details</h3>
                            <div className="group relative p-1 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 flex items-center pr-2 transition-all hover:border-primary/50 cursor-pointer" onClick={copyEmail}>
                                <div className="size-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                                    <span className="material-symbols-outlined">mail</span>
                                </div>
                                <div className="flex flex-col px-3 flex-1 overflow-hidden">
                                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{copied ? "Copied!" : "Email"}</span>
                                    <span className="text-sm md:text-base font-bold text-slate-900 dark:text-white truncate">{email}</span>
                                </div>
                                <div className={`size-8 flex items-center justify-center rounded-lg bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 transition-colors ${copied ? 'text-green-500' : 'group-hover:text-primary'}`}>
                                    <span className="material-symbols-outlined text-lg">{copied ? "check" : "content_copy"}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <a className="p-4 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group" href="https://linkedin.com" target="_blank" rel="noreferrer">
                                    <div className="size-10 rounded-full bg-[#0077b5]/10 text-[#0077b5] flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path></svg>
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">LinkedIn</span>
                                </a>
                                <a className="p-4 rounded-xl bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all group" href="https://github.com" target="_blank" rel="noreferrer">
                                    <div className="size-10 rounded-full bg-slate-900/10 text-slate-900 dark:bg-white/10 dark:text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.419-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path></svg>
                                    </div>
                                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">GitHub</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
