import Link from "next/link";
import {
  getJoinedUnits,
  getUpcomingObligationCount,
} from "@/lib/mock-data";

export default function WorkspaceOverview() {
  const units = getJoinedUnits();
  const totalUpcoming = getUpcomingObligationCount();

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Workspace header */}
      <header className="mb-8 border-b border-[#1f2421] pb-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium tracking-wider text-zinc-400 uppercase">
              Academic Workspace
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-white">
              Overview
            </h1>
          </div>
          <span className="inline-flex items-center rounded-full border border-[#2a3324] bg-[#161b14] px-3 py-1 text-xs font-medium text-[#d9f99d]">
            Demo data · Shell preview
          </span>
        </div>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Select a joined unit offering from the sidebar or below to open its
          group conversation and academic information.
        </p>
      </header>

      {/* Summary metrics */}
      <section
        aria-label="Workspace summary"
        className="mb-8 grid gap-4 sm:grid-cols-2"
      >
        <div className="rounded-xl border border-[#1f2421] bg-[#151917] p-5">
          <p className="text-xs font-medium text-zinc-400">
            Joined Unit Offerings
          </p>
          <p className="mt-2 text-2xl font-semibold text-white">
            {units.length}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Active in current demo semester
          </p>
        </div>

        <div className="rounded-xl border border-[#1f2421] bg-[#151917] p-5">
          <p className="text-xs font-medium text-zinc-400">
            Upcoming Obligations
          </p>
          <p className="mt-2 text-2xl font-semibold text-[#d9f99d]">
            {totalUpcoming}
          </p>
          <p className="mt-1 text-xs text-zinc-500">
            Shared events and personal items across joined units
          </p>
        </div>
      </section>

      {/* Joined unit offerings list */}
      <section aria-labelledby="joined-units-heading">
        <div className="mb-4 flex items-center justify-between">
          <h2
            id="joined-units-heading"
            className="text-base font-semibold text-white"
          >
            Your Joined Units
          </h2>
        </div>

        {units.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#2b312d] p-8 text-center">
            <p className="text-sm font-medium text-zinc-200">
              You have not joined any unit offerings yet.
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Once you join a unit offering, it will appear here and in the
              sidebar.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {units.map((unit) => {
              const unitUpcoming = getUpcomingObligationCount(unit.id);

              return (
                <Link
                  key={unit.id}
                  href={`/units/${unit.id}`}
                  className="group flex flex-col justify-between rounded-xl border border-[#1f2421] bg-[#151917] p-5 transition-colors hover:border-[#39492a] hover:bg-[#192017] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d]"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center rounded-md bg-[#1f2421] px-2 py-0.5 text-xs font-semibold text-[#d9f99d]">
                        {unit.code}
                      </span>
                      <span className="text-xs text-zinc-500">
                        {unit.lastActivity}
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold text-white">
                      {unit.title}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400">
                      {unit.semester}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-[#1f2421] pt-3 text-xs">
                    <span className="text-zinc-400">
                      {unitUpcoming === 0
                        ? "No upcoming obligations"
                        : `${unitUpcoming} upcoming ${
                            unitUpcoming === 1 ? "obligation" : "obligations"
                          }`}
                    </span>
                    <span className="font-medium text-[#d9f99d] group-hover:underline">
                      Open unit →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
