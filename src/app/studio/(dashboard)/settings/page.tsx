export const metadata = {
  title: "Studio Settings",
};

const aboutAssets = [
  {
    title: "Resume PDF",
    path: "/resume.pdf",
    description: "About 페이지에서 내려받는 이력서 PDF 자산입니다.",
  },
  {
    title: "Profile Attachments",
    path: "/files/about/",
    description: "증빙 문서, 소개 자료, 추가 프로필 PDF를 넣을 슬롯입니다.",
  },
];

const portfolioAssets = [
  {
    title: "Portfolio HTML Snapshot",
    path: "/files/portfolio/html/",
    description: "웹뷰형 포트폴리오 HTML 결과물을 두는 자리입니다.",
  },
  {
    title: "Portfolio PDF Deck",
    path: "/files/portfolio/pdf/",
    description: "프로젝트별 PDF 소개서와 캡처 자료를 관리하는 자리입니다.",
  },
];

const homeSettings = [
  { label: "Hero Heading", value: "신뢰 + 실력 + 지속성을 보여주는 개발자 포트폴리오" },
  { label: "Hero Summary", value: "AI, 백엔드, 엔터프라이즈 경험을 한곳에 정리해 보여주는 메인 소개 문구" },
  { label: "Featured Portfolio", value: "메인에 노출할 대표 프로젝트 3개 선택 UI 연결 예정" },
  { label: "Contact Links", value: "이메일, GitHub, LinkedIn, 블로그 링크 세트" },
];

function AssetCard({
  title,
  path,
  description,
}: {
  title: string;
  path: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-500">{description}</p>
        </div>
        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700 dark:bg-amber-950/30 dark:text-amber-300">
          Storage 예정
        </span>
      </div>
      <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/40">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Current Path</p>
        <p className="mt-2 font-mono text-xs text-slate-700 dark:text-slate-300">{path}</p>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          Replace UI
        </button>
        <button
          type="button"
          className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
        >
          Preview Slot
        </button>
      </div>
    </div>
  );
}

export default function StudioSettingsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Settings
        </h2>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          아직 Supabase Storage를 연결하지 않았더라도, 운영 자산이 어떤 구조로 관리될지 먼저 UI로
          정리해두면 이후 연결이 훨씬 쉬워집니다.
        </p>
      </div>

      <section className="mb-8">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">About Assets</h3>
          <p className="mt-1 text-sm text-slate-500">이력서와 소개 자료처럼 About 화면에 연결될 자산 슬롯입니다.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {aboutAssets.map((asset) => (
            <AssetCard key={asset.title} {...asset} />
          ))}
        </div>
      </section>

      <section className="mb-8">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Portfolio Assets</h3>
          <p className="mt-1 text-sm text-slate-500">웹뷰형 HTML과 PDF 소개 자료를 프로젝트별로 관리하기 위한 준비 UI입니다.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {portfolioAssets.map((asset) => (
            <AssetCard key={asset.title} {...asset} />
          ))}
        </div>
      </section>

      <section>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Home Content</h3>
          <p className="mt-1 text-sm text-slate-500">메인 페이지에서 자주 바뀌는 카피와 노출 우선순위를 정리합니다.</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {homeSettings.map((item) => (
              <div key={item.label} className="grid gap-3 px-6 py-4 md:grid-cols-[180px_minmax(0,1fr)_auto] md:items-center">
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{item.label}</div>
                <div className="text-sm text-slate-500">{item.value}</div>
                <button
                  type="button"
                  className="justify-self-start rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold transition-colors hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  Edit Slot
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
