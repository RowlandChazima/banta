"use client";

import { useState } from "react";
import Link from "next/link";
import { useWorkspace } from "@/components/providers/WorkspaceProvider";
import { getUnitAnnouncements } from "@/lib/mock-data";

const PRIMARY_FILTERS = [
  { id: "all", label: "All" },
  { id: "unread", label: "Unread" },
  { id: "lecturer", label: "Lecturers" },
  { id: "class_rep", label: "Class reps" },
];

const CATEGORY_FILTERS = [
  "All categories",
  "CAT",
  "Assignment",
  "Timetable",
  "Important",
  "General",
];

function getInitials(label) {
  return label
    .replace("(Demo)", "")
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getRoleBadge(role) {
  if (role === "lecturer") {
    return (
      <span className="rounded bg-[#172a23] px-1.5 py-0.5 text-[10px] font-medium text-emerald-300">
        Lecturer
      </span>
    );
  }
  return (
    <span className="rounded bg-[#232d1c] px-1.5 py-0.5 text-[10px] font-medium text-[#d9f99d]">
      Class Rep
    </span>
  );
}

function getCategoryStyle(kind) {
  switch (kind) {
    case "CAT":
      return "bg-[#192231] text-sky-300 border-sky-900/50";
    case "Assignment":
      return "bg-[#182620] text-emerald-300 border-emerald-900/50";
    case "Timetable":
      return "bg-[#221d30] text-violet-300 border-violet-900/50";
    case "Important":
      return "bg-[#2b2114] text-amber-300 border-amber-800/50";
    default:
      return "bg-[#1f2421] text-zinc-300 border-[#2b312d]";
  }
}

function getVerificationLabel(verificationState) {
  if (verificationState === "lecturer_published") {
    return (
      <span className="text-[11px] font-medium text-emerald-400/90">
        Lecturer published (Demo)
      </span>
    );
  }

  return (
    <span className="text-[11px] font-medium text-amber-300/85">
      Not lecturer-verified (Demo)
    </span>
  );
}

export default function UnitAnnouncements({ unit }) {
  const {
    isAnnouncementRead,
    toggleAnnouncementRead,
    markAllAnnouncementsRead,
    getUnreadAnnouncementCount,
  } = useWorkspace();

  const [primaryFilter, setPrimaryFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("All categories");

  const allAnnouncements = getUnitAnnouncements(unit.id);
  const unreadCount = getUnreadAnnouncementCount(unit.id);

  const filtered = allAnnouncements.filter((item) => {
    const read = isAnnouncementRead(item.id);
    if (primaryFilter === "unread" && read) return false;
    if (primaryFilter === "lecturer" && item.publisherRole !== "lecturer") {
      return false;
    }
    if (primaryFilter === "class_rep" && item.publisherRole !== "class_rep") {
      return false;
    }
    if (
      categoryFilter !== "All categories" &&
      item.kind !== categoryFilter &&
      !(categoryFilter === "Important" && item.isImportant)
    ) {
      return false;
    }
    return true;
  });

  const pinnedItem = filtered.find((item) => item.isPinned);
  const ordinaryItems = filtered.filter((item) => item.id !== pinnedItem?.id);

  return (
    <section
      aria-label={`${unit.code} announcements`}
      className="flex-1 overflow-y-auto bg-[#111413] px-3.5 py-5 sm:px-6 sm:py-6"
    >
      <div className="mx-auto max-w-3xl space-y-5">
        {/* Heading row */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Announcements
            </h2>
            <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
              The important updates, all in one place.
            </p>
          </div>

          <span className="inline-flex shrink-0 items-center rounded-lg border border-[#262c29] bg-[#161a18] px-2.5 py-1 text-xs font-medium text-zinc-300 sm:hidden">
            {unreadCount} unread
          </span>
        </div>

        {/* Two clearly separated filter groups */}
        <div className="space-y-3">
          {/* Group 1: Status & publisher role */}
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div
              role="group"
              aria-label="Filter announcements by status or role"
              className="flex flex-wrap items-center gap-1.5 sm:gap-2"
            >
              {PRIMARY_FILTERS.map((filter) => {
                const isActive = primaryFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => setPrimaryFilter(filter.id)}
                    aria-pressed={isActive}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d] sm:px-3 ${
                      isActive
                        ? "bg-[#d9f99d] font-semibold text-[#111413]"
                        : "border border-[#262b28] bg-[#161a18] text-zinc-300 hover:border-[#343b37] hover:text-white"
                    }`}
                  >
                    <span>{filter.label}</span>
                    {filter.id === "unread" && (
                      <span
                        className={`rounded-full px-1.5 py-0.5 text-[10px] leading-none font-semibold ${
                          isActive
                            ? "bg-[#111413]/15 text-[#111413]"
                            : "bg-[#232825] text-zinc-300"
                        }`}
                      >
                        {unreadCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {allAnnouncements.length > 0 && (
              <button
                type="button"
                disabled={unreadCount === 0}
                onClick={() =>
                  markAllAnnouncementsRead(allAnnouncements.map((a) => a.id))
                }
                className="text-xs font-medium text-zinc-400 transition-colors hover:text-white disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d]"
              >
                {unreadCount === 0 ? "All caught up" : "Mark all as read"}
              </button>
            )}
          </div>

          {/* Group 2: Category filters */}
          <div
            role="group"
            aria-label="Filter announcements by category"
            className="flex flex-wrap items-center gap-1.5 border-t border-[#1c211e] pt-3"
          >
            {CATEGORY_FILTERS.map((category) => {
              const isActive = categoryFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setCategoryFilter(category)}
                  aria-pressed={isActive}
                  className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d] ${
                    isActive
                      ? "border-[#455932] bg-[#1d2618] text-[#d9f99d]"
                      : "border-[#232825] bg-[#151917] text-zinc-400 hover:border-[#303733] hover:text-zinc-200"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Feed */}
        {allAnnouncements.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#262b28] p-8 text-center">
            <p className="text-sm font-medium text-zinc-200">
              No announcements for {unit.code} yet.
            </p>
            <p className="mt-1 text-xs text-zinc-500">
              Official notices, assessment dates, and timetable updates will
              appear here.
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-[#262b28] p-8 text-center">
            <p className="text-sm font-medium text-zinc-200">
              No announcements match the selected filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setPrimaryFilter("all");
                setCategoryFilter("All categories");
              }}
              className="mt-3 inline-flex items-center rounded-lg border border-[#262b28] bg-[#161a18] px-3 py-1.5 text-xs font-medium text-[#d9f99d] hover:bg-[#1e2320]"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Pinned announcement */}
            {pinnedItem &&
              (() => {
                const read = isAnnouncementRead(pinnedItem.id);
                return (
                  <article
                    aria-label="Pinned announcement"
                    className="rounded-2xl border border-[#39492a] bg-[#151b13] p-4 sm:p-5"
                  >
                    {/* Category badge at top */}
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold ${getCategoryStyle(
                          pinnedItem.kind
                        )}`}
                      >
                        {pinnedItem.kind}
                      </span>

                      {!read && (
                        <>
                          <span className="hidden rounded-md border border-[#2b312d] bg-[#1c211e] px-2 py-0.5 text-[11px] font-medium text-zinc-200 sm:inline-flex">
                            Unread
                          </span>
                          <span
                            aria-label="Unread"
                            className="h-2 w-2 rounded-full bg-[#d9f99d] sm:hidden"
                          />
                        </>
                      )}
                    </div>

                    <p className="mt-2.5 text-[11px] font-semibold tracking-wider text-[#d9f99d] uppercase">
                      Pinned
                      {pinnedItem.dueAt ? ` · Due ${pinnedItem.dueAt}` : ""}
                    </p>

                    {/* Publisher row */}
                    <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          aria-hidden="true"
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#232d1c] text-[10px] font-semibold text-[#d9f99d]"
                        >
                          {getInitials(pinnedItem.publisherLabel)}
                        </span>
                        <span className="text-xs font-semibold text-white">
                          {pinnedItem.publisherLabel}
                        </span>
                        {getRoleBadge(pinnedItem.publisherRole)}
                        <span className="text-xs text-zinc-400">
                          {pinnedItem.publishedAt}
                        </span>
                      </div>

                      {getVerificationLabel(pinnedItem.verificationState)}
                    </div>

                    {/* Title & body */}
                    <h3 className="mt-3 text-base font-semibold text-white sm:text-lg">
                      {pinnedItem.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">
                      {pinnedItem.body}
                    </p>

                    {pinnedItem.locationOrChannel && (
                      <p className="mt-2 text-xs text-zinc-400">
                        Location: {pinnedItem.locationOrChannel}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-1">
                      {pinnedItem.sourceType === "shared_event" ? (
                        <Link
                          href={`/units/${unit.id}/obligations`}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-[#d9f99d] px-4 py-2 text-xs font-semibold text-[#111413] transition-colors hover:bg-[#ccf381] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d]"
                        >
                          <span>View in My obligations</span>
                          <span aria-hidden="true">→</span>
                        </Link>
                      ) : (
                        <Link
                          href={`/units/${unit.id}`}
                          className="text-xs font-medium text-[#d9f99d] hover:underline"
                        >
                          Open General Discussion →
                        </Link>
                      )}

                      <button
                        type="button"
                        onClick={() => toggleAnnouncementRead(pinnedItem.id)}
                        className="text-xs font-medium text-zinc-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d]"
                      >
                        {read ? "Mark as unread" : "Mark as read"}
                      </button>
                    </div>
                  </article>
                );
              })()}

            {/* Ordinary announcements — lighter, scannable layout */}
            {ordinaryItems.map((item) => {
              const read = isAnnouncementRead(item.id);

              return (
                <article
                  key={item.id}
                  className={`rounded-2xl border p-4 transition-colors sm:p-5 ${
                    item.isImportant
                      ? "border-[#2e3a25] bg-[#141914]"
                      : "border-[#1f2421] bg-[#151917]"
                  }`}
                >
                  {/* Top row: Category pill + Unread dot */}
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold ${getCategoryStyle(
                        item.kind
                      )}`}
                    >
                      {item.kind}
                    </span>

                    {!read && (
                      <span
                        aria-label="Unread"
                        className="h-2 w-2 shrink-0 rounded-full bg-[#d9f99d]"
                      />
                    )}
                  </div>

                  {/* Title & body */}
                  <h3 className="mt-2.5 text-sm font-semibold text-white sm:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-zinc-300">
                    {item.body}
                  </p>

                  {(item.dueAt || item.locationOrChannel) && (
                    <p className="mt-1.5 text-xs font-medium text-zinc-400">
                      {item.dueAt ? `Due ${item.dueAt}` : ""}
                      {item.dueAt && item.locationOrChannel ? " · " : ""}
                      {item.locationOrChannel ?? ""}
                    </p>
                  )}

                  {/* Compact publisher, role, timestamp & verification */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-zinc-400">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="font-medium text-zinc-300">
                        {item.publisherLabel}
                      </span>
                      {getRoleBadge(item.publisherRole)}
                      <span aria-hidden="true">·</span>
                      <span>{item.publishedAt}</span>
                    </div>

                    {getVerificationLabel(item.verificationState)}
                  </div>

                  {/* Actions */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pt-1 text-xs">
                    {item.sourceType === "shared_event" ? (
                      <Link
                        href={`/units/${unit.id}/obligations`}
                        className="font-medium text-[#d9f99d] hover:underline"
                      >
                        View in My obligations →
                      </Link>
                    ) : (
                      <Link
                        href={`/units/${unit.id}`}
                        className="font-medium text-[#d9f99d] hover:underline"
                      >
                        Open General Discussion →
                      </Link>
                    )}

                    <button
                      type="button"
                      onClick={() => toggleAnnouncementRead(item.id)}
                      className="font-medium text-zinc-400 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d]"
                    >
                      {read ? "Mark as unread" : "Mark as read"}
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        <p className="pt-1 text-xs text-zinc-500">
          Only lecturers and class reps can post here.
        </p>
      </div>
    </section>
  );
}
