"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import UnitSidebar from "./UnitSidebar";

export default function AppShell({ units, children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[#0e1110] text-zinc-100 md:h-screen md:flex-row md:overflow-hidden">
      {/* Mobile top bar */}
      <header className="flex items-center justify-between border-b border-[#1f2421] bg-[#0e1110] px-4 py-3 md:hidden">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d]"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#d9f99d] text-xs font-bold text-[#111413]">
            CF
          </span>
          <span className="text-sm font-semibold tracking-tight text-white">
            CampusFlow
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={mobileMenuOpen}
          className="inline-flex items-center gap-1.5 rounded-lg border border-[#262b28] bg-[#161a18] px-3 py-1.5 text-xs font-medium text-zinc-200 hover:bg-[#1e2320] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d]"
        >
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <span>Units</span>
        </button>
      </header>

      {/* Mobile slide-over drawer */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <aside className="relative z-10 flex h-full w-72 max-w-[85vw] flex-col border-r border-[#1f2421] bg-[#0e1110] shadow-2xl">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close navigation menu"
              className="absolute top-3.5 right-3 z-20 rounded-md p-1.5 text-zinc-400 hover:bg-[#1a1f1c] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d]"
            >
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
            <Suspense fallback={<div className="h-full bg-[#0e1110]" aria-hidden="true" />}>
              <UnitSidebar
                units={units}
                onNavigate={() => setMobileMenuOpen(false)}
              />
            </Suspense>
          </aside>
        </div>
      )}

      {/* Desktop persistent sidebar */}
      <aside className="hidden md:block md:w-68 md:shrink-0 md:border-r md:border-[#1f2421]">
        <div className="sticky top-0 h-screen">
          <Suspense fallback={<div className="h-full bg-[#0e1110]" aria-hidden="true" />}>
            <UnitSidebar units={units} />
          </Suspense>
        </div>
      </aside>

      {/* Main workspace content */}
      <main className="flex min-h-0 min-w-0 flex-1 flex-col bg-[#111413] md:overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
