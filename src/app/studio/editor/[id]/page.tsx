import LegacyStudioBlogEditorRedirectClient from "@/app/components/studio/LegacyStudioBlogEditorRedirectClient";

export async function generateStaticParams() {
  return [{ id: "legacy" }];
}

export default function LegacyStudioBlogEditorPage() {
  return <LegacyStudioBlogEditorRedirectClient />;
}

