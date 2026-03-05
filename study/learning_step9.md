# 🗂️ Step 9: 파일 업로드 (File Upload) - 서버 vs 클라우드

> **핵심 키워드**: `Storage`, `Bucket`, `URL.createObjectURL`, `FormData`, `publicUrl`

## 1. 원리 이해 (개념)

웹 서비스에서 유저가 프로필 사진을 바꾸거나 이미지를 업로드하는 과정은 크게 **3단계**로 이루어집니다.

1.  **선택 (Select)**: 브라우저의 `input type="file"`을 통해 로컬 파일을 선택합니다.
2.  **전송 (Upload)**: 선택한 파일을 서버(내 컴퓨터)나 클라우드(Supabase 등)로 쏩니다.
3.  **획득 (URL)**: 서버가 "잘 받았어! 이 주소(URL)로 접속하면 이미지를 볼 수 있어"라고 주소를 돌려줍니다.

이번 단계에서는 **전통적인 서버 저장 방식(Mock)**과 **최신 클라우드 스케일의 스토리지(Supabase)**를 한 페이지에서 비교하며 실습했습니다.

---
### 실습 전 supabase storage 설정

> [!IMPORTANT]
> **Supabase 대시보드 사전 설정**이 필수입니다!
> 코드를 짜기 전에 Supabase 대시보드에서 `storage` 메뉴에 들어가 `avatars`라는 이름의 **Public Bucket**을 미리 만들어주셔야 에러 없이 실습이 가능합니다.
>

**Supabase 대시보드에서 다음 권한 설정을 진행해 주세요:**

- Supabase Dashboard > Storage > Policies 메뉴로 들어갑니다.
- avatars 버킷 옆의 [New Policy] 버튼을 클릭합니다.
- **"For full customization"**을 선택합니다.
-  다음과 같이 설정합니다:
    - Policy Name: Allow All Uploads (자유롭게 입력)
    - Allowed Operations: INSERT (체크)
    - Target Roles: anon (로그인 안 한 유저도 허용할 경우) 또는 authenticated
    - WITH CHECK expression: true 입력 (모든 경우 허용)
    - [Review] -> [Save Policy]

---

Supabase 대시보드에서 다음 과정을 진행해 주세요:

Supabase Dashboard > Storage > Policies 메뉴로 들어갑니다.
avatars 버킷 옆의 [New Policy] 버튼을 클릭합니다.
**"For full customization"**을 선택합니다.
다음과 같이 설정합니다:
Policy Name: Allow All Uploads (자유롭게 입력)
Allowed Operations: INSERT (체크)
Target Roles: anon (로그인 안 한 유저도 허용할 경우) 또는 authenticated
WITH CHECK expression: true 입력 (모든 경우 허용)
[Review] -> [Save Policy]

---

## 2. 핵심 문법 및 용도 가이드 (Skeleton Code)

### **(1) 파일을 선택하자마자 화면에 보여주기 (미리보기)**
서버에 올리기 전에도 브라우저는 그 파일을 이미 알고 있습니다. 메모리를 활용해 즉시 미리보기를 띄우는 마법의 코드입니다.

```tsx
const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    // 💡 브라우저 메모리에 이 파일만을 위한 가짜 주소를 생성합니다.
    const url = URL.createObjectURL(file);
    setPreviewUrl(url); // 이 주소를 <img src={...} /> 에 넣으면 즉시 보임!
};
```

### **(2) Supabase Storage에 진짜로 올리기**
SDK를 쓰면 복잡한 통신 규격을 몰라도 함수 하나로 업로드가 끝납니다.

```tsx
// 1. 전송하기
const { data, error } = await supabase.storage
    .from('avatars')      // 👈 내가 만든 바구니(Bucket) 이름
    .upload('my-image.png', file);

// 2. 전송된 파일의 인터넷 주소 따오기
const { data: publicData } = supabase.storage
    .from('avatars')
    .getPublicUrl('my-image.png');

console.log("인터넷 주소:", publicData.publicUrl);
```

