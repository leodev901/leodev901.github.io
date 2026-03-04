# PROJECT.md — 커리어/포트폴리오 홈페이지 기획서

## 0) 한 줄 요약
백엔드·AI Agent 프리랜서의 **신뢰(Resume)** + **실력(포트폴리오)** + **지속성(Blog/News)** 를 한 눈에 보여주고, 방문자가 **연락(Contact)** 으로 자연스럽게 이어지도록 설계된 **상단 메뉴 기반(라우팅) 멀티 페이지형 UI**.

---

## 1) 목적 & 성공 기준 (Goals / Success Metrics)
### 목적
- 채용 담당자/클라이언트가 3분 내에 “이 사람 쓸만하다”를 판단할 수 있게 한다.
- 프로젝트/글/스크랩을 통해 “현재도 성장 중”이라는 증거를 제공한다.
- 최종 행동(CTA)은 **Contact / 제안 요청 / 미팅 요청**으로 수렴한다.

### 성공 기준(예시)
- Home → 포트폴리오 클릭률, About(Resume) 클릭률
- Contact 버튼 클릭률 / 이메일 전송 수
- 블로그 글 평균 체류 시간, 재방문율(News/Blog 업데이트로 유도)

---

## 2) 타겟 사용자 & 니즈
1) **채용 담당자 / 면접관**
- “어떤 사람인지”, “검증 가능한 성과”, “기술스택”, “최근 활동”을 빠르게 확인

2) **클라이언트(외주/프리랜서 의뢰자)**
- 어떤 문제를 해결해줄 수 있는지, 납기/운영/품질에 대한 신뢰 근거 필요

3) **동료 개발자/커뮤니티**
- 학습/기술 글, 도구/뉴스 스크랩, 오픈소스/사이드프로젝트 링크 탐색

---

## 3) 톤 & 컨셉 (Look & Feel)
### 스타일
- **Light mode only**(기본), Apple/Notion 같은 **모던 미니멀리즘**
- 과한 색상/장식 금지, “여백 + 타이포그래피 + 카드/라인”으로 정리

### 색상(권장 토큰)
- Background: `#FFFFFF` / `#FAFAFA`(off-white)
- Text: `#111111`(primary) / `#444444`(secondary)
- Border: `#EAEAEA`
- Accent(한 가지만): `#2563EB`(블루) 또는 `#111111`(모노톤 강조)

### 타이포그래피
- Sans-serif (예: Inter / SF Pro / Pretendard 중 택1)
- 본문 16px 기준, 제목은 단계적 스케일(24/32/40)
- 본문 최대 폭 720~860px 권장(가독성)

---

## 4) 페이지 구조 & 라우팅 방식 (중요)
> **Single-page scroll 방식이 아님**  
> 상단 메뉴는 고정(Persistent)되고, 메뉴 클릭 시 **메인 콘텐츠가 라우팅으로 교체**된다.  
> 각 페이지 내부는 길이에 따라 **세로 스크롤**이 발생한다.

### 라우팅 규칙
- Header(상단 메뉴)는 모든 페이지에서 동일 유지
- 메뉴 클릭 → URL 변경 → Main 콘텐츠 교체
- 페이지 이동 시 스크롤은 기본적으로 **Top으로 리셋**
- 상세가 필요하면 nested route로 제공(프로젝트/블로그 상세)

### 공개 URL 설계 (Public)
- `/` : Home
- `/about` : Profile + Resume
- `/portfolio` : 주요 포트폴리오 목록
- `/portfolio/[slug]` : 포트폴리오 상세(선택)
- `/projects` : 시스템 프로젝트 히스토리 (타임라인)
- `/blog` : 학습 블로그 목록
- `/blog/[slug]` : 글 상세
- `/scrap` : 기술 뉴스 스크랩(북마크/요약)
- `/contact` : 연락 / 제안

### 관리자 URL 설계 (Studio / Private)
> 공개 메뉴에는 노출하지 않고, 직접 URL 접근 + 최소 인증(토큰) 권장  
> SEO 차단: `noindex, nofollow`

- `/studio` : 작성 대시보드(초안/발행 목록, 새 글 작성 진입)
- `/studio/blog/new` : 블로그 글 작성
- `/studio/blog/[slug]/edit` : 블로그 글 수정
- `/studio/scrap/new` : 뉴스 스크랩 작성
- `/studio/scrap/[id]/edit` : 뉴스 스크랩 수정

