'use client';

import React, { useState, useRef } from 'react';

export default function SSEStreamingPage() {
    // 1. 화면에 타이핑 치듯 보여질 텍스트 상태
    const [streamedText, setStreamedText] = useState<string>('');
    const [isStreaming, setIsStreaming] = useState<boolean>(false);

    // 타이머를 제어하기 위한 ref (컴포넌트가 꺼지거나 중단할 때 타이머를 날리기 위함)
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    // AI가 답변할 임의의 텍스트 (실제로는 백엔드에서 날아오는 데이터)
    const dummyAnswer = `안녕하세요! 저는 AI 챗봇입니다. 🤖
유저님이 질문하신 "Server-Sent Events(SSE)"에 대해 설명해 드릴게요.

SSE는 서버가 클라이언트(브라우저) 쪽으로 데이터를 일방적으로, 그리고 실시간으로 계속해서 밀어주는(Push) 기술입니다. 
웹소켓처럼 양방향 통신이 필요 없고, 서버에서 계속 주기적으로 결과값이 업데이트되어야 하는 상황 즉, 저처럼 AI가 답변을 생성해내는 과정을 실시간으로 보여줄 때 아주 찰떡궁합인 기술이랍니다! 🚀`;

    // ⚡ SSE 스트리밍을 프론트에서 흉내 내는 가짜 함수 (Mocking) ⚡
    // 실제 실무에서는 이런 코드를 짭니다:
    // const eventSource = new EventSource('https://my-backend.com/api/chat');
    // eventSource.onmessage = (event) => {
    //     // 💡 유저님 말씀처럼, 서버가 마지막 타자를 다 치고 나면 "[DONE]" 같은 끝맺음 신호를 보냅니다!
    //     if (event.data === '[DONE]') {
    //         eventSource.close();     // 통신(구독)을 강제로 끊음
    //         setIsStreaming(false);   // 스트리밍 상태 false로 변경
    //         return;
    //     }
    //     setStreamedText(prev => prev + event.data); // 평소엔 글자 누적
    // }
    const startFakeStreaming = () => {
        // 이미 타이핑 중이면 무시
        if (isStreaming) return;

        // 초기화
        setStreamedText('');
        setIsStreaming(true);
        let currentIndex = 0;

        // 글자를 한 자(또는 한 단어)씩 뽑아내는 함수
        const typeNextCharacter = () => {
            if (currentIndex < dummyAnswer.length) {
                // 한 글자씩 뽑아서 화면 상태에 누적시킵니다.
                setStreamedText((prev) => prev + dummyAnswer.charAt(currentIndex));
                currentIndex++;

                // 다시 0.05초(50ms) 뒤에 자기 자신을 예약합니다. (타이핑 효과)
                // 실제 SSE도 네트워크를 타고 이렇게 쪼가리(Chunk)가 0.1초 단위로 계속 도착합니다.
                timeoutRef.current = setTimeout(typeNextCharacter, 50);
            } else {
                // 텍스트가 다 끝났으면 서버가 [DONE] 신호를 보냈다고 흉내(가정) 냅니다!
                console.log("서버로부터 종료 신호 도착: [DONE] 🏁");
                setIsStreaming(false);
            }
        };

        // 첫 글자 타이핑 시작!
        typeNextCharacter();
    };

    const stopStreaming = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
            console.log("사용자가 강제로 스트리밍 종료 🛑");
        }
        setIsStreaming(false);
    };

    return (
        <div className="min-h-screen bg-slate-900 py-12 px-4 flex flex-col items-center justify-center">
            <div className="w-full max-w-2xl bg-slate-800 shadow-2xl rounded-2xl overflow-hidden p-8 border border-slate-700">
                <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                    <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                        <span className="text-emerald-400">8단계:</span> AI 스트리밍 UI 🤖
                    </h1>
                </div>

                <div className="mb-6">
                    <p className="text-slate-300 text-sm leading-relaxed mb-4 border-l-4 border-emerald-500 pl-4 py-1 bg-slate-800/50 rounded-r-lg">
                        💡 실제 벡엔드(Next.js Route Handlers)를 만들면 <b>"GitHub Pages 정적 배포"</b> 시 오류가 발생하므로, 프론트엔드 코드(setTimeout)만으로 통신 딜레이를 흉내 낸 <b>Mock(가짜) 스트리밍</b>입니다.<br />
                        AI 챗봇 서비스 화면이 어떻게 타이핑 쳐지듯 렌더링되는지(Streaming UI) 그 느낌을 완벽히 이해해 보세요!
                    </p>
                </div>

                <div className="flex gap-4 mb-8">
                    <button
                        onClick={startFakeStreaming}
                        disabled={isStreaming}
                        className={`px-6 py-3 rounded-lg font-bold shadow-lg transition-all ${isStreaming
                            ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                            : 'bg-emerald-500 hover:bg-emerald-400 text-slate-900 hover:shadow-emerald-500/20'
                            }`}
                    >
                        {isStreaming ? 'AI가 답변 작성 중...' : '▶️ AI에게 질문하기'}
                    </button>

                    {isStreaming && (
                        <button
                            onClick={stopStreaming}
                            className="px-6 py-3 rounded-lg font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-all"
                        >
                            ⏹️ 답변 중단
                        </button>
                    )}
                </div>

                {/* AI 답변이 타이핑 쳐지는 캔버스 구역 */}
                <div className="bg-slate-950 rounded-xl p-6 min-h-[200px] border border-slate-800 relative">
                    {/* 터미널 깜빡이는 커서 효과 */}
                    {streamedText.length === 0 && !isStreaming ? (
                        <span className="text-slate-600 italic">"버튼을 눌러 AI 답변을 생성해 보세요."</span>
                    ) : (
                        <div className="text-slate-200 font-mono leading-relaxed whitespace-pre-wrap">
                            {streamedText}
                            {/* 타이핑이 진행 중일 때만 깜빡이는 커서를 달아줍니다 */}
                            {isStreaming && (
                                <span className="inline-block w-2.5 h-5 bg-emerald-400 ml-1 translate-y-1 animate-pulse" />
                            )}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
