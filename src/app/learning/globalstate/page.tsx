'use client';

import React, { useState } from 'react';
// 💡 우리가 만든 전역 저장소를 import합니다!
// 이 한 줄로 이 페이지는 전역 상태와 연결됩니다.
import { useGlobalStore } from '@/app/lib/store';

// 🛒 상품 목록 데이터 (실제로는 DB에서 가져올 데이터)
const PRODUCTS = [
    { id: 1, name: '🍕 피자', price: 15000 },
    { id: 2, name: '🍔 햄버거', price: 8000 },
    { id: 3, name: '🍣 초밥', price: 12000 },
    { id: 4, name: '🧁 케이크', price: 6000 },
    { id: 5, name: '☕ 라떼', price: 5500 },
    { id: 6, name: '🥤 스무디', price: 7000 },
];

// ============================================================
// 🧩 컴포넌트 A: 유저 이름 설정 (전역 상태에 저장)
// ============================================================
function UserNameSection() {
    // 💡 useGlobalStore에서 필요한 것만 골라서 가져옵니다!
    // 이렇게 하면 userName이 바뀔 때만 이 컴포넌트가 다시 그려집니다. (성능 최적화)
    const userName = useGlobalStore((state) => state.userName);
    const setUserName = useGlobalStore((state) => state.setUserName);
    const [inputValue, setInputValue] = useState('');

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">A</span>
                유저 이름 설정
            </h2>
            <div className="flex gap-3">
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="이름을 입력하세요"
                    className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-800"
                />
                <button
                    onClick={() => { setUserName(inputValue); setInputValue(''); }}
                    disabled={!inputValue.trim()}
                    className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white px-6 py-3 rounded-xl font-bold transition-all"
                >
                    저장
                </button>
            </div>
            {userName && (
                <p className="mt-3 text-sm text-indigo-600 font-semibold animate-fade-in">
                    ✅ 전역 상태에 저장됨: <strong>&quot;{userName}&quot;</strong>
                </p>
            )}
        </div>
    );
}

