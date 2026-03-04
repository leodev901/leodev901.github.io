import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 w-full">
      <div className="mx-auto max-w-[1200px] w-full px-6 lg:px-8 py-12 md:py-24 flex flex-col gap-24">
        <section className="flex flex-col gap-8 max-w-4xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 w-fit">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            Available for new projects
          </div>
          <div className="space-y-4">
            <h1 className="text-[40px] md:text-[56px] font-extrabold tracking-tight leading-[1.1] mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 animate-gradient-x bg-[length:200%_auto] break-keep">
              엔터프라이즈 아키텍처부터 AI 에이전트까지, 안정성과 지능을 융합합니다.
            </h1>
            <p className="text-[18px] md:text-[20px] text-slate-600 dark:text-slate-400 leading-relaxed mb-10 max-w-2xl animate-fade-in-up break-keep">
              모빌리티 도메인에서의 10년 차 풀스택/DevOps 역량과 최신 기반 AI Agent 구현 기술을 결합하여, 실제 프로덕션 환경에서 견고하게 작동하는 지능형 시스템을 설계합니다.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/contact" className="inline-flex h-12 items-center justify-center rounded-full bg-blue-600 px-8 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200">
                Contact Me
              </Link>
              <Link href="/portfolio" className="inline-flex h-12 items-center justify-center rounded-full border border-slate-200 bg-white px-8 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700">
                포트폴리오 보기
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-slate-50/30 dark:bg-slate-900/30 py-24 border-y border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl border border-slate-100 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] hover:border-blue-500/30">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-400 transition-colors">
                <span className="material-symbols-outlined">settings_suggest</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">안정적인 엔터프라이즈 운영</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm break-keep">대규모 시스템 통합(SI), 데이터 마이그레이션, 계열사 분리(Carve-out) 등 엔터프라이즈 환경에서의 견고한 백엔드 아키텍처 수립 및 유지보수에 강점이 있습니다.</p>
            </div>
            <div className="group p-8 rounded-2xl border border-slate-100 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] hover:border-blue-500/30">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-400 transition-colors">
                <span className="material-symbols-outlined">hub</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Cloud MSA 아키텍처</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm break-keep">Azure Cloud 인프라와 Kubernetes(AKS), CI/CD 파이프라인을 구축하여 고가용성 마이크로서비스(MSA)를 성공적으로 배포 및 운영합니다.</p>
            </div>
            <div className="group p-8 rounded-2xl border border-slate-100 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] hover:border-blue-500/30">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-400 transition-colors">
                <span className="material-symbols-outlined">psychology</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">SKT AI Agent 개발</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm break-keep">LangGraph 워크플로우를 기반으로 Private LLM 환경에서 작동하는 엔터프라이즈 AI 스킬(MCP 서버, RAG 파이프라인)을 기획하고 개발합니다.</p>
            </div>
          </div>
        </section>

        <section className="flex flex-col gap-8 border-t border-slate-100 pt-16 dark:border-slate-800">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">주요 포트폴리오</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-400">Selected works demonstrating technical depth and product impact.</p>
            </div>
            <Link href="/portfolio" className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-blue-700 transition-colors">
              더 보기 <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "SK 'A.Biz' Agent Builder",
                desc: "엔터프라이즈 환경에서의 AI Agent(LangGraph) 흐름 최적화 및 Microsoft 365 연동 MCP 서버 핵심 기능 개발.",
                icon: "robot_2",
                tags: ["Python", "FastAPI", "PostgreSQL", "LangChain"]
              },
              {
                title: "SK렌터카 차세대 MSA 시스템",
                desc: "Azure Cloud 기반의 마이크로서비스 전환 프로젝트. 단기렌탈 및 결제/수납 서비스 백엔드 전담.",
                icon: "cloud_sync",
                tags: ["Java", "Spring Boot", "Kafka", "Kubernetes"]
              },
              {
                title: "Carve-out 및 시스템 통합",
                desc: "양사 분리 및 흡수 합병 과정에서의 대규모 레거시 ERP/데이터 마이그레이션 전략 구성 및 무결점 오픈 달성.",
                icon: "database",
                tags: ["Oracle", "SQL", "Data Migration"]
              }
            ].map((project, idx) => (
              <div key={idx} className="group flex flex-col rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.25)] dark:border-slate-700 dark:bg-slate-800/50">
                <div className="aspect-video w-full rounded-t-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden transition-colors duration-300 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-900/20">
                  <div className="text-slate-400">
                    <span className="material-symbols-outlined text-6xl opacity-20">{project.icon}</span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                    {project.desc}
                  </p>
                  <div className="mt-auto pt-6 flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center rounded-md bg-slate-50 px-2 py-1 text-xs font-medium text-slate-600 ring-1 ring-inset ring-slate-500/10 dark:bg-slate-900 dark:text-slate-400 dark:ring-slate-500/20">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 text-center md:hidden">
            <Link href="/portfolio" className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-blue-700 transition-colors">
              더 보기 <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>
        </section>

        <section className="flex flex-col lg:flex-row gap-16 border-t border-slate-100 pt-24 dark:border-slate-800">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Latest from Blog</h2>
              <Link href="/blog" className="text-sm font-medium text-slate-500 hover:text-blue-600">View all</Link>
            </div>
            <div className="space-y-8">
              <article className="group">
                <time className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Oct 24, 2024</time>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  <Link href="/blog#">The Rise of Agentic Workflows in Enterprise SaaS</Link>
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 line-clamp-2">Moving beyond simple automation to self-healing systems powered by Large Language Models.</p>
              </article>
              <article className="group">
                <time className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 block">Oct 12, 2024</time>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                  <Link href="/blog#">Scaling Python Backends to 100k Concurrent Users</Link>
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 line-clamp-2">Optimization techniques using Asyncio, UVLoop, and horizontal scaling strategies.</p>
              </article>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Tech Scraps</h2>
              <Link href="/scrap" className="text-sm font-medium text-slate-500 hover:text-blue-600">Explore lab</Link>
            </div>
            <div className="space-y-6">
              <div className="p-5 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-slate-400 text-xl">terminal</span>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">One-liner for optimizing Docker builds for heavy Python ML dependencies.</p>
                    <span className="text-[11px] text-slate-400 mt-2 block">#devops #docker #python</span>
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-slate-400 text-xl">lightbulb</span>
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Conceptual thought: Using Vector DBs as "Short-term Memory" for stateless agents.</p>
                    <span className="text-[11px] text-slate-400 mt-2 block">#ai #architecture</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
