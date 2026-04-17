import StudioDashboardClient from "@/app/components/studio/StudioDashboardClient";

export const metadata = {
  title: "CMS Studio - Content Manager",
};

export default function StudioDashboardPage() {
  return <StudioDashboardClient defaultType="all" />;
}

