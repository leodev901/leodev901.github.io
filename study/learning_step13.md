# 📔 Step 13: 노션 스타일 블로그 (서버 컴포넌트 + SEO 실전 적용)

> **핵심 키워드**: `Server Component`, `generateMetadata`, `Island Pattern`, `async component`, `notFound`, `동적 라우팅([id])`

## 1. 원리 이해 (개념)

### 이 블로그의 구조

Step 12에서 이론으로 배운 것을 실전으로 적용합니다:

```
/learning/blog (서버 컴포넌트)
  ├── layout.tsx         → SEO + 공통 레이아웃 (사이드바 포함!) ← 핵심!
  │     └── <BlogSidebar /> ← 이것만 클라이언트! (아일랜드 패턴)
  ├── page.tsx           → 서버에서 게시글 목록 조회 (메인 콘텐츠만)
  └── [id]/page.tsx      → 서버에서 게시글 상세 조회 + 동적 SEO (generateMetadata)
```

> 💡 **사이드바가 `layout.tsx`에 있는 것이 핵심!**
> `/blog`와 `/blog/[id]` 양쪽에 layout이 공통으로 씌워지므로,
> 어느 페이지에 있든 사이드바가 사라지지 않습니다.

### 왜 이렇게 나눴나?

| 파일 | 타입 | 이유 |
|------|:----:|------|
| `layout.tsx` | **서버** | 사이드바 포함 → /blog, /blog/[id] 모두 유지 |
| `page.tsx` (목록) | **서버** | Supabase 직접 조회, SEO 유리 |
| `BlogSidebar.tsx` | **클라이언트** | `usePathname()`으로 현재 URL 읽어서 선택 하이라이트 |
| `[id]/page.tsx` (상세) | **서버** | 본문 조회, 게시글별 동적 SEO |

---

## 2. 핵심 문법 (Skeleton Code)

### **(1) 동적 라우팅: `[id]` 폴더**

```tsx
// /blog/[id]/page.tsx
// URL: /blog/42  →  params.id = "42" (문자열!)
export default async function BlogDetailPage({ params }: { params: { id: string } }) {
    const id = params.id; // URL에서 자동 추출됨!
    ...
}
```

### **(2) generateMetadata: 게시글마다 다른 SEO**

```tsx
// 💡 이 함수가 있으면 layout.tsx의 고정 metadata를 덮어씁니다!
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const { data: post } = await supabase
        .from('posts')
        .select('title, summary')  // SEO용 컬럼만 가져오기
        .eq('id', params.id)
        .single();

    return {
        title: `${post.title} | 나의 블로그`,   // → <title> 태그
        description: post.summary,               // → <meta name="description">
        openGraph: { title: post.title, ... },  // → 카카오톡 미리보기
    };
}
```

### **(3) 아일랜드 패턴: layout에서 사이드바 관리 (사이드바 유지 패턴)**

```tsx
// layout.tsx (async 서버 컴포넌트)
// 💡 layout은 /blog 와 /blog/[id] 양쪽에 공통으로 씌워집니다!
import BlogSidebar from './BlogSidebar'; // 클라이언트 컴포넌트

export default async function BlogLayout({ children }) {
    // 서버에서 posts 목록 조회
    const { data: posts } = await supabase.from('posts').select('id, title, summary, created_at');

    return (
        <div className="flex">
            <BlogSidebar posts={posts} />  {/* 이것만 클라이언트 (아일랜드)! */}
            <div>{children}</div>           {/* /blog → page.tsx, /blog/42 → [id]/page.tsx */}
        </div>
    );
}
```

### **(4) usePathname: URL로 현재 선택 상태 파악**

```tsx
// BlogSidebar.tsx (클라이언트 컴포넌트)
'use client';
import { usePathname } from 'next/navigation';

export default function BlogSidebar({ posts }) {
    // 💡 현재 브라우저 URL 경로를 반환합니다
    //   /learning/blog       → '/learning/blog'
    //   /learning/blog/42    → '/learning/blog/42'
    const pathname = usePathname();

    // URL 끝에서 id 추출: '/learning/blog/42' → 42
    const currentId = Number(pathname.split('/').pop());

    return posts.map(post => {
        const isSelected = currentId === post.id;  // URL 기반으로 선택 여부 판단!
        return (
            <Link href={`/learning/blog/${post.id}`}
                className={isSelected ? 'border-l-2 border-indigo-500 bg-indigo-50' : ''}>
                {post.title}
            </Link>
        );
    });
}
```

