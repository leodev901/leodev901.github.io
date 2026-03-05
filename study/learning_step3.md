# ✅ Step 3: 투두 리스트 (To-Do List)

> **핵심 키워드**: `배열 상태 관리`, `map()`, `filter()`, `스프레드 문법(...)`, `조건부 렌더링`

## 1. 원리 이해 (개념)

이제는 단순한 숫자(0, 1)나 글자("Leo") 하나만 관리하는 것을 넘어, **데이터의 묶음(목록)**을 관리하는 방법을 배웁니다.
JavaScript에서 여러 개의 연관된 데이터를 담는 바구니를 "배열(Array)"이라고 부릅니다. 투두 리스트 앱은 사용자가 할 일을 입력할 때마다 이 바구니(`[]`)에 새로운 할 일 카드를 추가하고, 바구니 안의 모든 내용물을 화면에 촤르륵 뿌려주는(렌더링) 과정입니다.

### 💡 핵심 뼈대 코드 
복잡한 스타일(CSS) 코드를 전부 빼고 배열 상태를 추가/삭제/그리는 핵심 논리만 보면 다음과 같습니다.

```tsx
'use client'; 
import { useState } from 'react';

// 1. 상태 변수를 배열([])로 만듭니다. (바구니 준비)
const [todos, setTodos] = useState([]);

// 2. 항목 추가하기: 기존 내용물들을 쫙 펼쳐놓고(...todos), 새 항목을 쏙 껴넣은 '진짜 새로운 바구니([])'를 만들어 교체합니다.
const handleAdd = () => {
  const newTodo = { id: 1, text: "새 할일" };
  setTodos([...todos, newTodo]);
};

// 3. 항목 삭제하기: "내가 지정한 id와 다른 녀석들만 남겨서(filter) 새로운 바구니로 만들어줘!"
const handleDelete = (targetId) => {
  const filteredTodos = todos.filter(todo => todo.id !== targetId);
  setTodos(filteredTodos);
};

return (
  <div>
    <button onClick={handleAdd}>글 추가</button>
    {/* 4. 배열 그리기(map): 바구니 속 물건들을 하나씩 전부 꺼내서 모양(li)을 찍어냅니다. */}
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.text}
          <button onClick={() => handleDelete(todo.id)}>삭제</button>
        </li>
      ))}
    </ul>
  </div>
);
```
### 전체 흐름 요약

1.  **배열 상태 선언**: `useState<Todo[]>([])` — 빈 바구니 준비
2.  **추가 (Create)**: 스프레드 문법 `[...todos, newTodo]`로 기존 + 새 항목
3.  **삭제 (Delete)**: `filter()`로 특정 항목만 제외
4.  **수정 (Toggle)**: `map()`으로 특정 항목만 변경
5.  **화면 표시**: `map()`으로 배열을 UI 목록으로 변환

```
[사용자 입력] → handleAdd → [...todos, newTodo] → setTodos → 화면 갱신
[삭제 클릭]   → handleDelete → filter(≠targetId) → setTodos → 화면 갱신
[완료 클릭]   → handleToggle → map(토글) → setTodos → 화면 갱신
```

---

## 2. 핵심 문법 및 용도 가이드 (Skeleton Code)

### **(1) 배열 상태 선언 — TypeScript 제네릭**

### **배열 상태 초기화 `useState<Interface[]>([]);`**
```typescript
interface Todo { id: number; text: string; completed: boolean; }

const [todos, setTodos] = useState<Todo[]>([]); // 빈 바구니로 시작!
```
`<Todo[]>`: TypeScript에게 "이 바구니(상태)에는 무조건 저 설계도(`Todo`) 모양을 가진 녀석들만 들어올 수 있어!" 라고 선언하는 문법(제네릭)입니다.

### **스프레드 문법 `...` (배열 펼치기)**
- 리액트에서는 상태 변수인 `todos` 바구니 안에 `push()`로 직접 물건을 밀어 넣으면 화면이 바뀌지 않습니다. (강력한 불변성 원칙)
- 기존 바구니 내용물을 책상에 촤라락 쏟아놓고 (`...todos`), 옆에 새 물건(`newTodo`)을 하나 스윽 올려놓은 뒤, 아예 완전히 새로운 플라스틱 바구니(`[]`)에 모두 주워 담아서 리액트에게 교체(set)해 주어야 합니다.

