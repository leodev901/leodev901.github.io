'use client';

import React, { useState, useEffect } from 'react';
// 💡 우리가 이전에 만들어둔 Supabase 연결 통로를 가져옵니다.
// Auth(인증) 기능은 DB 스키마와 관계없이 Supabase가 기본 제공하는 auth 스키마를 사용하므로
// 기존 supabase 클라이언트를 그대로 쓸 수 있습니다!
import { supabase } from '@/app/lib/supabase';
// 💡 Supabase에서 제공하는 TypeScript 타입을 빌려와서, 유저 정보의 형태를 미리 정해줍니다.
import type { User } from '@supabase/supabase-js';

export default function AuthPage() {
    // ============================================================
    // 📦 상태(State) 선언부
    // ============================================================
    const [email, setEmail] = useState('');           // 이메일 입력값
    const [password, setPassword] = useState('');     // 비밀번호 입력값
    const [username, setUsername] = useState('');     // 이름 입력값
    const [role, setRole] = useState<string | null>(null);             // 유저 역할
    const [user, setUser] = useState<User | null>(null); // 현재 로그인된 유저 정보 (없으면 null)
    const [loading, setLoading] = useState(false);    // 로딩 중인지 여부
    const [message, setMessage] = useState('');       // 성공/에러 메시지
    const [isError, setIsError] = useState(false);    // 메시지가 에러인지 여부
    const [isSignUp, setIsSignUp] = useState(false);  // 회원가입 모드 vs 로그인 모드 토글

    // ============================================================
    // 🔄 useEffect: 페이지가 처음 열릴 때 "이미 로그인되어 있나?" 확인
    // ============================================================
    // 💡 useEffect는 컴포넌트가 화면에 그려진 '직후' 딱 한 번 실행되는 마법의 함수입니다.
    // 브라우저에 저장된 세션(Session) 정보를 확인해서, 이전에 로그인했던 유저라면
    // 자동으로 유저 정보를 복원해줍니다.
    useEffect(() => {
        const getSession = async () => {
            // 💡 supabase.auth.getSession(): 브라우저 저장소(localStorage)에
            // 남아있는 세션 토큰이 있는지 확인하는 함수입니다.
            const { data: { session } } = await supabase.auth.getSession();
            // session이 있으면 그 안에 user 정보가 들어있고, 없으면 null
            setUser(session?.user ?? null);
        };
        getSession();

        // 💡 onAuthStateChange: 로그인/로그아웃 등 인증 상태가 바뀔 때마다
        // 자동으로 호출되는 '감시자(Listener)'를 등록합니다.
        // 마치 카카오톡에서 "누군가 로그인/로그아웃하면 알려줘!" 하고 부탁하는 것과 같습니다.
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUser(session?.user ?? null);
            }
        );

        // 💡 cleanup: 이 페이지를 떠날 때 감시자를 해제합니다. (메모리 누수 방지)
        return () => subscription.unsubscribe();
    }, []); // ← 빈 배열: "딱 한 번만 실행해줘!"


    // 유저 정보가 바뀔 때 (supbase라이브러리) -> 유저의 role을 가져와서 state에 저장
    useEffect(() => {
        const fetchUserRole = async () => {
            // user 정보가 있을 때만 DB를 조회합니다.
            if (user) {
                const { data, error } = await supabase
                    .from('user_roles') // 💡 우리가 만든 역할 테이블
                    .select('role')      // 💡 role 컬럼만 가져옴
                    .eq('user_id', user.id) // 💡 현재 로그인된 유저의 UID와 일치하는 행 조회
                    .single();          // 💡 결과는 무조건 1개여야 함
                if (!error && data) {
                    setRole(data.role); // 성공하면 role 상태에 저장
                } else {
                    setRole('user');    // DB에 정보가 없으면 기본값 'user' 부여
                }
            } else {
                setRole(null); // 로그아웃 상태면 role도 초기화
            }
        };
        fetchUserRole();
    }, [user]); // 💡 user 정보가 바뀔 때마다('인증 성공' 시점 포함) 이 함수가 실행됩니다!

    // ============================================================
    // 🔑 핵심 함수들: 회원가입, 로그인, 로그아웃
    // ============================================================

    // --- (1) 회원가입 함수 ---
    const handleSignUp = async () => {
        setLoading(true);
        setMessage('');

        // 💡 supabase.auth.signUp(): 이메일과 비밀번호로 새 계정을 만드는 함수.
        // Supabase가 알아서 비밀번호를 암호화하고, 유저 테이블에 기록합니다.
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username
                }
            }
        });

        if (error) {
            setMessage(error.message);
            setIsError(true);
        } else {
            setMessage('🎉 회원가입 성공! 이메일 확인 후 로그인해 주세요. (Supabase 설정에 따라 바로 로그인될 수도 있습니다)');
            setIsError(false);
        }
        setLoading(false);
    };

    // --- (2) 로그인 함수 ---
    const handleSignIn = async () => {
        setLoading(true);
        setMessage('');

        // 💡 supabase.auth.signInWithPassword(): 기존 계정으로 로그인하는 함수.
        // 성공하면 Supabase가 세션 토큰을 브라우저 localStorage에 자동 저장합니다.
        // 이 덕분에 새로고침해도 로그인이 유지됩니다!
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setMessage(error.message);
            setIsError(true);
        } else {
            setMessage('✅ 로그인 성공!');
            setIsError(false);
        }

        setLoading(false);
    };

    // --- (3) 로그아웃 함수 ---
    const handleSignOut = async () => {
        // 💡 supabase.auth.signOut(): 브라우저에 저장된 세션 토큰을 삭제합니다.
        // 이 한 줄이면 로그아웃 끝! 위에서 등록한 onAuthStateChange 감시자가
        // 자동으로 user 상태를 null로 바꿔줍니다.
        await supabase.auth.signOut();
        setMessage('👋 로그아웃 되었습니다.');
        setIsError(false);
        setEmail('');
        setPassword('');
        setUsername('');
    };

    // 폼 제출 핸들러 (회원가입 or 로그인)
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // 💡 폼의 기본 동작(페이지 새로고침)을 막습니다.
        if (isSignUp) {
            handleSignUp();
        } else {
            handleSignIn();
        }
    };

    // ============================================================
    // 🎨 화면 렌더링 (JSX)
    // ============================================================
    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 flex flex-col items-center">
            <div className="max-w-lg w-full">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">10단계: 인증과 인가 🔐</h1>
                    <p className="text-slate-600">Supabase Auth를 사용해 회원가입, 로그인, 로그아웃을 구현합니다.</p>
                </div>

                {/* ================================================== */}
                {/* 📌 조건부 렌더링: 로그인 여부에 따라 다른 화면을 보여줍니다 */}
                {/* ================================================== */}

                {user ? (
                    // ✅ 로그인된 상태: 유저 프로필 카드를 보여줍니다
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        <div className="text-center">
                            {/* 프로필 아바타 */}
                            <div className="w-24 h-24 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg shadow-indigo-200">
                                <span className="text-4xl text-white">🙋</span>
                            </div>

                            <h2 className="text-2xl font-bold text-slate-800 mb-2">환영합니다!</h2>
                            <p className="text-slate-500 text-sm mb-6">현재 로그인된 계정 정보</p>

                            {/* 유저 정보 테이블 */}
                            <div className="bg-slate-50 rounded-xl p-5 text-left space-y-3 mb-8">
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-slate-400 uppercase w-16">Username</span>
                                    <span className="text-sm font-semibold text-slate-700 truncate">{user.user_metadata.username}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-slate-400 uppercase w-16">Email</span>
                                    <span className="text-sm font-semibold text-slate-700 truncate">{user.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-slate-400 uppercase w-16">UID</span>
                                    <span className="text-xs font-mono text-slate-500 truncate">{user.id}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-slate-400 uppercase w-16">가입일</span>
                                    <span className="text-sm text-slate-600">
                                        {new Date(user.created_at).toLocaleDateString('ko-KR')}
                                    </span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-xs font-bold text-slate-400 uppercase w-16">권한</span>
                                    <span className="text-sm text-slate-600">
                                        {user.user_metadata.role === 'admin' ? '관리자' : '사용자'}
                                    </span>
                                </div>
                            </div>

                            {/* 로그아웃 버튼 */}
                            <button
                                onClick={handleSignOut}
                                className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-red-200"
                            >
                                👋 로그아웃
                            </button>
                        </div>
                    </div>
                ) : (
                    // ❌ 로그인되지 않은 상태: 로그인/회원가입 폼을 보여줍니다
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                        {/* 탭 전환: 로그인 ↔ 회원가입 */}
                        <div className="flex bg-slate-100 rounded-xl p-1 mb-8">
                            <button
                                onClick={() => { setIsSignUp(false); setMessage(''); }}
                                className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${!isSignUp
                                    ? 'bg-white text-indigo-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                🔑 로그인
                            </button>
                            <button
                                onClick={() => { setIsSignUp(true); setMessage(''); }}
                                className={`flex-1 py-3 rounded-lg font-bold text-sm transition-all ${isSignUp
                                    ? 'bg-white text-indigo-600 shadow-sm'
                                    : 'text-slate-500 hover:text-slate-700'
                                    }`}
                            >
                                ✨ 회원가입
                            </button>
                        </div>

                        {/* 이메일 / 비밀번호 입력 폼 */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {isSignUp && (
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">이름</label>
                                    <input
                                        id="username"
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder="이름을 입력해 주세요"
                                        required
                                        minLength={2}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-800 placeholder-slate-400"
                                    />
                                </div>
                            )}
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">이메일</label>
                                <input
                                    id="email-input"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-800 placeholder-slate-400"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">비밀번호</label>
                                <input
                                    id="password-input"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="6자리 이상 입력해 주세요"
                                    required
                                    minLength={6}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-slate-800 placeholder-slate-400"
                                />
                            </div>

                            <button
                                id="submit-button"
                                type="submit"
                                disabled={loading}
                                className={`w-full py-4 rounded-xl font-bold transition-all text-white ${loading
                                    ? 'bg-slate-300 cursor-not-allowed'
                                    : isSignUp
                                        ? 'bg-emerald-500 hover:bg-emerald-600 shadow-lg shadow-emerald-200'
                                        : 'bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200'
                                    }`}
                            >
                                {loading
                                    ? '처리 중...'
                                    : isSignUp
                                        ? '✨ 회원가입하기'
                                        : '🔑 로그인하기'}
                            </button>
                        </form>

                        {/* 결과 메시지 */}
                        {message && (
                            <div className={`mt-6 p-4 rounded-xl text-sm font-semibold animate-fade-in ${isError
                                ? 'bg-red-50 text-red-700 border border-red-100'
                                : 'bg-green-50 text-green-700 border border-green-100'
                                }`}>
                                {message}
                            </div>
                        )}
                    </div>
                )}

                {/* 💡 학습 정리 카드 */}
                <div className="mt-8 bg-violet-50 border border-violet-100 rounded-2xl p-6">
                    <h3 className="font-bold text-violet-900 mb-2">💡 무엇을 배웠나요?</h3>
                    <ul className="text-violet-800 text-sm space-y-2 list-disc pl-5 leading-relaxed">
                        <li><strong>supabase.auth.signUp()</strong>: 이메일과 비밀번호로 새 계정을 만드는 <strong>회원가입</strong> 함수입니다.</li>
                        <li><strong>supabase.auth.signInWithPassword()</strong>: 기존 계정으로 로그인하고, 세션 토큰을 브라우저에 자동 저장합니다.</li>
                        <li><strong>supabase.auth.signOut()</strong>: 저장된 세션을 삭제하여 <strong>로그아웃</strong>합니다.</li>
                        <li><strong>onAuthStateChange()</strong>: 로그인/로그아웃 상태 변화를 실시간으로 감시하는 <strong>리스너(Listener)</strong>입니다.</li>
                        <li><strong>조건부 렌더링</strong>: <code>user</code> 상태가 있으면 프로필을, 없으면 로그인 폼을 보여주는 패턴입니다.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
