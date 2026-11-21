"use client";

import { useState } from "react";
import Link from "next/link";
import { useWorkspace } from "@/components/providers/WorkspaceProvider";
import { getJoinedUnits, MOCK_SHARED_EVENTS } from "@/lib/mock-data";
import ObligationCard from "./ObligationCard";
import TodaysPlanPanel from "./TodaysPlanPanel";

export default function UnitObligationsView({ unit }) {
  const {
    getPersonalObligations,
    togglePersonalObligation,
    reschedulePersonalObligation,
    addPersonalObligation,
    isSharedEventCompleted,
    toggleSharedEventCompleted,
  } = useWorkspace();

  const units = getJoinedUnits();
  const unitCodeMap = new Map(units.map((u) => [u.id, u.code]));

  // Default to the unit opened from, while allowing "all" joined units
  const [unitFilter, setUnitFilter] = useState(unit.id);
  const [sourceFilter, setSourceFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("due");

  // Personal task creation state
  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newKind, setNewKind] = useState("Personal Task");
  const [newUnitId, setNewUnitId] = useState(unit.id);
  const [newDueAt, setNewDueAt] = useState("");

  // Combine shared events and personal obligations into a unified view list
  // without mutating or duplicating the underlying shared event records.
  const personalList = getPersonalObligations("all").map((item) => ({
    id: item.id,
    unitId: item.unitId,
    title: item.title,
    kind: item.kind || "Personal Task",
    dueAt: item.dueAt,
    dueOrder: item.dueOrder ?? 1,
    notes: item.notes,
    source: "personal",
    completed: item.completed,
    status: item.completed
      ? "completed"
      : item.overdue
      ? "overdue"
      : "upcoming",
  }));

  const sharedList = MOCK_SHARED_EVENTS.map((evt) => {
    const completed = isSharedEventCompleted(evt.id);
    return {
      id: evt.id,
      unitId: evt.unitId,
      title: evt.title,
      kind: evt.kind,
      dueAt: evt.dueAt,
      dueOrder: evt.dueOrder ?? 2,
      locationOrChannel: evt.locationOrChannel,
      notes: evt.notes,
      publisherLabel: evt.publisherLabel,
      publisherRole: evt.publisherRole,
      publishedAt: evt.publishedAt,
      verificationState: evt.verificationState,
      source: "shared",
      completed,
      status: completed ? "completed" : evt.status === "overdue" ? "overdue" : "upcoming",
    };
  });

  const allItems = [...personalList, ...sharedList];

  // Scope by unit first so summary cards reflect the selected unit (or all units)
  const unitScopedItems = allItems.filter(
    (item) => unitFilter === "all" || item.unitId === unitFilter
  );

  const upcomingTotal = unitScopedItems.filter(
    (item) => item.status === "upcoming"
  ).length;
  const overdueTotal = unitScopedItems.filter(
    (item) => item.status === "overdue"
  ).length;
  const completedTotal = unitScopedItems.filter(
    (item) => item.status === "completed"
  ).length;

  // Apply remaining filters
  const query = searchQuery.trim().toLowerCase();
  const filteredItems = unitScopedItems.filter((item) => {
    if (sourceFilter !== "all" && item.source !== sourceFilter) return false;
    if (typeFilter !== "all" && item.kind !== typeFilter) return false;
    if (statusFilter !== "all" && item.status !== statusFilter) return false;
    if (query) {
      const code = unitCodeMap.get(item.unitId) ?? "";
      const haystack = [
        item.title,
        item.notes ?? "",
        code,
        item.publisherLabel ?? "",
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }
    return a.dueOrder - b.dueOrder;
  });

  const overdueItems = sortedItems.filter((i) => i.status === "overdue");
  const upcomingItems = sortedItems.filter((i) => i.status === "upcoming");
  const completedItems = sortedItems.filter((i) => i.status === "completed");

  function handleCreatePersonalTask(event) {
    event.preventDefault();
    if (!newTitle.trim()) return;
    addPersonalObligation(newUnitId, {
      title: newTitle,
      kind: newKind,
      dueAt: newDueAt || "Tomorrow, 5:00 PM",
    });
    setNewTitle("");
    setNewDueAt("");
    setTaskFormOpen(false);
  }

  function clearFilters() {
    setSourceFilter("all");
    setTypeFilter("all");
    setStatusFilter("all");
    setSearchQuery("");
  }

  const hasFilters =
    sourceFilter !== "all" ||
    typeFilter !== "all" ||
    statusFilter !== "all" ||
    searchQuery.trim() !== "";

  return (
    <section
      aria-label="My obligations"
      className="flex-1 overflow-y-auto bg-[#111413] px-3.5 py-5 sm:px-6 sm:py-6"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Centre column */}
          <div className="min-w-0 flex-1 space-y-5">
            {/* Header */}
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  My obligations
                </h2>
                <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
                  Your academic commitments. Shared unit deadlines stay
                  separate from private tasks.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/units/${unit.id}`}
                  className="rounded-xl border border-[#262b28] bg-[#161a18] px-3 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-[#1d221f] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d]"
                >
                  ← Back to {unit.code}
                </Link>

                <button
                  type="button"
                  onClick={() => setTaskFormOpen((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#d9f99d] px-3.5 py-2 text-xs font-semibold text-[#111413] transition-colors hover:bg-[#ccf381] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d]"
                >
                  <span>+ Personal task</span>
                </button>
              </div>
            </div>

            {/* Inline private personal task form */}
            {taskFormOpen && (
              <form
                onSubmit={handleCreatePersonalTask}
                className="rounded-2xl border border-[#39492a] bg-[#151b13] p-4 space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-semibold text-[#d9f99d]">
                    New private personal obligation (only visible to you)
                  </p>
                  <button
                    type="button"
                    onClick={() => setTaskFormOpen(false)}
                    className="text-xs text-zinc-400 hover:text-white"
                  >
                    Close
                  </button>
                </div>

                <div className="grid gap-2.5 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label htmlFor="personal-task-title" className="sr-only">
                      Personal task title
                    </label>
                    <input
                      id="personal-task-title"
                      type="text"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      placeholder="e.g. Revise linked lists before Lab 3"
                      className="w-full rounded-xl border border-[#262b28] bg-[#111413] px-3.5 py-2 text-sm text-white placeholder:text-zinc-500 focus:border-[#495b35] focus:outline-none"
                    />
                  </div>

                  <select
                    aria-label="Task unit"
                    value={newUnitId}
                    onChange={(e) => setNewUnitId(e.target.value)}
                    className="rounded-xl border border-[#262b28] bg-[#111413] px-3 py-2 text-xs text-zinc-200 focus:border-[#495b35] focus:outline-none"
                  >
                    {units.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.code} · {u.title}
                      </option>
                    ))}
                  </select>

                  <select
                    aria-label="Personal obligation type"
                    value={newKind}
                    onChange={(e) => setNewKind(e.target.value)}
                    className="rounded-xl border border-[#262b28] bg-[#111413] px-3 py-2 text-xs text-zinc-200 focus:border-[#495b35] focus:outline-none"
                  >
                    <option value="Personal Task">Personal Task</option>
                    <option value="Study Session">Study Session</option>
                  </select>

                  <div className="sm:col-span-2 flex flex-wrap items-center gap-2.5">
                    <input
                      type="text"
                      aria-label="Target due date or time"
                      value={newDueAt}
                      onChange={(e) => setNewDueAt(e.target.value)}
                      placeholder="Target time (e.g. Tomorrow, 5:00 PM)"
                      className="min-w-0 flex-1 rounded-xl border border-[#262b28] bg-[#111413] px-3.5 py-2 text-xs text-white placeholder:text-zinc-500 focus:border-[#495b35] focus:outline-none"
                    />
                    <button
                      type="submit"
                      disabled={!newTitle.trim()}
                      className="rounded-xl bg-[#d9f99d] px-4 py-2 text-xs font-semibold text-[#111413] hover:bg-[#ccf381] disabled:opacity-40"
                    >
                      Save private task
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* 3 Summary cards */}
            <div className="grid grid-cols-3 gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() =>
                  setStatusFilter(
                    statusFilter === "upcoming" ? "all" : "upcoming"
                  )
                }
                aria-pressed={statusFilter === "upcoming"}
                className={`rounded-2xl border p-3.5 text-left transition-colors sm:p-4 ${
                  statusFilter === "upcoming"
                    ? "border-[#455932] bg-[#182015]"
                    : "border-[#1f2421] bg-[#151917] hover:border-[#2c332f]"
                }`}
              >
                <span className="block text-xl font-bold text-[#d9f99d] sm:text-2xl">
                  {upcomingTotal}
                </span>
                <span className="mt-1 block text-xs font-medium text-white">
                  Upcoming
                </span>
                <span className="mt-0.5 hidden text-[11px] text-zinc-400 sm:block">
                  Active commitments
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setStatusFilter(
                    statusFilter === "overdue" ? "all" : "overdue"
                  )
                }
                aria-pressed={statusFilter === "overdue"}
                className={`rounded-2xl border p-3.5 text-left transition-colors sm:p-4 ${
                  statusFilter === "overdue"
                    ? "border-rose-500/60 bg-[#251515]"
                    : "border-[#4c2626] bg-[#1d1313] hover:border-rose-500/40"
                }`}
              >
                <span className="block text-xl font-bold text-rose-300 sm:text-2xl">
                  {overdueTotal}
                </span>
                <span className="mt-1 block text-xs font-medium text-white">
                  Overdue
                </span>
                <span className="mt-0.5 hidden text-[11px] text-rose-200/70 sm:block">
                  Needs attention
                </span>
              </button>

              <button
                type="button"
                onClick={() =>
                  setStatusFilter(
                    statusFilter === "completed" ? "all" : "completed"
                  )
                }
                aria-pressed={statusFilter === "completed"}
                className={`rounded-2xl border p-3.5 text-left transition-colors sm:p-4 ${
                  statusFilter === "completed"
                    ? "border-[#455932] bg-[#182015]"
                    : "border-[#1f2421] bg-[#151917] hover:border-[#2c332f]"
                }`}
              >
                <span className="block text-xl font-bold text-zinc-200 sm:text-2xl">
                  {completedTotal}
                </span>
                <span className="mt-1 block text-xs font-medium text-white">
                  Completed
                </span>
                <span className="mt-0.5 hidden text-[11px] text-zinc-400 sm:block">
                  Finished items
                </span>
              </button>
            </div>

            {/* Mobile Today's Plan */}
            <div className="lg:hidden">
              <TodaysPlanPanel defaultUnitId={unit.id} />
            </div>

            {/* Search & Filters */}
            <div className="space-y-2.5">
              <div className="relative">
                <svg
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-zinc-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
                <label htmlFor="obligations-search" className="sr-only">
                  Search obligations by title
                </label>
                <input
                  id="obligations-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search obligations"
                  className="w-full rounded-xl border border-[#262b28] bg-[#161a18] py-2.5 pr-3.5 pl-10 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-[#495b35] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                <select
                  aria-label="Filter by unit"
                  value={unitFilter}
                  onChange={(e) => setUnitFilter(e.target.value)}
                  className="rounded-xl border border-[#262b28] bg-[#161a18] px-2.5 py-2 text-xs font-medium text-zinc-200 focus:border-[#495b35] focus:outline-none"
                >
                  <option value="all">All joined units</option>
                  {units.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.code}
                    </option>
                  ))}
                </select>

                <select
                  aria-label="Filter by source"
                  value={sourceFilter}
                  onChange={(e) => setSourceFilter(e.target.value)}
                  className="rounded-xl border border-[#262b28] bg-[#161a18] px-2.5 py-2 text-xs font-medium text-zinc-200 focus:border-[#495b35] focus:outline-none"
                >
                  <option value="all">All sources</option>
                  <option value="shared">Shared events</option>
                  <option value="personal">Personal only</option>
                </select>

                <select
                  aria-label="Filter by obligation type"
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="rounded-xl border border-[#262b28] bg-[#161a18] px-2.5 py-2 text-xs font-medium text-zinc-200 focus:border-[#495b35] focus:outline-none"
                >
                  <option value="all">All types</option>
                  <option value="CAT">CAT</option>
                  <option value="Assignment">Assignment</option>
                  <option value="Exam">Exam</option>
                  <option value="Study Session">Study Session</option>
                  <option value="Personal Task">Personal Task</option>
                </select>

                <select
                  aria-label="Filter by status"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl border border-[#262b28] bg-[#161a18] px-2.5 py-2 text-xs font-medium text-zinc-200 focus:border-[#495b35] focus:outline-none"
                >
                  <option value="all">All statuses</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="overdue">Overdue</option>
                  <option value="completed">Completed</option>
                </select>

                <select
                  aria-label="Sort obligations"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="col-span-2 rounded-xl border border-[#262b28] bg-[#161a18] px-2.5 py-2 text-xs font-medium text-zinc-200 focus:border-[#495b35] focus:outline-none sm:col-span-1"
                >
                  <option value="due">Sort: Due date ↑</option>
                  <option value="title">Sort: Title A–Z</option>
                </select>
              </div>
            </div>

            {/* Obligation sections */}
            {sortedItems.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#262b28] p-8 text-center">
                <p className="text-sm font-medium text-zinc-200">
                  No obligations match your current filters.
                </p>
                {hasFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-3 inline-flex items-center rounded-lg border border-[#262b28] bg-[#161a18] px-3 py-1.5 text-xs font-medium text-[#d9f99d] hover:bg-[#1e2320]"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                {overdueItems.length > 0 && (
                  <div className="space-y-2.5">
                    <h3 className="text-[11px] font-semibold tracking-wider text-rose-300 uppercase">
                      Overdue · {overdueItems.length}
                    </h3>
                    <div className="space-y-2.5">
                      {overdueItems.map((item) => (
                        <ObligationCard
                          key={item.id}
                          item={item}
                          unitCode={
                            unitCodeMap.get(item.unitId) ??
                            item.unitId.toUpperCase()
                          }
                          onToggle={() =>
                            item.source === "shared"
                              ? toggleSharedEventCompleted(item.id)
                              : togglePersonalObligation(item.id)
                          }
                          onReschedule={
                            item.source === "personal"
                              ? () => reschedulePersonalObligation(item.id)
                              : undefined
                          }
                        />
                      ))}
                    </div>
                  </div>
                )}

                {upcomingItems.length > 0 && (
                  <div className="space-y-2.5">
                    <h3 className="text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                      Upcoming · {upcomingItems.length}
                    </h3>
                    <div className="space-y-2.5">
                      {upcomingItems.map((item) => (
                        <ObligationCard
                          key={item.id}
                          item={item}
                          unitCode={
                            unitCodeMap.get(item.unitId) ??
                            item.unitId.toUpperCase()
                          }
                          onToggle={() =>
                            item.source === "shared"
                              ? toggleSharedEventCompleted(item.id)
                              : togglePersonalObligation(item.id)
                          }
                        />
                      ))}
                    </div>
                  </div>
                )}

                {completedItems.length > 0 && (
                  <div className="space-y-2.5">
                    <h3 className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                      Completed · {completedItems.length}
                    </h3>
                    <div className="space-y-2.5">
                      {completedItems.map((item) => (
                        <ObligationCard
                          key={item.id}
                          item={item}
                          unitCode={
                            unitCodeMap.get(item.unitId) ??
                            item.unitId.toUpperCase()
                          }
                          onToggle={() =>
                            item.source === "shared"
                              ? toggleSharedEventCompleted(item.id)
                              : togglePersonalObligation(item.id)
                          }
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <p className="pt-1 text-xs text-zinc-500">
              Marking an obligation done updates your personal checklist only
              and does not submit coursework.
            </p>
          </div>

          {/* Desktop right column: Today's Plan */}
          <aside
            aria-label="Today's plan"
            className="hidden lg:block lg:w-72 xl:w-80 lg:shrink-0 lg:sticky lg:top-6"
          >
            <TodaysPlanPanel defaultUnitId={unit.id} />
          </aside>
        </div>
      </div>
    </section>
  );
}
