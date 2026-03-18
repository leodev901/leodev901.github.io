# 🚀 Step 1: 카운터 앱 (Counter App)

> **핵심 키워드**: `useState`, `onClick`, `'use client'`, `JSX`, `리렌더링`

## 1. 원리 이해 (개념)

React의 가장 큰 특징 중 하나는 "데이터가 바뀌면 화면이 알아서 바뀐다"는 점입니다. 이때 렌더링(화면 갱신)을 촉발시키는 특별한 데이터 보관함을 **상태(State)**라고 부릅니다. 일반적인 JavaScript 변수(`let count = 0`)는 값이 바뀌어도 화면이 변하지 않지만, React의 State는 변경되는 즉시 화면에 변경된 숫자를 다시 그려줍니다(리렌더링).

### 전체 흐름 요약

1.  **상태 선언**: `useState(0)`으로 변화하는 데이터(count)와 변경 함수(setCount)를 준비합니다.
2.  **이벤트 연결**: 버튼에 `onClick`을 달아서, 클릭 시 `setCount`를 호출합니다.
3.  **자동 렌더링**: React가 상태 변경을 감지하고, 바뀐 값으로 화면을 다시 그립니다.

```
[사용자 클릭] → setCount(count + 1) → React가 변경 감지 → 화면 재렌더링 → 새 숫자 표시
```

---

## 2. 핵심 문법 및 용도 가이드 (Skeleton Code)

### **(1) `'use client'` 선언 — 클라이언트 컴포넌트 지정**
```tsx
'use client'; // 상태(useState)나 클릭(onClick)을 쓰려면 가장 위에 무조건 선언!
```
Next.js는 기본적으로 모든 컴포넌트를 서버에서 실행합니다. 하지만 버튼 클릭이나 상태 관리는 브라우저에서 일어나는 일이므로, `'use client'`를 맨 첫 줄에 적어 "이 파일은 브라우저에서 실행해!"라고 선언해야 합니다.

### **(2) `useState` — 상태 선언**
```tsx
import { useState } from 'react';

const [count, setCount] = useState(0);
// count: 현재 값을 읽는 변수 (읽기 전용)
// setCount: 값을 변경하는 전용 함수 (이걸 써야만 화면이 갱신됨!)
// 0: 맨 처음 시작할 때의 기본값
```

### **(3) `onClick` — 이벤트 핸들러 연결**
```tsx
// 방법 A: 간단한 로직은 인라인으로
<button onClick={() => setCount(count + 1)}>증가</button>

// 방법 B: 복잡한 로직은 함수로 분리
const handleIncrease = () => {
    setCount(count + 1);
};
<button onClick={handleIncrease}>증가</button>
```

### **(4) JSX — 자바스크립트 안에서 UI 그리기**
```tsx
return (
    <div>
        {/* 중괄호 {} 안에 자바스크립트 변수를 넣으면 화면에 출력됩니다 */}
        <p>현재 숫자: {count}</p>
        <button onClick={handleIncrease}>올라가랏!</button>
    </div>
);
```

---

## 3. 일반 변수 vs useState 비교

| 구분 | 일반 변수 (`let`) | React 상태 (`useState`) |
|------|:---:|:---:|
| **선언** | `let count = 0` | `const [count, setCount] = useState(0)` |
| **값 변경** | `count = count + 1` | `setCount(count + 1)` |
| **화면 갱신** | ❌ 안 됨 | ✅ 자동 리렌더링 |
| **새로고침 시** | 초기화됨 | 초기화됨 (동일) |
| **적합한 용도** | 계산용 임시 변수 | 화면에 표시되는 데이터 |

> 💡 **핵심 원칙**: 화면에 보여줘야 하는 데이터는 **무조건** `useState`로 관리해야 합니다. 일반 변수로 바꾸면 React는 변경을 눈치채지 못해 화면이 그대로입니다!

---

## 4. 실습 코드 리뷰 


