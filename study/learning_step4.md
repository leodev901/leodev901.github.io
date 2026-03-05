# 💾 Step 4: 파일 기반 저장 게시판 (File-based Board)

> **핵심 키워드**: `API Routes`, `fs` 모듈, `fetch` 통신, `useEffect`, `async/await`, `JSON`

## 1. 원리 이해 (개념)

지금까지의 데이터(상태)는 브라우저를 **새로고침(F5)하는 순간 흔적도 없이 증발**했습니다. 메모리(RAM)에 잠시 떠 있다가 날아가기 때문이죠. 데이터를 영구적으로 보관하려면 누군가(서버)가 하드디스크 같은 곳에 진짜 '파일'이나 'DB' 형태로 써주어야 합니다.

이 단계에서는 프론트엔드(`page.tsx`)가 백엔드 서버(`route.ts`) 점원에게 **"내가 쓴 글 좀 저장해 줘!" (POST)**, **"저장된 글 목록 좀 다시 줘!" (GET)** 라고 통신(`fetch`)을 요청하고, 백엔드는 Node.js의 파일 시스템(`fs`) 도구를 써서 컴퓨터에 `data.json`이라는 실제 파일을 만들고 기록하는 흐름을 배웠습니다.

### 전체 흐름 요약

```
[브라우저 - 프론트엔드]                    [서버 - 백엔드]
                                     
page.tsx                              api/board/route.ts
  │                                      │
  ├─ useEffect(최초 1회) ─────GET────→   GET() → fs.readFile → data.json 읽기
  │                        ←──JSON 응답──┘              │
  ├─ setPosts(data)                      │              ▼
  │                                      │         [data.json 파일]
  ├─ handleSubmit(새 글) ─────POST───→   POST() → fs.writeFile → data.json 쓰기
  │                        ←──201 응답──┘
  └─ fetchPosts() → 목록 갱신
```

---

## 2. 핵심 문법 및 용도 가이드 (Skeleton Code)

### **(1) `useEffect` — 페이지 로드 시 딱 한 번 실행**
```tsx
'use client'; 
import { useState, useEffect } from 'react';

useEffect(() => {
    fetchPosts(); // 컴포넌트가 화면에 뿅! 나타나면 즉시 실행
}, []); // 👈 빈 배열 = "처음 1번만 실행해"
```
- `[]` (빈 의존성 배열): 어떤 값도 감시하지 않으므로, 컴포넌트가 태어날 때(mount) 딱 한 번만 실행됩니다.
- 주로 서버에서 초기 데이터를 가져올 때 사용합니다.

### **(2) `fetch` GET — 데이터 가져오기 (조회)**
```tsx
const fetchPosts = async () => {
    const response = await fetch('/api/board'); // 서버에 노크 (기본값 GET)
    const data = await response.json();         // JSON 보따리를 풀어서 객체로 변환
    setPosts(data);                             // 화면에 반영!
};
```

### **(3) `fetch` POST — 데이터 보내기 (저장)**
```tsx
const savePost = async () => {
    await fetch('/api/board', {
        method: 'POST',                                    // 전송 방식 지정
        headers: { 'Content-Type': 'application/json' },   // "나 JSON 보낼 거야"
        body: JSON.stringify({ title, content }),           // 객체 → 문자열 포장
    });
    fetchPosts(); // 저장 후 목록 갱신
};
```

### **(4) API Route 핸들러 — 백엔드 코드 (route.ts)**
```typescript
import { NextResponse } from 'next/server';

// Node.js의 기본 파일 접근 도구! (하드디스크 읽고 쓰기)
import fs from 'fs';
import path from 'path';

// 1. 프로젝트 최상위 폴더에 'data.json' 이라는 임시 창고 주소를 찍어놓습니다.
const DATA_FILE_PATH = path.join(process.cwd(), 'data.json');

export async function GET() {
    // 2. 만약 창고 파일(data.json) 자체가 없으면? 텅 빈 배열을 택배로 응답해 줍니다.
    if (!fs.existsSync(DATA_FILE_PATH)) return NextResponse.json([]);
    
    // 3. 파일이 있다면 파일 안의 모든 내용을 문자열로 스윽 읽어옵니다.
    const fileContents = fs.readFileSync(DATA_FILE_PATH, 'utf-8');
    
    // 4. 안전하게 JSON으로 파싱 한 후, 프론트(호출자)에게 200(성공) 신호와 함께 돌려봅니다!
    return NextResponse.json(JSON.parse(fileContents));
}

// POST: 새 글을 파일에 쓰기
export async function POST(request: Request) {
    const newPost = await request.json();
    let posts = [];
    if (fs.existsSync(DATA_FILE_PATH)) {
        posts = JSON.parse(fs.readFileSync(DATA_FILE_PATH, 'utf-8'));
    }
    const postWithId = { id: Date.now(), ...newPost, createdAt: new Date().toISOString() };
    posts.push(postWithId);
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(posts, null, 2));
    return NextResponse.json(postWithId, { status: 201 });
}
```

---

## 3. 프론트엔드 vs 백엔드 역할 비교

| 구분 | 프론트엔드 (`page.tsx`) | 백엔드 (`route.ts`) |
|------|:---:|:---:|
| **실행 환경** | 브라우저 (사용자 컴퓨터) | Node.js 서버 |
| **역할** | 화면 그리기 + 사용자 입력 받기 | 데이터 저장/조회/가공 |
| **파일 접근** | ❌ 불가 (보안상 차단) | ✅ `fs` 모듈로 가능 |
| **DB 접근** | ❌ 직접 불가 | ✅ 가능 |
| **통신 방향** | `fetch()`로 서버에 요청 | `NextResponse`로 응답 |
| **코드 위치** | `src/app/learning/board/` | `src/app/api/board/` |

