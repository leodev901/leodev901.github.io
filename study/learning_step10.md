# 🔐 Step 10: 인증과 인가 (Authentication & Authorization)

> **핵심 키워드**: `signUp`, `signInWithPassword`, `signOut`, `onAuthStateChange`, `Session`, `JWT`

## 1. 원리 이해 (개념)

웹 서비스에서 "나는 이 사이트의 회원이고, 내 이름은 OOO이야"를 증명하는 과정을 **인증(Authentication)**이라고 합니다. 그리고 "이 글은 내가 쓴 글이니까 나만 수정/삭제할 수 있어!"처럼 권한을 제어하는 것을 **인가(Authorization)**라고 합니다.

**전체 흐름은 이렇습니다:**

1.  **회원가입 (Sign Up)**: "저를 새 회원으로 등록해 주세요!" → Supabase가 비밀번호를 암호화해서 안전하게 저장합니다.
2.  **로그인 (Sign In)**: "저 이전에 등록한 OOO인데요!" → Supabase가 비밀번호를 대조하고, 맞으면 **세션 토큰(Session Token)**이라는 '출입증'을 브라우저에 발급합니다.
3.  **세션 유지**: 토큰이 브라우저 `localStorage`에 자동 저장되어, 새로고침해도 로그인이 유지됩니다.
4.  **로그아웃 (Sign Out)**: 브라우저에 저장된 출입증(토큰)을 파기합니다.

---

## 2. 핵심 문법 및 용도 가이드 (Skeleton Code)

### **(1) 회원가입**
```tsx
const { data, error } = await supabase.auth.signUp({
    email: 'user@example.com',
    password: 'my-password',
});
// 💡 성공하면 Supabase가 유저 정보를 auth.users 테이블에 안전하게 저장합니다.
```

### **(2) 회원가입 + 추가 정보 (닉네임, 이름 등)**
```tsx
const { data, error } = await supabase.auth.signUp({
    email: 'user@example.com',
    password: 'my-password',
    options: {
        data: {
            // 👇 여기에 원하는 필드를 자유롭게 추가! (user_metadata에 저장됨)
            display_name: '레오',
            username: 'leodev901',
            age: 28,
        }
    }
});

// 나중에 꺼내 쓸 때:
const user = (await supabase.auth.getUser()).data.user;
console.log(user.user_metadata.display_name); // '레오'
```

### **(3) 로그인**
```tsx
const { data, error } = await supabase.auth.signInWithPassword({
    email: 'user@example.com',
    password: 'my-password',
});
// 💡 성공하면 세션 토큰이 브라우저 localStorage에 자동 저장됩니다!
```

### **(4) 로그아웃**
```tsx
await supabase.auth.signOut();
// 💡 이 한 줄이면 끝! 브라우저에 저장된 세션 토큰이 삭제됩니다.
```

### **(5) 현재 로그인 상태 확인 & 실시간 감시**
```tsx
// 현재 세션 확인 (페이지 로드 시)
const { data: { session } } = await supabase.auth.getSession();

// 실시간 감시자 등록 (로그인/로그아웃할 때마다 자동 호출)
const { data: { subscription } } = supabase.auth.onAuthStateChange(
    (_event, session) => {
        setUser(session?.user ?? null);
    }
);

// cleanup (페이지를 떠날 때 감시자 해제, 메모리 누수 방지)
return () => subscription.unsubscribe();
```

### **(6) 회원가입 성공 후 profiles/roles 테이블에 추가 INSERT**
```tsx
const handleSignUp = async () => {
    // 1단계: Auth로 계정 생성 (auth.users에 자동 INSERT)
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error || !data.user) return;

    // 2단계: 내가 직접 profiles 테이블에 INSERT
    await supabase.from('profiles').insert({
        user_id: data.user.id,   // 👈 Auth가 생성한 UUID를 가져다 씀!
        nickname: '레오',
    });

    // 3단계: 내가 직접 user_roles 테이블에 INSERT
    await supabase.from('user_roles').insert({
        user_id: data.user.id,
        role: 'user',            // 기본값은 일반 유저
    });
};
```

---

## 3. supabase.auth는 라이브러리다! (직접 구현과 비교)

`supabase.auth.signUp()` 등은 Supabase가 **미리 만들어놓은 인증 전용 API**입니다.
우리가 직접 `INSERT INTO users ...` 같은 쿼리를 짤 필요가 없습니다.

| 구분 | 직접 구현 (board2처럼) | Auth 라이브러리 (지금) |
|------|----------------------|----------------------|
| **테이블** | `leodev901.posts` (우리가 만듦) | `auth.users` (Supabase가 자동 생성) |
| **스키마 정의** | 우리가 대시보드에서 컬럼 설계 | Supabase가 미리 설계해둠 |
| **타입(Interface)** | 우리가 직접 정의 | `@supabase/supabase-js`에 내장 (`User` 타입) |
| **INSERT** | `supabase.from('posts').insert(...)` | `supabase.auth.signUp(...)` |
| **SELECT** | `supabase.from('posts').select(...)` | `supabase.auth.getUser()` |
| **비밀번호 암호화** | 직접 구현해야 함 😰 | 자동 bcrypt 처리 ✅ |

