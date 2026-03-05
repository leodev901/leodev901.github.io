# 📡 Step 7: 실시간 통신 (Realtime Subscription)

> **핵심 키워드**: `Polling`, `WebSocket`, `Supabase Realtime`, `구독(Subscribe)`

## 1. 원리 이해 (개념)

누군가 게시판에 글을 썼을 때, 다른 사람이 새로고침(F5)을 누르지 않아도 화면에 그 글이 **마법처럼 즉시 나타나게** 하려면 어떻게 해야 할까요? 카카오톡 채팅방이나 주식 앱의 호가창이 바로 이 '실시간 데이터 통신' 기술을 씁니다.

이를 구현하는 방법은 크게 두 가지 갈래가 있습니다.
1. **전통적인 백엔드 API 방식 (Polling 또는 WebSocket)**: 개발자가 직접 서버를 구축하고 실시간 파이프라인을 뚫는 방식입니다.
2. **Supabase Realtime 방식**: BaaS가 제공하는 마법의 파이프를 이용해 프론트엔드에서 즉시 DB 변화를 감지하는 방식입니다.

---

## 2. 💡 핵심 뼈대 코드 비교 (디자인 걷어내기)

### [방법 A] 전통적인 백엔드 방식 

#### 1) 멍청하지만 단순한 방법: 폴링 (Polling)
- 브라우저가 일정 시간(예: 3초)마다 백엔드 점원에게 **"혹시 새 글 나왔어요?"** 하고 계속 `fetch`로 물어보는 방식입니다.
```tsx
'use client';
import { useEffect } from 'react';

export default function PollingBoard() {
  useEffect(() => {
    // 3초마다 계속 서버를 찌릅니다. 서버 입장에서는 엄청난 스트레스입니다!
    const timer = setInterval(() => {
      fetch('/api/board')
        .then(res => res.json())
        .then(data => setPosts(data));
    }, 3000); 

    // 화면(컴포넌트)이 꺼질 때 타이머도 멈춰줍니다.
    return () => clearInterval(timer);
  }, []);
}
```

#### 2) 정석적인 진짜 실시간 방식: 웹소켓 (WebSockets / Socket.io)
- 프론트와 백엔드 사이에 **영구적인 고속도로(소켓)**를 하나 뚫습니다. 클라이언트가 묻지 않아도, 백엔드에 새 데이터가 생기면 고속도로를 타고 프론트엔드에 알아서 데이터를 밀어 넣어줍니다(Push).
- **문제점**: 이걸 하려면 Next.js 외에도 별도의 무거운 Socket 서버 로직을 직접 코딩하고 호스팅해야 합니다! (엄청난 삽질의 시작)

```tsx
// ❌ 웹소켓 통신 프론트엔드 뼈대 코드 (서버가 미리 잘 만들어져 있다는 가정 하에)
import { useEffect } from 'react';
import io from 'socket.io-client'; // 외부 통신 라이브러리 필요

export default function WebSocketBoard() {
  useEffect(() => {
    // 1. 내 백엔드 소켓 서버와 고속도로를 연결합니다!
    const socket = io('http://나의_백엔드_서버_주소');

    // 2. 서버가 'new_post' 라는 이름표를 달아서 데이터를 밀어주면, 이걸 받아서 화면에 그립니다!
    socket.on('new_post', (newPost) => {
      setPosts((prevPosts) => [newPost, ...prevPosts]);
    });

    return () => socket.disconnect(); // 고속도로 닫기
  }, []);
}
```

---

### [방법 B] 혁신적인 방법: Supabase Realtime

서버 개발도, 통신 라이브러리(Socket.io) 세팅도 전부 패스합니다. Supabase가 DB 수준(PostgreSQL)에서 데이터가 변하는 걸 스스로 모니터링하다가 님들의 프론트엔드로 직통 텔레파시를 쏴줍니다!

