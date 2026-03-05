// src/app/lib/store.ts
// 🐻 Zustand: 전역 상태 관리 라이브러리
//
// 💡 "전역 상태"란?
// useState는 컴포넌트 안에서만 도는 '로컬 상태'입니다.
// 하지만 로그인 유저 정보나 장바구니처럼 모든 페이지에서 공유해야 하는 데이터는
// '전역 상태(Global State)'로 관리해야 합니다.
//
// Zustand는 이 전역 상태를 "create 함수 하나"로 만들 수 있게 해주는
// 가볍고 트렌디한 곰돌이(🐻) 라이브러리입니다!

import { create } from 'zustand';

// ============================================================
// 📦 타입 정의: "이 전역 저장소에 뭐가 들어있고, 어떤 행동을 할 수 있는지" 설계도
// ============================================================
interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

interface GlobalState {
    // --- 상태 (데이터) ---
    userName: string;
    cartItems: CartItem[];
    theme: 'light' | 'dark';

    // --- 액션 (행동) ---
    setUserName: (name: string) => void;
    addToCart: (item: Omit<CartItem, 'quantity'>) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
    toggleTheme: () => void;
}

// ============================================================
// 🏪 스토어 생성: create() 함수 하나로 전역 저장소를 만듭니다!
// ============================================================
// 💡 이 useGlobalStore를 아무 컴포넌트에서나 import해서 쓰면
//    모든 페이지가 같은 데이터를 바라보게 됩니다. (= 전역 상태!)
export const useGlobalStore = create<GlobalState>((set) => ({
    // --- 초기 상태값 ---
    userName: '',
    cartItems: [],
    theme: 'light',

    // --- 액션 함수들 ---

    // 💡 set(): Zustand가 제공하는 상태 업데이트 함수.
    // useState의 setState와 비슷하지만, 어디서든 호출 가능!
    setUserName: (name) => set({ userName: name }),

    // 장바구니에 상품 추가 (이미 있으면 수량만 +1)
    addToCart: (item) => set((state) => {
        const existing = state.cartItems.find((ci) => ci.id === item.id);
        if (existing) {
            return {
                cartItems: state.cartItems.map((ci) =>
                    ci.id === item.id
                        ? { ...ci, quantity: ci.quantity + 1 }
                        : ci
                ),
            };
        }
        return { cartItems: [...state.cartItems, { ...item, quantity: 1 }] };
    }),

    // 장바구니에서 상품 제거
    removeFromCart: (id) => set((state) => ({
        cartItems: state.cartItems.filter((ci) => ci.id !== id),
    })),

    // 장바구니 비우기
    clearCart: () => set({ cartItems: [] }),

    // 테마 토글 (라이트 ↔ 다크)
    toggleTheme: () => set((state) => ({
        theme: state.theme === 'light' ? 'dark' : 'light',
    })),
}));
