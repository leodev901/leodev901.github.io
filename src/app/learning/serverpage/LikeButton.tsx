'use client';
// 💡 이 파일에만 'use client'가 붙어있습니다!
// 이 컴포넌트는 "좋아요 버튼"처럼 유저의 클릭에 반응해야 하는 인터랙티브한 부분이므로
// 브라우저에서 동작하는 클라이언트 컴포넌트로 선언합니다.
//
// 반면 이 컴포넌트를 감싸고 있는 부모 page.tsx는 'use client'가 없으므로
// 서버에서 미리 HTML을 만들어서 보내주는 서버 컴포넌트입니다!

import React, { useState } from 'react';

interface LikeButtonProps {
    initialLikes: number; // 💡 서버에서 미리 계산해서 넘겨준 초기 좋아요 수
}

export default function LikeButton({ initialLikes }: LikeButtonProps) {
    // 💡 useState는 브라우저에서만 동작합니다.
    // 그래서 이 컴포넌트는 반드시 'use client'가 필요합니다!
    const [likes, setLikes] = useState(initialLikes);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        if (isLiked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setIsLiked(!isLiked);
    };

    return (
        <button
            onClick={handleLike}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all ${isLiked
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-200 scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-500'
                }`}
        >
            <span className={`transition-transform ${isLiked ? 'scale-125' : ''}`}>
                {isLiked ? '❤️' : '🤍'}
            </span>
            {likes}
        </button>
    );
}
