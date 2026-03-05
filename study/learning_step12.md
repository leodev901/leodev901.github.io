# 🌐 Step 12: Next.js 고급 기능 (서버 컴포넌트 & SEO)

> **핵심 키워드**: `Server Component`, `Client Component`, `use client`, `metadata`, `generateMetadata`, `async component`, `Island Architecture`

## 1. 원리 이해 (개념)

### 지금까지의 문제: 모든 코드가 브라우저로 전송됨

지금까지 우리는 모든 페이지 맨 위에 `'use client'`를 붙였습니다. 이러면 페이지의 모든 JavaScript 코드가 브라우저로 다운로드됩니다. 결과적으로:
- JS 파일이 커져 **로딩이 느려지고**
- 검색엔진 봇이 **빈 HTML**만 보게 되어 검색에 불리합니다

### 서버 컴포넌트의 해결책

Next.js 서버 컴포넌트는 **서버에서 HTML을 완성**한 후 **완성된 HTML만** 브라우저로 보냅니다:

```
[기존: 클라이언트 컴포넌트]
서버 → JS 코드 전체 전송 → 브라우저가 실행 → HTML 생성 (느림 🐌)

[서버 컴포넌트]
서버 → HTML 완성본 전송 → 브라우저는 띄우기만 (빠름 ⚡)
```

### 하이브리드 전략: 서버 + 클라이언트 조합

실무에서는 **둘 다 씁니다!** 이것을 "아일랜드(Island) 패턴"이라 부릅니다:
- **서버 컴포넌트**: 데이터 표시, 레이아웃 등 (대부분의 코드)
- **클라이언트 컴포넌트**: 버튼 클릭, 입력, 애니메이션 등 (인터랙션이 필요한 부분만)

---

## 2. 핵심 문법 및 용도 가이드 (Skeleton Code)

### **(1) 서버 컴포넌트 (기본값 — `use client` 없음)**
```tsx
// 💡 'use client'를 안 쓰면 = 서버 컴포넌트!
// async 함수로 선언 가능, DB 조회도 가능
export default async function MyPage() {
    // 서버에서 실행됨 (브라우저 X)
    const data = await fetch('https://api.example.com/data');
    const posts = await data.json();

    return <div>{posts.map(p => <p key={p.id}>{p.title}</p>)}</div>;
}
```

### **(2) 클라이언트 컴포넌트 (인터랙션 필요할 때)**
```tsx
'use client'; // ← 이게 있어야 useState, onClick 사용 가능!

import { useState } from 'react';

export default function LikeButton() {
    const [liked, setLiked] = useState(false);
    return <button onClick={() => setLiked(!liked)}>❤️</button>;
}
```

### **(3) 아일랜드 패턴: 서버 안에 클라이언트 끼워 넣기**
```tsx
// page.tsx (서버 컴포넌트)
import LikeButton from './LikeButton'; // 클라이언트 컴포넌트 import

export default async function Page() {
    const data = await getNewsFromDB(); // 서버에서 데이터 가져옴

    return (
        <div>
            <h1>{data.title}</h1>        {/* 서버에서 렌더링 */}
            <p>{data.content}</p>         {/* 서버에서 렌더링 */}
            <LikeButton likes={data.likes} /> {/* 이 부분만 클라이언트! */}
        </div>
    );
}
```

### **(4) SEO 메타데이터 설정 (고정값)**
```tsx
// layout.tsx 또는 page.tsx (서버 컴포넌트에서만 가능!)
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '내 페이지 제목',
    description: '검색엔진에 보여줄 설명',
    keywords: ['Next.js', '블로그', '프론트엔드'],   // 검색 키워드
    authors: [{ name: '레오' }],                      // 작성자
    openGraph: {
        title: '카카오톡/슬랙 미리보기 제목',
        description: '카카오톡/슬랙 미리보기 설명',
        images: ['/og-image.png'],                     // 미리보기 이미지
    },
    robots: { index: true, follow: true },             // 검색엔진 크롤링 허용
};
```

