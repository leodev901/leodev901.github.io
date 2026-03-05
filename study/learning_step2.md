# 🖼️ Step 2: 프로필 카드 (Profile Card)

> **핵심 키워드**: `Component` (컴포넌트 분리), `Props` (속성 전달), `TypeScript Interface`, `export/import`

## 1. 원리 이해 (개념)

React의 진짜 강력함은 **"레고 블록 조립하기"**에서 나옵니다. 우리는 재사용 가능한 UI 조각인 **컴포넌트(Component)**를 만들어서 필요할 때마다 블록처럼 끼워 쓸 수 있습니다. 이때 부모 블록(수퍼바이저 컴포넌트)이 자식 블록(재사용 컴포넌트)에게 이름, 나이, 사진 같은 데이터를 전달해 주어야 하는데, 이 우편물(데이터 티켓)을 **Props (Properties)**라고 부릅니다.

### 💡 핵심 뼈대 코드 
복잡한 스타일(CSS) 코드를 전부 빼고 컴포넌트를 분리해서 데이터를 전달하는(Props) 흐름만 보면 다음과 같습니다.

```tsx
// 1. 자식 블록 (부품): 부모에게 받을 데이터(props)의 구멍 3개를 뚫어놓습니다.
function ProfileCard({ name, role, photoUrl }) {
  return (
    <div>
      <img src={photoUrl} />
      <h2>{name}</h2>
      <p>{role}</p>
    </div>
  );
}

// 2. 부모 블록 (조립 공장): 내가 만든 자식 블록을 가져다 씁니다.
export default function Page() {
  return (
    <div>
      {/* 3. 자식 블록에 데이터를 주입(Props)합니다. 그러면 자식은 이 정보로 화면을 그립니다! */}
      <ProfileCard name="Leo" role="Developer" photoUrl="이미지주소1.jpg" />
      <ProfileCard name="Alice" role="Designer" photoUrl="이미지주소2.jpg" />
    </div>
  );
}
```
### 전체 흐름 요약

1.  **설계도 작성**: TypeScript `interface`로 자식이 받을 데이터의 이름과 타입을 정의합니다.
2.  **자식 컴포넌트 제작**: 설계도대로 데이터를 받아서 화면을 그리는 함수를 만듭니다.
3.  **부모에서 조립**: 자식 컴포넌트를 `<태그 />` 형태로 사용하며 데이터를 주입합니다.

```
[부모 Page] ──props 전달──→ [자식 ProfileCard] ──렌더링──→ 화면에 카드 표시
             name="레오"       { name, role }
             role="개발자"
```

---

## 2. 핵심 문법 및 용도 가이드 (Skeleton Code)

### **(1) TypeScript Interface — Props 설계도**

### **TypeScript Interface (타입 정의)**
- 넘겨받을 데이터(Props)의 생김새를 미리 약속하는 설계도(경찰관)입니다.
- TypeScript를 쓰면 *"어떤 데이터가 어떻게 들어올지 모르겠어!"* 하는 버그를 사전에 차단할 수 있습니다.
```typescript
interface ProfileProps {
    name: string;      // 이름은 반드시 문자열
    role: string;      // 역할도 반드시 문자열
    imageUrl: string;  // 이미지 주소도 문자열
}
```
TypeScript를 쓰면 *"어떤 데이터가 어떻게 들어올지 모르겠어!"* 하는 버그를 사전에 차단할 수 있습니다. 잘못된 타입을 넘기면 코드를 실행하기 전에 빨간 줄(에러)로 알려줍니다!

### **(2) 자식 컴포넌트 만들기 — Props 받기**
```tsx
// 1. 상태관리(useState)를 쓰기 위해 클라이언트 컴포넌트 선언!
'use client'; 
import { useState } from 'react';

// 2. TypeScript의 강점: 자식 부품이 받을 데이터(Props)의 이름과 타입을 미리 엄격하게 정해둡니다.
interface ProfileProps {
  name: string;      // 이름은 무조건 문자열!
  role: string;      // 역할도 문자열!
  imageUrl: string;  // 이미지 주소도 문자열!
}

// { name, role, imageUrl } 처럼 '구조 분해 할당'을 쓰면 코드가 훨씬 깔끔해집니다.
// 방법 A: 구조 분해 할당 (깔끔, 추천!)
function ProfileCard({ name, role, imageUrl }: ProfileProps) {
    return (
        <div>
            <img src={imageUrl} alt={name} />
            <h2>{name}</h2>
            <p>{role}</p>
        </div>
    );
}

// 방법 B: props 통째로 받기 (길지만 명시적)
function ProfileCard(props: ProfileProps) {
    return (
        <div>
            <h2>{props.name}</h2>
            <p>{props.role}</p>
        </div>
    );
}
```

### **(3) 부모에서 자식 컴포넌트 사용 — Props 주입**
```tsx
export default function Page() {
    return (
        <div>
            {/* 같은 틀에 다른 재료를 넣으면 다른 카드가 됩니다! */}
            <ProfileCard name="레오" role="Developer" imageUrl="img1.jpg" />
            <ProfileCard name="제인" role="Designer" imageUrl="img2.jpg" />
        </div>
    );
}
```

