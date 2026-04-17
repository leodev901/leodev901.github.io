import { Suspense } from "react";
import StudioEditScrapPageClient from "@/app/components/studio/StudioEditScrapPageClient";

export const metadata = {
  title: "링크 스크랩 수정 - CMS Studio",
};

export default function StudioEditScrapPage() {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-slate-500">스크랩 에디터를 불러오는 중입니다...</div>}>
      <StudioEditScrapPageClient />
    </Suspense>
  );
}