### **배열 그리기 `map((요소) => <UI 태그>)`**
```tsx
{todos.map((todo) => (
  <div key={todo.id}>{todo.text}</div>
))}
```
- 바구니 안의 물건들을 하나씩 전부 꺼내서(`todo`), 그 재료를 바탕으로 화면(UI) 카드를 하나씩 찍어내는 함수입니다. (공장 컨베이어 벨트 느낌)
- **🔥 무조건 주의사항**: `map`으로 반복해서 컴포넌트를 만들 때는 반드시 가장 바깥 태그에 **유일하고 겹치지 않는 고유값인 `key` 속성**을 달아주어야 합니다. 리액트가 누구를 업데이트할지 구분하는 이름표 역할을 합니다.

### **배열 필터링 `filter()`**
- "조건을 만족(true)하는 놈들만 살려서 새 바구니로 만들어줘!"
- 예: `todos.filter(todo => todo.id !== 내가누른ID)` ➡️ "내가 삭제 버튼을 누른 녀석은 거르고(false), 나머지애들만 남겨서 그려줘!"

---

## 3. 실습 코드 리뷰 (상세 주석 버전)

```tsx
'use client'; 
import { useState } from 'react';

// 1. 약속(TypeScript Type): 이 투두 카드는 고유 식별자, 텍스트, 완료 여부가 필수입니다.
interface Todo { 
  id: number; 
  text: string; 
  completed: boolean; 
}

export default function TodoPage() {
  
  // 2. 상태 1: 빈 배열상자. 처음 화면을 그릴 때는 텅텅 비어있음!
  const [todos, setTodos] = useState<Todo[]>([]);
  
  // 3. 상태 2: 사용자가 글을 치는 인풋 상자 연동.
  const [inputText, setInputText] = useState("");

  // 4. 이벤트: '저장' 버튼을 클릭하면 호출되는 추가 함수
  const handleAddTodo = () => {
    if (inputText.trim() === "") return; // 아무 글자 안 쳤으면 그냥 종류!

    // 새로운 데이터를 조립합니다. id는 안 겹치도록 현재 시간(Date.now) 값을 씁니다.
    const newTodo: Todo = { id: Date.now(), text: inputText, completed: false };
    
    // 불변성 유지! (기존 배열 + 새 데이터) => 완전히 새 배열 만들어서 통째로 엎어버리기.
    setTodos([...todos, newTodo]);
    
    // 할일 입력창 텍스트 지워주기 (친절함)
    setInputText("");
  };

  // 5. 이벤트: '삭제' 버튼을 클릭하면 호출되는 함수
  // 주의! targetId 매개변수를 통해 '누구를 삭제할 지'를 콕 찝어 받아냅니다.
  const handleDeleteTodo = (targetId: number) => {
    // 거르기망(filter): "기존 todos 바구니를 탈탈 털어서... 지금 넘어온 표기번호(targetId)랑 다.른. 애들만 살아남겨라!" => 찐 삭제 완성
    const updatedTodos = todos.filter((todo) => todo.id !== targetId);
    setTodos(updatedTodos);
};

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-5">📝 할 일 목록</h1>
      
      {/* 6. 반복문(map): 배열의 아이템들을 한 마리씩 꺼내서 컴포넌트로 팍팍 찍어냅니다. */}
      <ul>
        {todos.map((todo) => (
          // map을 쓸 땐 무조건 최고 부모 요소에 key={유니크값} 을 달아서 이름을 붙여줘야 리액트가 컴파일 시 안 헷갈립니다.
          <li key={todo.id} className="flex justify-between items-center bg-gray-50 p-3 my-2 border">
            
            {/* 7. 조건부 렌더링 삼항연산자: todo에 completed 속성이 true면? 취소선(line-through text-gray-400)! false면? 빈 문자열 */}
            <span className={todo.completed ? "line-through text-gray-400" : ""}>
               {todo.text}
            </span>

            {/* 8. 클릭 이벤트: 익명 함수 ()=>{} 로 감싸서 내가 원할 때 특정 값(todo.id)을 물려주고 실행하도록 컨트롤합니다.  */}
            <button onClick={() => handleDeleteTodo(todo.id)}>삭제</button>
            
    </li>
))}
      </ul>
    </div>
  );
}
```

---

## 3. 배열 메서드 비교표

### push vs 스프레드 (배열 수정 방식)

| 구분 | `push()` (직접 수정) | `[...배열, 새항목]` (새 배열 생성) |
|------|:---:|:---:|
| **동작** | 기존 배열 자체를 변경 | 새로운 배열을 만들어 교체 |
| **React 화면 갱신** | ❌ 변경 감지 못 함 | ✅ 새 배열이므로 감지됨 |
| **불변성 원칙** | ❌ 위반 | ✅ 준수 |
| **사용 가능?** | 일반 JS에서만 | React에서 반드시 이 방식 |

> 💡 **불변성 원칙**: React는 "이전 상태"와 "새 상태"를 **비교**해서 변경 여부를 판단합니다. `push()`로 같은 배열을 수정하면 주소(참조)가 그대로라서 React가 "어? 안 바뀌었네?" 하고 무시합니다!