```tsx
// 1. 'use client'가 없으면 Next.js는 이걸 멍청한 HTML(서버 렌더링)로만 그립니다.
// 버튼이 동작하는 '똑똑한' 앱으로 만들려면 맨 첫 줄에 선언해야 합니다.
'use client'; 

// 2. React 핵심 기술 창고에서 useState라는 도구를 꺼내옵니다.
import { useState } from 'react';

export default function CounterApp() {
  // 3. 상태(State) 선언하기!
  // 데이터(count)를 0으로 시작합니다. 
  // 나중에 이 값을 바꾸려면 무조건 setCount(...)를 통해서만 바꿔야 합니다.
  const [count, setCount] = useState(0);

  // 4. 클릭 시 실행될 동작(비즈니스 로직) 함수 만들기
  const handleIncrease = () => {
    // ❌ count = count + 1 (이러면 리액트가 숫자가 바뀐 줄 모름. 화면 안 바뀜!)
    // ✅ setCount(바뀔 새 값)을 넣어야 리액트가 알아채고 화면을 새로고침 해줍니다.
    setCount(count + 1); 
  };

  return (
    // Tailwind CSS를 이용해 여백(p-10)과 가운데 정렬(text-center)을 줍니다.
    <div className="p-10 text-center">
      <h1 className="text-3xl font-bold mb-5">카운터 앱 🔢</h1>
      
      {/* 5. 렌더링(보여주기): 자바스크립트 변수는 {중괄호}로 감싸서 넣습니다. */}
      <p className="text-5xl mb-8">{count}</p>
      
      {/* 6. 이벤트(onClick): 버튼이 클릭될 때 위에 만든 handleIncrease 함수를 실행시킵니다. */}
      <button 
        onClick={handleIncrease}
        // bg-blue-500: 파란색 배경, text-white: 하얀 글씨, rounded-lg: 모서리 둥글게
        className="bg-blue-500 text-white px-6 py-2 rounded-lg"
      >
        숫자 올리기
      </button>
    </div>
  );
}
```
### [`src/app/learning/counter/page.tsx`]
감소(-2)와 증가(+1) 버튼이 있는 카운터 앱입니다.

*   **상태 관리**: `useState(0)`으로 `count` 상태를 관리합니다.
*   **이벤트**: 감소 버튼은 `count - 2`, 증가 버튼은 `count + 1`로 각각 다른 연산을 수행합니다.
*   **인라인 핸들러**: 간단한 로직이므로 별도 함수 없이 `onClick={() => setCount(count - 2)}` 형태로 직접 작성했습니다.
*   **Tailwind CSS**: `bg-red-500`(빨간 배경), `bg-blue-500`(파란 배경)으로 감소/증가 버튼을 시각적으로 구분합니다.
---

## 5. 💡 내가 질문했던 헷갈린 포인트 정리

**Q. 변수 값을 그냥 `count = 10` 처럼 바꾸면 안 되나요?**
* **A.** 안 됩니다! React는 우리가 변수를 그냥 수정하면 눈치채지 못합니다. `setCount(10)` 처럼 변경 전용 함수를 사용해서 *"나 숫자 10으로 바꿀 거니까 화면 다시 그려줘!"* 하고 똑똑 노크를 해야만 화면이 최신 상태로 갱신됩니다.

**Q. 왜 `'use client'`를 꼭 써야 하나요?**
* **A.** 우리는 Next.js라는 강력한 서버 프레임워크를 쓰고 있기 때문입니다. 기본적으로 Next.js의 모든 뼈대는 '서버'에서 그려져서 내려옵니다. 하지만 버튼 클릭이나 상태 관리는 브라우저(Client)에서 일어나는 일이므로, 맨 위에 `'use client'`를 적어서 "이건 사용자 컴퓨터에서 실행할 파일이에요!"라고 알려주어야 합니다.

**Q. `const [count, setCount]` 이 대괄호(`[]`) 문법은 뭔가요?**
* **A.** 이것은 자바스크립트의 **배열 구조 분해 할당**이라는 문법입니다. `useState(0)`은 `[현재값, 변경함수]` 형태의 배열 2개를 돌려주는데, 이걸 한 번에 `count`와 `setCount`라는 이름표를 붙여서 꺼내는 것입니다. 사실 `const result = useState(0); const count = result[0]; const setCount = result[1];` 이렇게 써도 같은 결과이지만, 한 줄로 쓰는 게 훨씬 깔끔하죠!

