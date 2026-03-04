export const metadata = {
    title: "About | Leo - Senior Full-Stack & AI Engineer",
};

export default function About() {
    return (
        <main className="flex-grow flex flex-col items-center justify-start py-12 px-4 md:px-10 w-full">
            <div className="w-full max-w-[860px] mx-auto flex flex-col gap-12 animate-fade-in">
                <section className="flex flex-col md:flex-row gap-10 items-start md:items-center py-4">
                    <div className="relative flex-shrink-0 flex flex-col items-center">
                        <div className="relative">
                            <div className="w-32 h-32 md:w-48 md:h-48 rounded-2xl bg-slate-200 dark:bg-slate-800 overflow-hidden border-4 border-white dark:border-slate-900 shadow-xl">
                                {/* Using standard img tag for simplicity, can be updated to next/image later if preferred */}
                                <img alt="임진수 프로필 사진" className="w-full h-full object-cover" src="/files/profile_image.png" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-[#f5f7f8] dark:border-[#0f1823]"></div>
                        </div>
                        <span className="mt-4 text-2xl font-black tracking-[0.2em] text-slate-900 dark:text-white">임 진 수</span>
                    </div>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase">#SeniorBackend</span>
                            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-wide uppercase">#AIAgent</span>
                        </div>
                        <h1 className="text-slate-900 dark:text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] break-keep">
                            대기업 엔터프라이즈 개발·운영 경험 기반 AI Agent 개발자
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400 text-lg md:text-xl font-normal leading-relaxed break-keep">
                            저는 10년간 대기업 IT 조직에서 백엔드(Java, Spring)·프론트엔드·클라우드 운영(Azure, K8s, DevOps)을 개발·운영해 왔고, 최근에는 LLM 기반 AI Agent 서비스 개발로 확장했습니다. 기술 트렌드와 비즈니스 로직을 함께 이해하며 현업과 협업하고, PM·PL로서 안정성과 혁신을 갖춘 시스템 가치를 창출합니다.
                        </p>
                    </div>
                </section>

                <hr className="border-slate-200 dark:border-slate-800" />

                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="material-symbols-outlined text-primary font-bold">work</span>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Professional Journey</h3>
                    </div>
                    <div className="relative border-l-2 border-slate-200 dark:border-slate-800 ml-3 space-y-12 pb-4">
                        <div className="relative pl-10">
                            <span className="absolute -left-[13px] top-1 h-6 w-6 rounded-full bg-primary border-4 border-white dark:border-slate-900 z-10"></span>
                            <div className="flex flex-col mb-4">
                                <span className="text-sm font-bold text-primary">2025.11 — 현재</span>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">인포매니아·프리랜서 | AI Agent 개발자</h3>
                                <p className="text-sm text-slate-500 font-medium">인포매니아 (SK AX 파트너)</p>
                            </div>
                            <ul className="list-disc list-outside ml-4 space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                <li>SK 그룹 내 엔터프라이즈 AI 에이전트 서비스 'A.Biz' 프로젝트의 백엔드 및 MCP(Model Context Protocol) 서버 개발 리딩.</li>
                                <li>강력한 보안이 요구되는 사내 폐쇄망 환경 요건에 맞추어 외부 LLM 의존성을 제거하고 내부 모델 연동 인프라로 전환.</li>
                                <li>Microsoft Graph API 기반으로 사내 Office 365(SharePoint 문서 등) 정보를 자동 수집하고 동기화하는 엔터프라이즈 특화 RAG 파이프라인 구현.</li>
                            </ul>
                        </div>
                        <div className="relative pl-10">
                            <span className="absolute -left-[13px] top-1 h-6 w-6 rounded-full bg-slate-300 dark:bg-slate-700 border-4 border-white dark:border-slate-900 z-10"></span>
                            <div className="flex flex-col mb-4">
                                <span className="text-sm font-bold text-slate-500">2020.01 — 2025.10 (5년 10개월)</span>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">SK렌터카 | 시스템 개발·운영 / IT 운영·기획 (BA·PM·PL)</h3>
                            </div>
                            <ul className="list-disc list-outside ml-4 space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                <li>Java/Spring 기반 백엔드 API와 프론트엔드 요구사항 개발, 데이터 모델 커스텀 설계 및 SQL 최적화를 통한 성능/안정성 지속 향상.</li>
                                <li>PM/PL 및 BA 역할로 스텝 업 하여, 전사 차세대 전환, 양사 시스템 통합 방안 수립, 계열사 분리(Carve-out) 등 수백억 원대 대규모 SI 프로젝트 리딩 및 안정화.</li>
                                <li>Azure Cloud 위에서 Kubernetes(AKS) 기반 MSA 아키텍처 및 Azure DevOps CI/CD 자동화 파이프라인을 고도화하여 클라우드 전환 가속화.</li>
                                <li>ITGC 및 ISMS-P 감사 대응 전담자로서 Jira/Confluence 중심의 협업 프로세스와 전산 통제 체계(ITSM)를 전사에 도입/정착.</li>
                            </ul>
                        </div>
                        <div className="relative pl-10">
                            <span className="absolute -left-[13px] top-1 h-6 w-6 rounded-full bg-slate-300 dark:bg-slate-700 border-4 border-white dark:border-slate-900 z-10"></span>
                            <div className="flex flex-col mb-4">
                                <span className="text-sm font-bold text-slate-500">2015.12 — 2019.12 (4년 1개월)</span>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">AJ렌터카 | 시스템 풀스택 개발자</h3>
                            </div>
                            <ul className="list-disc list-outside ml-4 space-y-2 text-slate-600 dark:text-slate-400 text-sm">
                                <li>렌터카·모빌리티 비즈니스를 위한 B2C/B2B 프로덕트의 백엔드 로직부터 프론트엔드 화면, 사내 DB까지 밀착 관리하는 Full-Stack 개발자로 활약.</li>
                                <li>노후화 된 레거시 시스템을 전면 재구축하는 차세대 프로젝트에 원년 멤버로 합류하여, 현업 인터뷰(분석)부터 설계·구현·오픈 전 과정을 완주.</li>
                                <li>수납 결제, 회계 처리, 예약 등 비즈니스의 근간이 되는 핵심 도메인의 데이터 흐름을 깊숙이 파악.</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="material-symbols-outlined text-primary font-bold">bolt</span>
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Technical Expertise</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">database</span> 백엔드 개발 & DB
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['Java / Spring Boot', 'Python / FastAPI', 'MyBatis / JPA', 'Oracle', 'PostgreSQL', 'MySQL'].map(skill => (
                                    <span key={skill} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-medium">{skill}</span>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">psychology</span> AI & LLM
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['LangChain', 'LangGraph', 'OpenAI', 'RAG / Embedding', 'Vector DB', 'Prompt Engineering'].map(skill => (
                                    <span key={skill} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-medium">{skill}</span>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">cloud</span> 인프라 & DevOps
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['Azure Cloud', 'Kubernetes (AKS)', 'Docker', 'Linux', 'Helm / ArgoCD', 'DataDog'].map(skill => (
                                    <span key={skill} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-medium">{skill}</span>
                                ))}
                            </div>
                        </div>
                        <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                            <h3 className="text-slate-900 dark:text-white font-bold mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">construction</span> 프론트엔드 & 협업
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {['React / Next.js', 'HTML5 / Javascript', 'Jira / Confluence', 'Git Hub', 'Excel (BA/PM 툴)'].map(skill => (
                                    <span key={skill} className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm font-medium">{skill}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-slate-200 dark:border-slate-800" />

                <section className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <a href="https://github.com/leodev901" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 rounded-2xl bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 group hover:border-slate-400 dark:hover:border-slate-500">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 transition-colors">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[22px] h-[22px]">
                                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">GitHub</h4>
                                    <p className="text-[11px] text-slate-600 dark:text-slate-400 uppercase font-bold tracking-wider">Open Source</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </a>
                        <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 rounded-2xl bg-blue-100 dark:bg-blue-900/60 border border-blue-200 dark:border-blue-800 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 group hover:border-blue-400 dark:hover:border-blue-500">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-blue-600 flex items-center justify-center text-white transition-colors">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] mb-0.5">
                                        <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                                    </svg>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">LinkedIn</h4>
                                    <p className="text-[11px] text-blue-700 dark:text-blue-300 uppercase font-bold tracking-wider">Professional</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-blue-500 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 group hover:border-zinc-400 dark:hover:border-zinc-500">
                            <div className="flex items-center gap-3">
                                <div className="size-10 rounded-full bg-zinc-500 flex items-center justify-center text-white transition-colors">
                                    <span className="material-symbols-outlined">person</span>
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">Remember</h4>
                                    <p className="text-[11px] text-zinc-600 dark:text-zinc-400 uppercase font-bold tracking-wider">Career Hub</p>
                                </div>
                            </div>
                            <span className="material-symbols-outlined text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </a>
                    </div>
                </section>

                <div className="flex flex-col items-center justify-center py-10 gap-6 border-t border-slate-200 dark:border-slate-800 mt-4">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center">Ready to work together?</h3>
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <a href="/files/임진수_이력서_경력서.pdf" download className="flex items-center justify-center gap-2 h-12 px-8 bg-primary text-white hover:bg-blue-700 rounded-xl font-bold transition-all shadow-lg hover:shadow-primary/25 cursor-pointer">
                            <span className="material-symbols-outlined">download</span>
                            이력서 다운로드
                        </a>
                        <a className="flex items-center justify-center gap-2 h-12 px-8 bg-white dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl font-bold transition-all cursor-pointer" href="/contact">
                            <span className="material-symbols-outlined">mail</span>
                            Contact Me
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