---

## 3. 실습 코드 리뷰 (상세 주석 버전)

### [`src/app/learning/storage/page.tsx`]
GitHub Pages 배포 환경을 고려하여 **방법 A(서버 방식)**는 가짜로, **방법 B(Supabase)**는 진짜로 구현했습니다.

*   **방법 A (Mock Server Upload)**: 버튼을 누르면 `setTimeout`으로 서버가 바쁜 척(?) 하다가 성공 메시지를 띄웁니다. 실제 백엔드 개발 시에는 `fs` 모듈로 서버 하드디스크에 파일을 쓰는 법을 주석으로 달아두었습니다.
*   **방법 B (Real Supabase Storage)**: 실제로 `avatars` 버킷에 파일을 쏘고, Supabase 전용 도메인이 붙은 `https://...` 주소를 받아옵니다.

---

## 4. 💡 내가 질문했던 헷갈린 포인트 정리

**Q. 왜 GitHub Pages에서는 서버 업로드가 안 되나요?**
* **A.** GitHub Pages는 정적인 파일(HTML, CSS, JS)만 보여주는 서비스입니다. 사용자가 보낸 파일을 받아서 저장하거나 분석하는 '백엔드 엔진(Node.js 등)'이 서버에 돌아가고 있지 않기 때문입니다. 반면 Supabase는 외부에서 돌아가는 별도의 엔진이므로 정적 페이지에서도 문제없이 연동됩니다.

**Q. 파일 이름이 겹치면 어떻게 되나요?**
* **A.** 기본적으로 덮어씌워지거나 에러가 납니다. 그래서 실무에서는 파일 이름 앞에 `Date.now()`나 `Math.random()` 같은 랜덤 숫자를 붙여서 **절대 겹치지 않는 이름**을 만들어 업로드하는 것이 국룰입니다.

**Q. `URL.createObjectURL(file)`는 업로드와 상관없이 오직 '미리보기'용인가요?**
* **A.** 네, 정확합니다! 이미 파일 객체(`selectedFile`)가 상태에 저장되어 있기 때문에 업로드는 언제든 가능합니다. `createObjectURL`은 사용자가 어떤 파일을 올릴지 미리 눈으로 확인하게 해주는 **사용자 경험(UX) 개선용** 도구일 뿐입니다. 

**Q. 파일명을 랜덤으로 생성하면 나중에 관리가 힘들 것 같은데, DB에 저장을 따로 해야 하나요?**
* **A.** 아주 날카로운 지적입니다! 실무에서는 `Math.random()` 등으로 생성된 파일의 **진짜 인터넷 주소(URL)**를 게시글 DB인 `posts` 테이블의 `image_url` 컬럼 등에 **별도로 저장(Mapping)**해서 관리합니다. 그래야 "누가 어떤 사진을 올렸는지" 정확히 알 수 있습니다.

**Q. `StorageApiError: new row violates row-level security policy` 에러가 나요!**
* **A.** Supabase Storage는 기본적으로 보안을 위해 아무나 파일을 올릴 수 없게 막아둡니다. 대시보드의 **Storage > Policies**에서 `avatars` 버킷에 대해 **INSERT** 권한을 허용하는 정책(Policy)을 추가해야 합니다. (연습 시에는 `anon` 롤에 대해 모든 체크를 `true`로 설정하면 해결됩니다!)

**Q. 이걸 응용해서 RAG(AI 실시간 지식 학습) 기능도 만들 수 있겠네요?**
* **A.** 대단하십니다! 맞습니다. `파일 업로드 -> Storage 저장 -> DB에 파일 경로 저장 -> 백엔드에서 해당 파일 다운로드 -> 텍스트 추출 및 벡터화(Embedding) -> RAG 처리` 가 바로 현대적인 AI 서비스들의 **표준 아키텍처**입니다. 유저님은 이미 서비스의 전체적인 큰 그림을 다 이해하고 계시네요! 🚀✨