> 💡 `import type { User } from '@supabase/supabase-js';`
> 이 `User` 타입이 바로 Supabase가 npm 패키지 안에 미리 정의해둔 TypeScript Interface입니다.
> `id`, `email`, `created_at`, `user_metadata` 등 필드가 이미 정의되어 있습니다.

---

## 4. 실습 코드 리뷰 (상세 주석 버전)

### [`src/app/learning/auth/page.tsx`]
Supabase Auth SDK를 사용해 **회원가입, 로그인, 로그아웃**을 한 페이지에서 실습했습니다.

*   **로그인 전**: 이메일/비밀번호 입력 폼이 보이고, 탭으로 '로그인 ↔ 회원가입' 전환이 가능합니다.
*   **로그인 후**: 유저의 이메일, UID, 가입일이 표시된 프로필 카드가 보이고, 로그아웃 버튼이 나타납니다.
*   **조건부 렌더링**: `user` 상태가 `null`이면 로그인 폼을, 값이 있으면 프로필 카드를 보여주는 패턴입니다.

---

## 5. 💡 내가 질문했던 헷갈린 포인트 정리

**Q. 세션(Session)이 뭐예요? 쿠키랑 다른 건가요?**
*   **A.** 세션은 "이 사람은 지금 로그인 중이야"라는 정보를 담은 데이터입니다. Supabase는 JWT(Json Web Token)라는 형식의 토큰을 브라우저 `localStorage`에 저장합니다. 쿠키(Cookie)도 비슷한 역할을 하지만, 저장 위치와 전송 방식이 다릅니다. Supabase는 기본적으로 localStorage 방식을 사용합니다.

**Q. JWT 토큰은 localStorage에서 어떻게 생겼나요?**
*   **A.** 브라우저 F12 → Application → Local Storage를 열면 `sb-xxxx-auth-token` 키 아래에 `access_token`, `refresh_token` 등이 JSON 형태로 저장되어 있습니다. 이것을 우리가 직접 관리할 필요는 없고, `supabase.auth` SDK가 자동으로 읽고/쓰고/삭제합니다.

**Q. 비밀번호가 그대로 저장되나요? 해킹 걱정은?**
*   **A.** 절대 그대로 저장되지 않습니다! Supabase는 **bcrypt**라는 최고 수준의 단방향 암호화 알고리즘을 사용합니다. 비밀번호를 한 번 암호화하면 원래 값으로 되돌리는 것이 수학적으로 불가능합니다. 로그인할 때도 입력값을 같은 방식으로 암호화해서 '암호화된 결과끼리' 비교합니다.

**Q. 이메일이 중복되면 같은 계정이 두 개 생기나요?**
*   **A.** 아닙니다! `auth.users` 테이블에서 email은 기본적으로 **UNIQUE** 속성입니다. 같은 이메일로 두 번 가입하면 `"User already registered"` 에러가 자동으로 발생합니다. 우리가 중복 체크 로직을 따로 짤 필요가 없습니다.

**Q. `onAuthStateChange`는 왜 필요한가요? `getSession`만 쓰면 안 되나요?**
*   **A.** `getSession()`은 페이지가 처음 열릴 때 딱 한 번 세션을 확인하는 '스냅샷'입니다. 반면 `onAuthStateChange()`는 로그인/로그아웃이 일어날 때마다 자동으로 알려주는 '실시간 감시자'입니다. 둘을 함께 쓰면 "처음에도, 그리고 그 이후에도" 항상 정확한 로그인 상태를 유지할 수 있습니다.

**Q. 닉네임이나 추가 정보를 넣고 싶으면?**
*   **A.** 간단한 경우: `signUp()` 시 `options.data`에 자유롭게 넣으면 `user_metadata`에 저장됩니다. 실무에서는: `profiles` 테이블을 별도로 만들어 `auth.users`의 `id`와 Foreign Key로 연결합니다. (검색, 정렬, 다른 유저 프로필 조회 등이 가능해짐)

**Q. 나중에 Google이나 GitHub 로그인도 추가할 수 있나요?**
*   **A.** 물론입니다! Supabase Auth는 `signInWithOAuth({ provider: 'google' })` 한 줄이면 구글 로그인을 추가할 수 있습니다. Supabase 대시보드에서 해당 OAuth 제공자의 Client ID만 등록하면 됩니다.

---

## 6. 🔗 관련 심화 문서

> 인증/인가/보안에 대해 더 깊이 있는 내용은 [`step10-auth-security.md`](./step10-auth-security.md)에 정리되어 있습니다.
> RBAC(역할 기반 접근 제어), RLS 보안 정책, JWT 동작 원리, 실무 아키텍처 패턴 등을 다룹니다.
