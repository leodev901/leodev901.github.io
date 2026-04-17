import { Suspense } from "react";
import PublicBlogClient from "@/app/components/studio/PublicBlogClient";

export default function Blog() {
  return (
    <Suspense fallback={<div className="px-6 py-12 text-sm text-slate-500">블로그를 불러오는 중입니다...</div>}>
      <PublicBlogClient />
    </Suspense>
  );
}
