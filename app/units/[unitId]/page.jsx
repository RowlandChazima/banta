import { Suspense } from "react";
import { notFound } from "next/navigation";
import UnitDiscussion from "@/components/unit/UnitDiscussion";
import { getUnitById } from "@/lib/mock-data";

async function UnitDiscussionContent({ params }) {
  const { unitId } = await params;
  const unit = getUnitById(unitId);

  if (!unit) {
    notFound();
  }

  return <UnitDiscussion unit={unit} />;
}

export default function UnitDiscussionPage({ params }) {
  return (
    <Suspense fallback={<div className="flex-1 bg-[#111413]" />}>
      <UnitDiscussionContent params={params} />
    </Suspense>
  );
}
