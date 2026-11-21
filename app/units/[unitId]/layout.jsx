import { Suspense } from "react";
import { notFound } from "next/navigation";
import UnitDetailsPanel from "@/components/unit/UnitDetailsPanel";
import UnitHeader from "@/components/unit/UnitHeader";
import { getUnitById } from "@/lib/mock-data";

function UnitLayoutFallback() {
  return (
    <div className="flex min-h-0 flex-1 flex-row">
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="border-b border-[#1f2421] bg-[#111413] px-4 py-4 sm:px-6">
          <div className="h-5 w-24 rounded bg-[#1f2421]" />
          <div className="mt-2 h-6 w-56 rounded bg-[#1a1f1c]" />
        </header>
        <div className="flex-1 bg-[#111413]" />
      </div>
    </div>
  );
}

async function UnitLayoutContent({ children, params }) {
  const { unitId } = await params;
  const unit = getUnitById(unitId);

  if (!unit) {
    notFound();
  }

  return (
    <div className="flex min-h-0 flex-1 flex-row">
      {/* Centre column: UnitHeader + active unit space */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Suspense
          fallback={
            <header className="border-b border-[#1f2421] bg-[#111413] px-4 py-4 sm:px-6">
              <span className="inline-flex items-center rounded-md bg-[#1f2421] px-2 py-0.5 text-xs font-semibold text-[#d9f99d]">
                {unit.code}
              </span>
              <h1 className="mt-1.5 text-lg font-semibold text-white sm:text-xl">
                {unit.title}
              </h1>
            </header>
          }
        >
          <UnitHeader unit={unit} />
        </Suspense>
        <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      </div>

      {/* Right column: Contextual unit details & participants (desktop) */}
      <UnitDetailsPanel unit={unit} />
    </div>
  );
}

export default function UnitLayout({ children, params }) {
  return (
    <Suspense fallback={<UnitLayoutFallback />}>
      <UnitLayoutContent params={params}>{children}</UnitLayoutContent>
    </Suspense>
  );
}
