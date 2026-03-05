'use client';

import React, { useState, useRef } from 'react';
import { supabase } from '@/app/lib/supabase'; // 이전에 설정한 supabase 클라이언트

export default function StoragePage() {
    // 공통 상태: 선택된 파일과 미리보기 URL
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    // 업로드 상태 (방법 A: 가짜 서버용, 방법 B: 진짜 Supabase용)
    const [isUploadingA, setIsUploadingA] = useState(false);
    const [isUploadingB, setIsUploadingB] = useState(false);

    // 결과 주소 저장
    const [uploadedUrlA, setUploadedUrlA] = useState<string | null>(null);
    const [uploadedUrlB, setUploadedUrlB] = useState<string | null>(null);

    // 1. 파일 선택 이벤트 핸들러
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);

        // 💡 중요: 파일을 서버에 보내기 전에 브라우저 메모리에 임시 URL을 만들어 즉시 미리보기를 보여줍니다.
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);

        // 이전 결과 초기화
        setUploadedUrlA(null);
        setUploadedUrlB(null);
    };

    // [방법 A] 서버 사이드 업로드 Mock (가짜)
    const uploadToServerMock = async () => {
        if (!selectedFile) return;
        setIsUploadingA(true);

        // 💡 흉내내기: 서버로 전송되는 1.5초간의 딜레이
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // 실제 백엔드였다면 이런 일이 벌어집니다:
        /*
        const formData = new FormData();
        formData.append('file', selectedFile);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        setUploadedUrlA(data.url);
        */

        // 가짜 성공 처리: 로컬 미리보기 주소를 그대로 서버 주소인 척 사용
        setUploadedUrlA(previewUrl);
        setIsUploadingA(false);
        console.log("방법 A: 서버(Mock) 업로드 성공! 📁");
    };

    // [방법 B] Supabase Storage 업로드 (진짜)
    const uploadToSupabase = async () => {
        if (!selectedFile) return;
        setIsUploadingB(true);

        try {
            // 💡 파일 이름 중복 방지를 위해 타임스탬프를 붙입니다.
            const fileExt = selectedFile.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            // 1. Supabase Storage의 'avatars' 버킷에 파일 업로드
            // (사전에 Supabase 대시보드에서 avatars 버킷을 public으로 만드셔야 합니다!)
            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(filePath, selectedFile);

            if (uploadError) {
                throw uploadError;
            }

            // 2. 업로드된 파일의 공용(Public) URL 가져오기
            const { data } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            setUploadedUrlB(data.publicUrl);
            console.log("방법 B: Supabase 업로드 성공! 🚀 URL:", data.publicUrl);
        } catch (error) {
            console.error('Supabase 업로드 에러:', error);
            alert('업로드 실패! Supabase에서 avatars 버킷을 생성하셨는지 확인해주세요.');
        } finally {
            setIsUploadingB(false);
        }
    };

    /* 
       🚀 [9.5단계 보너스] 이미지가 있는 게시글 등록 흐름 (코드 예시) 
       
       실무에서는 파일을 올리는 것만으로 끝나지 않고, 그 URL을 DB에 함께 저장합니다.
       
       const handlePostWithImage = async () => {
           // 1. 이미지 먼저 업로드 (Storage)
           const { data: storageData } = await supabase.storage.from('avatars').upload(...);
           const imageUrl = supabase.storage.from('avatars').getPublicUrl(storageData.path).data.publicUrl;
           
           // 2. 게시글 저장 (Database)
           await supabase.from('posts').insert({
               title: '이미지가 있는 글',
               content: '내용입니다.',
               image_url: imageUrl  // 위에서 얻은 진짜 인터넷 주소를 DB에 저장!
           });
           
           // -> 이렇게 하면 나중에 목록 화면에서 <img src={post.image_url} /> 로 바로 보여줄 수 있습니다.
       };
    */

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 flex flex-col items-center">
            <div className="max-w-4xl w-full">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-slate-800 mb-2">9단계: 파일 업로드 비교 실습 🗂️</h1>
                    <p className="text-slate-600">전통적인 서버 저장 방식(Mock)과 현대적인 클라우드 스토리지(Supabase)를 비교해 보세요.</p>
                </div>

                {/* 공통 파일 선택 구역 */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8 text-center">
                    <div className="max-w-xs mx-auto mb-6">
                        {previewUrl ? (
                            <div className="relative group">
                                <img src={previewUrl} alt="Preview" className="w-48 h-48 object-cover rounded-2xl mx-auto border-4 border-indigo-100" />
                                <div className="absolute inset-0 bg-black/40 rounded-2xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <p className="text-white text-xs font-bold">미리보기 (업로드 전)</p>
                                </div>
                            </div>
                        ) : (
                            <div className="w-48 h-48 bg-slate-100 rounded-2xl mx-auto flex items-center justify-center border-2 border-dashed border-slate-300">
                                <p className="text-slate-400 text-sm">사진을 선택해 주세요</p>
                            </div>
                        )}
                    </div>

                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        id="fileInput"
                        className="hidden"
                    />
                    <label
                        htmlFor="fileInput"
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold cursor-pointer transition-all inline-block shadow-lg shadow-indigo-200"
                    >
                        📸 이미지 선택하기
                    </label>
                    <p className="mt-4 text-xs text-slate-400">파일을 선택하면 브라우저 메모리에 즉시 미리보기가 생성됩니다.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 방법 A: 서버 사이드 업로드 (가짜) */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">A</span>
                            <h2 className="text-xl font-bold text-slate-800">전통적인 서버 저장</h2>
                        </div>
                        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                            나만의 API 서버를 만들고, 서버의 하드디스크(`public/uploads`) 폴더에 물리적으로 파일을 저장하는 방식입니다. (현재는 가짜로 동작)
                        </p>
                        <button
                            onClick={uploadToServerMock}
                            disabled={!selectedFile || isUploadingA}
                            className={`mt-auto py-4 rounded-xl font-bold transition-all ${!selectedFile || isUploadingA
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-200'
                                }`}
                        >
                            {isUploadingA ? '서버로 전송 중...' : '서버(Mock)에 업로드하기'}
                        </button>
                        {uploadedUrlA && (
                            <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-lg animate-fade-in">
                                <p className="text-green-700 text-xs font-bold">✅ 서버 업로드 성공!</p>
                                <p className="text-green-600 text-[10px] truncate">{uploadedUrlA}</p>
                            </div>
                        )}
                    </div>

                    {/* 방법 B: Supabase Storage 업로드 (진짜) */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center font-bold text-sm">B</span>
                            <h2 className="text-xl font-bold text-slate-800">현대적인 클라우드 스토리지</h2>
                        </div>
                        <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                            Supabase Storage 무료 클라우드를 빌려 쓰는 방식입니다. 별도 서버 없이도 전 세계 어디서나 접근 가능한 이미지 URL을 즉시 얻을 수 있습니다.
                        </p>
                        <button
                            onClick={uploadToSupabase}
                            disabled={!selectedFile || isUploadingB}
                            className={`mt-auto py-4 rounded-xl font-bold transition-all ${!selectedFile || isUploadingB
                                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                                : 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                                }`}
                        >
                            {isUploadingB ? '클라우드 전송 중...' : 'Supabase에 진짜 올리기'}
                        </button>
                        {uploadedUrlB && (
                            <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-lg animate-fade-in">
                                <p className="text-green-700 text-xs font-bold">✅ Supabase 업로드 성공!</p>
                                <p className="text-green-600 text-[10px] truncate">{uploadedUrlB}</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className="mt-12 bg-indigo-50 border border-indigo-100 rounded-2xl p-6">
                    <h3 className="font-bold text-indigo-900 mb-2">💡 무엇을 배웠나요?</h3>
                    <ul className="text-indigo-800 text-sm space-y-2 list-disc pl-5 leading-relaxed">
                        <li><strong>URL.createObjectURL</strong>: 서버에 올리기 전에 브라우저 메모리 주소를 만들어 즉시 미리보기를 띄우는 꿀팁을 익혔습니다.</li>
                        <li><strong>Server Side (Mock)</strong>: 백엔드 API Routes를 통해 직접 서버 폴더를 관리하는 전통적인 파일 관리 개념을 맛보았습니다.</li>
                        <li><strong>Cloud Storage (Supabase)</strong>: 고성능 클라우드 스토리지를 SDK 하나로 쉽게 연동하고 전역 접근 가능한 URL을 얻는 기법을 익혔습니다.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
