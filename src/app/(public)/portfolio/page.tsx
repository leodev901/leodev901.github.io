import Link from "next/link";

export const metadata = {
    title: "포트폴리오 | Leo - Senior Full-Stack & AI Engineer",
};

export default function Projects() {
    return (
        <main className="flex-1">
            <div className="mx-auto flex w-full max-w-7xl flex-col px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-12 flex flex-col gap-4">
                    <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white sm:text-5xl">포트폴리오</h1>
                    <p className="max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                        Selected works showcasing AI integration, scalable architecture, and full-stack engineering.
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">

                    <Link href="/portfolio/ai-meeting-agent" className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                        <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                <div className="w-full h-full bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col">
                                    {/* Mock Diagram UI */}
                                    <div className="h-8 border-b border-slate-100 dark:border-slate-700 flex items-center px-3 gap-2">
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                                        </div>
                                    </div>
                                    <div className="flex flex-1">
                                        <div className="w-16 border-r border-slate-100 dark:border-slate-700 p-2 hidden sm:flex flex-col items-center gap-3">
                                            <div className="w-8 h-8 rounded bg-primary/20"></div>
                                            <div className="w-8 h-8 rounded bg-slate-100 dark:bg-slate-700"></div>
                                        </div>
                                        <div className="flex-1 p-3 flex gap-3">
                                            <div className="flex-[2] flex flex-col gap-2">
                                                <div className="h-8 w-32 bg-slate-100 dark:bg-slate-700 rounded mb-2"></div>
                                                <div className="flex-1 bg-slate-50 dark:bg-slate-800/50 rounded border border-slate-100 dark:border-slate-700 relative">
                                                    <div className="absolute top-4 left-4 right-4 h-8 bg-blue-100/50 dark:bg-blue-900/20 rounded border-l-4 border-primary flex items-center px-2 text-[8px] text-primary font-medium">10:00 AM - Sprint Planning</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col p-6 sm:p-8">
                            <div className="mb-4">
                                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">AI 회의실 예약 에이전트</h3>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">자연어 처리를 통한 사내 회의실 예약 자동화 시스템</p>
                            </div>
                            <div className="mb-6 flex-1">
                                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">check_circle</span>
                                        <span>LangGraph 기반 멀티 에이전트 설계로 복잡한 의도 파악</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">check_circle</span>
                                        <span>RAG 파이프라인 구축을 통한 사내 규정 및 예약 현황 실시간 조회</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                                {['Python', 'LangChain', 'FastAPI', 'PostgreSQL'].map(tag => (
                                    <span key={tag} className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </Link>

                    <Link href="/portfolio/msa-architecture" className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                        <div className="aspect-video w-full overflow-hidden bg-slate-900 relative">
                            <div className="absolute inset-0 p-4 flex flex-col gap-2">
                                <div className="grid grid-cols-3 gap-2 h-full">
                                    <div className="col-span-2 bg-slate-800 rounded border border-slate-700 p-2 flex flex-col gap-1">
                                        <div className="flex justify-between items-center">
                                            <div className="w-16 h-2 bg-slate-600 rounded"></div>
                                            <div className="text-[8px] text-slate-400">99.9% uptime</div>
                                        </div>
                                    </div>
                                    <div className="col-span-1 flex flex-col gap-2">
                                        <div className="flex-1 bg-slate-800 rounded border border-slate-700 p-2 flex flex-col justify-center">
                                            <div className="text-[8px] text-slate-400 mb-1">RPS</div>
                                            <div className="text-sm font-bold text-white">4.2k</div>
                                        </div>
                                    </div>
                                    <div className="col-span-3 h-1/2 bg-slate-950 rounded border border-slate-800 p-2 font-mono text-[8px] text-slate-400 leading-tight">
                                        <div className="text-green-400">&gt; [INFO] Service discovery initiated...</div>
                                        <div className="text-blue-400">&gt; [DEBUG] Kafka consumer group rebalanced</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col p-6 sm:p-8">
                            <div className="mb-4">
                                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">엔터프라이즈급 MSA 백엔드 아키텍처</h3>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">대규모 트래픽 처리를 위한 확장 가능한 마이크로서비스 설계</p>
                            </div>
                            <div className="mb-6 flex-1">
                                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">check_circle</span>
                                        <span>Spring Cloud Gateway 및 Eureka를 이용한 서비스 디스커버리 구현</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">check_circle</span>
                                        <span>Kafka 이벤트 기반 아키텍처로 서비스 간 결합도 감소</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                                {['Java/Spring Boot', 'Kafka', 'Docker & K8s', 'Redis'].map(tag => (
                                    <span key={tag} className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </Link>

                    <Link href="/portfolio/news-bot" className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                        <div className="aspect-video w-full overflow-hidden bg-slate-50 dark:bg-slate-800 relative">
                            <div className="absolute inset-0 flex items-center justify-center p-6">
                                <div className="w-[80%] h-full bg-white dark:bg-slate-900 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden transform rotate-[-2deg] transition-transform group-hover:rotate-0">
                                    <div className="h-10 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between px-3">
                                        <div className="w-20 h-3 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
                                    </div>
                                    <div className="p-3 space-y-3">
                                        <div className="bg-indigo-50 dark:bg-indigo-900/20 p-2 rounded-lg border border-indigo-100 dark:border-indigo-800">
                                            <div className="flex gap-2 items-center mb-1.5">
                                                <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                                                <div className="w-16 h-2 bg-indigo-200 dark:bg-indigo-700 rounded"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col p-6 sm:p-8">
                            <div className="mb-4">
                                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">자동화 뉴스 큐레이션 봇</h3>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">사용자 관심사 기반 맞춤형 기술 뉴스 요약 및 전달 서비스</p>
                            </div>
                            <div className="mb-6 flex-1">
                                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">check_circle</span>
                                        <span>GPT-4 기반 뉴스 기사 요약 및 핵심 인사이트 추출</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">check_circle</span>
                                        <span>Vector DB를 활용한 중복 뉴스 필터링 및 유사도 분석</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                                {['Python', 'OpenAI API', 'Airflow', 'Pinecone'].map(tag => (
                                    <span key={tag} className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </Link>

                    <div className="group relative flex h-full min-h-[480px] flex-col overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50/50 p-6 transition-colors hover:border-primary/50 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800/20 dark:hover:bg-slate-800/40">
                        <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                            <div className="flex size-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 shadow-sm dark:bg-slate-800 dark:text-slate-500">
                                <span className="material-symbols-outlined text-3xl">add_circle</span>
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">More Projects</h3>
                                <p className="max-w-xs text-sm text-slate-500 dark:text-slate-400">Currently working on exciting new AI experiments and open source contributions.</p>
                            </div>
                            <button className="mt-4 text-sm font-semibold text-primary hover:text-primary/80">
                                Check Github Profile →
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-16 flex justify-center">
                    <a className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-primary transition-colors" href="https://github.com">
                        <span>View all repositories</span>
                        <span className="material-symbols-outlined text-lg">arrow_forward</span>
                    </a>
                </div>
            </div>
        </main>
    );
}