### REST API 기본 패턴

| HTTP 메서드 | 역할 | 예시 | 별명 |
|:-----------:|:----:|:----:|:----:|
| **GET** | 조회 (읽기) | 게시글 목록 가져오기 | Read |
| **POST** | 생성 (쓰기) | 새 글 저장하기 | Create |
| **PUT** | 수정 (덮어쓰기) | 글 내용 수정하기 | Update |
| **DELETE** | 삭제 | 글 삭제하기 | Delete |

> 💡 이 4가지를 묶어서 **CRUD**라고 부릅니다. 모든 웹 서비스의 백엔드는 궁극적으로 이 4가지 연산의 조합입니다!

---

## 4. 실습 코드 리뷰

### [`src/app/learning/board/page.tsx`] — 프론트엔드
게시글 작성과 목록 조회가 가능한 클라이언트 컴포넌트입니다.

*   **3가지 상태**: `posts` (게시글 배열), `title` (제목 입력), `content` (내용 입력)
*   **useEffect**: 페이지 로드 시 `fetchPosts()`를 1회 호출하여 기존 글을 불러옵니다.
*   **폼 제출**: `<form onSubmit={handleSubmit}>`으로 엔터키/버튼 클릭 시 `e.preventDefault()`로 새로고침을 막고 `fetch POST`를 실행합니다.
*   **최신순 정렬**: `posts.slice().reverse().map(...)` — 원본 배열을 건드리지 않고(slice) 역순으로 뒤집어서(reverse) 최신 글을 먼저 보여줍니다.

### [`src/app/api/board/route.ts`] — 백엔드
파일 시스템 기반 데이터 저장소입니다.

*   **현재 상태**: GitHub Pages 정적 배포 호환을 위해 `fs` 코드는 주석 처리되어 있고, 빈 배열을 반환하는 더미 GET만 활성화되어 있습니다.
*   **로컬 실습**: 주석을 해제하면 `data.json` 파일 기반의 실제 저장/조회가 동작합니다.

---

## 5. 💡 내가 질문했던 헷갈린 포인트 정리

**Q. `id`는 왜 `Date.now()`를 쓰고, `createdAt`은 `new Date().toISOString()`을 쓰나요? 똑같은 날짜 생성기 아닌가요?**
* **A.** 맞습니다. 둘 다 현재 시간을 베이스로 하지만 **출력하는 모양(타입)**이 완전히 다릅니다!
    * `id: Date.now()` → `1709534981000`처럼 1970년부터 흘러간 1/1000초 단위 숫자. 기계가 구별하는 '신분증 번호표'용.
    * `createdAt: new Date().toISOString()` → `"2026-03-04T06:49:41.000Z"` 같은 국제표준시 문자열. 사람이 읽기 좋은 날짜 표시용.

**Q. 프론트엔드의 Interface(`Post`)랑 DB 데이터의 키(Key) 이름이 다르면 어떻게 되나요?**
* **A.** 대참사가 납니다! 자바스크립트는 에러를 안 뱉지만, 화면에는 **`undefined`(빈칸)**가 떠버립니다. 프론트의 `interface`는 "난 무조건 이 모양으로만 받을 거야"라는 계약서입니다. 백엔드가 `title` 대신 `subject`로 이름을 지어서 보내면, 리액트는 "어? `title`이 없네? 그럼 안 그려!" 해버리므로 무조건 이름을 통일해야 합니다.

**Q. `async/await`랑 `.then()`은 뭐가 다른가요?**
* **A.** 둘 다 **비동기 통신의 결과를 기다리는** 방법인데, 문법 스타일이 다릅니다! `.then()` 체이닝은 콜백 지옥(Callback Hell)에 빠지기 쉽고 읽기 어렵습니다. `async/await`는 마치 순차적인 코드처럼 읽히므로 **현대 자바스크립트의 표준**입니다. 기능은 100% 동일합니다.

**Q. `e.preventDefault()`는 왜 쓰나요?**
* **A.** HTML `<form>` 태그는 버튼을 누르면 기본적으로 **페이지를 새로고침**합니다 (전통적인 HTML의 행동). 하지만 React(SPA)에서는 새로고침이 일어나면 모든 상태(State)가 날아가므로, `e.preventDefault()`로 이 기본 행동을 막고, 대신 `fetch`를 사용하여 서버와 통신합니다.

**Q. `JSON.stringify`와 `JSON.parse`는 왜 번갈아 가며 쓰나요?**
* **A.** 자바스크립트 객체(`{ title: "안녕" }`)는 메모리에만 존재하는 살아있는 생물입니다. 이걸 파일에 저장하거나 네트워크로 보내려면 **문자열로 변환(직렬화)**해야 합니다 → `JSON.stringify()`. 반대로 파일에서 읽어오거나 응답을 받으면 다시 **객체로 복원(역직렬화)**해야 합니다 → `JSON.parse()`. 이 한 쌍은 프론트/백엔드 통신에서 영원히 같이 다닙니다!

**Q. 왜 빈 배열 `[]`도 처리해야 하나요? 그냥 안 그리면 안 되나요?**
* **A.** `data.json` 파일이 아직 없거나 글이 0개인 경우를 대비해야 합니다! 빈 배열을 안 돌려주면 `map()` 등의 배열 메서드가 `undefined`에 실행되면서 **화면 전체가 하얗게 크래시**납니다. 백엔드에서 빈 배열이라도 반드시 정상 JSON 응답으로 보내주는 것이 안전한 습관입니다.