### **(4) 컴포넌트 분리 — export/import 패턴**
```tsx
// components/ProfileCard.tsx (자식 파일)
export function ProfileCard(props: ProfileProps) { ... }

// page.tsx (부모 파일)
import { ProfileCard } from "./components/ProfileCard";
```

---

## 3. 한 파일 vs 컴포넌트 분리 비교

| 구분 | 한 파일에 다 작성 | 컴포넌트 분리 (실무 방식) |
|------|:---:|:---:|
| **파일 구조** | `page.tsx` 하나에 모든 코드 | `page.tsx` + `components/ProfileCard.tsx` |
| **재사용성** | ❌ 다른 페이지에서 못 씀 | ✅ `import`로 어디서든 사용 가능 |
| **코드 가독성** | 파일이 길어지면 복잡 | 각 파일이 짧고 역할이 명확 |
| **협업** | 한 파일에서 충돌 발생 | 파일별로 나눠서 작업 가능 |
| **적합한 상황** | 학습, 프로토타입 | 실무 프로젝트 |

> 💡 우리 프로젝트에서는 실무 방식으로 `components/ProfileCard.tsx`를 별도 파일로 분리하고, `page.tsx`에서 `import`해서 사용하고 있습니다!

---

## 4. 실습 코드 리뷰

### [`src/app/learning/profile/components/ProfileCard.tsx`] — 자식 컴포넌트
재사용 가능한 프로필 카드 부품입니다.

*   **Props Interface**: `name`, `role`, `bio`, `imageUrl` 4가지 속성을 `ProfileCardProps`로 정의했습니다.
*   **Props 사용 방식**: `props: ProfileCardProps`로 통째로 받아서 `props.name`, `props.role` 형태로 접근합니다.
*   **내부 상태**: 클릭할 때마다 이름 뒤에 `!`를 붙이는 `useState`를 컴포넌트 자체에 가지고 있습니다. (Props로 받은 데이터 + 자체 상태 = 조합 가능!)
*   **`export function`**: `export`를 붙여서 다른 파일에서 `import`할 수 있게 내보냅니다.

### [`src/app/learning/profile/page.tsx`] — 부모 페이지
자식 컴포넌트를 조립하는 공장입니다.

*   **Import**: `import { ProfileCard } from "./components/ProfileCard"`로 자식 부품을 가져옵니다.
*   **3번 재사용**: 레오, 제인, 알렉스 3명의 카드를 동일한 `<ProfileCard />` 틀에 서로 다른 Props를 넣어 3번 재사용합니다.
*   **`'use client'` 없음**: 이 부모 파일은 클릭이나 상태가 없으므로 서버 컴포넌트로 동작합니다. (`'use client'`는 자식 `ProfileCard.tsx`에만 선언됨)

---

## 5. 💡 내가 질문했던 헷갈린 포인트 정리

**Q. 왜 `useState` 같은 걸 컴포넌트 맨 밑에 쓰지 않고 반드시 `return` 위에 쓰나요?**
* **A.** React 컴포넌트는 커다란 하나의 '자바스크립트 함수'입니다. 무언가를 화면에 반환(`return (...)`)해 버리면 **그 줄에서 함수가 끝나버립니다.** 그래서 재료 준비(상태, 변수, 함수 선언 등)는 무조건 요리를 내보내기(`return`) 전에 다 끝마쳐야 하는 룰이 있습니다.

**Q. `page.tsx`랑 `ProfileCard` 함수가 한 파일에 같이 있어도 괜찮나요?**
* **A.** 네! 파일 하나에 함수 여러 개를 적어도 상관은 없습니다. 하지만 보통 실무에서는 진짜 레고 블록처럼 만들기 위해, `components/ProfileCard.tsx` 처럼 **부품용 폴더를 따로 파서 파일을 쪼개놓고** (`export function...`) 부모가 그걸 불러와서 (`import ProfileCard from...`) 쓰는 방식을 사용합니다.

**Q. `{ name, role }` 구조 분해 할당과 `props.name` 방식 중 뭐가 좋나요?**
* **A.** 기능적으로는 동일합니다! 하지만 **구조 분해 할당이 실무 표준**입니다. 코드가 짧아지고, 어떤 Props를 사용하는지 한눈에 보이기 때문입니다. 다만 Props가 10개 이상으로 많아지면 `props.`으로 쓰는 게 오히려 가독성이 좋을 수도 있습니다.

**Q. `export default` 와 `export` (이름 있는 내보내기)는 뭐가 다른가요?**
* **A.** `export default`는 파일당 하나만 가능하고, 가져올 때 이름을 마음대로 정할 수 있습니다 (`import 아무이름 from ...`). 반면 `export`(Named Export)는 여러 개 가능하지만 가져올 때 중괄호로 정확한 이름을 써야 합니다 (`import { ProfileCard } from ...`). Next.js에서 `page.tsx`의 페이지 컴포넌트는 반드시 `export default`를 사용해야 합니다!

**Q. Props로 받은 데이터를 자식이 직접 수정할 수 있나요?**
* **A.** ❌ 불가능합니다! Props는 **읽기 전용(Read-Only)**입니다. 부모가 준 데이터를 자식이 마음대로 바꾸면 안 됩니다. 만약 자식에서 값이 변해야 한다면, 우리 코드처럼 `useState`로 별도의 **내부 상태**를 만들어서 관리해야 합니다. (`const [name, setName] = useState(props.name)` 패턴)
