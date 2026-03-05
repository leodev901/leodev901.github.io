# 🐻 Step 11: 전역 상태 관리 (Global State Management with Zustand)

> **핵심 키워드**: `Zustand`, `create`, `useGlobalStore`, `set`, `전역 상태`, `Props Drilling`

## 1. 원리 이해 (개념)

### useState의 한계: "Props Drilling" 문제

지금까지 우리는 `useState`로 상태를 관리했습니다. 하지만 이것은 **컴포넌트 안에서만** 도는 '로컬 상태'입니다.

만약 로그인한 유저 이름을 5단계 아래의 손자 컴포넌트에서 보여줘야 한다면?

```
App → Layout → Page → Section → Card → UserName (여기서 필요!)
      props↓   props↓   props↓   props↓   props↓
```

이렇게 중간 컴포넌트들이 자기는 안 쓰는 데이터를 아래로 계속 전달하는 걸 **Props Drilling**이라 부르며, 코드가 매우 지저분해집니다!

### Zustand의 해결책: "전역 저장소"

```
App → Layout → Page → Section → Card → UserName
                                          ↑
                              useGlobalStore에서 직접 가져옴!
                              (중간 컴포넌트는 아무것도 안 함)
```

Zustand는 **하나의 전역 저장소(Store)**를 만들고, 어떤 컴포넌트에서든 `import` 한 줄로 데이터에 접근할 수 있게 해줍니다.

---

## 2. 핵심 문법 및 용도 가이드 (Skeleton Code)

### **(1) 스토어 만들기 (create)**
```tsx
import { create } from 'zustand';

// 타입(설계도) 정의
interface MyStore {
    count: number;                    // 상태 (데이터)
    increase: () => void;             // 액션 (행동)
}

// 전역 저장소 생성
const useMyStore = create<MyStore>((set) => ({
    count: 0,                                       // 초기값
    increase: () => set((state) => ({               // 상태 변경 함수
        count: state.count + 1
    })),
}));
```

### **(2) 컴포넌트에서 사용하기**
```tsx
function MyComponent() {
    // 💡 필요한 상태만 골라서 구독! (선택적 구독 = 성능 최적화)
    const count = useMyStore((state) => state.count);
    const increase = useMyStore((state) => state.increase);

    return <button onClick={increase}>클릭 수: {count}</button>;
}
```

### **(3) set() 함수 패턴 정리**

```tsx
// 패턴 A: 새 값을 직접 대입
set({ userName: '레오' })

// 패턴 B: 이전 상태를 기반으로 계산 (state 콜백)
set((state) => ({ count: state.count + 1 }))

// 패턴 C: 배열 조작 (추가)
set((state) => ({
    items: [...state.items, newItem]
}))

// 패턴 D: 배열 조작 (삭제)
set((state) => ({
    items: state.items.filter((i) => i.id !== targetId)
}))
```

---

## 3. 실습 코드 리뷰 (상세 주석 버전)

### [`src/app/lib/store.ts`] — 전역 저장소
3가지 전역 상태를 하나의 스토어에서 관리합니다:
*   **userName**: 유저 이름 (문자열)
*   **cartItems**: 장바구니 (배열 — 추가/삭제/비우기)
*   **theme**: 테마 설정 ('light' | 'dark')

### [`src/app/learning/globalstate/page.tsx`] — 데모 페이지
4개의 **독립 컴포넌트**가 props 없이 전역 상태를 공유합니다:
*   **컴포넌트 A**: 유저 이름을 입력하고 전역 상태에 저장
*   **컴포넌트 B**: 상품 목록에서 버튼을 눌러 장바구니에 추가
*   **컴포넌트 C**: 장바구니 표시 (A에서 저장한 유저 이름도 함께!)
*   **컴포넌트 D**: 라이트/다크 테마 토글

> 💡 **핵심 포인트**: A↔C, B↔C 사이에 props 전달이 없습니다!
> 모든 컴포넌트가 `useGlobalStore`에서 직접 읽고 쓸 뿐입니다.

---

## 4. useState vs Zustand 비교

| 구분 | useState (로컬) | Zustand (전역) |
|------|:---:|:---:|
| **범위** | 해당 컴포넌트만 | 모든 컴포넌트 |
| **데이터 공유** | props로 전달 (Props Drilling) | import 한 줄 |
| **적합한 데이터** | 폼 입력값, 토글 등 | 로그인 유저, 장바구니, 테마 |
| **설정 난이도** | 없음 | `create()` 한 번 |
| **성능 최적화** | 자동 | 선택적 구독으로 수동 |

---

## 5. 💡 내가 질문했던 헷갈린 포인트 정리

**Q. Redux, Context API, Zustand... 전역 상태 관리 도구가 너무 많은데 왜 Zustand?**
*   **A.** Redux는 강력하지만 보일러플레이트(반복 코드)가 매우 많습니다. Context API는 React 내장이지만 성능 문제(불필요한 리렌더링)가 있습니다. Zustand는 **코드량이 최소**이고 **성능도 좋고** **학습 비용도 낮아** 요즘 가장 트렌디한 선택입니다!

**Q. "선택적 구독"이 뭐예요? 왜 `state => state.userName` 이렇게 써요?**
*   **A.** Zustand는 상태가 바뀔 때마다 구독 중인 컴포넌트를 다시 그립니다. 만약 `useGlobalStore()`만 쓰면 **아무 상태라도 바뀌면** 전부 다시 그려집니다. 하지만 `state => state.userName`처럼 쓰면 **userName이 바뀔 때만** 다시 그립니다. 이것이 성능 최적화의 핵심!

**Q. 페이지를 이동하면 전역 상태가 초기화되나요?**
*   **A.** Next.js의 클라이언트 사이드 네비게이션(Link 컴포넌트)을 쓰면 **유지됩니다!** 하지만 브라우저를 새로고침하면 초기화됩니다. 새로고침해도 유지하고 싶다면 Zustand의 `persist` 미들웨어를 사용하면 localStorage에 자동 저장됩니다.

**Q. 전역 상태를 여러 스토어로 나눌 수 있나요?**
*   **A.** 네! 실무에서는 `useAuthStore`, `useCartStore`, `useThemeStore`처럼 역할별로 나누는 것이 국룰입니다. 하지만 학습 단계에서는 하나로 통합하는 게 이해하기 쉽습니다.
