import StudioDashboardClient from "@/app/components/studio/StudioDashboardClient";

export const metadata = {
  title: "CMS Studio - Workspace",
};

export default function StudioDashboardPage() {
  return <StudioDashboardClient defaultType="all" />;
}