### **(5) SEO 메타데이터 동적 생성 (게시글마다 다를 때)**
```tsx
// /blog/[id]/page.tsx
// 💡 generateMetadata: 게시글 ID에 따라 SEO를 동적으로 만드는 함수!
export async function generateMetadata({ params }: { params: { id: string } }) {
    const { data: post } = await supabase
        .from('posts')
        .select('title, summary, thumbnail_url')
        .eq('id', params.id)
        .single();

    return {
        title: `${post.title} | 내 블로그`,
        description: post.summary,            // ⭐ DB의 '요약' 컬럼 사용!
        openGraph: {
            title: post.title,
            description: post.summary,
            images: [post.thumbnail_url],      // 카카오톡 미리보기 이미지
        },
    };
}

// 메인 컴포넌트 (같은 파일에!)
export default async function BlogDetailPage({ params }: { params: { id: string } }) {
    const { data: post } = await supabase.from('posts').select().eq('id', params.id).single();
    return <h1>{post.title}</h1>;
}
```

---

## 3. `use client`는 정확히 언제 쓰나? (실무 판단 기준)

**서버 컴포넌트에서 onClick은 불가능합니다!** 이벤트 핸들러는 브라우저에서만 동작하기 때문입니다.

| 상황 | 서버 컴포넌트 | 클라이언트 컴포넌트 |
|------|:---:|:---:|
| DB에서 목록 가져와서 뿌리기 | ✅ | |
| 버튼 클릭 시 API 호출 | | ✅ (onClick) |
| 입력폼 (텍스트, 검색) | | ✅ (onChange) |
| 탭/아코디언/드롭다운 열기/닫기 | | ✅ (useState) |
| 실시간 채팅 (SSE, WebSocket) | | ✅ |
| 타이머, 카운트다운 | | ✅ (useEffect) |
| 무한 스크롤 | | ✅ |
| 모달/다이얼로그 열기/닫기 | | ✅ (useState) |
| 다크모드 토글 | | ✅ (Zustand) |

---

## 4. 실무 아키텍처 예시

### 블로그 서비스
```
/blog (서버) — DB에서 게시글 목록 SELECT → HTML로 뿌림
  └─ /blog/[id] (서버) — 해당 게시글 상세 내용 SELECT → HTML로 뿌림
       └─ <CommentForm /> (클라이언트) — 댓글 입력 폼 (onChange, onSubmit)
       └─ <LikeButton /> (클라이언트) — 좋아요 (onClick, useState)
```

### LLM 챗봇 서비스
```
/chat (서버)
  ├─ <Header /> — 서버 (로고, 유저 이름 표시)
  ├─ <AgentSidebar /> — 서버 (에이전트 목록 DB에서 가져옴)
  ├─ <SuggestionCards /> — 서버 ("이런 질문은 어때요?" 카드)
  └─ <ChatWindow /> — ⚡ 클라이언트! (use client)
       ├─ useState로 메시지 배열 관리
       ├─ 입력폼 (onChange, onSubmit)
       └─ SSE/WebSocket으로 실시간 스트리밍 수신
```

> 💡 **서버 80% + 클라이언트 20%** — 대부분의 코드는 데이터를 표시하는 것이고, 인터랙션은 일부분입니다.

---

## 5. SEO 상속과 동적 생성 완전 정복

### Layout 중첩과 SEO 상속

Layout은 중첩됩니다. SEO는 **가장 하위(가까운) 것이 우선** 적용됩니다:
```
/layout.tsx              → title: "내 사이트"
  /blog/layout.tsx       → title: "블로그"        ← /blog 접속 시 이게 적용!
    /blog/[id]/page.tsx  → title: "OOO 게시글"    ← /blog/123 접속 시 이게 적용!
```

| 접속 경로 | 적용되는 title | 이유 |
|----------|--------------|------|
| `/` | "내 사이트" | 최상위 것 (다른 게 없으므로) |
| `/blog` | "블로그" | 중간 것이 상위를 **대체** |
| `/blog/123` | "OOO 게시글" | 가장 하위 것이 **대체** |

> 💡 하위에 SEO가 있으면 상위 것을 무시하고 하위 것을 씁니다. 하위에 없으면 상위 것이 자동 적용(상속)!

