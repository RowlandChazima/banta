import { Suspense } from "react";
import { notFound } from "next/navigation";
import UnitAnnouncements from "@/components/unit/UnitAnnouncements";
import { getUnitById } from "@/lib/mock-data";

async function UnitAnnouncementsContent({ params }) {
  const { unitId } = await params;
  const unit = getUnitById(unitId);

  if (!unit) {
    notFound();
  }

  return <UnitAnnouncements unit={unit} />;
}

export default function UnitAnnouncementsPage({ params }) {
  return (
    <Suspense fallback={<div className="flex-1 bg-[#111413]" />}>
      <UnitAnnouncementsContent params={params} />
    </Suspense>
  );
}
