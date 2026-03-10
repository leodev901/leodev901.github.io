# 🐘 PostgreSQL JSONB 컬럼 완벽 가이드

> 전통적인 RDBMS에서 JSONB 타입은 생소하게 느껴질 수 있습니다.
> 이 가이드는 JSONB가 무엇인지, 어떻게 조회하고 수정하는지를 실무 예시와 함께 정리합니다.

---

## 1. JSONB란 무엇인가?

| 구분 | 일반 컬럼 (`TEXT`, `INT`) | JSONB 컬럼 |
|------|:---:|:---:|
| 저장 형태 | 단일 값 | JSON 객체 (여러 키-값) |
| 검색 속도 | 빠름 | **빠름** (바이너리 인덱싱) |
| 유연성 | 낮음 (컬럼 변경 필요) | **높음** (스키마 변경 없이 키 추가) |
| 사용 예 | `name TEXT` | `raw_user_meta_data JSONB` |

### JSON vs JSONB 차이
- **JSON**: 입력 문자열을 그대로 저장 (공백, 순서 유지). 조회 시 매번 파싱.
- **JSONB**: **바이너리 형태로 변환하여 저장**. 인덱스 사용 가능, 조회 속도 훨씬 빠름.
- **실무에서는 항상 JSONB를 선택합니다.**

```sql
-- 예시: auth.users 테이블의 raw_user_meta_data 컬럼
-- 이 컬럼에는 아래 같은 JSON 데이터가 들어 있습니다.
-- {"username": "Leopold", "avatar_url": "https://..."}
```

---

## 2. 핵심 연산자 2가지

JSONB 다룰 때 가장 자주 쓰는 연산자입니다.

| 연산자 | 의미 | 반환 타입 |
|--------|------|:---:|
| `->` | JSON 객체로 꺼내기 | JSONB |
| `->>` | **텍스트**로 꺼내기 | TEXT |

```sql
-- 예시 데이터: raw_user_meta_data = '{"username": "Leopold", "age": 30}'

-- -> : JSONB로 반환 (따옴표 포함)
SELECT raw_user_meta_data -> 'username' FROM auth.users;
-- 결과: "Leopold"   ← JSON 타입 (문자열 비교 시 주의 필요)

-- ->> : TEXT로 반환 (따옴표 없음)
SELECT raw_user_meta_data ->> 'username' FROM auth.users;
-- 결과: Leopold     ← 일반 텍스트 (WHERE 조건에 쓰기 좋음)
```

### 실전 비교: `->>` 를 쓰는 경우

```sql
-- ✅ 올바른 패턴: ->> 로 텍스트로 꺼낸 후 비교
WHERE raw_user_meta_data ->> 'username' = 'Leopold'

-- ❌ 잘못된 패턴: -> 로 꺼내면 JSONB 타입이라 비교가 다르게 동작
WHERE raw_user_meta_data -> 'username' = 'Leopold'  -- 에러 또는 다른 결과
```

---

## 3. 조회 (SELECT)

### 3-1. 특정 키 값 꺼내기

```sql
-- 모든 유저의 username 조회
SELECT
    id,
    email,
    raw_user_meta_data ->> 'username' AS username
FROM auth.users;
```

### 3-2. 중첩된 JSON에서 값 꺼내기

```sql
-- raw_user_meta_data = '{"address": {"city": "Seoul", "zip": "06000"}}'
-- 중첩 접근: -> 로 객체를 꺼낸 뒤 ->> 로 텍스트 추출
SELECT raw_user_meta_data -> 'address' ->> 'city' FROM auth.users;
-- 결과: Seoul
```

### 3-3. 특정 키가 없는 유저만 필터링

```sql
-- username이 없는 유저만 조회
SELECT id, email
FROM auth.users
WHERE raw_user_meta_data ->> 'username' IS NULL;
```

---

## 4. 수정 (UPDATE)

### 4-1. 핵심 도구: `||` 연산자 (병합)

> `||` 은 두 JSONB 객체를 **합쳐서** 반환합니다. 기존 키는 유지하고 새 키만 추가/덮어씁니다.