### Top Menu (Public)
- Home / About / 포트폴리오 / Projects / Blog / Tech Scrap / Contact
- 우측 상단 보조 액션(선택): GitHub, LinkedIn, Resume PDF 다운로드

---

## 5) 공통 레이아웃(전 페이지 공통)
### Header (고정)
- 좌측: 로고/이름(클릭 시 Home)
- 메뉴: 활성 상태 표시(underline 또는 pill)
- 스크롤 시 얇은 border + 가벼운 blur(절제)

### Main
- Max width 컨테이너(예: 1100~1200px)
- 페이지 상단 “페이지 제목 + 짧은 설명(1~2줄)” 패턴 유지
- 콘텐츠는 카드/리스트 중심(Notion 느낌)

### Footer
- 저작권/연락 링크/소셜 링크
- “마지막 업데이트 날짜” 표기(신뢰감)

---

## 6) 페이지별 UX 상세

## 6.1 Home (/)
### 목표
- 10초 내 역할/가치 이해 → **포트폴리오 / About / Contact**로 유도

### 구성(상단→하단)
1) Hero
- 포지셔닝: “Backend & AI Agent Freelance Engineer”
- 보조 문장: 해결 영역(운영/자동화/에이전트/엔터프라이즈)
- CTA 2개: `프로젝트 보기`(Primary) / `연락하기`(Secondary)

2) Highlights (3~4개 카드)
- 운영/프로덕션, 설계/개발, 자동화/에이전트, 협업/PM/BA 등

3) Featured 포트폴리오 (3개)
- 대표 프로젝트 카드 + “더 보기” → /portfolio

4) Latest Writing / Scrap (각 2~3개)
- 최신 블로그/스크랩 노출로 “업데이트/성장” 증명

---

## 6.2 About (/about)
### 목표
- 이력/역량/신뢰 근거를 스캔 가능하게 제공 → Resume 다운로드/Contact로 연결

### 구성
- 프로필 요약(3~5줄 + 태그)
- Resume 섹션(타임라인/성과 중심)
- Skills(Backend/Infra/AI/Tooling)
- Proof(숫자 기반 지표 가능하면)
- CTA: Resume PDF / 포트폴리오 / Contact

---

## 6.3 포트폴리오 (/portfolio)
### 목표
- “실력 증거”로서 프로젝트를 빠르게 이해 가능하게

### 리스트 UI
- 카드형 리스트 + 필터/정렬
  - 필터: AI Agent / Backend / Data / DevOps / Tooling
  - 정렬: 최신순(기본) / 임팩트순(선택)

### 카드 필드(권장)
- Title / One-liner / Tech tags / Role / Status(운영중·PoC·중단)
- “What it solves” 1줄
- Links: Demo / GitHub / Docs

### 프로젝트 상세(/portfolio/[slug]) — 선택
- Problem → Approach → Architecture(간단) → Result → Learnings
- “이 프로젝트로 할 수 있는 일”을 명확히 문장화

---

## 6.3.1 Projects (/projects)
### 목표
- 그동안 회사를 다니며 진행했던 시스템 프로젝트 이력을 연대기(Timeline) 형태로 나열하여 전문성과 경험의 깊이를 증명.

### UX
- 연도별(Recent/Past 등) 그룹화 및 좌측 타임라인 선 유지
- 각 프로젝트마다 기간, 역할, 상세 성과(Bullet), 기술 스택(Badge) 노출

---

## 6.4 Blog (/blog)
### 목표
- 학습/실무 기록으로 전문성 증명, 검색/분류 용이(Notion처럼)

### UX
- 태그/카테고리 필터 + 검색
- 글 카드: 제목/요약/읽는 시간/작성일/태그
- 글 상세: 목차(TOC) + 코드/이미지 가독성 최우선

---

## 6.5 Tech Scrap (/scrap)
### 목표
- 단순 링크 모음이 아니라 **요약 + 내 코멘트**로 가치 제공
- 관심 분야/트렌드 감각을 “증거”로 축적

### UX
- 리스트 + 출처 + 날짜 + 태그
- 항목 상세(선택): 원문 링크 + 내 요약 + 내 코멘트
- “주간/월간 Top 5” 큐레이션(선택)

---

## 6.6 Contact (/contact)
### 목표
- 가장 마찰이 낮은 연락 경로 제공 + 스팸 방지 + 신뢰감

