import { Suspense } from "react";
import StudioBlogEditorPageClient from "@/app/components/studio/StudioBlogEditorPageClient";

export const metadata = {
  title: "블로그 포스트 작성 - CMS Studio",
};

export default function StudioBlogEditorPage() {
  return (
    <Suspense fallback={<div className="p-8 text-sm text-slate-500">에디터를 불러오는 중입니다...</div>}>
      <StudioBlogEditorPageClient />
    </Suspense>
  );
}