```sql
-- ✅ 안전한 업데이트 (기존 데이터 유지 + 새 키 추가)
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || '{"username": "새이름"}'::jsonb
WHERE id = '유저-UUID';

-- ❌ 위험한 업데이트 (기존 데이터가 통째로 교체됨!)
UPDATE auth.users
SET raw_user_meta_data = '{"username": "새이름"}'::jsonb
WHERE id = '유저-UUID';
-- 이렇게 하면 기존에 있던 avatar_url 등 다른 키들이 모두 사라집니다!
```

### 4-2. 전체 유저 일괄 업데이트 (마이그레이션)

```sql
-- username이 없는 기존 회원에게만 기본값 추가
UPDATE auth.users
SET raw_user_meta_data =
    COALESCE(raw_user_meta_data, '{}'::jsonb) || '{"username": "익명유저"}'::jsonb
WHERE raw_user_meta_data ->> 'username' IS NULL;
```

> `COALESCE(raw_user_meta_data, '{}'::jsonb)`:
> 메타데이터가 `NULL`인 경우, 빈 JSON `{}`으로 대체하여 `||` 연산 시 에러를 방지합니다.

### 4-3. 특정 키만 삭제하기

```sql
-- '-' 연산자로 특정 키를 제거
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data - 'deprecated_field'
WHERE id = '유저-UUID';
```

### 4-4. `jsonb_set()` 으로 중첩 업데이트

```sql
-- 중첩된 JSON 내부 값만 수정할 때 사용
-- raw_user_meta_data = '{"address": {"city": "Busan"}}'
UPDATE auth.users
SET raw_user_meta_data = jsonb_set(
    raw_user_meta_data,   -- 대상 컬럼
    '{address, city}',    -- 수정할 경로 (배열 표기)
    '"Seoul"'             -- 새 값 (반드시 유효한 JSONB 리터럴)
)
WHERE id = '유저-UUID';
```

---

## 5. 유용한 함수 모음

| 함수 | 역할 | 예시 |
|------|------|------|
| `jsonb_build_object('k', v)` | 키-값으로 JSONB 객체 생성 | `jsonb_build_object('name', email)` |
| `jsonb_set(target, path, value)` | 중첩 경로의 값 수정 | `jsonb_set(data, '{a,b}', '"new"')` |
| `COALESCE(val, default)` | NULL이면 기본값으로 대체 | `COALESCE(meta, '{}'::jsonb)` |
| `jsonb_array_elements(arr)` | JSONB 배열을 행으로 펼치기 | `SELECT * FROM jsonb_array_elements('[1,2,3]')` |

```sql
-- 실전 예: 이메일 앞부분을 username 기본값으로 일괄 설정
UPDATE auth.users
SET raw_user_meta_data =
    COALESCE(raw_user_meta_data, '{}'::jsonb) ||
    jsonb_build_object('username', split_part(email, '@', 1))
WHERE raw_user_meta_data ->> 'username' IS NULL;
```

---

## 6. 한눈에 보는 연산자 정리표

| 연산자 / 함수 | 동작 | 예시 |
|---|---|---|
| `-> 'key'` | JSONB로 꺼내기 | `data -> 'name'` → `"Leo"` |
| `->> 'key'` | TEXT로 꺼내기 | `data ->> 'name'` → `Leo` |
| `\|\|` | JSONB 병합 (추가/덮어쓰기) | `data \|\| '{"age":30}'` |
| `-` | 키 삭제 | `data - 'old_key'` |
| `jsonb_set()` | 중첩 경로 수정 | `jsonb_set(data, '{a}', '"v"')` |
| `COALESCE()` | NULL 방어 | `COALESCE(data, '{}')` |

---

## 7. 요약: 전통 RDBMS vs JSONB 패턴 비교

```sql
-- [전통 컬럼 업데이트]
UPDATE users SET username = '새이름' WHERE id = 'abc';

-- [JSONB 업데이트 - 같은 결과]
UPDATE auth.users
SET raw_user_meta_data = raw_user_meta_data || jsonb_build_object('username', '새이름')
WHERE id = 'abc';
```

> 💡 **핵심 원칙 3가지**
> 1. 값을 읽을 때는 **`->>`** (텍스트)
> 2. 값을 수정할 때는 **`||`** (병합, 덮어쓰기 방지)
> 3. NULL 방어는 **`COALESCE`** 로!