**Q. `return (...)` 안에 적힌 건 HTML인가요?**
* **A.** 비슷하지만 다릅니다! 이것은 **JSX**라는 React 전용 문법입니다. HTML처럼 생겼지만 자바스크립트 안에서 UI를 표현할 수 있게 해줍니다. HTML과의 차이점: `class` 대신 `className` 사용, 중괄호 `{}`로 자바스크립트 변수 삽입 가능, 반드시 하나의 부모 태그로 감싸야 합니다.

**Q. 왜 `let`이 아니라 `const`로 선언하나요? 값이 바뀌는데 `const`라니?**
* **A.** 좋은 질문입니다! `const [count, setCount]`에서 `count`는 읽기 전용 **스냅샷**입니다. `setCount`를 호출하면 `count` 변수 자체를 수정하는 게 아니라, React가 컴포넌트 함수를 **처음부터 다시 실행**하면서 **새로운 값의 `count`**를 만들어주는 것입니다. 기존 `count`는 건드리지 않으므로 `const`가 맞습니다!

---

## 6. 📐 React 페이지를 만드는 기본 패턴 총정리

### (1) 파일 하나 = 컴포넌트 하나 — 기본 구조

```tsx
'use client';                        // 1. 인터랙션 필요 시 맨 첫 줄

import { useState, useEffect } from 'react';  // 2. 필요한 것만 import
import Link from 'next/link';

// 3. 컴포넌트 함수 선언 (함수명은 PascalCase — 첫 글자 대문자!)
//    파일명이 page.tsx이면 export default 필수!
export default function MyPage() {

    // 4. 상태 선언 (화면에 보이는 데이터)
    const [value, setValue] = useState('');

    // 5. 이펙트 (페이지가 켜질 때 한 번 실행)
    useEffect(() => {
        // 초기 데이터 로드 등
    }, []);

    // 6. 이벤트 핸들러 (로직 함수)
    const handleClick = () => {
        setValue('변경!');
    };

    // 7. JSX 반환 — 반드시 하나의 부모 태그로 감싸야 함
    return (
        <div>
            <h1>{value}</h1>
            <button onClick={handleClick}>클릭</button>
        </div>
    );
}
```

---

### (2) Next.js + React 약속된(예약된) 이름들

```tsx
// ─── 파일 이름 약속 ─────────────────────────────────
page.tsx          // 해당 경로의 페이지 (필수)
layout.tsx        // 해당 경로 전체를 감싸는 껍데기
loading.tsx       // 페이지 로딩 중 표시할 UI
error.tsx         // 에러 발생 시 표시할 UI
not-found.tsx     // 404 페이지

// ─── export 이름 약속 ────────────────────────────────
export default function Page()              // 페이지 컴포넌트 (이름은 자유, default가 핵심!)
export const metadata = { ... }             // 고정 SEO
export async function generateMetadata()    // 동적 SEO
export async function generateStaticParams() // 정적 경로 미리 생성
```

---

### (3) 컴포넌트 선언 방법 — 3가지 모두 같습니다

```tsx
// A. 함수 선언식 (가장 일반적)
export default function MyPage() {
    return <div>안녕</div>;
}

// B. 화살표 함수 (함수 표현식)
const MyPage = () => {
    return <div>안녕</div>;
};
export default MyPage;

// C. 화살표 함수 단축 (return 생략)
const MyPage = () => <div>안녕</div>;
export default MyPage;
```

> 💡 세 가지 모두 동일한 동작입니다. 실무에서는 주로 **A (함수 선언식)** 를 씁니다.

---

### (4) JSX 필수 규칙 — "HTML과 다른 점"

```tsx
// ❌ HTML 방식                  ✅ JSX 방식
class="box"               →    className="box"         // 예약어 충돌 방지
for="id"                  →    htmlFor="id"            // label의 for 속성
<br>                      →    <br />                  // 빈 태그는 자기 닫기 필수
<!-- 주석 -->              →    {/* 주석 */}             // JSX 주석
style="color: red"        →    style={{ color: 'red' }} // 객체 형태!

// ❌ 두 개 형제 태그 (오류!)
return (
    <h1>제목</h1>           
    <p>내용</p>             
)

// ✅ 하나의 부모로 감싸기
return (
    <div>                   // 또는 <> (빈 태그, Fragment)
        <h1>제목</h1>
        <p>내용</p>
    </div>
)
```

