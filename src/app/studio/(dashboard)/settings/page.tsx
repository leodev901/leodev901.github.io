export const metadata = {
  title: "Studio Settings",
};

export default function StudioSettingsPage() {
  return (
    <div className="p-8 max-w-4xl w-full mx-auto">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Studio Settings</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
          현재 Studio는 Supabase CRUD 우선으로 구성되어 있습니다. 추가 설정 화면은 추후 Storage,
          프로필, 공개/비공개 기본값, 에디터 환경설정 순서로 확장하면 됩니다.
        </p>
      </div>
    </div>
  );
}
