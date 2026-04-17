"use client";

import { useSearchParams } from "next/navigation";
import BlogEditorClient from "@/app/components/studio/BlogEditorClient";

export default function StudioBlogEditorPageClient() {
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");

  return <BlogEditorClient postId={postId} />;
}

