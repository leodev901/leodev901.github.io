# ⚡ Step 5: Supabase 게시판 (BaaS 연동 및 실무 에러 핸들링)

> **핵심 키워드**: `Supabase`, `객체 구조 분해 할당({ data, error, status })`, `환경변수(.env.local)`, `스키마 권한`

## 1. 원리 이해 (개념)

4단계 파일 저장소(`data.json`)는 나 혼자 테스트할 때는 충분하지만, 수백 명이 동시에 글을 쓰는 실제 서비스에서는 파일이 꼬이고 망가집니다. 그래서 전 세계의 개발자들은 데이터를 튼튼하고 안전하게 관리하는 전용 창고인 **데이터베이스(DB)**를 씁니다.
우리는 백엔드 서버를 일일이 개발할 필요 없이, 프론트엔드에서 직통으로 DB와 쉽게 통신하게 해주는 '서비스형 백엔드(BaaS)', **Supabase(수파베이스)**를 연결했습니다.

이제 우리 웹앱은 내가 노트북을 꺼도 인터넷 너머 Supabase 서버에 글을 평생 보관합니다!

### 전체 흐름 요약

```
[프론트엔드 page.tsx]              [Supabase 클라우드]
                                  
supabase.from('posts')            PostgreSQL DB
  ├─ .select('*') ──GET으로──→     posts 테이블에서 읽기
  │              ←──{data}───┘
  └─ .insert([...]) ──POST로──→   posts 테이블에 쓰기
                  ←──{error}──┘
```

---

## 2. 핵심 문법 및 용도 가이드 (Skeleton Code)

### **(1) Supabase 클라이언트 연결 — `lib/supabase.ts`**
```typescript
import { createClient } from '@supabase/supabase-js';

// 금고(.env.local)에서 비밀번호를 꺼냅니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    db: { schema: 'leodev901' } // 우리만의 VIP 룸(커스텀 스키마)
});
```

### **(2) 데이터 읽기 — SELECT (구조 분해 할당)**
```tsx
const fetchPosts = async () => {
    // 💡 Supabase 응답 상자에서 3가지만 쏙 뽑기!
    const { data, error, status } = await supabase
        .from('posts')       // 어떤 테이블?
        .select('*')         // 모든 컬럼 가져와
        .order('created_at', { ascending: false }); // 최신순 정렬

    if (error) {
        console.error(`[Error ${status}]`, error);
        return;
    }
    if (data) setPosts(data);
};
```

### **(3) 데이터 쓰기 — INSERT**
```tsx
const handleSubmit = async () => {
    // insert 안에는 항상 배열([]) 형태로 넣어야 합니다!
    const { error, status } = await supabase
        .from('posts')
        .insert([{ title, content }]);

    if (error) {
        console.error(`저장 실패 (코드: ${status})`, error);
        return;
    }
    fetchPosts(); // 새로 쓴 글이 목록에 뜨도록 갱신
};
```

### **(4) 에러 핸들링 — status 코드 활용**
```tsx
if (error) {
    if (status === 401) alert("로그인이 필요합니다!");
    else if (status === 403) alert("권한이 없습니다!");
    else if (status === 500) alert("서버 오류가 발생했습니다!");
    throw error;
}
```

### **(5) 환경변수 — `.env.local` 비밀 금고**
```properties
NEXT_PUBLIC_SUPABASE_URL=당신의_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=당신의_비밀키
```
- `NEXT_PUBLIC_` 접두사가 붙어야 프론트엔드(브라우저)에서 접근 가능합니다.
- `.gitignore`에 의해 Git에 올라가지 않아 해커로부터 보호됩니다.

---

## 3. fetch API (Step 4) vs Supabase SDK (Step 5) 비교

| 구분 | fetch API (Step 4) | Supabase SDK (Step 5) |
|------|:---:|:---:|
| **백엔드 코드** | ✅ 직접 작성 (`route.ts`) | ❌ 불필요 (SDK가 대신) |
| **데이터 저장소** | 로컬 파일 (`data.json`) | 클라우드 DB (PostgreSQL) |
| **데이터 영속성** | 서버 재시작 시 유지 | 영구 유지 (클라우드) |
| **다수 사용자** | ❌ 파일 충돌 위험 | ✅ 동시 접속 안전 |
| **배포 제약** | 서버 필요 | 정적 호스팅 OK |
| **통신 방식** | `fetch('/api/board')` | `supabase.from('posts').select()` |
| **에러 정보** | `response.ok` 정도 | `{ error, status }` 상세 정보 |
| **학습 가치** | HTTP 통신 원리 이해 | 실무 BaaS 패턴 경험 |