### 게시글마다 SEO가 다를 때: `generateMetadata`

고정된 `metadata` 객체 대신 **함수**로 바꾸면, DB 데이터 기반으로 동적 SEO를 생성할 수 있습니다:

```tsx
// metadata (고정): 모든 페이지가 같은 제목
export const metadata = { title: '블로그' };

// generateMetadata (동적): 게시글마다 다른 제목!
export async function generateMetadata({ params }) { ... }
```

### 실무 DB 설계와 SEO 연동

SEO를 DB에 별도 저장하는 것이 아니라, **이미 있는 컬럼**으로 생성합니다:

```sql
-- 실무 블로그 DB 설계
CREATE TABLE posts (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,          -- → SEO title에 사용
    summary TEXT,                 -- → SEO description에 사용 ⭐
    content TEXT NOT NULL,        -- 본문 (길어서 SEO에 부적합)
    thumbnail_url TEXT,           -- → SEO openGraph image에 사용
    author_id UUID,
    created_at TIMESTAMPTZ
);
```

> 💡 `content.slice(0, 150)`처럼 본문을 잘라 쓸 수도 있지만, DB에 `summary`(요약) 컬럼을 별도로 설계하는 것이 **실무 정석**입니다!

---

## 6. 서버 컴포넌트 vs 클라이언트 컴포넌트 비교표

| 구분 | 서버 컴포넌트 | 클라이언트 컴포넌트 |
|------|:---:|:---:|
| **선언 방법** | 아무것도 안 씀 (기본값) | `'use client'` 선언 |
| **실행 환경** | Node.js (서버) | 브라우저 |
| **async/await** | ✅ 사용 가능 | ❌ 컴포넌트 함수에서 불가 |
| **useState/useEffect** | ❌ 사용 불가 | ✅ 사용 가능 |
| **onClick 등 이벤트** | ❌ 사용 불가 | ✅ 사용 가능 |
| **DB 직접 조회** | ✅ 가능 (서버니까!) | ❌ 불가 (보안 위험) |
| **JS 번들 크기** | 포함 안 됨 (가벼움!) | 포함됨 |
| **SEO** | ✅ 유리 (HTML 완성) | ❌ 불리 (빈 HTML) |
| **적합한 용도** | 데이터 표시, 레이아웃 | 버튼, 폼, 애니메이션 |

---

## 7. 실습 코드 리뷰 (상세 주석 버전)

### [`src/app/learning/serverpage/page.tsx`] — 서버 컴포넌트 (메인)
`'use client'` 없이 서버에서 렌더링됩니다. 서버 시간 표시, 뉴스 데이터 로드를 수행합니다.

### [`src/app/learning/serverpage/LikeButton.tsx`] — 클라이언트 컴포넌트 (아일랜드)
좋아요 버튼처럼 유저 인터랙션이 필요한 부분만 `'use client'`로 분리했습니다.

### [`src/app/learning/serverpage/layout.tsx`] — SEO 메타데이터
`metadata` 객체로 페이지 제목, 설명, Open Graph 정보를 설정합니다.

---

## 8. 💡 내가 질문했던 헷갈린 포인트 정리

**Q. Layout 안에 Layout 안에 Layout... 중첩이 가능한가요?**
*   **A.** 네! Next.js는 layout을 자동으로 겹겹이 감쌉니다. `/learning/layout.tsx` 안에 `/learning/serverpage/layout.tsx`가 들어가는 구조입니다. 각 layout은 자기 경로와 하위 경로에만 영향을 줍니다.

**Q. 서버 컴포넌트에서 onClick으로 API를 호출할 수 있지 않나요?**
*   **A.** ❌ 불가능합니다! `onClick`은 "브라우저에서 클릭했을 때 실행해줘"라는 뜻인데, 서버 컴포넌트의 코드는 브라우저에 전달되지 않으므로 실행 자체가 불가능합니다. 모든 이벤트 핸들러(`onClick`, `onChange`, `onSubmit`)는 반드시 `use client` 컴포넌트에서만 사용할 수 있습니다.

