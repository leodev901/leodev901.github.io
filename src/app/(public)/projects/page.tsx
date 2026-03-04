import Link from "next/link";

export const metadata = {
    title: "프로젝트 히스토리 | Leo - Senior Full-Stack & AI Engineer",
};

export default function ProjectsHistory() {
    return (
        <main className="flex-1">
            <section className="mx-auto max-w-[1000px] px-6 lg:px-8 py-8 md:py-12">
                <div className="mb-10">
                    <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">Projects</h1>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">Chronological history of strategic engineering projects.</p>
                </div>

                <div className="relative ml-4 md:ml-0 before:absolute before:left-0 md:before:left-[140px] before:top-0 before:bottom-0 before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">

                    {/* Recent: 2025 - 2026 */}
                    <div className="mb-8">
                        <div className="flex items-center gap-4 mb-4 md:ml-[140px] translate-x-[-1px] relative z-10">
                            <span className="px-3 py-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[10px] font-bold rounded-sm uppercase tracking-widest">Recent: 2025 — 2026</span>
                        </div>

                        <div className="space-y-4">
                            {/* SK 'A.Biz' Agent Builder */}
                            <div className="relative grid md:grid-cols-[140px_1fr] gap-6 md:gap-10">
                                <div className="md:text-right pt-2">
                                    <span className="text-[11px] font-bold text-primary block">2026.02 — Present</span>
                                </div>
                                <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-5 shadow-sm hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                                    <div className="absolute -left-[25px] md:-left-[47px] top-6 w-3 h-3 rounded-full border-2 border-white dark:border-slate-950 bg-primary z-20"></div>
                                    <div className="mb-3">
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white">SK 'A.Biz' Agent Builder MCP & AutoRAG</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Agent Backend Developer</span>
                                            <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                                            <span className="text-[10px] text-slate-500">M365 & AI Infrastructure</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-[13px] mb-4 leading-relaxed">
                                        Standardized Microsoft 365 linkage as an MCP server for SK's AI Agent; developed a backend for AutoRAG that automatically collects and synchronizes SharePoint documents.
                                    </p>
                                    <ul className="space-y-1.5 mb-5">
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-primary mt-1 text-[8px] flex-shrink-0">●</span>
                                            Implemented M365 app functions as MCP Tools based on Microsoft Graph API.
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-primary mt-1 text-[8px] flex-shrink-0">●</span>
                                            Designed multi-tenant Azure AD authentication for secure enterprise data access.
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-primary mt-1 text-[8px] flex-shrink-0">●</span>
                                            Established SharePoint document ingestion pipelines for real-time RAG updates.
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-primary mt-1 text-[8px] flex-shrink-0">●</span>
                                            Automated secret rotation and credential management for external API integration.
                                        </li>
                                    </ul>
                                    <div className="flex flex-wrap gap-1.5">
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">FastAPI</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">MSAL</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Kubernetes</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">ArgoCD</span>
                                    </div>
                                </div>
                            </div>

                            {/* SK Enterprise AI Agent service 'A.Biz' */}
                            <div className="relative grid md:grid-cols-[140px_1fr] gap-6 md:gap-10">
                                <div className="md:text-right pt-2">
                                    <span className="text-[11px] font-bold text-primary block">2025.11 — 2026.02</span>
                                </div>
                                <div className="relative bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-lg p-5 shadow-sm hover:border-slate-200 dark:hover:border-slate-700 transition-colors">
                                    <div className="absolute -left-[25px] md:-left-[47px] top-6 w-3 h-3 rounded-full border-2 border-white dark:border-slate-950 bg-primary z-20"></div>
                                    <div className="mb-3">
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white">SK Enterprise AI Agent service 'A.Biz'</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">AI Agent Backend Developer</span>
                                            <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                                            <span className="text-[10px] text-slate-500">Private Cloud & LLM Ops</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-[13px] mb-4 leading-relaxed">
                                        Stabilization of AI Agent service in a private cloud environment and conversion of LLM dependencies to internal models.
                                    </p>
                                    <ul className="space-y-1.5 mb-5">
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-primary mt-1 text-[8px] flex-shrink-0">●</span>
                                            Built private CI/CD pipelines in isolated network zones using NKS and ArgoCD.
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-primary mt-1 text-[8px] flex-shrink-0">●</span>
                                            Replaced external LLM (GPT) dependencies with internal models (A.X) for security.
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-primary mt-1 text-[8px] flex-shrink-0">●</span>
                                            Integrated LangGraph for multi-turn agent flow management and custom state tracking.
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-primary mt-1 text-[8px] flex-shrink-0">●</span>
                                            Optimized GPU resource allocation for on-premise model serving clusters.
                                        </li>
                                    </ul>
                                    <div className="flex flex-wrap gap-1.5">
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Python</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">LangGraph</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">PostgreSQL</span>
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
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white">LLM Vehicle Manual Chatbot RAG PoC</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">PoC Developer</span>
                                            <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                                            <span className="text-[10px] text-slate-500">Generative AI R&D</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-[13px] mb-4 leading-relaxed">
                                        Construction of a generative AI chatbot pipeline for high-precision search of extensive vehicle manual PDFs.
                                    </p>
                                    <ul className="space-y-1.5 mb-5">
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-primary mt-1 text-[8px] flex-shrink-0">●</span>
                                            Developed complex parsing logic for multi-format PDF data extraction using PyMuPDF.
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-primary mt-1 text-[8px] flex-shrink-0">●</span>
                                            Implemented Hybrid Search and Reranker using Milvus and pgvector for improved accuracy.
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-primary mt-1 text-[8px] flex-shrink-0">●</span>
                                            Designed dynamic prompting strategies to reduce hallucinations in technical queries.
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-primary mt-1 text-[8px] flex-shrink-0">●</span>
                                            Evaluated embedding model performance across different chunking strategies.
                                        </li>
                                    </ul>
                                    <div className="flex flex-wrap gap-1.5">
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Milvus</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">PyMuPDF</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">pgvector</span>
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
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white">SK Group Carve-out</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Project PM / Lead Architect</span>
                                            <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                                            <span className="text-[10px] text-slate-500">Enterprise Migration</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-[13px] mb-4 leading-relaxed">
                                        Successful launch and migration of 5 core systems during the corporate spin-off process.
                                    </p>
                                    <ul className="space-y-1.5 mb-5">
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            Managed migration of legacy data to modern cloud infrastructure with zero downtime.
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            Standardized internal collaborative processes using Jira and Confluence.
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            Negotiated system requirements across five different business units.
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            Implemented high-availability SAP integration for global financial reporting.
                                        </li>
                                    </ul>
                                    <div className="flex flex-wrap gap-1.5">
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Azure Cloud</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">SAP</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Migration</span>
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
                                        <h3 className="text-base font-bold text-slate-900 dark:text-white">Azure Cloud & DevOps/DBA</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">DevOps / DBA</span>
                                            <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                                            <span className="text-[10px] text-slate-500">Infra Management</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 dark:text-slate-300 text-[13px] mb-4 leading-relaxed">
                                        Dual role managing Azure Cloud infrastructure and PostgreSQL DBA responsibilities for MSA architecture.
                                    </p>
                                    <ul className="space-y-1.5 mb-5">
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            Optimized PostgreSQL performance and managed secure schema migration protocols.
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            Built robust ITSM workflows integrating Jira and GitHub Actions.
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            Automated infrastructure provisioning using Terraform (IaC).
                                        </li>
                                        <li className="flex items-start gap-2 text-[12px] text-slate-600 dark:text-slate-400">
                                            <span className="text-slate-400 mt-1 text-[8px] flex-shrink-0">●</span>
                                            Reduced cloud operational costs by 20% through resource rightsizing.
                                        </li>
                                    </ul>
                                    <div className="flex flex-wrap gap-1.5">
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">K8s</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">Azure</span>
                                        <span className="px-1.5 py-0.5 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded text-[9px] font-bold text-slate-500 dark:text-slate-400">PostgreSQL</span>
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