### 구성
- 이메일(기본), 폼(선택), 소셜(GitHub/LinkedIn)
- “일하는 방식” 짧은 안내(의뢰 범위/커뮤니케이션/프로세스)

---

## 6.7 글 작성 Studio (/studio) — 관리자 전용
### 목표
- 블로그 글/뉴스 스크랩을 **빠르게 생성/수정/발행**
- 반드시 **Markdown 입력 + 실시간 Preview**
- 유실 방지(Autosave, Draft)

### 공통 IA(정보 구조)
- 상단 Bar: 상태 + 액션(저장/미리보기/발행/내보내기)
- 본문: Markdown Editor + Preview
- 우측 Sidebar: 메타데이터(제목, slug/id, 태그, 요약, 공개여부 등)

---

## 6.7.1 Studio 대시보드 (/studio)
### 기능
- 탭: `Draft / Published`
- 리스트 표시: Title, Type(Blog/Scrap), UpdatedAt, Status, Tags
- 액션: `새 블로그 글`, `새 스크랩`, `편집`, `복제`, `삭제(소프트 삭제 권장)`

### 수용 기준
- 최근 수정순 기본
- 검색(제목/태그)
- autosave로 새로고침/이동에도 초안 유지

---

## 6.7.2 블로그 글 작성 (/studio/blog/new, /edit)
### 화면 구성
1) 상단 Bar (고정)
- `← 목록으로`
- Status Badge: `Draft` / `Published`
- 버튼:
  - `저장`(Draft 저장)
  - `미리보기 토글`(Split/Preview/Edit)
  - `발행`(Published 전환)
  - `내보내기`(Markdown 파일 Export)

2) 본문(Markdown)
- 기본: Split View (Editor / Preview)
- 모바일: `편집 | 미리보기` 탭
- Editor 최소 지원:
  - Heading, Bold/Italic, Link, Image, Code block, Quote, List, Table
  - 단축키(권장): Cmd+S 저장, Cmd+Enter 발행, Cmd+P 미리보기 토글
- Preview:
  - 코드 하이라이트
  - TOC 자동 생성(옵션)
  - 이미지/링크 렌더링

3) 우측 Sidebar(메타데이터)
- Title (필수)
- Slug (필수, 자동 생성 + 수정 가능)
- Summary (필수, 1~2문단)
- Tags (다중)
- Date (기본: 오늘)
- Cover Image URL(선택)
- Visibility: Public/Private(선택)
- Pin to Home(선택)
- Canonical URL(선택)

### 유실 방지(필수)
- Autosave: 5~10초 간격 또는 입력 이벤트 기반
- 저장 상태 표시: “저장됨(시간)” / “저장 중…”
- 이탈 경고: 저장 안 된 변경사항 있으면 confirm

### 수용 기준(Acceptance)
- Markdown이 Preview에 정확히 렌더링
- slug 중복/빈 값 검증
- 발행 시 최소 필드(title/summary/content) 검증
- Export로 `.md` 또는 `.mdx` 파일 생성 가능

---

## 6.7.3 뉴스 스크랩 작성 (/studio/scrap/new, /edit)
### 핵심 UX
스크랩은 “링크 모음”이 아니라 **요약 + 내 코멘트**로 가치가 생긴다.

### 화면 구성
1) 상단 Bar (블로그와 동일)
- 저장 / 발행 / 내보내기

2) 입력 폼(상단 카드)
- URL (필수)
- `메타 가져오기`(선택): title/source/og:image 자동 채움(가능하면)
- Source(출처/매체명)
- Date(기본: 오늘)
- Tags(다중)

3) 본문(2개 필드 권장, Markdown 적용)
- One-line Summary (필수, 1~2문장)
- My Comment (선택, Markdown 지원)
  - “왜 중요한가 / 인사이트 / 내 프로젝트에 어떻게 쓰나” 등을 짧게

4) Preview
- 스크랩 카드 형태로 미리보기(제목/출처/날짜/태그/요약/코멘트/원문 링크)

### 수용 기준(Acceptance)
- URL만으로도 최소 스크랩 생성 가능(메타 자동은 옵션)
- 코멘트는 Markdown 렌더링
- /scrap 목록에서 태그/출처로 필터링 가능

---

## 7) 사용자 시나리오(Flow)
### A — 채용 담당자
Home → About(이력 스캔) → 포트폴리오(검증) → Contact/Resume PDF

