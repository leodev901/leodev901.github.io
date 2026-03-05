# 🌟 Step 8: 서렌 전송 이벤트 (Server-Sent Events, SSE)와 스트리밍 UI

최근 ChatGPT, Claude, Gemini 같은 AI 서비스들이 대세가 되면서 프론트엔드 개발자에게 **가장 중요한 필수 스킬** 중 하나로 떠오른 것이 바로 **SSE (Server-Sent Events)를 활용한 Streaming UI** 구현입니다.

이번 8단계에서는 SSE의 원리를 가볍게 이해하고, 프론트엔드에서 AI 답변이 타자기로 쳐지듯 한 글자씩 나오는 마법 같은 UI를 직접 구현(Mocking)해 봅니다.

---

## 1. 💌 편지 배달부로 비유해보는 SSE

지금까지 배운 통신 방식들을 다시 한번 편지 배달에 비유해 볼까요?

*   📮 **기본 HTTP (Polling)**: "우체부 아저씨! 제 편지 왔나요?" 하고 **계속 우체국에 찾아가서 묻는 방식**입니다. 안타깝게도 우체부 아저씨는 내가 물어보지 않으면 편지가 왔는지 안 왔는지 알려주지 않습니다.
*   📞 **WebSocket**: 우체국과 우리 집에 **전용 전화선(파이프)**을 아예 깔아버린 겁니다. 내가 전화를 걸 수도 있고, 우체국에서도 내게 언제든 전화를 걸 수 있는 완벽한 쌍방향 통신입니다. (Step 7에서 쓴 Supabase Realtime의 핵심 기술)
*   📺 **SSE (Server-Sent Events)**: 이건 **'라디오 방송'**과 같습니다. 나는 수신 라디오 전원만 딱 켜두면(구독), 우체국(서버)에서 일방적으로 재미난 이야기(데이터)를 파도처럼 계속 쏴주는(Push) 방식입니다. 나는 듣기만 할 뿐 서버 쪽에 신호를 보낼 수는 없습니다(단방향).

### 💡 왜 AI 챗봇은 WebSocket 대신 SSE를 쓸까?

AI 챗봇 서비스는 질문을 한 번 던지면 그 뒤로는 서버(AI)가 대답을 생성하는 대로 주르륵 뱉어내기만 하면 됩니다. 굳이 양방향 연결을 비싸게 유지할 필요가 없죠. 서버가 일방적으로 데이터를 계속 내려주기만 하면 되는 가장 가볍고 표준화된 기술인 **SSE가 찰떡궁합**입니다!

---

## 2. 🤖 AI 답변 스트리밍 UI (Streaming UI)의 원리

우리가 짠 `src/app/learning/sse/page.tsx` 코드를 통해 원리를 살펴봅시다.

### (1) 진짜 실무에서의 SSE 연결 방법 (주석 참고)

실제 서버 API와 연결할 때는 브라우저에 기본으로 내장된 **`EventSource`** 라는 도구를 씁니다.

```javascript
// 통신을 받을 파이프(라디오 주파수)를 엽니다.
const eventSource = new EventSource('https://my-backend.com/api/chat');

// 서버에서 편지(데이터)가 한 뭉치씩 도착할 때마다 이 함수가 실행됩니다!
eventSource.onmessage = (event) => {
    
    // 🛑 가장 중요한 종료 신호!
    // 서버가 "나 다 말했어!" 하고 알려주기로 약속한 특수한 문자열(주로 [DONE])이 오면
    if (event.data === '[DONE]') {
        eventSource.close();     // 라디오 전원을 끕니다. (통신 종료)
        setIsStreaming(false);   // 화면의 커서 깜빡임을 멈춥니다.
        return;
    }
    
    // 종료 신호가 아니라면, 계속 화면(state)에 글자를 누적해서 타자기가 쳐지는 연출을 만듭니다.
    setStreamedText(prev => prev + event.data); 
}
```

### (2) 이 프로젝트에서 setTimeout으로 모킹(Mocking)한 이유

우리는 Next.js로 프론트엔드를 짜고 있고, 나중에 이 결과물을 통째로 HTML/JS 파일로 구워내서(Static Export) 저장 공간만 있는 무료 서버(GitHub Pages 구글 드라이브 같은 곳)에 배포할 예정입니다.

그런 서버가 없는 환경에서는 백엔드 API 기능(Route Handlers)이 작동하지 않고 에러가 빵빵 터집니다. 😭
그래서 프론트엔드 코드만으로 **"서버에서 파도처럼 밀려오는 그 느낌"**을 그대로 흉내(`setTimeout` 활용) 낸 것입니다.

```typescript
// 글자를 한 자(또는 한 단어)씩 뽑아내는 함수
const typeNextCharacter = () => {
    if (currentIndex < dummyAnswer.length) {
        // 한 글자씩 뽑아서 화면 상태에 누적시킵니다.
        setStreamedText((prev) => prev + dummyAnswer.charAt(currentIndex));
        currentIndex++;
        
        // 💫 마법의 비결: 스스로를 0.05초 뒤에 다시 부르기 예약!
        // 실제 네트워크에서도 이렇게 텍스트 쪼가리(Chunk)가 0.1초 단위로 뚝뚝 끊어져서 도착합니다.
        timeoutRef.current = setTimeout(typeNextCharacter, 50);
    } else {
        // 모든 텍스트가 다 나오면 마지막으로 종료 신호 처리!
        console.log("서버로부터 종료 신호 도착: [DONE] 🏁");
        setIsStreaming(false);
    }
};
```

