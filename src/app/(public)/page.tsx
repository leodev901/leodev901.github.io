import Link from "next/link";

function renderFeaturedProjectPreview(project: {
  imageSrc: string;
  imageAlt: string;
  badge: string;
  badgeIcon: string;
  badgeClassName: string;
  imageClassName?: string;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-t-xl bg-slate-100 dark:bg-slate-800">
      <img
        src={project.imageSrc}
        alt={project.imageAlt}
        className={`h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105 ${project.imageClassName ?? ""}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/35 via-slate-900/5 to-transparent" />
      <div className={`absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] shadow-sm backdrop-blur ${project.badgeClassName}`}>
        <span className="material-symbols-outlined text-[12px]">{project.badgeIcon}</span>
        {project.badge}
      </div>
    </div>
  );
}

export default function Home() {
  const featuredProjects = [
    {
      title: "차량 매뉴얼 RAG 문서 검색 AI 어시스턴트",
      desc: "차량 매뉴얼 PDF를 하이브리드 RAG로 검색하고, 실시간 스트리밍으로 답변하는 차량 전용 AI 어시스턴트.",
      href: "https://author-delete-lecture-pointed.trycloudflare.com/",
      imageSrc: "/files/captures/차량_매뉴얼_통합.png",
      imageAlt: "차량 매뉴얼 AI 어시스턴트 통합 화면",
      badge: "Hybrid RAG",
      badgeIcon: "directions_car",
      badgeClassName: "border-emerald-200 bg-white/90 text-emerald-700 dark:border-emerald-800 dark:bg-slate-900/90 dark:text-emerald-300",
      tags: ["FastAPI", "Supabase", "Hybrid RAG", "SSE"]
    },
    {
      title: "멀티 에이전트 챗 서비스",
      desc: "검색, 기억, 내부 문서 참고 RAG, 다중 토론 등 최신 에이전트 기법이 통합된 AI 서비스.",
      href: "https://shots-fashion-processors-dining.trycloudflare.com/",
      imageSrc: "/files/captures/01_site.png",
      imageAlt: "멀티 에이전트 챗 서비스 화면",
      badge: "Multi-Agent",
      badgeIcon: "hub",
      badgeClassName: "border-indigo-200 bg-white/90 text-indigo-700 dark:border-indigo-800 dark:bg-slate-900/90 dark:text-indigo-300",
      imageClassName: "object-center",
      tags: ["LangChain", "RAG", "Redis", "Multi-Agent"]
    },
    {
      title: "헬스케어 AI 챗봇",
      desc: "환자의 병원 이용 편의를 높이기 위해 자연어 질의와 멀티턴 대화를 지원하는 의료 AI 챗봇.",
      href: "https://yards-appointed-primary-buy.trycloudflare.com/",
      imageSrc: "/portfolio-smart-home-abstract.png",
      imageAlt: "헬스케어 AI 챗봇 프로젝트 비주얼",
      badge: "Healthcare AI",
      badgeIcon: "health_and_safety",
      badgeClassName: "border-sky-200 bg-white/90 text-sky-700 dark:border-sky-800 dark:bg-slate-900/90 dark:text-sky-300",
      imageClassName: "object-center",
      tags: ["LangChain", "LangGraph", "LLM", "AI Chatbot"]
    }
  ];

  return (
    <main className="flex-1 w-full">
      <div className="mx-auto max-w-[1200px] w-full px-6 lg:px-8 py-12 md:py-24 flex flex-col gap-24">
        <section className="home-hero flex flex-col gap-7 max-w-[860px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 w-fit">
            <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            Available for new projects
          </div>
          <div className="space-y-4">
            <h1 className="max-w-[720px] text-[24px] md:text-[32px] lg:text-[36px] font-extrabold tracking-[-0.035em] leading-[1.24] mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-sky-500 animate-gradient-x bg-[length:200%_auto] break-keep">
              엔터프라이즈 운영부터 AI 에이전트까지, 비즈니스 프로세스에 AI를 결합합니다.
            </h1>
            <p className="text-[15px] md:text-[16px] text-slate-600 dark:text-slate-400 leading-7 mb-8 max-w-[700px] animate-fade-in-up break-keep">
              모빌리티 도메인에서의 10년 차 풀스택/DevOps 역량과 최신 기반 AI Agent 구현 기술을 결합하여, 실제 프로덕션 환경에서 견고하게 작동하는 지능형 시스템을 설계합니다.
            </p>
            <div className="flex flex-wrap gap-3 pt-3">
              <Link href="/about" className="inline-flex h-11 items-center justify-center rounded-full bg-blue-600 px-7 text-sm font-semibold text-white transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200">
                About Me
              </Link>
              <Link href="/portfolio" className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-7 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700">
                포트폴리오 보기
              </Link>
              <Link href="/projects" className="inline-flex h-11 items-center justify-center rounded-full border border-slate-200 bg-white px-7 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700">
                프로젝트 이력
              </Link>
              {/* PDF 문서 다운로드 버튼 */}
              <a 
                href="/files/임진수_AI_Agent_개발_포트폴리오.pdf" 
                download 
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-7 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700"
              >
                <span className="material-symbols-outlined text-[18px]">download</span>
                포트폴리오 문서 다운로드
              </a>
            </div>
          </div>
        </section>

        <section className="bg-slate-50/30 dark:bg-slate-900/30 py-20 border-y border-slate-100 dark:border-slate-800">
          <div className="home-strength-grid grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="home-strength-card group p-7 rounded-2xl border border-slate-100 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_32px_-14px_rgba(59,130,246,0.22)] hover:border-blue-500/20">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-400 transition-colors">
                <span className="material-symbols-outlined">settings_suggest</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">안정적인 엔터프라이즈 운영</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm break-keep">대규모 시스템 통합(SI), 데이터 마이그레이션, 계열사 분리(Carve-out) 등 엔터프라이즈 환경에서의 견고한 백엔드 아키텍처 수립 및 유지보수에 강점이 있습니다.</p>
            </div>
            <div className="home-strength-card group p-7 rounded-2xl border border-slate-100 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_32px_-14px_rgba(59,130,246,0.22)] hover:border-blue-500/20">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-400 transition-colors">
                <span className="material-symbols-outlined">hub</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Cloud MSA 아키텍처</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm break-keep">Azure Cloud 인프라와 Kubernetes(AKS), CI/CD 파이프라인을 구축하여 고가용성 마이크로서비스(MSA)를 성공적으로 배포 및 운영합니다.</p>
            </div>
            <div className="home-strength-card group p-7 rounded-2xl border border-slate-100 bg-white dark:bg-slate-900 dark:border-slate-800 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_32px_-14px_rgba(59,130,246,0.22)] hover:border-blue-500/20">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white group-hover:bg-blue-50 group-hover:text-blue-600 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-400 transition-colors">
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
            {featuredProjects.map((project, idx) => (
              <a
                key={idx}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/50 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-700 dark:bg-slate-800/50"
              >
                <div className="aspect-video w-full overflow-hidden rounded-t-xl">
                  {renderFeaturedProjectPreview(project)}
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
              </a>
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
                    <p className="text-sm font-medium text-slate-900 dark:text-white">Conceptual thought: Using Vector DBs as &quot;Short-term Memory&quot; for stateless agents.</p>
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
