'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/app/lib/supabase';

interface Post {
    id: number;
    title: string;
    content: string;
    created_at: string;
}

export default function RealtimeSubPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        // 1. 처음 화면이 켜지면 기존에 있던 옛날 글들을 전부 가져옵니다.
        fetchPosts();

        // 2. ⚡ Supabase Realtime 구독 시작! ⚡
        // 'public-posts-channel' 이라는 이름으로 방을 팝니다.
        const channel = supabase
            .channel('public-posts-channel')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',           // 누군가 새 글을 추가(INSERT) 했을 때만 알림을 받습니다.
                    schema: 'leodev901',       // 감시할 스키마 (우리의 VIP 룸)
                    table: 'posts'             // 감시할 테이블
                },
                (payload) => {
                    // 🎉 DB에 변화가 감지되면 이 함수가 즉시 실행됩니다! 🎉
                    console.log('실시간 데이터 뿅! 도착했습니다:', payload);

                    // payload.new 안에는 방금 저장된 따끈따끈한 새 게시물 객체가 통째로 들어있습니다.
                    const newPost = payload.new as Post;

                    // 기존 목록(prevPosts)의 맨 꼭대기(앞)에 새 글을 슬쩍 끼워넣습니다.
                    // 이렇게 하면 fetchPosts를 다시 호출하지 않아도 화면이 즉시 갱신됩니다!
                    setPosts((prevPosts) => [newPost, ...prevPosts]);
                }
            )
            .subscribe(); // "자, 이제부터 감시 시작해 줘!"

        // 3. 사용자가 다른 창으로 넘어가거나 컴포넌트가 꺼질 때(Cleanup)
        return () => {
            // 더 이상 안 쓰는 구독 채널을 닫아서 메모리가 새는 것을 막아줍니다.
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            if (data) setPosts(data);
        } catch (error) {
            // 콘솔창에 error 객체가 {} 로 비어보이는 경우가 있어 JSON.stringify를 추가해봅니다.
            console.error('글을 불러오는데 실패했습니다', JSON.stringify(error, null, 2));
            console.dir(error); // 브라우저 콘솔용 상세 출력
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        try {
            const { error } = await supabase
                .from('posts')
                .insert([{ title, content }]);

            if (!error) {
                // 입력창만 싹 비웁니다.
                // 💡 이전(board2)과는 달리, 여기서 fetchPosts()를 굳이 다시 부르지 않습니다!!
                // 왜냐하면 어차피 DB에 insert가 성공하면, 저 위에 있는 Realtime 감시자가
                // "앗! 글 들어왔다!" 하고 알아서 화면에 추가해 주기 때문입니다!! 😎
                setTitle('');
                setContent('');
            } else {
                throw error;
            }
        } catch (error) {
            console.error('글 저장에 실패했습니다', error);
        }
    };

    return (
        <div className="min-h-screen bg-pink-50 py-12 px-4 flex flex-col items-center">
            <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden p-8 border-t-8 border-pink-500">
                <div className="flex justify-between items-center mb-8 border-b pb-4">
                    <h1 className="text-3xl font-bold text-gray-800 text-pink-600">
                        7단계: 실시간 구독 게시판 ⚡
                    </h1>
                    <span className="flex items-center text-pink-500 text-sm font-bold animate-pulse">
                        <span className="h-3 w-3 bg-pink-500 rounded-full mr-2 inline-block"></span>
                        Realtime 구독 중...
                    </span>
                </div>

                <form onSubmit={handleSubmit} className="mb-12 bg-pink-50/50 p-6 rounded-xl border border-pink-100">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">새 글 작성 (나도 쓰고 남도 쓰고)</h2>
                    <p className="text-sm text-gray-500 mb-4">
                        💡 팁: 컴퓨터나 핸드폰으로 브라우저 탭을 두 개 띄워놓고 한쪽에서 글을 써보세요.
                        새로고침을 안 해도 반대쪽 탭에 글이 마법처럼 나타납니다!
                    </p>
                    <div className="flex flex-col gap-4">
                        <input
                            type="text"
                            placeholder="제목을 입력하세요"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 outline-none text-gray-800 bg-white"
                        />
                        <textarea
                            placeholder="내용을 적어보세요..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="px-4 py-2 border rounded-lg h-32 resize-none focus:ring-2 focus:ring-pink-500 outline-none text-gray-800 bg-white"
                        />
                        <button
                            type="submit"
                            className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-lg transition shadow-md hover:shadow-lg"
                        >
                            실시간 전송 🚀
                        </button>
                    </div>
                </form>

                <div>
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 flex justify-between items-center">
                        <span>실시간 피드 목록</span>
                        <span className="text-sm font-normal text-pink-500 font-medium">
                            총 {posts.length}개의 글
                        </span>
                    </h2>

                    <div className="flex flex-col gap-4">
                        {posts.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-lg text-gray-500">
                                아직 작성된 글이 없습니다. 첫 글을 남겨보세요!
                            </div>
                        ) : (
                            posts.map((post) => (
                                <div key={post.id} className="p-6 border rounded-xl shadow-sm hover:shadow-md transition bg-white border-pink-100 relative overflow-hidden group">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-300 to-pink-500"></div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2 ml-2">{post.title}</h3>
                                    <p className="text-gray-600 mb-4 ml-2 whitespace-pre-wrap">{post.content}</p>
                                    <p className="text-xs text-gray-400 ml-2">
                                        작성 시간: {new Date(post.created_at).toLocaleString()}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