**Q. 블로그 상세 페이지는 서버 컴포넌트로 만들고 댓글만 클라이언트로?**
*   **A.** 정확합니다! 이것이 바로 실무에서 가장 많이 쓰는 패턴입니다. 게시글 내용(DB에서 가져와서 뿌리기)은 서버, 댓글 입력/좋아요 버튼(유저 인터랙션)은 클라이언트로 분리합니다.

**Q. LLM 챗봇 서비스는 어떻게 나누나요?**
*   **A.** 헤더, 사이드바(에이전트 목록), 제안 카드 등 고정 UI는 서버 컴포넌트로, 실시간 채팅(SSE/WebSocket 수신, 메시지 입력)만 클라이언트 컴포넌트로 분리합니다. 서버 80% + 클라이언트 20%의 전형적인 비율입니다.

**Q. SEO에 title과 description 밖에 없나요?**
*   **A.** 아닙니다! `keywords`(검색 키워드), `authors`(작성자), `openGraph`(카카오톡/슬랙 미리보기), `robots`(크롤링 허용/차단), `icons`(파비콘) 등 다양한 속성이 있습니다. 문구는 개발자가 직접 입력합니다.

**Q. SEO는 모든 하위 페이지에 다 적어야 하나요? 중첩되면?**
*   **A.** 아닙니다! **가장 하위(가까운) 것이 우선** 적용되고, 하위에 없으면 상위 것이 자동 상속됩니다. 최상위 layout에 기본 SEO를 적고, 특별히 다른 SEO가 필요한 페이지에만 추가로 적으면 됩니다.

**Q. 블로그 게시글마다 SEO가 다를 텐데, DB에 SEO를 따로 저장해야 하나요?**
*   **A.** ❌ 따로 저장하지 않습니다! `generateMetadata()` 함수를 사용하면 이미 DB에 있는 게시글의 `title`, `summary`, `thumbnail_url` 컬럼으로 SEO를 동적 생성합니다. 다만 `content.slice(150)` 같이 본문을 잘라 쓰는 것보다, DB에 `summary`(요약) 컬럼을 별도로 설계하는 것이 실무 정석입니다!

**Q. 서버 컴포넌트에서 console.log를 찍으면 어디에 출력되나요?**
*   **A.** 브라우저 콘솔이 아닌 **터미널(서버 로그)**에 출력됩니다! `npm run dev`를 실행한 터미널 창을 확인해 보세요. 이것이 "이 코드는 서버에서 돌아간다"는 증거입니다.

**Q. 서버 컴포넌트 안에서 useState를 쓰면 어떻게 되나요?**
*   **A.** 에러가 납니다! `useState is not a function` 같은 에러가 뜹니다. useState는 브라우저에서만 동작하는 React Hook이기 때문입니다. 그래서 인터랙션이 필요한 부분만 따로 `'use client'` 컴포넌트로 분리합니다.

**Q. metadata는 왜 서버 컴포넌트에서만 설정 가능한가요?**
*   **A.** SEO 메타데이터는 검색엔진 봇이 HTML의 `<head>` 태그를 읽을 때 필요합니다. 서버에서 HTML을 완성할 때 `<head>`에 미리 넣어줘야 봇이 읽을 수 있습니다. 클라이언트에서 나중에 JavaScript로 넣으면 봇이 놓칠 수 있습니다.

**Q. Open Graph가 뭐예요?**
*   **A.** 카카오톡이나 슬랙에 URL을 붙여넣으면 미리보기(제목, 설명, 이미지)가 뜨죠? 그게 바로 Open Graph 메타데이터를 읽어서 보여주는 것입니다! `openGraph` 속성으로 설정합니다.

**Q. 실무에서는 서버/클라이언트 비율이 어떻게 되나요?**
*   **A.** 일반적으로 **서버 컴포넌트 80% + 클라이언트 컴포넌트 20%** 정도입니다. 대부분의 코드는 데이터를 표시하는 것이고, 인터랙션(버튼, 폼)은 일부분이기 때문입니다. 이 비율이 Next.js의 성능 이점을 최대화합니다!