> 💡 **둘 다 중요합니다!** Step 4는 HTTP 통신의 기본 원리를 이해하기 위한 것이고, Step 5는 실무에서 생산성을 높이는 방법입니다.

---

## 4. 실습 코드 리뷰

### [`src/app/lib/supabase.ts`] — Supabase 연결 설정
- `createClient()`로 Supabase와의 영구 연결 파이프를 생성합니다.
- `db: { schema: 'leodev901' }` 옵션으로 기본 `public` 대신 커스텀 스키마를 사용합니다.
- 다른 모든 파일에서 이 `supabase` 변수를 `import`해서 공유합니다.

### [`src/app/learning/board2/page.tsx`] — Supabase 연동 게시판
Step 4의 `board/page.tsx`와 구조는 거의 동일하지만, `fetch` 대신 `supabase` SDK를 사용합니다.

*   **구조 분해 할당**: `const { data, error, status } = await supabase...` — 응답에서 필요한 것만 쏙 뽑습니다.
*   **에러 핸들링**: `error`와 `status`로 무슨 에러인지 정확히 파악 가능합니다.
*   **백엔드 코드 없음**: `api/board/route.ts` 같은 백엔드가 필요 없습니다. 프론트에서 DB를 직접 찌릅니다!

---

## 5. 💡 내가 질문했던 헷갈린 포인트 정리

**Q. 에러가 났을 때 `response` 대신 굳이 왜 `{ error }`로 변수명을 받을까요? 정해진 약속어인가요?**
* **A.** 아뇨! `const response = await supabase...` 이렇게 한 덩이로 받아서 나중에 `if(response.error)` 처럼 써도 완전 똑같이 동작합니다! 하지만 전 세계 프론트엔드 개발자들이 코드를 조금이라도 짧고 간지나게(?) 쓰고 싶어서 **객체 구조 분해 할당** 문법을 일상적으로 사용합니다. Supabase가 주는 포장 상자 안에 이미 `error`, `status`, `data`라는 이름표가 붙어있기 때문에, 우리가 중괄호 `{}` 문법으로 자석처럼 이름이 일치하는 놈들만 쏙쏙 끄집어내는 원리입니다.

**Q. 처음에 `status` 에러를 콘솔에서 봤을 때 `PGRST106: The schema must be one of the following: public...` 이런 게 떴어요. 왜 그랬죠?**
* **A.** 제가 커스텀 스키마(`leodev901`)를 만들었는데, 정작 Supabase 방장이 **"이 방은 외부(프론트엔드)에서 함부로 문 못 열어! `public` 방만 외부 접속을 허락해 줄 거야!"** 라고 막았던 에러입니다. 대시보드 → Settings → API 설정에서 **Exposed schemas** 옵션에 `leodev901`을 추가해서 통과했습니다.

**Q. `anon key`를 프론트 코드에 넣으면 해킹되지 않나요?**
* **A.** 좋은 질문입니다! `anon key`는 이름 그대로 "익명(anonymous) 접근용 열쇠"입니다. 이 키 자체로는 DB를 조작할 수 없고, **RLS(Row Level Security)** 정책이 허용한 범위 내에서만 데이터에 접근 가능합니다. 진짜 위험한 키는 `service_role key`인데, 이건 절대 프론트에 넣으면 안 되고 서버에서만 써야 합니다!

**Q. `schema`(스키마)란 뭔가요?**
* **A.** 데이터베이스 안에 있는 "방" 또는 "구역"이라고 생각하면 됩니다. 하나의 DB(건물) 안에 `public`(기본 방), `leodev901`(우리 전용 방) 같은 여러 구역이 있고, 각 구역 안에 `posts`, `users` 같은 테이블(책상)들이 있습니다. 스키마를 나누면 프로젝트별로 깔끔하게 데이터를 관리할 수 있습니다.

**Q. `insert()`에 왜 배열(`[{...}]`)로 넣어야 하나요? 객체(`{...}`) 하나면 안 되나요?**
* **A.** Supabase는 한 번에 여러 개를 넣는 **벌크 인서트(Bulk Insert)**를 기본 지원합니다. `insert([{글1}, {글2}, {글3}])` 처럼 한 방에 3개를 넣을 수 있어서 성능이 매우 좋습니다. 하나만 넣을 때도 통일성을 위해 항상 배열로 감싸는 것이 Supabase의 규칙입니다.
