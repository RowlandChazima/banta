import { Suspense } from "react";
import { notFound } from "next/navigation";
import UnitResources from "@/components/unit/UnitResources";
import { getUnitById } from "@/lib/mock-data";

async function UnitResourcesContent({ params }) {
  const { unitId } = await params;
  const unit = getUnitById(unitId);

  if (!unit) {
    notFound();
  }

  return <UnitResources unit={unit} />;
}

export default function UnitResourcesPage({ params }) {
  return (
    <Suspense fallback={<div className="flex-1 bg-[#111413]" />}>
      <UnitResourcesContent params={params} />
    </Suspense>
  );
}