// ============================================================
// 🧩 컴포넌트 B: 상품 목록 (장바구니에 추가)
// ============================================================
function ProductListSection() {
    const addToCart = useGlobalStore((state) => state.addToCart);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-sm font-bold">B</span>
                상품 목록
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PRODUCTS.map((product) => (
                    <button
                        key={product.id}
                        onClick={() => addToCart(product)}
                        className="bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl p-4 text-center transition-all group"
                    >
                        <div className="text-2xl mb-1">{product.name.split(' ')[0]}</div>
                        <div className="text-xs font-bold text-slate-700">{product.name.split(' ')[1]}</div>
                        <div className="text-xs text-slate-400 mt-1">{product.price.toLocaleString()}원</div>
                        <div className="text-[10px] text-emerald-500 font-bold mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            + 담기
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}

// ============================================================
// 🧩 컴포넌트 C: 장바구니 (전역 상태에서 읽어온 데이터)
// ============================================================
function CartSection() {
    // 💡 여기서도 같은 useGlobalStore를 import해서 쓰면, 컴포넌트 B에서 추가한 상품이 여기에 나타납니다!
    //    이것이 바로 "전역 상태"의 마법입니다. props로 넘기거나 하지 않아도 데이터가 공유됩니다.
    const userName = useGlobalStore((state) => state.userName);
    const cartItems = useGlobalStore((state) => state.cartItems);
    const removeFromCart = useGlobalStore((state) => state.removeFromCart);
    const clearCart = useGlobalStore((state) => state.clearCart);

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-sm font-bold">C</span>
                장바구니
                {cartItems.length > 0 && (
                    <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                        {cartItems.reduce((sum, i) => sum + i.quantity, 0)}
                    </span>
                )}
            </h2>

            {/* 유저 이름 표시 (컴포넌트 A에서 저장한 전역 상태!) */}
            {userName && (
                <p className="text-sm text-violet-600 mb-4 font-semibold bg-violet-50 px-3 py-2 rounded-lg">
                    🙋 <strong>{userName}</strong>님의 장바구니
                </p>
            )}

            {cartItems.length === 0 ? (
                <p className="text-slate-400 text-sm text-center py-6">장바구니가 비어있습니다</p>
            ) : (
                <>
                    <div className="space-y-2 mb-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3">
                                <div>
                                    <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                                    <span className="text-xs text-slate-400 ml-2">× {item.quantity}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-sm font-bold text-slate-800">
                                        {(item.price * item.quantity).toLocaleString()}원
                                    </span>
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-400 hover:text-red-600 text-xs font-bold transition-colors"
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-slate-200 pt-4 flex items-center justify-between">
                        <span className="text-lg font-extrabold text-slate-800">
                            합계: {totalPrice.toLocaleString()}원
                        </span>
                        <button
                            onClick={clearCart}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all"
                        >
                            🗑️ 비우기
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

// ============================================================
// 🧩 컴포넌트 D: 테마 토글 (전역 상태)
// ============================================================
function ThemeSection() {
    const theme = useGlobalStore((state) => state.theme);
    const toggleTheme = useGlobalStore((state) => state.toggleTheme);

    return (
        <div className={`rounded-2xl shadow-sm border p-6 transition-colors duration-300 ${theme === 'dark'
                ? 'bg-slate-800 border-slate-600 text-white'
                : 'bg-white border-slate-200 text-slate-800'
            }`}>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${theme === 'dark' ? 'bg-yellow-400 text-slate-800' : 'bg-slate-800 text-white'
                    }`}>D</span>
                테마 설정
            </h2>
            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className={`px-6 py-3 rounded-xl font-bold transition-all ${theme === 'dark'
                            ? 'bg-yellow-400 hover:bg-yellow-300 text-slate-800'
                            : 'bg-slate-800 hover:bg-slate-700 text-white'
                        }`}
                >
                    {theme === 'dark' ? '☀️ 라이트 모드' : '🌙 다크 모드'}
                </button>
                <span className={`text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-500'}`}>
                    현재: <strong>{theme === 'dark' ? '다크' : '라이트'}</strong> 모드
                    (전역 상태로 관리됨)
                </span>
            </div>
        </div>
    );
}

// ============================================================
// 🏠 메인 페이지: 4개의 컴포넌트를 조합
// ============================================================
export default function GlobalStatePage() {
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 flex flex-col items-center">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">11단계: 전역 상태 관리 🐻</h1>
                    <p className="text-slate-600">Zustand로 여러 컴포넌트가 하나의 전역 상태를 공유하는 마법을 체험해 보세요.</p>
                </div>

                {/* 핵심 설명 배너 */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
                    <p className="text-amber-800 text-sm leading-relaxed">
                        💡 아래 <strong>A, B, C, D</strong> 컴포넌트는 서로 <strong>props를 주고받지 않습니다</strong>.
                        모두 <code>useGlobalStore</code>라는 전역 저장소에서 직접 데이터를 읽고 씁니다.
                        A에서 이름을 저장하면 C에서 바로 보이고, B에서 상품을 담으면 C 장바구니에 즉시 나타납니다!
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <UserNameSection />
                    <ProductListSection />
                    <CartSection />
                    <ThemeSection />
                </div>

                {/* 💡 학습 정리 카드 */}
                <div className="mt-8 bg-amber-50 border border-amber-100 rounded-2xl p-6">
                    <h3 className="font-bold text-amber-900 mb-2">💡 무엇을 배웠나요?</h3>
                    <ul className="text-amber-800 text-sm space-y-2 list-disc pl-5 leading-relaxed">
                        <li><strong>Zustand create()</strong>: 전역 상태 저장소를 함수 하나로 만드는 방법을 배웠습니다.</li>
                        <li><strong>useGlobalStore()</strong>: 어떤 컴포넌트에서든 import 한 줄로 전역 상태에 접근합니다.</li>
                        <li><strong>선택적 구독</strong>: <code>state =&gt; state.userName</code>처럼 필요한 상태만 골라 쓰면 성능이 최적화됩니다.</li>
                        <li><strong>Props Drilling 해방</strong>: 부모→자식→손자로 props를 전달하지 않아도 데이터가 공유됩니다!</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
