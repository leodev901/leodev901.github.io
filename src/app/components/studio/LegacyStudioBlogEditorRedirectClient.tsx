"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function LegacyStudioBlogEditorRedirectClient() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  useEffect(() => {
    if (params?.id) {
      router.replace(`/studio/editor?postId=${params.id}`);
    }
  }, [params?.id, router]);

  return null;
}
