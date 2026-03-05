// 💡 이 파일은 /learning/serverpage 경로의 메타데이터(SEO)를 설정하는 layout입니다.
// Next.js에서 metadata 객체를 export하면 자동으로 <head> 태그에 반영됩니다!
//
// 🔑 중요: metadata는 서버 컴포넌트에서만 설정 가능합니다.
// 'use client'를 붙이면 metadata를 사용할 수 없습니다!

import type { Metadata } from 'next';

// 💡 이 객체를 export하면 Next.js가 자동으로 <title>, <meta> 태그를 생성합니다.
// 검색엔진(구글, 네이버)이 이 페이지를 크롤링할 때 이 정보를 읽어갑니다!
export const metadata: Metadata = {
    title: '12단계: 서버 컴포넌트 & SEO | 프론트엔드 학습',
    description: 'Next.js 서버 컴포넌트와 SEO 메타데이터 설정을 배우는 실습 페이지입니다. 서버에서 HTML을 미리 완성하여 빠른 로딩과 검색엔진 최적화를 동시에 달성합니다.',
    // 💡 Open Graph: 카카오톡이나 슬랙에 링크를 붙여넣었을 때 보이는 미리보기 정보!
    openGraph: {
        title: '12단계: 서버 컴포넌트 & SEO',
        description: 'Next.js의 꽃! 서버 컴포넌트와 SEO를 실습합니다.',
    },
};

export default function ServerPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