### B — 클라이언트
Home → 포트폴리오(유사 문제 탐색) → 상세(결과/운영 경험) → Contact(상담 요청)

### C — 개발자/커뮤니티
Blog/Scrap 유입 → 관련 글 탐색 → About/포트폴리오 확장 → GitHub/연락

---

## 8) 컴포넌트 인벤토리(UI 빌딩 블록)
- AppShell: Header / Main / Footer
- Navigation: TopMenu, ActiveIndicator
- Typography: PageTitle, SectionTitle, BodyText, Caption
- Cards: 포트폴리오Card, PostCard, ScrapCard, HighlightCard
- Controls: SearchInput, TagFilter, SortDropdown
- Content: TOC(블로그), MarkdownRenderer
- Editor(Studio): MarkdownEditor, PreviewPane, MetaSidebar
- CTA: PrimaryButton, SecondaryButton, LinkButton
- Feedback: Toast/InlineStatus(저장/발행/에러)

---

## 9) 인터랙션 & 마이크로 UX 규칙
- 메뉴 클릭 시 즉시 전환, 필요 시 skeleton
- hover/active는 절제(underline/미세 음영)
- 페이지 이동 시 스크롤 Top 리셋
- 외부 링크는 새 탭(표시 아이콘 선택)

---

## 10) 접근성 / 성능 / SEO (필수 품질)
- 대비(contrast) 준수, 폰트 최소 14~16px
- 키보드 탐색 가능(메뉴/버튼/폼/에디터)
- heading 구조(H1→H2→H3), 이미지 alt
- 이미지 최적화, 코드 스플릿, 캐싱
- SEO: 페이지별 meta(타이틀/설명), OG, sitemap
- Studio는 `noindex, nofollow`

---

## 11) 콘텐츠 모델(데이터 설계) — 운영을 쉽게
### 공통
- status: `draft | published | archived`
- visibility: `public | private`
- createdAt, updatedAt, publishedAt

### 포트폴리오
- slug, title, summary, tags[], techStack[], role, period, status
- links{github,demo,docs}
- problem, approach, result, learnings

### BlogPost
- slug, title, summary, date, tags[], readingTime, content(md/mdx)
- coverImage(optional), pinned(optional), canonicalUrl(optional)

### Scrap
- id, url, title(optional), source, date, tags[]
- oneLineSummary, commentMd(optional)
- ogTitle(optional), ogImage(optional)

---

## 12) 작성 화면 보안/운영 원칙 (권장)
- Studio는 public 메뉴/사이트맵에서 제외
- meta: `noindex`
- 최소 인증: 토큰 기반(개인용이면 단순/안전)
- Export(파일 내보내기) 지원 시 “백엔드 없이 운영”도 가능
  - Export된 md 파일을 repo에 커밋 → 배포 파이프라인으로 반영

---

## 13) 작업 우선순위(MVP → v1)
### MVP
- Home / About / 포트폴리오 / Contact
- 포트폴리오는 리스트 중심(상세는 선택)
- 디자인 토큰 + 공통 레이아웃 완성

### v1
- Blog(목록/상세/TOC) + Scrap(목록/필터)
- Studio(작성/수정/발행/Export) 최소 기능

### v1.5
- RSS, 주간 Top Scrap, 검색 고도화
- Resume PDF 자동 생성(선택), 다국어(선택)

---

## 14) 최종 체크리스트(런칭 전)
- [ ] 메뉴 라우팅 정상 동작 + 활성 메뉴 표시
- [ ] 페이지별 제목/설명/CTA 존재
- [ ] 포트폴리오 카드만 봐도 “무슨 가치”인지 이해됨
- [ ] Contact 경로 최소 2개(이메일 + 폼/소셜)
- [ ] 모바일/태블릿 레이아웃 검증
- [ ] 색/여백/폰트 일관성 유지
- [ ] 메타/OG/파비콘/사이트맵 준비
- [ ] Studio: 인증/노출 차단/noindex 적용
- [ ] Studio: Markdown Preview/Autosave/이탈 경고 동작

---

## 15) 문구 가이드(톤)
- 과장 금지, “문제-해결-결과” 중심
- “열정”보다 “증거(링크/지표/결과)” 우선
- CTA는 짧고 명확하게: “프로젝트 보기”, “연락하기”, “이력서 다운로드”