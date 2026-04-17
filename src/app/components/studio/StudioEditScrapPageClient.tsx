"use client";

import { useSearchParams } from "next/navigation";
import ScrapEditorClient from "@/app/components/studio/ScrapEditorClient";

export default function StudioEditScrapPageClient() {
  const searchParams = useSearchParams();
  const scrapId = searchParams.get("scrapId");

  return <ScrapEditorClient scrapId={scrapId} />;
}

