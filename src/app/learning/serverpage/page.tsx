// 💡 이 파일에는 'use client'가 없습니다!
// Next.js에서 'use client'를 안 적으면 === 서버 컴포넌트(Server Component)입니다.
//
// 🔑 서버 컴포넌트의 핵심:
// 1. 이 코드는 서버(우리 컴퓨터의 Node.js)에서 실행됩니다. 브라우저에 JS가 전달되지 않습니다!
// 2. 서버에서 미리 HTML을 완성한 후, 완성된 HTML만 브라우저로 보냅니다.
// 3. JavaScript 번들 크기가 줄어들어 → 페이지 로딩 속도가 폭발적으로 빨라집니다!
// 4. async/await를 컴포넌트 함수에서 직접 사용할 수 있습니다!

import React from 'react';
// 💡 서버 컴포넌트 안에서 클라이언트 컴포넌트를 import해서 끼워 넣습니다.
// 이것이 바로 Next.js의 "하이브리드 렌더링" 전략입니다!
import LikeButton from './LikeButton';

// 💡 서버에서 현재 시간을 가져오는 함수 (브라우저에서는 실행 불가!)
function getServerTime() {
    return new Date().toLocaleString('ko-KR', {
        timeZone: 'Asia/Seoul',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}

// 💡 서버에서 더미 뉴스 데이터를 생성하는 함수
// 실무에서는 여기서 DB 조회나 외부 API 호출을 합니다.
// "서버에서만 돌아가는 코드"이므로 API 키가 브라우저에 노출될 걱정이 없습니다!
function getLatestNews() {
    return [
        {
            id: 1,
            title: 'Next.js 15: 서버 컴포넌트가 기본값이 된 이유 🚀',
            summary: 'React Server Components가 안정화되면서 Next.js의 기본 렌더링 전략이 되었습니다.',
            author: 'Vercel Team',
            date: '2026-03-05',
            likes: 142,
            category: '프레임워크',
        },
        {
            id: 2,
            title: 'Supabase Edge Functions로 서버리스 API 만들기 ⚡',
            summary: 'Deno 기반 Edge Functions를 활용해 초저지연 API를 구축하는 방법을 소개합니다.',
            author: 'Supabase Blog',
            date: '2026-03-04',
            likes: 98,
            category: 'BaaS',
        },
        {
            id: 3,
            title: 'Zustand vs Jotai vs Recoil: 2026년 상태 관리 트렌드 🐻',
            summary: '가장 트렌디한 전역 상태 관리 라이브러리 3종의 장단점을 비교 분석합니다.',
            author: 'React Weekly',
            date: '2026-03-03',
            likes: 215,
            category: '상태관리',
        },
    ];
}

// 💡 async 함수로 선언 가능! 서버 컴포넌트의 특권입니다.
// 클라이언트 컴포넌트에서는 컴포넌트 함수 자체를 async로 만들 수 없습니다.
export default async function ServerPage() {
    // 💡 이 코드들은 서버에서 실행됩니다. console.log를 쓰면 터미널에 출력됩니다! (브라우저 콘솔 X)
    const serverTime = getServerTime();
    const newsData = getLatestNews();
    console.log('[서버 컴포넌트] 렌더링 시각:', serverTime);

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 flex flex-col items-center">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">12단계: 서버 컴포넌트 & SEO 🌐</h1>
                    <p className="text-slate-600">&apos;use client&apos; 없이 서버에서 HTML을 완성하는 진짜 Next.js의 힘을 체험합니다.</p>
                </div>

                {/* 서버 렌더링 증거 카드 */}
                <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl p-6 mb-8 text-white shadow-xl shadow-blue-200">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">SERVER RENDERED</span>
                        <span className="text-cyan-100 text-xs">이 카드의 내용은 서버에서 미리 만들어졌습니다</span>
                    </div>
                    <p className="text-2xl font-bold mb-1">🕐 서버 렌더링 시각</p>
                    <p className="text-lg font-mono text-cyan-100">{serverTime}</p>
                    <p className="text-xs text-cyan-200 mt-3">
                        💡 이 시간은 브라우저가 아니라 서버(Node.js)에서 계산되었습니다.
                        새로고침하면 이 시각이 바뀌는 것을 볼 수 있습니다!
                    </p>
                </div>

                {/* 서버 vs 클라이언트 비교 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-cyan-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-3 h-3 bg-cyan-500 rounded-full"></span>
                            <h2 className="text-lg font-bold text-slate-800">서버 컴포넌트 영역</h2>
                        </div>
                        <ul className="text-sm text-slate-600 space-y-2">
                            <li>✅ <code className="bg-slate-100 px-1 rounded">use client</code> 없음</li>
                            <li>✅ <code className="bg-slate-100 px-1 rounded">async/await</code> 사용 가능</li>
                            <li>✅ JS 번들에 포함되지 않음 (가벼움!)</li>
                            <li>✅ DB 조회, API 키 사용 가능 (서버만)</li>
                            <li>❌ <code className="bg-slate-100 px-1 rounded">useState</code>, <code className="bg-slate-100 px-1 rounded">onClick</code> 사용 불가</li>
                        </ul>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-orange-200 p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                            <h2 className="text-lg font-bold text-slate-800">클라이언트 컴포넌트 영역</h2>
                        </div>
                        <ul className="text-sm text-slate-600 space-y-2">
                            <li>✅ <code className="bg-slate-100 px-1 rounded">use client</code> 선언 필수</li>
                            <li>✅ <code className="bg-slate-100 px-1 rounded">useState</code>, <code className="bg-slate-100 px-1 rounded">useEffect</code> 사용 가능</li>
                            <li>✅ 클릭, 입력 등 인터랙션 처리</li>
                            <li>❌ JS 번들에 포함됨 (무거움)</li>
                            <li>❌ 서버 전용 코드 사용 불가</li>
                        </ul>
                    </div>
                </div>

                {/* 뉴스 카드 (서버에서 데이터 가져옴 + 좋아요 버튼은 클라이언트) */}
                <h2 className="text-xl font-bold text-slate-800 mb-4">📰 최신 기술 뉴스 (서버에서 가져온 데이터)</h2>
                <div className="space-y-4 mb-8">
                    {newsData.map((news) => (
                        <div key={news.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="bg-cyan-50 text-cyan-700 text-xs font-bold px-2 py-0.5 rounded-full">
                                            {news.category}
                                        </span>
                                        <span className="text-xs text-slate-400">{news.date}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-1">{news.title}</h3>
                                    <p className="text-sm text-slate-500 mb-2">{news.summary}</p>
                                    <p className="text-xs text-slate-400">by {news.author}</p>
                                </div>
                                {/* 💡 여기에 클라이언트 컴포넌트를 "끼워 넣습니다" (아일랜드 패턴) */}
                                {/* 서버 컴포넌트가 초기 좋아요 수를 props로 넘겨줍니다 */}
                                <LikeButton initialLikes={news.likes} />
                            </div>
                        </div>
                    ))}
                </div>

                {/* SEO 섹션 */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 mb-8">
                    <h3 className="font-bold text-emerald-900 mb-3">🔍 SEO (검색엔진 최적화) 란?</h3>
                    <p className="text-sm text-emerald-800 leading-relaxed mb-4">
                        구글이나 네이버 같은 검색엔진 봇이 우리 사이트를 방문했을 때, 페이지의 제목과 설명을 잘 파악할 수 있도록
                        <code className="bg-emerald-100 px-1.5 py-0.5 rounded text-emerald-700 font-mono text-xs">metadata</code>를 설정하는 것입니다.
                    </p>
                    <div className="bg-white rounded-xl p-4 border border-emerald-100">
                        <p className="text-xs text-slate-400 mb-1">이 페이지의 메타데이터 (layout.tsx에서 설정):</p>
                        <p className="text-sm font-bold text-slate-800">📌 Title: &quot;12단계: 서버 컴포넌트 & SEO | 프론트엔드 학습&quot;</p>
                        <p className="text-sm text-slate-600">📝 Description: &quot;Next.js 서버 컴포넌트와 SEO 메타데이터 설정을 배우는 실습 페이지&quot;</p>
                        <p className="text-xs text-slate-400 mt-2">💡 크롬 개발자 도구(F12) → Elements → head 태그 안에서 확인할 수 있습니다!</p>
                    </div>
                </div>

                {/* 학습 정리 */}
                <div className="bg-cyan-50 border border-cyan-100 rounded-2xl p-6">
                    <h3 className="font-bold text-cyan-900 mb-2">💡 무엇을 배웠나요?</h3>
                    <ul className="text-cyan-800 text-sm space-y-2 list-disc pl-5 leading-relaxed">
                        <li><strong>서버 컴포넌트</strong>: <code>use client</code> 없이 서버에서 HTML을 미리 완성하여 브라우저로 보냅니다. JS 번들이 줄어 로딩이 빨라집니다!</li>
                        <li><strong>클라이언트 컴포넌트</strong>: <code>use client</code>를 선언하고 useState, onClick 등 인터랙티브 기능을 담당합니다.</li>
                        <li><strong>하이브리드 렌더링</strong>: 서버 컴포넌트 안에 클라이언트 컴포넌트를 끼워 넣는 &quot;아일랜드(Island)&quot; 패턴으로, 성능과 인터랙션을 동시에 잡습니다.</li>
                        <li><strong>SEO 메타데이터</strong>: <code>metadata</code> 객체로 페이지 제목과 설명을 설정하여 검색엔진에 노출합니다.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