---

## 🎯 Step 8 핵심 원리 이해 (Core Concepts)

1. **SSE (Server-Sent Events)란?**
   - 클라이언트가 서버에 한 번만 연결(요청)해두면, **서버가 알아서(일방적으로)** 계속해서 데이터를 클라이언트 쪽으로 푸시(Push)해주는 HTML5 웹 표준 기술입니다. HTTP 응답이 뚝 끊기지 않고 계속 끈끈하게 이어져 있다고 생각하면 됩니다.
2. **언제 쓰나요?**
   - 뉴스 피드 실시간 업데이트, 주식 티커, 그리고 대망의 **AI 챗봇 타이핑 UI(Streaming UI)** 구현 등 "서버의 결과만 받아오면 되는" 상황에 씁니다.
3. **가장 중요한 규칙 (종료 신호)**:
   - 서버는 무제한으로 연결을 유지할 수 없으니, 할 일을 다 마치면 프론트엔드에게 **"나 다 보냈어!"라는 약속된 신호(보통 `[DONE]`)**를 쏴주어야 합니다.
   - 프론트는 이 신호를 받으면 지체 없이 통신 채널을 닫아야(`eventSource.close()`) 메모리 폭발(누수)을 막을 수 있습니다.

---

## 🦴 실무 핵심 뼈대 코드 (Skeleton Code)

실제 현업 서버 API(`/api/chat`)와 통신할 때 사용하는 가장 정석적인 프론트엔드 코드 형태입니다. (우리는 배포 문제로 `setTimeout` 방식을 썼지만, 실력은 진짜를 알아야 합니다!)

```javascript
// 1. 서버에 빨대를 꽂습니다 (SSE 연결 시작)
const eventSource = new EventSource('https://my-backend.com/api/chat');

// 2. 서버가 편지(Chunk)를 보낼 때마다 이 함수가 자동으로 폴짝폴짝 뜁니다!
eventSource.onmessage = (event) => {
    
    // 🛑 3. [핵심] 종료 신호 캐치!
    // 서버와 약속한 끝맺음 문자열이 도착하면, 더 이상 듣지 않고 통신을 닫습니다.
    if (event.data === '[DONE]') {
        eventSource.close();         // 브라우저 귀 닫기
        setIsStreaming(false);       // 화면 상태 변경 (종료)
        return;                      // 함수 탈출
    }
    
    // 4. 종료 신호가 아니라면, 계속 화면(state)의 원래 글자 뒤에 새 글자를 이어 붙입니다.
    setStreamedText(prev => prev + event.data); 
};

// 5. 서버 통신 중 에러가 났을 때의 대처
eventSource.onerror = (error) => {
    console.error("스트리밍 에러 발생!", error);
    eventSource.close();             // 에러 나면 무조건 닫아줍니다.
    setIsStreaming(false);
};
```

---

## 🤔 예상 헷갈림 포인트 (Q&A)

**Q1. WebSocket(7단계)이랑 SSE(8단계)랑 뭐가 다른가요?**
*   **WebSocket**: "단톡방"입니다. 내가 서버에 말할 수도 있고, 서버가 내게 말할 수도 있습니다. (양방향) - 채팅 앱, 실시간 멀티 게임에 필수.
*   **SSE**: "라디오"입니다. 나는 듣기만 하고, 서버가 일방적으로 떠듭니다. (단방향) - AI 대답 스트리밍, 알림 푸시(Push)에 찰떡. SSE가 웹소켓보다 세팅이 훨씬 간단하고 가볍습니다!

**Q2. 프론트에서 글자를 이어 붙일 때 `setStreamedText(streamedText + event.data)` 라고 쓰면 안 되나요?**
*   안 됩니다! 0.1초 단위의 엄청난 속도로 이벤트가 들어오고 있기 때문에, 저렇게 쓰면 리액트가 옛날 `streamedText` 상태에 새 글자를 붙여서 글자가 중간에 다 씹히고 엉망이 됩니다. 반.드.시 **콜백 형태 `setStreamedText(prev => prev + 문구)`** 로 써야 "가장 최신 글자 뒤에" 완벽하게 갖다 붙습니다!

**Q3. `[DONE]` 신호는 정해진 규격인가요?**
*   웹 표준 스펙에 "[DONE]" 이라는 단어를 쓰라고 적혀있지는 않습니다. 하지만 **OpenAI (ChatGPT API)가 스트리밍을 끝낼 때 `[DONE]`이라는 문자열을 보내는 것을 표준처럼 사용**하면서, 전 세계 수많은 AI 서비스 규격이 이 관례를 따르게 되었습니다. 유저님이 정확히 기억하신 게 맞습니다!
