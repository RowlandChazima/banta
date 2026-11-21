"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const PRIMARY_NAV = [
  {
    label: "Home",
    href: "/",
    placeholder: false,
    icon: (
      <svg
        className="h-4 w-4 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 10.5 12 3l9 7.5" />
        <path d="M5 9.5V20a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V9.5" />
      </svg>
    ),
  },
  {
    label: "Calendar",
    href: null,
    placeholder: true,
    icon: (
      <svg
        className="h-4 w-4 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
  },
  {
    label: "Activity",
    href: null,
    placeholder: true,
    icon: (
      <svg
        className="h-4 w-4 shrink-0"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
  },
];

export default function UnitSidebar({ units, onNavigate }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-[#0e1110] text-zinc-100">
      {/* Brand header */}
      <div className="flex items-center justify-between border-b border-[#1f2421] px-4 py-4">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex items-center gap-2.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#d9f99d] text-xs font-bold text-[#111413]">
            CF
          </span>
          <div className="leading-tight">
            <span className="block text-sm font-semibold tracking-tight text-white">
              CampusFlow
            </span>
            <span className="block text-[11px] text-zinc-400">
              Demo workspace
            </span>
          </div>
        </Link>
      </div>

      {/* Primary navigation */}
      <nav aria-label="Primary" className="px-3 py-3">
        <ul className="space-y-1">
          {PRIMARY_NAV.map((item) => {
            if (item.placeholder) {
              return (
                <li key={item.label}>
                  <span
                    aria-disabled="true"
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-zinc-500 select-none"
                  >
                    <span className="flex items-center gap-2.5">
                      {item.icon}
                      <span>{item.label}</span>
                    </span>
                    <span className="rounded bg-[#1a1f1c] px-1.5 py-0.5 text-[10px] font-medium text-zinc-400">
                      Soon
                    </span>
                  </span>
                </li>
              );
            }

            const isActive = pathname === item.href;

            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d] ${
                    isActive
                      ? "bg-[#1a1f1c] text-white"
                      : "text-zinc-300 hover:bg-[#161a18] hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Joined unit offerings */}
      <div className="flex-1 overflow-y-auto border-t border-[#1f2421] px-3 py-3">
        <div className="mb-2 flex items-center justify-between px-3">
          <h2 className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
            Joined Units
          </h2>
          <span className="text-xs text-zinc-500">{units.length}</span>
        </div>

        <nav aria-label="Joined units">
          {units.length === 0 ? (
            <p className="px-3 py-2 text-xs text-zinc-500">
              No joined units yet.
            </p>
          ) : (
            <ul className="space-y-1.5">
              {units.map((unit) => {
                const unitHref = `/units/${unit.id}`;
                const isActive =
                  pathname === unitHref || pathname.startsWith(`${unitHref}/`);

                return (
                  <li key={unit.id}>
                    <Link
                      href={unitHref}
                      onClick={onNavigate}
                      aria-current={isActive ? "page" : undefined}
                      className={`group flex items-start justify-between gap-2 rounded-xl px-3 py-2.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d] ${
                        isActive
                          ? "border border-[#39492a] bg-[#1a2216] text-white"
                          : "border border-transparent text-zinc-300 hover:bg-[#161a18] hover:text-white"
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <span
                          className={`block text-xs font-semibold tracking-wide ${
                            isActive ? "text-[#d9f99d]" : "text-zinc-200"
                          }`}
                        >
                          {unit.code}
                        </span>
                        <p className="mt-0.5 truncate text-xs text-zinc-400">
                          {unit.title}
                        </p>
                      </div>

                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <span className="text-[11px] text-zinc-500">
                          {unit.lastActivity}
                        </span>
                        {unit.unreadCount > 0 && (
                          <span
                            aria-label={`${unit.unreadCount} unread messages`}
                            className={`inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold ${
                              isActive
                                ? "bg-[#d9f99d] text-[#111413]"
                                : "bg-[#232825] text-zinc-300"
                            }`}
                          >
                            {unit.unreadCount}
                          </span>
                        )}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>
      </div>

      {/* Footer note */}
      <div className="border-t border-[#1f2421] px-4 py-3">
        <p className="text-xs font-medium text-zinc-300">Demo workspace</p>
        <p className="text-[11px] text-zinc-500">Sample data only</p>
      </div>
    </div>
  );
}