#### Supabase 실시간 연동 뼈대 코드
```tsx
'use client';
import { useEffect } from 'react';
import { supabase } from '@/app/lib/supabase';

export default function SupabaseRealtimeBoard() {
  
  useEffect(() => {
    // 1. Supabase 방장님, 저 이제부터 감시 모드(채널 구독) 켤게요!
    const channel = supabase
      .channel('my_board_channel') // 채널 이름은 내 맘대로!
      // 'posts' 엑셀 시트(테이블)에 추가(INSERT)되는 모든 걸 감시해 줘!
      .on('postgres_changes', { event: 'INSERT', schema: 'leodev901', table: 'posts' }, 
        (payload) => {
          // 누군가(나 포함) DB에 새 글을 저장(INSERT)하는 순간 즉시 이 함수가 실행됩니다!
          const newPost = payload.new; 
          
          // 기존 게시글 배열의 맨 앞에 새 글을 스윽 끼워 넣어서 화면 즉시 갱신!
          setPosts(prevPosts => [newPost, ...prevPosts]);
        }
      )
      .subscribe(); // "자 이제 감시 시작!"

    // 2. 탭을 닫거나 다른 페이지로 갈 때는 감시(구독)를 꺼줍니다. (메모리 낭비 방지)
    return () => { supabase.removeChannel(channel); }
  }, []);
  
}
```

---

## 3. 요약 및 장단점 비교

| 구분 | 백엔드 API (Polling / WebSocket) | Supabase Realtime |
| :--- | :--- | :--- |
| **구현 난이도** | ⭐️⭐️⭐️⭐️⭐️ (소켓 서버 구축, 재연결 로직 등 헬파티) | ⭐️⭐️ (프론트에서 코드 몇 줄로 끝남!) |
| **서버 부담** | Polling 방식은 최악 (서버 폭주), Socket도 서버 비용 증가 | 내가 아닌 Supabase 미국 서버가 알아서 감당함 |
| **속도** | 소켓은 매우 빠름 | 매우 빠름 (내부적으로 똑같이 WebSocket을 사용함!) |
| **자유도** | 백엔드 로직에 필터링이나 복잡한 계산을 넣기 몹시 편함 | 단순히 DB가 변하는 것만 감지하므로 특수 로직 추가 시 제한이 있음 |

---

## 4. 💡 헷갈리기 쉬운 예상 포인트 정리

**Q. 그럼 Polling(폴링) 방식은 옛날 거니까 이제 영원히 절대 안 쓰는 건가요?**
* **A.** 그렇지 않습니다! 실시간성이 **초 단위로 칼같이 중요하지 않은 경우**(예: 1시간에 한 번 바뀌는 날씨, 5분마다 갱신되는 스포츠 점수 판독기 등)에는 서버를 늘 복잡한 소켓으로 열어두는 것보다 1분마다 폴링하는 게 비용(서버 메모리) 면에서 훨씬 저렴하고 안정적일 수 있습니다. 

**Q. 그럼 `WebSocket` 이나 `Socket.io`는 요즘 유행하는 AI (ChatGPT) 답변처럼 타이핑되듯(Streaming) 넘어오는 데이터(SSE)를 받을 때 쓰는 건가요?**
* **A.** 아주 날카로운 질문입니다! 사실 **웹소켓(WebSocket)**과 **SSE(Server-Sent Events)**는 쓰임새가 미묘하게 다릅니다.
  1. **WebSocket (양방향 고속도로)**: 
     - **어떨 때 쓰나?**: 프론트도 서버한테 실시간으로 계속 말을 걸고(총알 발사), 서버도 프론트한테 계속 말을 걸 때(적 위치 전송). 
     - **대표 예시**: 1:1 실시간 채팅 톡방, 멀티플레이어 온라인 게임 (서로 겁나게 주고받음)
  2. **SSE - Server-Sent Events (단방향 폭포수)**:
     - **어떨 때 쓰나?**: 프론트는 서버한테 "자! 이제 시작권 줘!" 라고 처음에 한 번만 말하고 나면, **서버가 프론트 쪽으로 주구장창 데이터를 일방적으로 내려꽂아 줄 때** 씁니다. (물방울 떨어지듯)
     - **대표 예시**: 주식 호가표 창, **🔥 ChatGPT 같은 AI 챗봇의 스트리밍 답변 (글자가 타다닥 쳐지는 것)**!