> 💡 **useState vs usePathname 비교:**
> - `useState`: 클릭 시 업데이트 → 새로고침하면 초기화, 다른 페이지에서 직접 들어오면 선택 상태 없음
> - `usePathname`: URL 자체가 선택 상태 → 새로고침해도, 직접 URL 입력해도 항상 올바르게 표시!

### **(4) notFound(): 게시글이 없을 때 404 처리**

```tsx
import { notFound } from 'next/navigation';

const { data: post } = await supabase.from('posts').eq('id', params.id).single();

if (!post) {
    notFound();  // Next.js 기본 404 페이지 표시 (예외처리!)
}
```

### **(5) select()로 필요한 컬럼만 가져오기 (성능 최적화)**

```tsx
// ❌ 비효율: 모든 컬럼 가져오기 (content가 매우 길 수 있음)
.select('*')

// ✅ 효율: 목록엔 필요한 것만!
.select('id, title, summary, created_at')  // content 제외!

// 상세 페이지에서만 content 포함
.select('id, title, summary, content, created_at')
```

---

## 3. 실습 코드 리뷰

### [`src/app/learning/blog/layout.tsx`] — 공통 레이아웃 + SEO + 사이드바 ⭐
`async` 서버 컴포넌트로 posts 목록을 조회하고 `<BlogSidebar>`를 렌더링합니다.
`/blog`와 `/blog/[id]` 양쪽에 공통으로 적용되므로 **어느 페이지에 있든 사이드바가 유지**됩니다.
`metadata` 객체로 기본 SEO도 함께 설정합니다.

### [`src/app/learning/blog/page.tsx`] — 목록 페이지 (서버 컴포넌트)
`async` 서버 컴포넌트로 게시글 목록을 직접 조회합니다.
사이드바는 layout이 담당하므로, 이 파일은 **오른쪽 메인 콘텐츠 영역만** 반환합니다.

### [`src/app/learning/blog/BlogSidebar.tsx`] — 사이드바 (클라이언트 컴포넌트)
`usePathname()`으로 현재 URL을 읽어 선택된 게시글을 하이라이트합니다.
`<Link>`로 페이지 이동 (이전의 `useRouter` 방식에서 변경).
서버(layout)에서 받아온 `posts`를 props로 받아 렌더링합니다.

### [`src/app/learning/blog/[id]/page.tsx`] — 상세 페이지 (서버 컴포넌트 + 동적 SEO)
`generateMetadata`로 게시글 DB 데이터 기반의 SEO를 동적 생성합니다.
`notFound()`로 잘못된 ID 접근 시 404 처리를 합니다.
사이드바는 layout이 담당하므로, 이 파일은 **오른쪽 본문 영역만** 반환합니다.

---

## 4. DB 설계 — SEO 컬럼 활용

```
posts 테이블
  id          → URL 파라미터 (/blog/[id])
  title       → SEO title, 목록 표시
  summary     → SEO description (카카오톡 미리보기 설명!) ⭐ 이번에 추가!
  content     → 본문 (상세 페이지에서만 조회)
  created_at  → 작성일 표시
```

> 💡 `summary` 컬럼 하나가 SEO description + 카카오톡 미리보기 설명을 동시에 담당합니다!
> 이것이 **별도 SEO 테이블을 만들지 않고 기존 컬럼을 재활용**하는 실무 정석입니다.

---

## 5. SEO 흐름 정리

```
/learning/blog 접속
  → layout.tsx의 metadata 적용
    → <title>13단계: 노션 스타일 블로그 | 프론트엔드 학습</title>

/learning/blog/42 접속
  → [id]/page.tsx의 generateMetadata 실행 (DB 조회!)
    → <title>{게시글 제목} | 나의 블로그</title>
    → <meta name="description" content="{게시글 summary}" />
```

---

## 6. 💡 헷갈린 포인트 Q&A

**Q. `generateMetadata`가 DB를 두 번 조회하지 않나요? (SEO 한 번 + 본문 한 번)**
*   **A.** 맞습니다! Next.js는 이를 위해 내부적으로 `fetch` 결과를 캐싱합니다. 실무에서는 `React.cache()`로 함수를 감싸서 두 함수에서 같은 DB 조회 함수를 재사용하면 중복 요청이 방지됩니다. 학습 단계에서는 이 정도로 충분합니다.

