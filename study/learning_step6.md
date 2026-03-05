# 🗺️ Step 6: 라우팅과 레이아웃 (Routing & Layout)

> **핵심 키워드**: `App Router`, `layout.tsx`, `page.tsx`, `children`, `<Link>`, `SPA`

## 1. 원리 이해 (개념)

전통적인 웹사이트 제작 방식(`index.html`, `about.html` 등 파일을 수십 개 만드는 방식)에서 벗어나, Next.js의 현대적인 **파일 시스템 기반 라우팅(File-system Routing)**을 배웠습니다. 
개발자가 직접 주소(URL)를 코드에 등록하는 게 아니라, "폴더 이름 자체가 곧 인터넷 주소가 되는" 엄청나게 직관적인 마법입니다.

또한 모든 화면마다 "헤더", "사이드바", "푸터"를 똑같이 복사해서 붙여넣지 않아도 되도록 도와주는 **레이아웃(`layout.tsx`)** 패턴을 통해 완벽한 화면 조립(Composition)의 원리를 익혔습니다.

### 전체 흐름 요약

```
사용자가 /learning/todo 접속
     ↓
Next.js 엔진이 자동으로:
  1. src/app/layout.tsx (최상위 껍데기) 로드
  2. src/app/learning/layout.tsx (하위 껍데기) 로드
  3. src/app/learning/todo/page.tsx (알맹이) 로드
  4. 껍데기 안의 {children} 자리에 알맹이를 끼워 넣어 완성!
```

---

## 2. 핵심 문법 및 용도 가이드 (Skeleton Code)

### **폴더 구조가 곧 주소 (App Router)**
```text
src/app/
  ├── learning/             ➡️ (주소: /learning)
  │    ├── layout.tsx       (learning 페이지 전체의 공통 껍데기)
  │    ├── page.tsx         (learning 메인 화면 알맹이)
  │    │
  │    ├── todo/            ➡️ (주소: /learning/todo)
  │    │    └── page.tsx    (todo 화면 알맹이)
  │    │
  │    ├── board2/          → (주소: /learning/board2)
  │    │    └── page.tsx    (DB 게시판 알맹이)
  │    │
  │    └── sse/             → (주소: /learning/sse)
  │         └── page.tsx    (AI 스트리밍 알맹이)
```

### **(2) `layout.tsx` — 공통 껍데기 (액자 프레임)**
```tsx
import React from 'react';
import Link from 'next/link';

// 1. 이 파일(layout.tsx)은 'learning' 폴더와 그 아래 모든 페이지에 
// 공통적으로 씌워지는 '껍데기(액자 프레임)' 역할을 합니다!
export default function LearningLayout({
  children, // 👈 2. 사용자가 접속한 각 서브 페이지(page.tsx)의 알맹이가 이 구멍으로 쏙 들어옵니다.
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <nav>공통 네비게이션 헤더 바 (영원히 안 변함!)</nav>
            {/* 사용자가 이동하는 폴더의 page.tsx 알맹이가 여기 쏙 들어옴! */}
            <main>{children}</main>
        </div>
    );
}
```

### **(3) `<Link>` 컴포넌트 — SPA 순간이동**
```tsx
// 💡 `import ... from ...` 문법: "다른 곳에 있는 도구를 내 파일로 빌려와서 쓸게!"
// 'next/link'에서 Link라는 마법의 순간이동 문을 빌려옵니다. (a 태그 대신 사용)
import Link from 'next/link';

// ✅ Next.js 방식: 새로고침 없이 초고속 이동 (SPA)
<Link href="/learning/todo">투두 리스트로 이동!</Link>

// ❌ 전통 HTML 방식: 페이지 전체 새로고침 (느림)
<a href="/learning/todo">투두 리스트로 이동!</a>
```

### **(4) `(public)` 라우트 그룹 — 주소에 안 나타나는 폴더**
```text
src/app/
  ├── (public)/          → 주소에 (public)이 포함되지 않음!
  │    ├── page.tsx      → 주소: / (루트 페이지)
  │    └── about/
  │         └── page.tsx → 주소: /about
```
괄호 `()`로 감싼 폴더는 URL에 영향을 주지 않고, 순수하게 코드 정리용으로만 사용됩니다.

---

## 3. `<a>` 태그 vs `<Link>` 컴포넌트 비교

| 구분 | `<a href="...">` (전통) | `<Link href="...">` (Next.js) |
|------|:---:|:---:|
| **이동 방식** | 페이지 전체 새로고침 | 필요한 부분만 교체 (SPA) |
| **속도** | 느림 (HTML/CSS/JS 전부 다시 다운) | 빠름 (변경된 알맹이만 교체) |
| **로딩 화면** | 하얀 화면 깜빡임 | ❌ 없음 (부드러운 전환) |
| **상태 유지** | ❌ 모든 상태 리셋 | ✅ layout 내 상태 유지 |
| **프리페치** | ❌ 없음 | ✅ 뷰포트에 보이면 미리 로드 |
| **적합한 상황** | 외부 사이트 이동 | 내 사이트 내부 페이지 이동 |

