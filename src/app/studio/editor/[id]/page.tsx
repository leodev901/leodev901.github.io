import Link from 'next/link';

export const metadata = {
  title: '포스트 수정 - CMS Studio',
};

export function generateStaticParams() {
  return [];
}

/**
 * 💡 [학습노트] 에디터 수정 페이지
 * URL: /studio/editor/[id]
 * 
 * 기존 글을 "수정"할 때 들어오는 페이지입니다.
 * 컴포넌트 구조는 새 글 작성(editor/page.tsx)과 거의 100% 동일하지만,
 * 서버에서 [id] 파라미터를 받아와서 기존 글의 내용을 db에서 조회한 뒤 
 * defaultValue 에 넣어주게 됩니다. (지금은 하드코딩 되어 있습니다!)
 */
export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  // 실제로는 여기서 supabase db를 통해 글 고유번호(id)로 글 내용을 조회합니다.
  const { id } = await params;
  
  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased overflow-hidden">
      
      <header className="flex h-14 items-center justify-between px-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/studio" className="flex items-center gap-2 text-slate-500 hover:text-primary transition-colors text-sm font-medium">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            목록으로
          </Link>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800"></div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">edit_note</span>
            <span className="text-sm font-semibold">블로그 포스트 수정 (ID: {id})</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-lg">save</span>
            저장(Draft)
          </button>
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <span className="material-symbols-outlined text-lg">visibility</span>
            미리보기
          </button>
          <button className="flex items-center gap-2 px-4 py-1.5 text-sm font-bold rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors shadow-sm">
            <span className="material-symbols-outlined text-lg">rocket_launch</span>
            변경사항 발행
          </button>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 overflow-hidden">
          
          <div className="flex-1 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Editor</span>
              <div className="flex gap-2">
                <button className="p-1 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors" title="Bold">
                  <span className="material-symbols-outlined text-lg">format_bold</span>
                </button>
                <button className="p-1 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors" title="Italic">
                  <span className="material-symbols-outlined text-lg">format_italic</span>
                </button>
                <button className="p-1 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors" title="Link">
                  <span className="material-symbols-outlined text-lg">link</span>
                </button>
                <button className="p-1 text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors" title="Image">
                  <span className="material-symbols-outlined text-lg">image</span>
                </button>
              </div>
            </div>
            
            <textarea 
              className="flex-1 w-full p-6 bg-transparent border-none focus:ring-0 font-mono text-sm leading-relaxed resize-none text-slate-800 dark:text-slate-300 outline-none" 
              spellCheck="false"
              defaultValue={`# System Design: Scalable Chat App\n\n이 글은 기존에 작성되었던 글을 불러온 모습입니다!\n\n여기서 마음껏 수정하고 변경사항 발행 버튼을 누르면 업데이트 됩니다.`}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
