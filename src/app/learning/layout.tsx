import React from 'react';
import Link from 'next/link';

// 💡 Next.js의 핵심 기능: Layout (레이아웃)
// 이 파일(layout.tsx)은 'learning' 폴더와 그 아래에 있는 모든 페이지(/todo, /board 등)에
// 공통적으로 씌워지는 '껍데기(테두리)' 역할을 합니다!
export default function LearningLayout({
    children, // 👈 각 페이지(page.tsx)의 알맹이가 이 자리에 쏙 들어옵니다.
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* 화면 맨 위에 항상 떠 있는 헤더 네비게이션 창 */}
            <nav className="bg-indigo-600 text-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-8">
                            {/* 메인 로고/홈으로 가기 */}
                            <Link href="/learning" className="font-bold text-xl hover:text-indigo-200 transition">
                                🚀 실습 홈
                            </Link>

                            {/* 다른 실습 페이지들로 가는 링크 모음 */}
                            {/* 💡 a 태그 대신 Link 태그를 쓰면 페이지 새로고침 없이 엄청나게 빠르게 이동합니다! (SPA 라우팅) */}
                            <div className="flex space-x-4">
                                <Link href="/learning/todo" className="hover:bg-indigo-500 px-3 py-2 rounded-md transition text-sm font-medium">
                                    📝 4.투두 리스트
                                </Link>
                                <Link href="/learning/board" className="hover:bg-indigo-500 px-3 py-2 rounded-md transition text-sm font-medium">
                                    💾 5.파일 게시판
                                </Link>
                                <Link href="/learning/board2" className="hover:bg-indigo-500 px-3 py-2 rounded-md transition text-sm font-medium text-green-300">
                                    ⚡ 6.DB 게시판
                                </Link>
                                <Link href="/learning/realtimesub" className="hover:bg-indigo-500 px-3 py-2 rounded-md transition text-sm font-medium text-pink-300">
                                    📡 7.실시간 구독
                                </Link>
                                <Link href="/learning/sse" className="hover:bg-indigo-500 px-3 py-2 rounded-md transition text-sm font-medium text-emerald-300">
                                    🤖 8.AI 스트리밍 UI
                                </Link>
                                <Link href="/learning/storage" className="hover:bg-indigo-500 px-3 py-2 rounded-md transition text-sm font-medium text-orange-300">
                                    🗂️ 9.파일 업로드
                                </Link>
                                <Link href="/learning/auth" className="hover:bg-indigo-500 px-3 py-2 rounded-md transition text-sm font-medium text-orange-300">
                                    🗂️ 10.인증
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* 헤더 바로 밑에 각 페이지들의 진짜 내용물이 그려집니다 */}
            <main className="w-full">
                {children}
            </main>
        </div>
    );
}