---

### (5) 데이터를 화면에 표시하는 방법

```tsx
const name = '레오';
const count = 42;
const isLoggedIn = true;
const items = ['사과', '바나나', '포도'];

return (
    <div>
        {/* 변수 출력 */}
        <p>{name}</p>                        {/* → 레오 */}

        {/* 계산식 */}
        <p>{count * 2}</p>                   {/* → 84 */}

        {/* 조건부 렌더링 */}
        {isLoggedIn && <p>로그인됨</p>}       {/* true일 때만 표시 */}
        {isLoggedIn ? <p>환영</p> : <p>로그인 필요</p>}

        {/* 배열 → 목록 (map 필수, key 필수!) */}
        {items.map((item, index) => (
            <li key={index}>{item}</li>      {/* key가 없으면 경고! */}
        ))}
    </div>
);
```

---

### (6) Props — 부모가 자식에게 데이터 전달

```tsx
// 자식 컴포넌트 정의
function UserCard({ name, age }: { name: string; age: number }) {
    return <p>{name} ({age}세)</p>;
}

// 부모에서 사용
function ParentPage() {
    return <UserCard name="레오" age={25} />;
    //      ↑ 문자열은 ""   ↑ 숫자/변수는 {}
}
```

> 💡 `{ name, age }` 뒤의 `: { name: string; age: number }` 는 **TypeScript 타입 선언**입니다.
> "name은 문자열, age는 숫자를 받아야 해!" 라고 TypeScript에게 알려주는 것입니다.
> 함수 파라미터는 외부에서 값이 들어오는 곳이라 TypeScript가 타입을 스스로 알 수 없어서 **직접 선언해야** 합니다.

---

### (7) 이벤트 핸들러 패턴 정리

```tsx
// 클릭
<button onClick={() => doSomething()}>클릭</button>
<button onClick={handleClick}>클릭</button>   // 함수만 넘길 때 () 생략

// 입력 (onChange)
<input onChange={(e) => setValue(e.target.value)} />

// 폼 제출
<form onSubmit={(e) => {
    e.preventDefault();   // 브라우저 새로고침 막기 (필수!)
    handleSubmit();
}}>

// 자주 쓰는 이벤트들
onClick     // 클릭
onChange    // 입력값 변경
onSubmit    // 폼 제출
onKeyDown   // 키보드 누름
onFocus     // 포커스 들어옴
onBlur      // 포커스 나감
onMouseOver // 마우스 올림
```

---

### (8) TypeScript 타입 선언 — 언제 필수? 언제 생략 가능?

TypeScript는 타입을 직접 선언하지 않아도 **추론(Inference)** 할 수 있는 경우엔 생략 가능합니다:

```tsx
// ✅ 초기값이 있으면 TypeScript가 알아서 추론 → 생략 가능
const count = 0;               // → 타입: number (자동 추론)
const name = "레오";            // → 타입: string (자동 추론)
const [value] = useState(0);   // → 타입: number (자동 추론)
const isOn = true;             // → 타입: boolean (자동 추론)

// ❌ 함수 파라미터 = 외부에서 들어오는 값 → TypeScript가 알 방법 없음 → 선언 필수!
function greet({ name }: { name: string }) { ... }
//                       ↑ 이게 없으면 TypeScript 오류!
```

| 상황 | 타입 선언 | 이유 |
|------|:--------:|------|
| 함수 **파라미터** | **필수** | 외부에서 뭐가 들어올지 모름 |
| 변수 + **초기값** | 생략 가능 | TypeScript가 값 보고 추론 |
| 함수 **return 값** | 대부분 생략 | return 값 보고 추론 |

```tsx
// 콜론(:) 뒤가 타입 선언 자리
const age: number = 25;           // 변수 타입 (초기값 있으므로 생략해도 됨)
function fn(x: number): string    // 파라미터 타입, return 타입
```
