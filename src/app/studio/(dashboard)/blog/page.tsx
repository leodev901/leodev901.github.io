import StudioDashboardClient from "@/app/components/studio/StudioDashboardClient";

export const metadata = {
  title: "Studio Blog Posts",
};

export default function StudioBlogDashboardPage() {
  return <StudioDashboardClient defaultType="blog" />;
}

