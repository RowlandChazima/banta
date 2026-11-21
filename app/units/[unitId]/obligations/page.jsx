import { Suspense } from "react";
import { notFound } from "next/navigation";
import UnitObligationsView from "@/components/obligations/UnitObligationsView";
import { getUnitById } from "@/lib/mock-data";

async function UnitObligationsContent({ params }) {
  const { unitId } = await params;
  const unit = getUnitById(unitId);

  if (!unit) {
    notFound();
  }

  return <UnitObligationsView unit={unit} />;
}

export default function UnitObligationsPage({ params }) {
  return (
    <Suspense fallback={<div className="flex-1 bg-[#111413]" />}>
      <UnitObligationsContent params={params} />
    </Suspense>
  );
}
