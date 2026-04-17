import ComingSoonAlert from "@/components/ComingSoonAlert";

export const metadata = {
    title: "포트폴리오 | Leo - Senior Full-Stack & AI Engineer",
};

export default function Projects() {
    return (
        <main className="flex-1">
            <div className="mx-auto flex w-full max-w-7xl flex-col px-4 py-12 sm:px-6 lg:px-8">
                <div className="mb-12 flex flex-col gap-4">
                    <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white sm:text-3xl">포트폴리오</h1>
                    <p className="max-w-3xl text-lg text-slate-600 dark:text-slate-400 leading-relaxed break-keep">
                        AI 에이전트(AI Agent) 기술을 집중적으로 연구하고, 이를 바탕으로 구현한 실무형 프로젝트 모음입니다.<br className="hidden sm:block" />
                        각 프로젝트 카드를 클릭하시면 <strong className="font-semibold text-slate-900 dark:text-white">실제 동작을 테스트해 볼 수 있는 라이브 사이트</strong>로 연결되어,<br className="hidden sm:block" />
                        AI 에이전트 서비스가 어떻게 유기적으로 동작하는지 직접 경험해 보실 수 있습니다.
                    </p>

                    {/* 포트폴리오 문서 배너 */}
                    <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-6 rounded-2xl bg-gradient-to-r from-slate-50 to-indigo-50/50 p-6 sm:p-8 border border-indigo-100/50 shadow-inner dark:from-slate-800/80 dark:to-indigo-900/20 dark:border-indigo-800/30">
                        <div className="flex-1 space-y-3">
                            <div className="inline-flex items-center gap-1.5 rounded-md bg-indigo-100/80 px-2 py-1 text-xs font-bold text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-300">
                                <span className="material-symbols-outlined text-[14px]">article</span> AI Agent 개발 경험 문서 다운로드
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white break-keep">실무형 AI Agent 시스템 설계와 구현 과정</h2>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed break-keep">
                                <strong>Enterprise AI Agent 파이프라인</strong>(LangGraph Workflow, Dynamic Prompt),
                                <strong>Microsoft 365 MCP Platform 아키텍처</strong> 설계,
                                그리고 파싱부터 구축까지 직접 구현한 <strong>하이브리드 RAG PoC</strong> 등 구체적인 문제 해결 과정과 전체 기술 이력이 담겨있는 문서입니다.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0 mt-4 md:mt-0">
                            <a href="/files/임진수_AI_Agent_개발_포트폴리오.html" target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 hover:shadow-md hover:shadow-indigo-200 dark:hover:shadow-indigo-900/50 w-full sm:w-auto">
                                <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                                웹 브라우저에서 보기
                            </a>
                            <a href="/files/임진수_AI_Agent_개발_포트폴리오.pdf" download className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 dark:hover:text-white w-full sm:w-auto">
                                <span className="material-symbols-outlined text-[18px]">download</span>
                                PDF 다운로드
                            </a>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <a href="https://author-delete-lecture-pointed.trycloudflare.com/" target="_blank" rel="noopener noreferrer" className="group relative flex flex-col overflow-hidden rounded-xl border border-emerald-200/80 bg-white shadow-[0_16px_40px_-18px_rgba(16,185,129,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(16,185,129,0.45)] dark:border-emerald-900/60 dark:bg-slate-900">
                        <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-emerald-50 via-teal-50/80 to-white dark:from-slate-800 dark:via-slate-900 dark:to-slate-900 relative">
                            <div className="absolute left-4 top-4 z-10 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 shadow-sm backdrop-blur dark:border-emerald-800 dark:bg-slate-900/90 dark:text-emerald-300">
                                <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
                                Featured Project
                            </div>
                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                <div className="w-full h-full bg-white/95 dark:bg-slate-900 rounded-lg shadow-sm border border-emerald-100 dark:border-slate-700 overflow-hidden flex flex-col group-hover:scale-105 transition-transform duration-500">
                                    <div className="h-8 border-b border-slate-100 dark:border-slate-800 flex items-center px-3 justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[14px] text-emerald-700 dark:text-emerald-500">directions_car</span>
                                            <div className="text-[10px] font-bold text-emerald-900 dark:text-emerald-400">차량 매뉴얼 RAG 문서 검색 AI 어시스턴트</div>
                                        </div>
                                        <div className="px-1.5 py-0.5 rounded bg-emerald-100 text-[8px] font-bold text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                                            RAG
                                        </div>
                                    </div>
                                    <div className="flex-1 p-3 flex gap-3 bg-slate-50/70 dark:bg-slate-900/60">
                                        <div className="w-24 shrink-0 rounded-lg border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-700 dark:bg-slate-800">
                                            <div className="mb-2 text-[8px] font-bold uppercase tracking-wider text-slate-400">Vehicle</div>
                                            <div className="space-y-1.5">
                                                <div className="rounded-md bg-emerald-50 px-2 py-1 text-[8px] font-medium text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">Hyundai</div>
                                                <div className="rounded-md bg-slate-100 px-2 py-1 text-[8px] font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">Tucson</div>
                                                <div className="rounded-md bg-slate-100 px-2 py-1 text-[8px] font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300">Hybrid</div>
                                            </div>
                                        </div>
                                        <div className="flex-1 flex flex-col gap-2">
                                            <div className="self-start rounded-2xl bg-white px-3 py-2 text-[8px] leading-relaxed text-slate-600 shadow-sm border border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                                스마트키 배터리 교체 방법 알려줘
                                            </div>
                                            <div className="self-start rounded-2xl bg-emerald-100/80 px-3 py-2 text-[8px] leading-relaxed text-emerald-900 shadow-sm border border-emerald-200 dark:border-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-200">
                                                매뉴얼 기준 절차를 단계별로 안내하고 관련 페이지를 함께 제공합니다.
                                            </div>
                                            <div className="mt-auto flex items-center gap-2 text-[7px] text-slate-400 font-mono">
                                                <span>Hybrid RAG</span>
                                                <span>•</span>
                                                <span>SSE Streaming</span>
                                                <span>•</span>
                                                <span>pgvector</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-6 border-t border-slate-100 dark:border-slate-800 flex items-center px-3 bg-white dark:bg-slate-900">
                                        <div className="text-[7px] text-slate-400 font-mono">FastAPI | Inference Server | Next.js App Router</div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col p-6 sm:p-8">
                            <div className="mb-4">
                                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">차량 매뉴얼 RAG 문서 검색 AI 어시스턴트</h3>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">차량 매뉴얼 PDF를 하이브리드 RAG로 검색하고, 실시간 스트리밍으로 답변하는 차량 전용 AI 어시스턴트</p>
                            </div>
                            <div className="mb-6 flex-1">
                                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">check_circle</span>
                                        <span>FastAPI 기반 `Router → Service → Repository` 계층형 백엔드를 설계하고 차량 질의 전용 API를 직접 구현</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">check_circle</span>
                                        <span>Supabase `pgvector` RPC를 활용해 벡터 검색과 Full-Text Search를 결합한 하이브리드 RAG 검색 파이프라인 구축</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">check_circle</span>
                                        <span>`multilingual-e5-large` 임베딩 서버를 별도 마이크로서비스로 분리해 추론 부하와 메인 API를 분산하는 MSA 구조 설계</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">check_circle</span>
                                        <span>PDF 폰트 구조 분석, 표 보존, 청킹 전략을 포함한 문서 파이프라인을 구성해 차량 매뉴얼 데이터 품질을 직접 정제</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">check_circle</span>
                                        <span>Next.js App Router 프론트엔드에 차량 선택 위젯과 SSE 스트리밍 채팅 UX를 연결해 실제 서비스형 사용자 경험 완성</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                                {['FastAPI', 'Supabase', 'pgvector', 'Hybrid RAG', 'SentenceTransformers', 'SSE', 'Next.js', 'MSA'].map(tag => (
                                    <span key={tag} className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </a>

                    {/* Multi-Agent Chat Service Project Entry */}
                    <a href="https://shots-fashion-processors-dining.trycloudflare.com/" target="_blank" rel="noopener noreferrer" className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                        <div className="aspect-video w-full overflow-hidden bg-indigo-50/50 dark:bg-slate-800 relative">
                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                {/* Mock Agent Network UI */}
                                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col group-hover:scale-105 transition-transform duration-500">
                                    <div className="h-8 border-b border-slate-100 dark:border-slate-800 flex items-center px-3 justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="material-symbols-outlined text-[14px] text-indigo-700 dark:text-indigo-500">hub</span>
                                            <div className="text-[10px] font-bold text-indigo-900 dark:text-indigo-400">Multi-Agent System</div>
                                        </div>
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        </div>
                                    </div>
                                    <div className="flex-1 p-3 flex flex-col gap-2 relative bg-slate-50/50 dark:bg-slate-900/50 justify-center items-center">
                                        {/* Simple visualization of agents connected */}
                                        <div className="flex gap-4 items-center">
                                            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center border border-blue-200 dark:border-blue-700 shadow-sm">
                                                <span className="material-symbols-outlined text-[14px] text-blue-600 dark:text-blue-400">article</span>
                                            </div>
                                            <div className="w-6 h-0.5 bg-slate-300 dark:bg-slate-600"></div>
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center border-2 border-indigo-300 dark:border-indigo-600 shadow-md z-10">
                                                <span className="material-symbols-outlined text-[18px] text-indigo-700 dark:text-indigo-400">psychology</span>
                                            </div>
                                            <div className="w-6 h-0.5 bg-slate-300 dark:bg-slate-600"></div>
                                            <div className="w-8 h-8 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center border border-teal-200 dark:border-teal-700 shadow-sm">
                                                <span className="material-symbols-outlined text-[14px] text-teal-600 dark:text-teal-400">forum</span>
                                            </div>
                                        </div>
                                        <div className="text-[8px] text-slate-500 mt-2 font-medium">RAG ↔ LLM Core ↔ Tools</div>
                                    </div>
                                    <div className="h-6 border-t border-slate-100 dark:border-slate-800 flex items-center px-3 bg-white dark:bg-slate-900">
                                        <div className="text-[7px] text-slate-400 font-mono">Stream: Connected | Redis: Active | Models: 4+</div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col p-6 sm:p-8">
                            <div className="mb-4">
                                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">멀티 에이전트 챗 서비스</h3>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">검색(News), 기억(Redis), 내부문서참고(RAG), 다중토론 등 최신 에이전트 기법이 통합된 AI 서비스</p>
                            </div>
                            <div className="mb-6 flex-1">
                                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">check_circle</span>
                                        <span>다양한 LLM 모델 선택 기능 및 멀티턴 기본 채팅 에이전트 구현</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">check_circle</span>
                                        <span>Langchain과 Redis를 결합한 초고속 인메모리 기반 대화 세션(기억력) 관리</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">check_circle</span>
                                        <span>자체 문서 기반 RAG 연동 및 네이버 뉴스 Search Tool 자동 호출 파이프라인</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">check_circle</span>
                                        <span>다중 에이전트(Multi-Agent) 라우팅 아키텍처 및 SSE 방식 실시간 텍스트 스트리밍 전송</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                                {/* 사용된 핵심 기술 스택 태그 표시 */}
                                {['LangChain', 'RAG', 'Agent', 'Redis', 'Multi-Agent', 'Streaming'].map(tag => (
                                    <span key={tag} className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </a>

                    {/* Clinical Sanctuary AI Project Entry */}
                    <a href="https://yards-appointed-primary-buy.trycloudflare.com/" target="_blank" rel="noopener noreferrer" className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                        <div className="aspect-video w-full overflow-hidden bg-teal-50/50 dark:bg-slate-800 relative">
                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                {/* Mock Chat UI */}
                                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col group-hover:scale-105 transition-transform duration-500">
                                    <div className="h-8 border-b border-slate-100 dark:border-slate-800 flex items-center px-3 gap-2">
                                        <span className="material-symbols-outlined text-[14px] text-teal-700 dark:text-teal-500">local_hospital</span>
                                        <div className="text-[10px] font-bold text-teal-900 dark:text-teal-400">The Clinical Sanctuary</div>
                                    </div>
                                    <div className="flex-1 p-3 flex flex-col gap-2 relative bg-slate-50/50 dark:bg-slate-900/50">
                                        {/* Bot message */}
                                        <div className="flex gap-2">
                                            <div className="w-6 h-6 rounded-full bg-teal-100 dark:bg-teal-900/50 flex items-center justify-center text-teal-700 dark:text-teal-400 shrink-0">
                                                <span className="material-symbols-outlined text-[12px]">smart_toy</span>
                                            </div>
                                            <div className="bg-slate-200/70 dark:bg-slate-800 rounded-lg p-2 text-[8px] text-slate-700 dark:text-slate-300 max-w-[85%]">
                                                안녕하세요! 어떤 도움을 드릴까요? 진료 예약부터 결과 확인까지 실시간으로 도와드립니다.
                                            </div>
                                        </div>
                                        {/* Options grid */}
                                        <div className="grid grid-cols-2 gap-1.5 mt-1 pl-8">
                                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-1.5 flex items-center gap-1 shadow-sm">
                                                <span className="material-symbols-outlined text-[10px] text-teal-700 dark:text-teal-500">calendar_month</span>
                                                <span className="text-[7px] font-medium text-slate-700 dark:text-slate-300">진료 예약</span>
                                            </div>
                                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded p-1.5 flex items-center gap-1 shadow-sm">
                                                <span className="material-symbols-outlined text-[10px] text-teal-700 dark:text-teal-500">hourglass_empty</span>
                                                <span className="text-[7px] font-medium text-slate-700 dark:text-slate-300">대기 순번 확인</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-8 border-t border-slate-100 dark:border-slate-800 flex items-center px-2 bg-white dark:bg-slate-900">
                                        <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-5 px-2 flex items-center justify-between">
                                            <div className="flex items-center gap-1.5">
                                                <span className="material-symbols-outlined text-[10px] text-slate-400">add_circle</span>
                                                <span className="text-[7px] text-slate-400">메시지를 입력하세요...</span>
                                            </div>
                                            <div className="w-4 h-4 rounded-full bg-teal-500 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-[8px] text-white">send</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col p-6 sm:p-8">
                            <div className="mb-4">
                                {/* 병원 편의 제공 챗봇 시스템 타이틀 */}
                                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">health-chat (의료 AI 챗봇)</h3>
                                {/* 사용자가 요청한 설명 문구 반영 */}
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">환자의 병원 이용의 편의를 제공해주는 챗 봇</p>
                            </div>
                            <div className="mb-6 flex-1">
                                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">check_circle</span>
                                        <span>사용자 질의에 따른 의도 분류 및 도구 실행 계획을 LLM으로 수립</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">check_circle</span>
                                        <span>Langchain 프롬프트를 사용하여 자연스러운 멀티턴 대화 유지</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">check_circle</span>
                                        <span>LangGraph로 planner-executor-reporter 구조의 state 반복 수행 구현</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                                {['LangChain', 'LangGraph', 'LLM', 'AI Chatbot'].map(tag => (
                                    <span key={tag} className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </a>

                    {/* Smart Home AI Project Entry */}
                    <a href="https://rats-pod-screensaver-advisors.trycloudflare.com/" target="_blank" rel="noopener noreferrer" className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                        <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                            {/* 프로젝트 스크린샷 활용 */}
                            <img
                                src="/portfolio-smart-home-abstract.png"
                                alt="Smart Home AI Mockup"
                                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                        <div className="flex flex-1 flex-col p-6 sm:p-8">
                            <div className="mb-4">
                                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Smart Home AI (부동산 AI 어시스턴트)</h3>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">부동산 거래의 안전과 편의를 위한 AI 기반 법률 및 계약 지원 플랫폼</p>
                            </div>
                            <div className="mb-6 flex-1">
                                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">check_circle</span>
                                        <span>AI 법률 챗봇을 통한 24시간 실시간 부동산 상담 및 복잡한 법률 용어 해석</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="material-symbols-outlined mt-0.5 text-[18px] text-primary">check_circle</span>
                                        <span>인공지능 등기부등본 진단으로 근저당, 압류 등 위험 요소를 즉각적으로 파악</span>
                                    </li>
                                </ul>
                            </div>
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                                {['Python', 'LLM', 'OpenAI', 'Next.js', 'Risk Analysis'].map(tag => (
                                    <span key={tag} className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </a>

                    <ComingSoonAlert className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                        <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative">
                            <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/50 backdrop-blur-[2px]">
                                <span className="rounded-full bg-slate-900 px-4 py-2 text-sm font-bold tracking-wider text-white shadow-lg ring-1 ring-white/20">
                                    [ 준비중 ]
                                </span>
                            </div>
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
                    </ComingSoonAlert>

                    <ComingSoonAlert className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                        <div className="aspect-video w-full overflow-hidden bg-slate-900 relative">
                            <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/50 backdrop-blur-[2px]">
                                <span className="rounded-full bg-slate-900 px-4 py-2 text-sm font-bold tracking-wider text-white shadow-lg ring-1 ring-white/20">
                                    [ 준비중 ]
                                </span>
                            </div>
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
                    </ComingSoonAlert>

                    <ComingSoonAlert className="group relative flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
                        <div className="aspect-video w-full overflow-hidden bg-slate-50 dark:bg-slate-800 relative">
                            <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-900/50 backdrop-blur-[2px]">
                                <span className="rounded-full bg-slate-900 px-4 py-2 text-sm font-bold tracking-wider text-white shadow-lg ring-1 ring-white/20">
                                    [ 준비중 ]
                                </span>
                            </div>
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
                    </ComingSoonAlert>

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