### map vs filter vs find (배열 순회 메서드)

| 메서드 | 역할 | 결과 | 사용 예시 |
|--------|------|------|----------|
| **map()** | 배열 전체를 변환 | 같은 길이의 새 배열 | 목록 렌더링, 특정 항목 속성 변경 |
| **filter()** | 조건에 맞는 것만 추출 | 같거나 짧은 새 배열 | 항목 삭제, 검색 필터 |
| **find()** | 조건에 맞는 첫 번째 1개 | 단일 객체 또는 undefined | 특정 ID로 항목 찾기 |

---

## 4. 실습 코드 리뷰

### [`src/app/learning/todo/page.tsx`]
할 일 추가, 삭제, 완료 토글 기능을 갖춘 투두 리스트 앱입니다.

*   **3가지 핸들러**: `handleAddTodo` (추가), `handleDeleteTodo` (삭제), `handleToggleTodoComplete` (완료/취소 토글)
*   **엔터키 지원**: `onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}` — 입력 후 엔터만 쳐도 추가됩니다.
*   **조건부 렌더링**: `!todo.completed ? <완료 버튼> : <취소 버튼>` — 삼항 연산자로 완료 상태에 따라 다른 버튼을 보여줍니다.
*   **빈 목록 처리**: `todos.length === 0 && (<안내 메시지>)` — 데이터가 없을 때 사용자 안내 메시지를 표시합니다.

---

## 5. 💡 내가 질문했던 헷갈린 포인트 정리

**Q. 삭제 함수(`handleDeleteTodo(selectedId)`)에서 `selectedId`는 대체 어디서 온 숫자인가요?**
* **A.** 부모 컴포넌트나 함수 자체가 허공에서 숫자를 만들어내는 게 아닙니다! `map`으로 할 일 리스트를 쫙 그려줄 때, 각 줄(li)마다 붙어있는 **[삭제] 버튼의 `onClick` 이벤트에 자기 자신의 고유 번호(`todo.id`)를 슬쩍 쥐여준 것입니다.** `<button onClick={() => handleDeleteTodo(todo.id)}>` 따라서 버튼을 누르는 순간, 그 버튼이 속한 특정 할 일 항목의 번호표가 `handleDeleteTodo` 함수 안으로 전달되어 해당 항목만 정확히 삭제(`filter`)됩니다!

**Q. `key={todo.id}`를 빼먹으면 어떻게 되나요?**
* **A.** 동작은 하지만 콘솔에 경고가 뜨고, **성능과 정확성에 문제**가 생깁니다. React는 `key`를 보고 "아, 3번 항목이 삭제됐구나. 나머지는 다시 안 그려도 되겠다"라고 판단합니다. `key`가 없으면 전체 목록을 매번 처음부터 다시 그려야 해서 느려지고, 입력 중인 값이 엉뚱한 항목으로 옮겨가는 등 버그가 발생할 수 있습니다.

**Q. `key`에 배열의 index(순서 번호, 0, 1, 2...)를 쓰면 안 되나요?**
* **A.** 삭제나 순서 변경이 없는 **고정된** 목록이라면 괜찮지만, 투두 리스트처럼 **동적으로 추가/삭제**되는 경우에는 ❌ 절대 안 됩니다! 예: 3개 항목 중 2번째를 삭제하면 3번째가 index 1로 바뀌어서 React가 "어? 2번이 바뀌었네!" 하고 잘못된 항목을 업데이트합니다. `Date.now()`나 `UUID` 같은 **절대 변하지 않는 고유값**을 사용하세요.

**Q. `e.target.value`에서 `e`와 `target`은 뭔가요?**
* **A.** `e`는 **이벤트 객체(Event Object)**의 약자입니다. 브라우저가 "방금 input에서 뭔가 일어났어!"라고 전달해 주는 택배 상자입니다. 그 안에 `target`(이벤트가 발생한 HTML 요소 자체)이 들어있고, `target.value`로 현재 입력창에 적혀있는 텍스트를 꺼냅니다.

**Q. `onKeyDown`에서 `e.key === 'Enter' && handleAddTodo()` 문법이 신기한데, if문 아닌가요?**
* **A.** 자바스크립트의 **논리 AND 단축 평가(Short-circuit Evaluation)**입니다! `&&` 연산자는 앞이 `true`면 뒤를 실행하고, 앞이 `false`면 뒤를 무시합니다. 즉 `if (e.key === 'Enter') { handleAddTodo() }`와 완전히 같은 동작인데, 한 줄로 깔끔하게 쓸 수 있는 꿀팁입니다!