### `page.tsx` vs `layout.tsx` 역할 비교

| 구분 | `page.tsx` (알맹이) | `layout.tsx` (껍데기) |
|------|:---:|:---:|
| **역할** | 해당 주소의 실제 콘텐츠 | 공통 UI (헤더, 사이드바 등) |
| **교체 여부** | 페이지 이동 시 매번 교체 | 페이지 이동 시 유지됨 |
| **개수** | 폴더당 1개 | 폴더당 0~1개 |
| **children** | 없음 (본인이 알맹이) | `{children}`으로 page를 품음 |
| **중첩** | 불가 | 상위→하위로 계속 중첩 가능 |

---

## 4. 실습 코드 리뷰

### [`src/app/learning/layout.tsx`] — 공통 레이아웃 껍데기
모든 `/learning/*` 페이지에 공통으로 적용되는 보라색 상단 헤더 네비게이션 바입니다.

*   **Link 태그 목록**: 투두 리스트, 파일 게시판, DB 게시판, 실시간 구독, AI 스트리밍, 파일 업로드, 인증 등 Step별 실습 페이지로의 링크를 포함합니다.
*   **색상 구분**: 각 메뉴마다 `text-green-300`, `text-pink-300` 등 색상을 달리 적용하여 시각적으로 구분합니다.
*   **`{children}`**: `<main>` 태그 안에 `{children}`을 배치하여, 각 서브 페이지의 알맹이가 이 자리에 렌더링됩니다.

### [`src/app/learning/page.tsx`] — 메인 대시보드
`/learning` 주소로 접속하면 보이는 커리큘럼 카드 목록 대시보드입니다.

*   **카드 그리드**: Step 1~12까지의 실습 카드를 `grid` 레이아웃으로 배치합니다.
*   **Link 래핑**: 각 카드를 `<Link>` 컴포넌트로 감싸서 클릭하면 해당 실습 페이지로 SPA 이동합니다.

---

## 5. 💡 내가 질문했던 헷갈린 포인트 정리

**Q. `page.tsx`가 자동으로 `children` 위치로 가는 건가요? 내가 설정도 안 했는데?**
* **A.** 네, 정확합니다! Next.js 엔진이 배후에서 자동으로 `learning` 레이아웃 안에 `learning` 알맹이를 넣어서 조립해주고, `learning/todo`에 접속 시 `learning` 레이아웃 안에 `todo` 알맹이를 넣어서 조립해 줍니다. 프로그래머는 그저 폴더와 파일 규칙(`layout.tsx`, `page.tsx`) 이름만 잘 맞춰놓으면 됩니다.

**Q. Layout이 중첩되면 어떻게 되나요?**
* **A.** 러시아 인형(마트료시카)처럼 겹겹이 감싸집니다! `app/layout.tsx` → `app/learning/layout.tsx` → `app/learning/serverpage/layout.tsx` 순으로 바깥부터 안쪽까지 레이아웃이 중첩됩니다. 각 layout은 자기 경로와 하위 경로에만 영향을 줍니다.

**Q. SPA(Single Page Application)가 뭔가요?**
* **A.** 전통적인 웹은 페이지를 이동할 때마다 서버에서 완전히 새로운 HTML을 받아왔습니다. SPA는 **HTML 한 장만 로드**하고, 이후에는 JavaScript가 필요한 부분만 갈아 끼우는 방식입니다. `<Link>` 컴포넌트가 바로 이 SPA 방식을 실현합니다. 마치 TV 채널을 돌릴 때 TV 자체는 그대로 있고 화면(채널)만 바뀌는 것과 같습니다!

**Q. `(public)` 같은 괄호 폴더는 무슨 역할인가요?**
* **A.** **라우트 그룹(Route Group)**이라 부릅니다. 괄호 `()`로 감싼 폴더는 URL에 전혀 반영되지 않습니다. 순수하게 **코드 정리용**입니다. 예를 들어 `(marketing)`, `(dashboard)` 폴더로 나누면 각각 다른 레이아웃을 적용할 수 있지만, URL에는 괄호 이름이 나타나지 않습니다.

**Q. 외부 사이트(예: google.com)로 이동할 때도 `<Link>`를 써야 하나요?**
* **A.** ❌ 외부 URL은 `<a>` 태그를 사용합니다! `<Link>`는 **내 프로젝트 내부 경로** 전용입니다. 외부 링크에 `<Link>`를 쓰면 SPA 라우팅이 깨질 수 있습니다. `<a href="https://google.com" target="_blank">구글</a>` 이렇게 쓰세요.