**Q. BlogSidebar에서 처음엔 `useRouter`를 썼다가 `usePathname`으로 바꾼 이유가 뭔가요?**
*   **A.** 처음 구현은 `useState`로 선택 ID를 관리하고 `useRouter().push()`로 이동했습니다. 하지만 이 방식은 **사이드바가 언마운트(사라졌다 다시 나타남)되면 useState가 초기화**돼서 선택 상태가 풀리는 문제가 있습니다. `usePathname()`은 **URL 자체를 신뢰의 원천(Source of Truth)**으로 삼아, 어떤 상황에서도 현재 URL에 맞는 항목을 정확히 하이라이트합니다:
    ```tsx
    // ❌ 이전 방식: 상태가 초기화되면 하이라이트 사라짐
    const [selectedId, setSelectedId] = useState(null);
    // 컴포넌트 재마운트 → selectedId = null → 하이라이트 없음!

    // ✅ 현재 방식: URL이 항상 기억함
    const pathname = usePathname();          // '/learning/blog/42'
    const currentId = Number(pathname.split('/').pop()); // 42
    // 새로고침해도, 직접 URL 입력해도 42번 항목이 항상 하이라이트!
    ```

**Q. `notFound()`는 무엇인가요?**
*   **A.** Next.js 내장 함수로, 이 함수를 호출하면 자동으로 404 Not Found 페이지를 보여줍니다. 잘못된 ID로 접근하거나 삭제된 게시글에 접근했을 때 사용합니다. `app/not-found.tsx` 파일을 만들어 커스텀 404 페이지를 만들 수도 있습니다.

**Q. 목록 페이지에서 `select('id, title, summary, created_at')`으로 content를 제외한 이유는?**
*   **A.** `content`(본문)는 매우 긴 텍스트일 수 있습니다. 목록 페이지에서는 본문이 필요 없으니, 필요한 컬럼만 가져와서 **네트워크 트래픽과 처리 속도를 최적화**합니다. 이것이 `select('*')` 대신 컬럼명을 명시하는 실무 이유입니다!

**Q. 폴더 이름 `[id]`의 `[]` 대괄호가 무슨 문법인가요? `params`는 항상 하나의 문자열만 받나요?**
*   **A.** `[대괄호]`는 Next.js 약속 문법으로 **"이 자리는 어떤 URL 값이든 받는다"** 는 뜻입니다. 대괄호 안에 쓴 이름이 `params`의 키(key)가 됩니다:
    ```
    [id]/page.tsx         → params.id        (1개)
    [category]/[id]/...   → params.category + params.id  (2개 중첩)
    [...slug]/page.tsx    → params.slug = ["a", "b", "c"]  (가변 길이 — 배열!)
    ```
    기본은 문자열 1개지만, 폴더를 중첩하면 여러 개, `[...slug]` 형태로 쓰면 배열도 받을 수 있습니다.

**Q. `generateMetadata`는 내가 직접 지은 이름인가요? 아니면 약속된 이름인가요?**
*   **A.** **Next.js가 찾는 예약된(약속된) 이름**입니다! `export` 키워드와 함께 이 이름을 사용해야만 Next.js가 자동으로 SEO를 생성합니다. 이름을 바꾸면 전혀 인식하지 못합니다. Next.js의 예약 export 이름들:
    ```tsx
    export const metadata = { ... }           // 고정 SEO
    export async function generateMetadata()  // 동적 SEO ← 이름 바꾸면 동작 안 함!
    export default function Page()            // 페이지 컴포넌트
    export async function generateStaticParams() // 정적 경로 미리 생성
    ```
    마치 React의 `useState`, `useEffect`처럼 **이름 자체에 약속된 의미**가 있습니다.

**Q. `post.summary ?? '게시글 내용을 확인하세요.'` 에서 `??`가 SQL의 `NVL(a, b)`과 같은 건가요?**
*   **A.** 정확합니다! JavaScript의 `??`(Nullish Coalescing)는 **값이 `null` 또는 `undefined`일 때만** 오른쪽 값을 사용합니다. SQL `NVL`/`COALESCE`와 동일한 개념입니다:
    ```tsx
    // JavaScript ??        ←→  SQL COALESCE(summary, '기본값')
    post.summary ?? '기본값'
    // summary가 null/undefined → '기본값' 사용
    // summary가 '실제 내용'    → '실제 내용' 사용
    ```
    주의: 옛날 방식인 `||`(OR)는 `0`이나 빈 문자열 `''`도 대체해버리는 버그가 있어서, 실무에서는 `??`를 씁니다:
    ```tsx
    0 || '기본값'    // → '기본값'  ← 의도치 않은 동작! (0개짜리가 사라짐)
    0 ?? '기본값'    // → 0         ← 의도한 동작! (0도 유효한 값으로 처리)
    ```

