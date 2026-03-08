import Link from "next/link";

export const metadata = {
    title: "프로젝트 히스토리 | Leo - Senior Full-Stack & AI Engineer",
};

export default function ProjectsHistory() {
    return (
        <main className="flex-1">
            <section className="mx-auto max-w-[1000px] px-6 lg:px-8 py-8 md:py-12">
                <div className="mb-10">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">Project History</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">그 동안 진행한 주요 프로젝트 이력 (Chronological history of strategic engineering projects.)</p>
                </div>

                <div className="relative ml-4 md:ml-0 before:absolute before:left-0 md:before:left-[140px] before:top-0 before:bottom-0 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">

                    {/* Recent: 2025 - 2026 */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-4 md:ml-[140px] translate-x-[-1px] relative z-10">
                            <span className="px-3 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-bold rounded-sm uppercase tracking-widest">Recent: 2025 — 2026</span>
                        </div>

                        <div className="space-y-4">
                            {/* SK 'A.Biz' Agent Builder 고도화 프로젝트*/}
                            <div className="relative grid md:grid-cols-[140px_1fr] gap-6 md:gap-10">
                                <div className="md:text-right pt-2">
                                    <span className="text-[11px] font-bold text-primary block">2026.02 — Present</span>

                                </div>
                                <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-5 shadow-sm hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                                    <div className="absolute -left-[25px] md:-left-[47px] top-6 w-3 h-3 rounded-full border-2 border-white dark:border-slate-950 bg-primary z-20"></div>
                                    <div className="mb-3">
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white">SK 'A.Biz' Agent Builder 고도화 - MCP & AutoRag</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Agent MCP 개발</span>
                                            <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                                            <span className="text-[10px] text-slate-500">M365 & AI Infrastructure</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-[13px] mb-4 leading-relaxed">
                                        SK의 AI Agent에서 활용 가능한 Microsoft 365 연계 기능을 MCP 서버로 표준화 SharePoint 문서를 자동 수집·동기화 목적 AutoRAG 연계 백앤드 개발
                                    </p>
                                    <ul className="space-y-1.5 mb-5">
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-primary mt-1 text-[8px] flex-shrink-0">●</span>
                                            Agent Builder에서 활용 가능한 MCP Server 백엔드(FastMCP) 설계·구현. Tool 인터페이스/요청·응답 스키마 정의, 실행 흐름 구성.
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-primary mt-1 text-[8px] flex-shrink-0">●</span>
                                            Microsoft Graph API 기반으로 M365 앱 기능 (Outlook 메일, 캘린더, ToDo, Teams, SharePoint) MCP Tool로 설계·구현 개발.
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-primary mt-1 text-[8px] flex-shrink-0">●</span>
                                            화사별로 멀티 테넌트 Azure AD 인증/권한 획득 구현으로 테넌트별 데이터 접근을 안전하게 통제.
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-primary mt-1 text-[8px] flex-shrink-0">●</span>
                                            SharePoint 문서를 주기적으로 Pulling하여 수집·동기화하는 프로세스와 API를 개발하고, 이후 인덱싱/저장소 연동을 위한 인터페이스를 제공.
                                        </li>
                                    </ul>
                                    <div className="flex flex-wrap gap-1.5">
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">FastAPI</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">MSAL</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Azure </span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Microsoft Graph API</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Kubernetes</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">ArgoCD</span>
                                    </div>
                                </div>
                            </div>

                            {/* SK 엔터프라이즈 AI Agent service 'A.Biz' 확산 프로젝트 (SK하이닉스)) */}
                            <div className="relative grid md:grid-cols-[140px_1fr] gap-6 md:gap-10">
                                <div className="md:text-right pt-2">
                                    <span className="text-[11px] font-bold text-primary block">2025.11 — 2026.02</span>
                                </div>
                                <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-5 shadow-sm hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                                    <div className="absolute -left-[25px] md:-left-[47px] top-6 w-3 h-3 rounded-full border-2 border-white dark:border-slate-950 bg-primary z-20"></div>
                                    <div className="mb-3">
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white">SK Enterprise AI Agent service 'A.Biz' 확산 프로젝트 (SK하이닉스)</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Agent Backend 개발</span>
                                            <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                                            <span className="text-[10px] text-slate-500">Private Cloud & LLM Ops</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-[13px] mb-4 leading-relaxed">
                                        SK 그룹의 업무 비즈니스 AI 서비스인 'A.Biz'의 계열사 확산으로, SK하이닉스 사내 폐쇄망·보안규제 환경에서 AI Agent 서비스를 안정적으로 운영 환경에 정착 및 내부 LLM 모델로 전환
                                    </p>
                                    <ul className="space-y-1.5 mb-5">
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-primary mt-1 text-[8px] flex-shrink-0">●</span>
                                            폐쇄망 CI/CD 구축: 기존 서비스에서 분리된 Private Zone 내 NKS(K8s) 로 Git & ArgoCD 기반의 배포 파이프라인을 설계 정립하여 안정적인 운영 환경 마련
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-primary mt-1 text-[8px] flex-shrink-0">●</span>
                                            LLM 모델 전환: 보안 정책에 따라 외부 LLM(GPT) 의존성을 제거 SKT 자체 모델(A.X)과 Agent로 전환 개발 하였으며 모델 변경에 커스터마이징
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-primary mt-1 text-[8px] flex-shrink-0">●</span>
                                            AI Agent 커스터마이징: 챗봇 플랫폼의 핵심 요청 흐름(Supervisor 분기 → Task Agent 호출 → SSE 응답)과 LangGraph 워크플로우의 상태 관리(멀티턴/체크포인트)를 소스 레벨로 분석하여 기능 수정·확장 시 영향 범위를 파악하고 개발에 참여.
                                        </li>
                                    </ul>
                                    <div className="flex flex-wrap gap-1.5">
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Python</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">FastAPI</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">LangGraph</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">PostgreSQL</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Kubernetes</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Helm Chart</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">ArgoCD</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">GitActions</span>
                                    </div>
                                </div>
                            </div>

                            {/* LLM Vehicle Manual Chatbot */}
                            <div className="relative grid md:grid-cols-[140px_1fr] gap-6 md:gap-10">
                                <div className="md:text-right pt-2">
                                    <span className="text-[11px] font-bold text-primary block">2025.09 — 2025.10</span>
                                </div>
                                <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-5 shadow-sm hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                                    <div className="absolute -left-[25px] md:-left-[47px] top-6 w-3 h-3 rounded-full border-2 border-white dark:border-slate-950 bg-primary z-20"></div>
                                    <div className="mb-3">
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white">LLM 기반 차량 매뉴얼 챗봇 RAG PoC </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PoC 개발 및 테스트</span>
                                            <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                                            <span className="text-[10px] text-slate-500">Generative AI R&D</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-[13px] mb-4 leading-relaxed">
                                        제조사 차량 매뉴얼 PDF를 RAG으로 임배딩 하여, 차량 고객의 ‘차량 사용법’안내를 챗봇으로 자동화하기 위한 RAG 기반 생성형 AI 챗봇 PoC
                                    </p>
                                    <ul className="space-y-1.5 mb-5">
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-primary mt-1 text-[8px] flex-shrink-0">●</span>
                                            PDF 데이터 파싱: 차량 매뉴얼 PDF를 대상으로 복합적인 파싱 로직을 적용하여 텍스트·표 데이터를 구조화하고 RAG 임베딩 정확도 향상
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-primary mt-1 text-[8px] flex-shrink-0">●</span>
                                            RAG 참조 챗봇 파이프라인: RAG 기반 챗봇 파이프라인 설계·구현 및 LangChain을 활용한 멀티턴 응답 구조 개발
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-primary mt-1 text-[8px] flex-shrink-0">●</span>
                                            검색 품질 향상: pgvector 기반 Hybrid Search 및 Reranker 적용으로 검색 정확도 향상
                                        </li>
                                    </ul>
                                    <div className="flex flex-wrap gap-1.5">
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Python</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">PyMuPDF</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">RAG</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Milvus(VectorDB)</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">pgvector(hybrid search)</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Past: 2021 - 2025 */}
                    <div className="mb-4">
                        <div className="flex items-center gap-4 mb-4 md:ml-[140px] translate-x-[-1px] relative z-10">
                            <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold rounded-sm uppercase tracking-widest">Past: 2021 — 2025</span>
                        </div>

                        <div className="space-y-4">
                            {/* SK Group Carve-out */}
                            <div className="relative grid md:grid-cols-[140px_1fr] gap-6 md:gap-10">
                                <div className="md:text-right pt-2">
                                    <span className="text-[11px] font-bold text-slate-400 block">2025.01 — 2025.08</span>
                                </div>
                                <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-5 shadow-sm hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                                    <div className="absolute -left-[25px] md:-left-[47px] top-6 w-3 h-3 rounded-full border-2 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-700 z-20"></div>
                                    <div className="mb-3">
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white">SK 그룹 Carve-out (계열사 분리) 프로젝트</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project PM/PL / Lead Architect</span>
                                            <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                                            <span className="text-[10px] text-slate-500">Enterprise Migration</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-[13px] mb-4 leading-relaxed">
                                        SK그룹 계열사 분리(Carve-out)에 따른 5개 핵심 시스템 서비스를 신규 시스템 및 클라우드 이전 전환으로 성공정으로 안정화
                                    </p>
                                    <ul className="space-y-1.5 mb-5">
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            Managed migration of legacy data to modern cloud infrastructure with zero downtime.
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            5개 시스템 동시 구축 총괄: 그룹웨어, SAP, EHR(SaaS), 구매포털, 법인카드 시스템의 구축 일정, 리스크, 품질 관리 및 통합 테스트(UAT) 주도
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            성공적인 Cut-over 전략 수립: 레거시 시스템과 연동 전략 수립과 마이그레이션을 철처히 검증하여, ‘빅뱅’ 방식의 시스템 오픈을 안정적으로 완수 *SAP 전환·클라우드 이관·레거시 데이터 마이그레이션 등 무결점 완료
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            협업 프로세스 표준화: Jira & Confluence 활용 현업·벤더·그룹사 등 요구사항을 문서화하고 커뮤니케이션 효율을 높여 프로젝트 기간 단축에 기여
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            안정화 및 운영 체계 마련: 오픈 직후 발생한 이슈 대응 및 운영 매뉴얼 작성을 통해 1인 담당 체제로도 운영 가능한 유지보수 환경 구축
                                        </li>
                                    </ul>
                                    <div className="flex flex-wrap gap-1.5">
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Azure Cloud</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">SAP</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">MS EntraID</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">EHR(SaaS)</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Migration</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Jira & Confluence</span>
                                    </div>
                                </div>
                            </div>

                            {/* Azure Cloud & DevOps */}
                            <div className="relative grid md:grid-cols-[140px_1fr] gap-6 md:gap-10">
                                <div className="md:text-right pt-2">
                                    <span className="text-[11px] font-bold text-slate-400 block">2023.12 — 2024.12</span>
                                </div>
                                <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-5 shadow-sm hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                                    <div className="absolute -left-[25px] md:-left-[47px] top-6 w-3 h-3 rounded-full border-2 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-700 z-20"></div>
                                    <div className="mb-3">
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white">Azure Cloud & DevOps 운영 DBA 겸임 </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DevOps / DBA</span>
                                            <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                                            <span className="text-[10px] text-slate-500">Infra Management</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-[13px] mb-4 leading-relaxed">
                                        차세대 시스템 대상 MSA 아키첵처 환경에서 Azure 클라우드 인프라와 Devops 운영관리 및 DBA 겸임.
                                    </p>
                                    <ul className="space-y-1.5 mb-5">
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            DevOps 운영: Azure Cloud 아키텍처와 DevOps 환경을 운영하며, Azure DevOps, GitHub, k8s, CI/CD 개선 하며 유지보수 관리.
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            Jira $ Confluence 도입: Jira&Confluence를 사내 도입하고, IT본부 ITSM 프로세스(시스템개선요청서)를 → Jira 티켓과 연동하여 사용자와 IT담당자, 개발자 간의 협업 프로세스 표준을 수립.
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            DBA 역할 관리: PostgreSQL DB를 운영하면서 스키마 변경 검토·승인, SQL 검수·배포 관리, 성능 모니터링 등 운영 안정성 확보.
                                        </li>
                                    </ul>
                                    <div className="flex flex-wrap gap-1.5">
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">K8s</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Azure</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">PostgreSQL</span>
                                    </div>
                                </div>
                            </div>

                            {/* SK Rentacar Nexwave 1.5  */}
                            <div className="relative grid md:grid-cols-[140px_1fr] gap-6 md:gap-10">
                                <div className="md:text-right pt-2">
                                    <span className="text-[11px] font-bold text-slate-400 block">2022.12 — 2023.11</span>
                                </div>
                                <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-5 shadow-sm hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                                    <div className="absolute -left-[25px] md:-left-[47px] top-6 w-3 h-3 rounded-full border-2 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-700 z-20"></div>
                                    <div className="mb-3">
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white">SK렌터카 단기렌탈 차세대 시스템 - 내륙특화 프로젝트 </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">프로젝트 PL / 비즈니스 분석(BA)</span>
                                            <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                                            <span className="text-[10px] text-slate-500">핵심 모듈 개발</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-[13px] mb-4 leading-relaxed">
                                        SK렌터카 차세대 시스템의 확장으로, 전국 지점의 단기렌탈 계약과 보험·사고 대차, 가맹점 계약·정산을 아우르는 내륙 특화 차세대 시스템 개발.
                                    </p>
                                    <ul className="space-y-1.5 mb-5">
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            프로젝트 관리: 요구사항 분석·정리, 일정·리소스 관리, 대내외 커뮤니케이션 등 총괄 PM/PL의 역할을 수행.
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            복합 비즈니스 프로세스 설계: 보험대차, 사고대차, 가맹점 계약 및 정산 등 복잡한 도메인의 To-Be 프로세스를 설계하고 개발 검수까지 리딩
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            개발 및 품질 관리: 수행사의 역량 한계를 보완하기 위해 프로젝트 후반부 직접 코딩(Java/SQL)에도 참여하여 회계 마감 및 정산 모듈 전체 개발 완수
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            핵심 이슈 해결 (오버부킹 장애): 오픈 직후 발생한 오버부킹 문제를 해결하기 위해 기존 로직을 분석, 가용 차량 산정 SQL 쿼리와 로직을 직접 재설계 및 개발하여 서비스 안정화 달성
                                        </li>
                                    </ul>
                                    <div className="flex flex-wrap gap-1.5">
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Java</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Spring</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Vue</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">PostgreSQL</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Oracle</span>
                                    </div>
                                </div>
                            </div>

                            {/* SK Rentacar Nexwave 1.0  */}
                            <div className="relative grid md:grid-cols-[140px_1fr] gap-6 md:gap-10">
                                <div className="md:text-right pt-2">
                                    <span className="text-[11px] font-bold text-slate-400 block">2021.03 — 2022.08</span>
                                </div>
                                <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-5 shadow-sm hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                                    <div className="absolute -left-[25px] md:-left-[47px] top-6 w-3 h-3 rounded-full border-2 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-700 z-20"></div>
                                    <div className="mb-3">
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white">SK렌터카 차세대 시스템 전환 프로젝트 </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider"> 단기렌탈 MSA 비즈니스 담당</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-[13px] mb-4 leading-relaxed">
                                        SK렌터카 차세대 프로젝트의 첫 번째 프로젝트, Azure Cloud 기반 MSA 아키텍처 구축하여 기존 레거시 비즈니스를 전환하는 대규모 프로젝트.
                                    </p>
                                    <ul className="space-y-1.5 mb-5">
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            MSA 기반 회계 처리 설계: 마이크로서비스 아키텍처 환경에서 단기렌탈 예약/계약 시 발생하는 매출 및 수납까지의 회계 비즈니스 로직 설계와 구현
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            통합 기준정보 수립: 고객, 차량, 마스터 데이터 등 분산된 기준 정보를 MSA 환경에 맞춰 재정의하고 데이터 모델링 작성
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            레거시 데이터 CDC 연계 정의: 차세대 MSA의 계약 정보를 레거시 시스템 사후 정산하기 위해 Kafka CDC 기반 데이터 항목을 정의하고, 케이스별 시나리오 테스트를 통해 데이터 정합성과 처리 흐름 검증
                                        </li>
                                    </ul>
                                    <div className="flex flex-wrap gap-1.5">
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Java</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Spring</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Vue</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">PostgreSQL</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Oracle</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">CDC</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Kafka</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Azure</span>
                                    </div>
                                </div>
                            </div>

                            {/* SK Rentacar sell car auction */}
                            <div className="relative grid md:grid-cols-[140px_1fr] gap-6 md:gap-10">
                                <div className="md:text-right pt-2">
                                    <span className="text-[11px] font-bold text-slate-400 block">2021.05 — 2021.10</span>
                                </div>
                                <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-5 shadow-sm hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                                    <div className="absolute -left-[25px] md:-left-[47px] top-6 w-3 h-3 rounded-full border-2 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-700 z-20"></div>
                                    <div className="mb-3">
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white">SK렌터카 안성경매장 통합 매매센터 프로젝트 </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider"> 프로젝트 BA·PL 역할 수행</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-[13px] mb-4 leading-relaxed">
                                        SK렌터카 안성경매장에 통합 매매센터를 출범하기 위해 차량 입출고·재고 관리·경매 지원 시스템을 구축한 프로젝트
                                    </p>
                                    <ul className="space-y-1.5 mb-5">
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            차량 입출고 자동화 구현: LPR(차량 번호 인식) 시스템과 내부 시스템을 인터페이스 연동하여 차량 인증 및 입고/출고 통제 프로세스 구현
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            현장 운영 효율화: 경매장 내 무인 키오스크 도입에 차량 재고 관리 시스템을 구현하여 매각 업무 생산성 증대
                                        </li>
                                    </ul>
                                    <div className="flex flex-wrap gap-1.5">
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Java</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">MyBatis</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">html</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Oracle</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">X-Platform</span>
                                    </div>
                                </div>
                            </div>

                            {/* ITGC & ITMS-P */}
                            <div className="relative grid md:grid-cols-[140px_1fr] gap-6 md:gap-10">
                                <div className="md:text-right pt-2">
                                    <span className="text-[11px] font-bold text-slate-400 block">2021.01 — 2025.10</span>
                                    <span className="text-[11px] font-bold text-slate-400 block">(매년 갱신 수행)</span>
                                </div>
                                <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-5 shadow-sm hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                                    <div className="absolute -left-[25px] md:-left-[47px] top-6 w-3 h-3 rounded-full border-2 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-700 z-20"></div>
                                    <div className="mb-3">
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white">SK렌터카 ITGC & ITMS-P </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider"> ITGC 구축 / 회계감사 대응</span>
                                            <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                                            <span className="text-[10px] text-slate-500">ITMS-P 대응</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-[13px] mb-4 leading-relaxed">
                                        SK렌터카 회계감사의 IT 내부통제(ITGC) 체계 단독 기획·구축 및 6년 연속 회계감사 '지적 사항 없음' 달성
                                    </p>
                                    <ul className="space-y-1.5 mb-5">
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            ITGC 체계 단독 구축: 통합 법인 출범 후 전산일반통제(ITGC) 요건을 개발·운영 프로세스에 내재화하고, 감사 대응 및 소명 업무를 100% 전담
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            무결점 감사 대응: 철저한 증적 관리와 통제 설계 최적화를 통해 재직 기간 내내 회계감사 적정 의견 및 '지적 사항 0건' 달성
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            ISMS-P 인증 심사 대응: 개인정보 처리 시스템의 흐름 분석 및 보안 요건에 따른 시스템 개선, 매년 인증 심사 갱신 업무 대응
                                        </li>
                                    </ul>
                                    <div className="flex flex-wrap gap-1.5">
                                    </div>
                                </div>
                            </div>

                            {/* AJ & SK Rentacar Cobination Project & Migration Project */}
                            <div className="relative grid md:grid-cols-[140px_1fr] gap-6 md:gap-10">
                                <div className="md:text-right pt-2">
                                    <span className="text-[11px] font-bold text-slate-400 block">2019.10 — 2020.08</span>
                                </div>
                                <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-5 shadow-sm hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                                    <div className="absolute -left-[25px] md:-left-[47px] top-6 w-3 h-3 rounded-full border-2 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-700 z-20"></div>
                                    <div className="mb-3">
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white">AJ·SK렌터카 전산 통합 및 데이터 마이그레이션 프로젝트 </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider"> 회계/빌링 영역 BA·PL 역할 수행</span>
                                            <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                                            <span className="text-[10px] text-slate-500">Data 마이그레이션 수행</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-[13px] mb-4 leading-relaxed">
                                        렌터카 회사 인수합병에 따라상이한 전산·업무 프로세스와 시스템을 분석·정의하고 이를 병합하여 데이터 이관을 수행한 전산 통합 프로젝트
                                    </p>
                                    <ul className="space-y-1.5 mb-5">
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            To-Be 프로세스 정립: 양사의 상이한 렌탈 규정과 비즈니스 로직을 분석하여 통합 법인에 맞는 최적의 운영 프로세스 도출
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            이종 ERP 데이터 통합: AJ렌터카(더존)에서 SK렌터카(SAP)로의 회계 시스템 전환을 위해 데이터 스키마 차이를 분석하고 매핑 전략 수립
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            대용량 데이터 마이그레이션: 빌링, 청구, 수납, 고객 데이터 이관을 위한 SQL 스크립트를 직접 작성하고 검증하여 데이터 정합성 확보
                                        </li>
                                    </ul>
                                    <div className="flex flex-wrap gap-1.5">
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Java</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">PerconaDB(MySQL)</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">ORACLE  </span>
                                    </div>
                                </div>
                            </div>

                            {/* AJ & SK Rentacar NewSystem trnsfer */}
                            <div className="relative grid md:grid-cols-[140px_1fr] gap-6 md:gap-10">
                                <div className="md:text-right pt-2">
                                    <span className="text-[11px] font-bold text-slate-400 block">2017.01 — 2018.10</span>
                                </div>
                                <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-5 shadow-sm hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                                    <div className="absolute -left-[25px] md:-left-[47px] top-6 w-3 h-3 rounded-full border-2 border-white dark:border-slate-950 bg-slate-200 dark:bg-slate-700 z-20"></div>
                                    <div className="mb-3">
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white">AJ렌터카 차세대 전환 프로젝트 </h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider"> 프로젝트 팀원</span>
                                            <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                                            <span className="text-[10px] text-slate-500">PI/개발/테스트</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-[13px] mb-4 leading-relaxed">
                                        AJ 렌터카 노후된 레거시 시스템의 차세대 시스템 구측 및 비즈니스 고도화 프로젝트
                                    </p>
                                    <ul className="space-y-1.5 mb-5">
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            차세대 프로젝트 품질 확보: 차세대 시스템 구축 시 PI·개발·테스트 전 과정에 참여, 실무 중심의 테스트 케이스 설계 및 결함 관리를 통해 안정적 오픈 기여
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            PI 및 핵심 모듈 개발: 청구, 수납, 회계, 단기렌탈 등 핵심 도메인의 AS-IS/TO-BE 프로세스를 분석하고 설계부터 개발까지 주도적으로 수행
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            외부 API 연계 개발: 외부 세금계산서 연동(스마트필) 및 VAN/PG 연동(NICE정보통신)을 레거시→차세대 전환하기 위한 API를 개발 및 협력업체와 커뮤니케이션 담당
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            가용 차량 로직 구현: 예약 시스템의 핵심인 '가용 차량 산정' 로직을 프로시저와 쿼리로 직접 설계·구현하여 성공적인 품질 확보
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            데이터 이관: Oracle에서 PerconaDB로의 데이터 이관 매핑을 검증하고, 실무 중심의 테스트 케이스 설계로 안정적인 시스템 오픈 달성
                                        </li>
                                    </ul>
                                    <div className="flex flex-wrap gap-1.5">
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Java</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Spring</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">HTML5 </span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">AngulerJS </span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">PerconaDB(MySQL) </span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