**Q. 그럼 Supabase Realtime은 저 셋 중에 뭐로 돌아가나요?**
* **A.** Supabase Realtime은 엔진 내부적으로 **WebSocket(웹소켓)**을 사용해서 브라우저와 DB를 연결해 줍니다. 덕분에 양방향으로 엄청나게 빠른 실시간 데이터 푸시가 가능한 것입니다!

**Q. `payload.new` 는 대체 정체가 뭔가요?**
* **A.** Supabase가 "야! DB에 새로운 데이터 들어왔다!" 하고 던져주는 **택배 상자(객체)**가 `payload`입니다. 이 상자 안에는 방금 추가된 그 녀석의 전체 정보(id, title, content, created_at 등)가 통째로 묶여져 있는데, 그 알맹이가 바로 `payload.new`에 담겨 있는 것입니다.

**Q. 내가 작성한 글뿐만 아니라, 저기 미국에서 누가 내 사이트에 접속해서 작성한 글도 내 화면에 나타나는 건가요?**
* **A.** 네! **이게 바로 실시간 통신의 핵심입니다.** 누가, 어디서, 어떻게 글을 올렸든 간에 무조건 내 DB 방(`leodev901`의 `posts` 테이블)에 도달해서 데이터가 추가되는(INSERT) 순간, 그걸 구독(`subscribe`)하고 피스폰으로 켜둔 전 세계 모든 사람들의 컴퓨터 화면에 그 글이 동시에 나타나게 됩니다.

**Q. 그러면 이제 `fetchPosts()` 처럼 처음에 데이터 가져오는 코드는 다 지워도 되나요?**
* **A.** 아닙니다! Realtime 구독은 방을 켠 이후에 **'세롭게 달리는 글(변화)'**만 잡아주는 안테나일 뿐입니다. 안테나를 켜기 전에 이미 옛날부터 적혀있던 수많은 과거 글들은 여전히 화면이 켜지자마자 처음에 `fetchPosts`로 싹 쓸어서 가져와줘야 합니다. 그래야 "기존 목록 + 방금 추가된 새 글"이 완벽하게 짬뽕 되어 화면에 나타납니다.

---

## 5. 🚨 필수 설정: Supabase 대시보드에서 Realtime 스위치 켜기

프론트엔드 코드만 잘 짰다고 마법이 일어나지 않습니다. Supabase는 서버 비용 절감을 위해 기본적으로 모든 테이블의 실시간 송출 기능을 **꺼둔 상태(Disabled)**로 둡니다.

반드시 아래 순서대로 **방송국 송출 스위치**를 직접 켜주셔야 합니다:

1. **Supabase 대시보드(웹사이트)**에 접속하여 해당 프로젝트로 들어갑니다.
2. 왼쪽 사이드바 메뉴 집합 중, `DATABASE MANAGEMENT` 섹션 맨 아래에 있는 **[Publications (발행)]** 메뉴를 클릭합니다.
3. 화면 중앙에 나타난 **`supabase_realtime`** 이라는 네모난 박스 우측의 ⚙️ **톱니바퀴 아이콘(설정)**을 클릭합니다.
4. 내 데이터베이스의 테이블 목록(`posts` 등)이 모달 창으로 뜹니다.
5. 실시간으로 감시할 **`posts` 테이블 우측의 스위치를 딸깍! 켜줍니다(Toggle On).**

이제 브라우저 창을 두 개 띄워놓고 한쪽에서 글을 저장하면, 반대쪽 창에 글이 새로고침 없이 즉시 나타나는 것을 확인할 수 있습니다! 🚀