---

## 7. 🔄 복습 Q&A — layout.tsx + children + TypeScript 기초

**Q. `/learning/blog`로 접근하면 `layout.tsx`가 자동으로 인식되나요?**
*   **A.** 네, 자동으로 인식됩니다. Next.js는 **파일 이름 자체를 약속**으로 삼아, 같은 폴더에 `layout.tsx`가 있으면 해당 경로의 모든 페이지에 자동 적용합니다. 개발자가 어디에도 "이 레이아웃 써줘"라고 선언할 필요가 없습니다:
    ```
    /learning/blog/
      layout.tsx   ← /learning/blog/* 모든 경로에 자동 적용 (약속!)
      page.tsx     ← /learning/blog 의 본문
      [id]/
        page.tsx   ← /learning/blog/42 의 본문
    ```

**Q. `layout.tsx`의 `children`은 어떻게 동작하나요? `page.tsx`와 서로 선언/참조가 없어 보이는데요?**
*   **A.** 이것이 **Next.js 파일 시스템 기반 라우팅(File-system Based Routing)** 의 핵심입니다. Next.js가 내부적으로 자동으로 조립합니다:
    ```
    [브라우저가 /learning/blog 요청]
         ↓
    Next.js가 폴더를 스캔 → layout.tsx 발견!
         ↓
    layout의 {children} 자리에 page.tsx 결과물 자동 삽입
         ↓
    완성된 HTML을 브라우저로 전송
    ```
    개발자가 `<BlogLayout><BlogListPage /></BlogLayout>` 이렇게 직접 코드를 짜지 않아도, 파일 이름만 보고 Next.js가 알아서 조립합니다. `children`에 무엇이 들어오는지 URL에 따라 자동으로 결정됩니다:
    ```
    /learning/blog 접속     →  children = page.tsx 의 return 값
    /learning/blog/42 접속  →  children = [id]/page.tsx 의 return 값
    ```

**Q. `{ children }: { children: React.ReactNode }` 왜 이렇게 선언하나요?**
*   **A.** 두 부분으로 나뉩니다:
    ```tsx
    function BlogLayout(
        { children }                    // ① 구조 분해 할당 — props에서 children만 꺼냄
        :                               // ② 콜론(:) — "이 값의 타입은?"
        { children: React.ReactNode }   // ③ TypeScript 타입 선언 — ReactNode 타입
    )
    ```
    `React.ReactNode`는 "React가 화면에 그릴 수 있는 건 뭐든 OK" 라는 가장 넓은 타입입니다. children에 어떤 page.tsx가 들어올지 모르기 때문에 이 타입을 씁니다.

**Q. TypeScript에서 `:` 뒤에 타입을 무조건 선언해야 하나요?**
*   **A.** 꼭 그렇지 않습니다. **추론(Inference)** 이 가능한 경우엔 생략할 수 있습니다:
    ```tsx
    // ✅ 초기값이 있으면 TypeScript가 스스로 타입 추론 → 선언 생략 가능
    const count = 0;           // → 타입: number (자동 추론)
    const name = "레오";        // → 타입: string (자동 추론)
    const [value] = useState(0); // → 타입: number (자동 추론)

    // ❌ 함수 파라미터는 외부에서 들어오는 값 → TypeScript가 모름 → 선언 필수!
    function BlogLayout({ children }: { children: React.ReactNode }) { ... }
    ```

    | 상황 | 타입 선언 |
    |------|----------|
    | 함수 **파라미터** (외부에서 들어오는 값) | **필수** |
    | 변수에 **초기값** 있을 때 | 생략 가능 (추론) |
    | 함수 **return 값** | 대부분 생략 가능 (추론) |

**Q. 결국 `children = page.tsx` 라는 건 약속인가요?**
*   **A.** 네, 정확히 두 가지 약속이 합쳐진 것입니다:
    - **React 약속**: 부모 컴포넌트가 자식을 감쌀 때 `children` prop으로 전달
    - **Next.js 약속**: `layout.tsx` + `page.tsx` 가 같은 폴더에 있으면, layout이 page를 자동으로 children에 삽입

    개발자가 명시적으로 연결하지 않아도 **"파일 이름과 폴더 위치가 곧 조립 규칙"** 입니다. 이것이 Next.js App Router의 핵심 철학입니다 🗂️
