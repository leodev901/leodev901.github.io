import StudioDashboardClient from "@/app/components/studio/StudioDashboardClient";

export const metadata = {
  title: "Studio Scraps",
};

export default function StudioScrapDashboardPage() {
  return <StudioDashboardClient defaultType="scrap" />;
}

