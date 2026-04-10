# leodev901

개인 커리어와 포트폴리오를 보여주는 `Next.js App Router` 기반 웹 프로젝트입니다.

## Important

- 이 프로젝트를 이해하거나 수정할 때는 반드시 [PROJECT.md](./PROJECT.md)를 함께 참조해야 합니다.
- 이 페이지는 `GitHub Pages`에 배포되는 정적 페이지를 기준으로 구성되어 있습니다.

이 저장소는 단순한 소개 페이지가 아니라 아래 3개 영역을 함께 담고 있습니다.

- 공개 포트폴리오 사이트: 이력, 프로젝트, 블로그, 기술 스크랩, 연락처
- `studio` 관리자 영역: 향후 글/스크랩 작성을 위한 CMS 성격의 대시보드와 에디터
- `learning` 실습 영역: Supabase, 인증, 서버 컴포넌트, 상태관리, 스트리밍 UI 등을 학습한 예제 모음

프로젝트 기획과 UX 방향은 [PROJECT.md](./PROJECT.md)에 정리되어 있으며, 구현 판단의 우선 기준도 해당 문서입니다.

## Tech Stack

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS v4`
- `Supabase`
- `Zustand`
- `next-themes`

## Project Goals

이 프로젝트의 핵심 목적은 아래 3가지를 한 화면 안에서 설득력 있게 보여주는 것입니다.

- 신뢰: Resume / About / 경력 요약
- 실력: Portfolio / Projects / 기술 구현 경험
- 지속성: Blog / Scrap / 학습 기록

최종적으로는 방문자가 `Contact`로 자연스럽게 이어지도록 설계되어 있습니다.

## App Areas

### 1. Public

공개 포트폴리오 사이트 영역입니다.

- `/`
- `/about`
- `/portfolio`
- `/projects`
- `/blog`
- `/scrap`
- `/contact`

현재는 디자인과 정보 구조가 잘 잡혀 있으며, 일부 페이지는 정적 콘텐츠 중심으로 구성되어 있습니다.

### 2. Studio

관리자용 콘텐츠 관리 영역입니다.

- `/studio`
- `/studio/editor`
- `/studio/editor/[id]`

대시보드와 에디터 UI가 먼저 구현되어 있으며, 실데이터 연결은 확장 단계에 가깝습니다.

### 3. Learning

실습과 학습을 위한 별도 영역입니다.

- `/learning`
- `/learning/todo`
- `/learning/board`
- `/learning/board2`
- `/learning/auth`
- `/learning/ssr-auth`
- `/learning/blog`
- `/learning/sse`
- `/learning/storage`
- 그 외 상태관리, 서버 컴포넌트, 프로필, 카운터 예제 등

이 영역은 실제 포트폴리오 본체라기보다, Next.js와 Supabase 기반 기능을 학습하고 검증한 샌드박스에 가깝습니다.

## Directory Overview

```text
src/
  app/
    (public)/           공개 포트폴리오 페이지
    studio/             관리자 대시보드 및 에디터
    learning/           실습용 페이지 모음
    api/board/          정적 배포 호환을 위해 단순화된 예제 API
    lib/                Supabase, Zustand 등 공통 로직
  components/           Header, Footer, ThemeProvider 등 공통 UI

public/
  files/                포트폴리오 PDF, 이력서, 이미지 자산
  ...

study/                  학습 메모 및 단계별 정리 문서
stitch_screens/         UI 시안 및 참고 스크린
PROJECT.md              서비스/UX 기획 문서
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set environment variables

프로젝트 루트에 `.env.local` 파일을 만들고 아래 값을 설정합니다.

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

예시는 [`.env.example`](./.env.example) 파일을 참고하면 됩니다.

### 3. Run the development server

```bash
npm run dev
```

브라우저에서 `http://localhost:3000`을 열면 됩니다.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Supabase Usage

Supabase는 주로 `learning` 영역과 일부 공통 유틸에서 사용됩니다.

- 인증 실습: 이메일 회원가입 / 로그인 / 로그아웃
- 게시글 조회 예제
- SSR 인증 실습
- 커스텀 스키마 `leodev901` 사용

관련 파일:

- `src/app/lib/supabase.ts`
- `src/app/lib/supabase-browser.ts`
- `src/app/lib/supabase-server.ts`

## Current Status

현재 저장소는 아래 상태로 보는 것이 가장 정확합니다.

- 공개 포트폴리오 사이트: 화면 구성과 브랜딩 방향이 구현된 상태
- Studio: CMS UI 초안이 구현된 상태
- Learning: Supabase와 Next.js 기능 실습이 가장 활발하게 반영된 상태
- README: 프로젝트 맞춤형 문서로 정리 완료
- PROJECT.md: 실제 제품 기획의 기준 문서

즉, 이 저장소는 "운영용 포트폴리오 앱"과 "기능 실험용 학습 공간"이 함께 공존하는 구조입니다.

## Notes

- 배포 대상은 `GitHub Pages` 기준의 정적 페이지입니다.
- `src/app/api/board/route.ts`는 정적 배포 호환을 위해 단순화된 상태입니다.
- 일부 페이지는 현재 정적 목업 데이터를 사용합니다.
- 향후에는 `studio`와 공개 `blog / scrap` 영역의 데이터 연결을 강화하는 방향이 자연스럽습니다.

## Reference

- 프로젝트/UX 기획 문서: [PROJECT.md](./PROJECT.md)
