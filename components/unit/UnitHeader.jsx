"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkspace } from "@/components/providers/WorkspaceProvider";

export default function UnitHeader({ unit }) {
  const pathname = usePathname();
  const { getUpcomingCount } = useWorkspace();

  const baseHref = `/units/${unit.id}`;
  const obligationsHref = `${baseHref}/obligations`;
  const isObligationsActive = pathname === obligationsHref;
  const upcomingCount = getUpcomingCount(unit.id);

  const tabs = [
    { label: "General Discussion", href: baseHref },
    { label: "Announcements", href: `${baseHref}/announcements` },
    { label: "Resources", href: `${baseHref}/resources` },
  ];

  return (
    <header className="sticky top-0 z-10 border-b border-[#1f2421] bg-[#111413]/95 backdrop-blur-xs">
      {/* Top row: Unit identity + My obligations entry point */}
      <div className="flex flex-col gap-3 px-4 pt-4 pb-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center rounded-md bg-[#1f2421] px-2 py-0.5 text-xs font-semibold text-[#d9f99d]">
              {unit.code}
            </span>
            <span className="text-xs text-zinc-400">{unit.semester}</span>
          </div>
          <h1 className="mt-1.5 truncate text-lg font-semibold tracking-tight text-white sm:text-xl">
            {unit.title}
          </h1>
        </div>

        <Link
          href={obligationsHref}
          aria-current={isObligationsActive ? "page" : undefined}
          className={`inline-flex shrink-0 items-center justify-between gap-2.5 rounded-xl border px-3.5 py-2 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d] sm:justify-start sm:py-1.5 ${
            isObligationsActive
              ? "border-[#d9f99d] bg-[#d9f99d] text-[#111413]"
              : "border-[#262c29] bg-[#161a18] text-zinc-200 hover:border-[#39492a] hover:bg-[#1a2216]"
          }`}
        >
          <span className="flex items-center gap-2">
            <svg
              className={`h-3.5 w-3.5 shrink-0 ${
                isObligationsActive ? "text-[#111413]" : "text-[#d9f99d]"
              }`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M9 11l3 3L22 4" />
              <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
            </svg>
            <span>My obligations</span>
          </span>

          <span className="flex items-center gap-1.5">
            <span
              className={`rounded-full px-2 py-0.5 text-[11px] leading-none font-semibold ${
                isObligationsActive
                  ? "bg-[#111413]/15 text-[#111413]"
                  : "bg-[#232d1c] text-[#d9f99d]"
              }`}
            >
              {upcomingCount === 0 ? "None" : `${upcomingCount} upcoming`}
            </span>
            <svg
              className="h-3.5 w-3.5 text-zinc-500 sm:hidden"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </span>
        </Link>
      </div>

      {/* Bottom row: Three unit spaces */}
      <nav
        aria-label="Unit spaces"
        className="flex gap-2 overflow-x-auto px-4 sm:gap-4 sm:px-6"
      >
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;

          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={isActive ? "page" : undefined}
              className={`relative shrink-0 border-b-2 px-1.5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d] ${
                isActive
                  ? "border-[#d9f99d] text-white"
                  : "border-transparent text-zinc-400 hover:text-zinc-100"
              }`}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
