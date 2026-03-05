'use client';

import React from 'react';
// 💡 `import ... from ...` 문법: "다른 곳에 있는 도구를 내 파일로 빌려와서 쓸게!"
// 'next/link'에서 Link라는 마법의 순간이동 문을 빌려옵니다. (a 태그 대신 사용)
import Link from 'next/link';

// 💡 Next.js의 라우팅 마법:
// 사용자가 '/learning' 주소로 들어오면, Next.js는 이 폴더의 `layout.tsx` (껍데기)를 먼저 그리고,
// 그 껍데기 안에 있는 구멍({children})에 이 `page.tsx` (알맹이)를 쏙 끼워 넣어서 보여줍니다!

export default function LearningDashboardPage() {
    return (
        <div className="flex flex-col items-center py-16 px-4">
            <div className="max-w-3xl w-full">
                {/* 히어로(대문) 섹션 */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        프론트엔드 학습 대시보드 🚀
                    </h1>
                    <p className="text-xl text-gray-600">
                        우리가 함께 만들어온 기능들을 한눈에 확인하고 이동해 보세요.
                    </p>
                </div>

                {/* 지금까지 배운 커리큘럼 카드 목록 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Step 1 */}
                    <Link href="/learning/counter" className="block group">
                        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:border-indigo-300 transition-all duration-300 h-full">
                            <div className="text-indigo-500 font-bold text-sm mb-2 uppercase tracking-wider">Step 1</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                                🔢 카운터 앱
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                버튼을 클릭할 때마다 숫자가 바뀌는 모습을 보며 React의 가장 기본인
                                <code>useState</code> 상태 관리와 <code>onClick</code> 이벤트 처리를 배웠습니다.
                            </p>
                        </div>
                    </Link>

                    {/* Step 2 */}
                    <Link href="/learning/profile" className="block group">
                        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:border-indigo-300 transition-all duration-300 h-full">
                            <div className="text-indigo-500 font-bold text-sm mb-2 uppercase tracking-wider">Step 2</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                                👤 프로필 카드
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                코드를 블록처럼 재사용하는 컴포넌트 분리법과,
                                부모가 자식에게 데이터를 넘겨주는 <code>props</code>의 개념을 익혔습니다.
                            </p>
                        </div>
                    </Link>

                    {/* Step 3 */}
                    <Link href="/learning/todo" className="block group">
                        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:border-indigo-300 transition-all duration-300 h-full">
                            <div className="text-indigo-500 font-bold text-sm mb-2 uppercase tracking-wider">Step 3</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                                📝 투두 리스트
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                배열 (Array) 데이터를 다루는 방법, map 함수를 사용한 목록 렌더링,
                                그리고 항목의 추가, 삭제, 토글 등 프론트엔드 핵심 상태 관리를 익혔습니다.
                            </p>
                        </div>
                    </Link>

                    {/* Step 4 */}
                    <Link href="/learning/board" className="block group">
                        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:border-indigo-300 transition-all duration-300 h-full">
                            <div className="text-indigo-500 font-bold text-sm mb-2 uppercase tracking-wider">Step 4</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-indigo-600 transition-colors">
                                💾 파일 저장 게시판
                            </h2>
                            <p className="text-gray-600 leading-relaxed">
                                Next.js의 서버 API Routes를 만들고, `fs`(File System) 모듈을 이용해
                                우리가 쓴 글이 사라지지 않게 하드디스크(`data.json`)에 영구 기록했습니다.
                            </p>
                        </div>
                    </Link>

                    {/* Step 5 */}
                    <Link href="/learning/board2" className="block group md:col-span-2">
                        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 hover:shadow-xl hover:border-green-300 transition-all duration-300 h-full">
                            <div className="text-green-500 font-bold text-sm mb-2 uppercase tracking-wider">Step 5 (Final)</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors">
                                ⚡ Supabase 연동 게시판
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                진짜 실무에서 쓰이는 관계형 DB(PostgreSQL)를 Supabase라는 BaaS로 연결했습니다.
                                객체 구조 분해 할당(`{'{ data, error }'}`)을 배우고, 백엔드 서버 없이 프론트엔드에서 직통으로 데이터베이스와 대화하는 멋진 경험을 했습니다!
                            </p>
                            <div className="inline-flex items-center text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                이것이 진짜 풀스택 개발! 🎉
                            </div>
                        </div>
                    </Link>

                    {/* Step 7 카드 - 실시간 통신 */}
                    <Link href="/learning/realtimesub" className="block group md:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-md border border-pink-100 hover:shadow-xl hover:border-pink-300 transition-all duration-300 h-full relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <span className="flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                                </span>
                            </div>
                            <div className="text-pink-500 font-bold text-sm mb-2 uppercase tracking-wider">Step 7</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-pink-600 transition-colors">
                                📡 실시간 데이터 구독
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                새로고침 없이 남이 쓴 글이 내 화면에 마법처럼 나타납니다! Supabase Realtime 기술을 기반으로 실시간 양방향 통신의 원리를 체험합니다.
                            </p>
                            <div className="inline-flex items-center text-sm font-semibold text-pink-600 bg-pink-50 px-3 py-1 rounded-full">
                                Realtime Subscription
                            </div>
                        </div>
                    </Link>

                    {/* Step 8 카드 - AI 스트리밍 UI */}
                    <Link href="/learning/sse" className="block group md:col-span-1">
                        <div className="bg-white rounded-2xl p-6 shadow-md border border-emerald-100 hover:shadow-xl hover:border-emerald-300 transition-all duration-300 h-full relative overflow-hidden">
                            <div className="text-emerald-500 font-bold text-sm mb-2 uppercase tracking-wider">Step 8</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">
                                🤖 AI 스트리밍 UI (SSE)
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                ChatGPT처럼 답변이 한 글자씩 타다다닥 타이핑되는 마법 같은 Streaming UI를 Mock(setTimeout) 방식으로 프론트엔드에서 구현해 봅니다.
                            </p>
                            <div className="inline-flex items-center text-sm font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                                Server-Sent Events 패턴
                            </div>
                        </div>
                    </Link>

                    {/* Step 9 카드 - 파일 업로드 비교 */}
                    <Link href="/learning/storage" className="block group md:col-span-2">
                        <div className="bg-white rounded-2xl p-6 shadow-md border border-orange-100 hover:shadow-xl hover:border-orange-300 transition-all duration-300 h-full relative overflow-hidden">
                            <div className="text-orange-500 font-bold text-sm mb-2 uppercase tracking-wider">Step 9</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-orange-600 transition-colors">
                                🗂️ 파일 업로드 (Mock Server vs Storage)
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                전통적인 서버 폴더 저장 방식(가짜)과 현대적인 클라우드 스토리지(진짜 Supabase) 방식을 한눈에 비교해 봅니다. 파일 선택, 미리보기, 그리고 전송 후 URL 획득까지의 전체 흐름을 완벽 정복합니다!
                            </p>
                            <div className="inline-flex items-center text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                                File Upload Comparison
                            </div>
                        </div>
                    </Link>

                    {/* Step 10 카드 - 인증과 인가 */}
                    <Link href="/learning/auth" className="block group md:col-span-2">
                        <div className="bg-white rounded-2xl p-6 shadow-md border border-violet-100 hover:shadow-xl hover:border-violet-300 transition-all duration-300 h-full relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <span className="flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-violet-500"></span>
                                </span>
                            </div>
                            <div className="text-violet-500 font-bold text-sm mb-2 uppercase tracking-wider">Step 10</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-violet-600 transition-colors">
                                🔐 인증과 인가 (Authentication)
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                Supabase Auth로 회원가입, 로그인, 로그아웃을 구현합니다. 세션(Session) 토큰이 브라우저에 자동 저장되어 새로고침해도 로그인이 유지되는 마법 같은 원리를 체험합니다!
                            </p>
                            <div className="inline-flex items-center text-sm font-semibold text-violet-600 bg-violet-50 px-3 py-1 rounded-full">
                                Supabase Auth 🔑
                            </div>
                        </div>
                    </Link>

                    {/* Step 11 카드 - 전역 상태 관리 */}
                    <Link href="/learning/globalstate" className="block group md:col-span-2">
                        <div className="bg-white rounded-2xl p-6 shadow-md border border-amber-100 hover:shadow-xl hover:border-amber-300 transition-all duration-300 h-full relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <span className="flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                                </span>
                            </div>
                            <div className="text-amber-500 font-bold text-sm mb-2 uppercase tracking-wider">Step 11</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-amber-600 transition-colors">
                                🐻 전역 상태 관리 (Zustand)
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                props 없이도 모든 컴포넌트가 하나의 데이터를 공유하는 마법! Zustand로 유저 이름, 장바구니, 테마를 전역 상태로 관리하며 Global State의 원리를 체험합니다.
                            </p>
                            <div className="inline-flex items-center text-sm font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                                Zustand Store 🐻
                            </div>
                        </div>
                    </Link>

                    {/* Step 12 카드 - 서버 컴포넌트 & SEO */}
                    <Link href="/learning/serverpage" className="block group md:col-span-2">
                        <div className="bg-white rounded-2xl p-6 shadow-md border border-cyan-100 hover:shadow-xl hover:border-cyan-300 transition-all duration-300 h-full relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4">
                                <span className="flex h-3 w-3">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                                </span>
                            </div>
                            <div className="text-cyan-500 font-bold text-sm mb-2 uppercase tracking-wider">Step 12</div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-3 group-hover:text-cyan-600 transition-colors">
                                🌐 서버 컴포넌트 & SEO
                            </h2>
                            <p className="text-gray-600 leading-relaxed mb-4">
                                드디어 &apos;use client&apos;의 족쇄를 벗습니다! 서버에서 HTML을 미리 완성하는 Server Components와 검색엔진 최적화(SEO) 메타데이터 설정을 체험합니다.
                            </p>
                            <div className="inline-flex items-center text-sm font-semibold text-cyan-600 bg-cyan-50 px-3 py-1 rounded-full">
                                Server Components + Metadata 🌐
                            </div>
                        </div>
                    </Link>

                </div>
            </div>
        </div>
    );
}
