"use client";

import { useState } from "react";
import { getUnitResources } from "@/lib/mock-data";
import ResourceDetailPanel, { ResourceTypeIcon } from "./ResourceDetailPanel";

const CATEGORIES = [
  {
    id: "notes",
    label: "Lecture notes",
    type: "Notes",
  },
  {
    id: "pdf",
    label: "PDF documents",
    type: "PDF",
  },
  {
    id: "link",
    label: "External links",
    type: "Link",
  },
  {
    id: "other",
    label: "Other resources",
    type: "Other",
  },
];

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

export default function UnitResources({ unit }) {
  const allResources = getUnitResources(unit.id);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedWeek, setSelectedWeek] = useState("all");
  const [sortBy, setSortBy] = useState("week");
  const [selectedResourceId, setSelectedResourceId] = useState(
    () => allResources[0]?.id ?? null
  );
  const [mobileDetailOpen, setMobileDetailOpen] = useState(false);

  // Derive unique week topics sorted by weekOrder
  const weekMap = new Map();
  for (const item of allResources) {
    if (!weekMap.has(item.weekId)) {
      weekMap.set(item.weekId, {
        id: item.weekId,
        label: item.weekLabel,
        order: item.weekOrder,
        count: 0,
      });
    }
    weekMap.get(item.weekId).count += 1;
  }
  const weeks = Array.from(weekMap.values()).sort((a, b) => a.order - b.order);

  // Filter resources
  const query = searchQuery.trim().toLowerCase();
  const filteredResources = allResources.filter((item) => {
    if (selectedCategory !== "all" && item.category !== selectedCategory) {
      return false;
    }
    if (selectedWeek !== "all" && item.weekId !== selectedWeek) {
      return false;
    }
    if (query) {
      const haystack = [
        item.title,
        item.description,
        item.weekLabel,
        item.addedBy,
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(query)) {
        return false;
      }
    }
    return true;
  });

  // Sort resources
  const sortedResources = [...filteredResources].sort((a, b) => {
    if (sortBy === "newest") {
      return b.addedTimestamp.localeCompare(a.addedTimestamp);
    }
    if (sortBy === "oldest") {
      return a.addedTimestamp.localeCompare(b.addedTimestamp);
    }
    if (a.weekOrder !== b.weekOrder) {
      return a.weekOrder - b.weekOrder;
    }
    return b.addedTimestamp.localeCompare(a.addedTimestamp);
  });

  // Group by week when sorted by week
  const weekGroups = [];
  if (sortBy === "week") {
    const groupMap = new Map();
    for (const item of sortedResources) {
      if (!groupMap.has(item.weekId)) {
        const group = {
          weekId: item.weekId,
          weekLabel: item.weekLabel,
          items: [],
        };
        groupMap.set(item.weekId, group);
        weekGroups.push(group);
      }
      groupMap.get(item.weekId).items.push(item);
    }
  }

  const activeResource =
    sortedResources.find((r) => r.id === selectedResourceId) ??
    sortedResources[0] ??
    null;

  function handleSelectResource(resourceId) {
    setSelectedResourceId(resourceId);
    setMobileDetailOpen(true);
  }

  function clearFilters() {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedWeek("all");
  }

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "all" ||
    selectedWeek !== "all";

  return (
    <section
      aria-label={`${unit.code} resources`}
      className="flex-1 overflow-y-auto bg-[#111413] px-3.5 py-5 sm:px-6 sm:py-6"
    >
      <div className="mx-auto max-w-6xl space-y-5">
        {/* Top heading */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
              Resources
            </h2>
            <p className="mt-1 text-xs text-zinc-400 sm:text-sm">
              Your unit&apos;s learning library. Find it, open it, get back to
              learning.
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center rounded-lg border border-[#262c29] bg-[#161a18] px-2.5 py-1 text-xs font-medium text-zinc-300">
            {allResources.length}{" "}
            {allResources.length === 1 ? "material" : "materials"}
          </span>
        </div>

        {/* Search + desktop type/sort controls */}
        <div className="flex flex-col gap-2.5 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1">
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
            <label htmlFor="resource-search" className="sr-only">
              Search resources by title, description, topic, or publisher
            </label>
            <input
              id="resource-search"
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search titles, topics or publishers"
              className="w-full rounded-xl border border-[#262b28] bg-[#161a18] py-2.5 pr-3.5 pl-10 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-[#495b35] focus:outline-none"
            />
          </div>

          <div className="hidden gap-2.5 lg:flex">
            <label htmlFor="desktop-type-filter" className="sr-only">
              Filter by resource type
            </label>
            <select
              id="desktop-type-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border border-[#262b28] bg-[#161a18] px-3 py-2.5 text-xs font-medium text-zinc-200 focus:border-[#495b35] focus:outline-none"
            >
              <option value="all">All resource types</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>

            <label htmlFor="desktop-sort-order" className="sr-only">
              Sort resources
            </label>
            <select
              id="desktop-sort-order"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-xl border border-[#262b28] bg-[#161a18] px-3 py-2.5 text-xs font-medium text-zinc-200 focus:border-[#495b35] focus:outline-none"
            >
              <option value="week">Sort: Week ↑</option>
              <option value="newest">Sort: Newest</option>
              <option value="oldest">Sort: Oldest</option>
            </select>
          </div>
        </div>

        {/* Category cards (2x2 on mobile, 4 columns on desktop) */}
        <div
          role="group"
          aria-label="Resource categories"
          className="grid grid-cols-2 gap-2.5 xl:grid-cols-4"
        >
          {CATEGORIES.map((cat) => {
            const count = allResources.filter(
              (r) => r.category === cat.id
            ).length;
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                aria-pressed={isActive}
                onClick={() =>
                  setSelectedCategory(isActive ? "all" : cat.id)
                }
                className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d] ${
                  isActive
                    ? "border-[#455932] bg-[#182015]"
                    : "border-[#1f2421] bg-[#151917] hover:border-[#2c332f]"
                }`}
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#262b28] bg-[#111413]">
                  <ResourceTypeIcon type={cat.type} className="h-4 w-4" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-xs font-semibold text-white sm:text-sm">
                    {cat.label}
                  </span>
                  <span className="block text-[11px] text-zinc-400">
                    {count} {count === 1 ? "resource" : "resources"}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile week + type + sort controls */}
        <div className="grid grid-cols-2 gap-2.5 lg:hidden">
          <div>
            <label htmlFor="mobile-week-filter" className="sr-only">
              Filter by week
            </label>
            <select
              id="mobile-week-filter"
              value={selectedWeek}
              onChange={(e) => setSelectedWeek(e.target.value)}
              className="w-full rounded-xl border border-[#262b28] bg-[#161a18] px-3 py-2 text-xs font-medium text-zinc-200 focus:border-[#495b35] focus:outline-none"
            >
              <option value="all">All weeks</option>
              {weeks.map((week) => (
                <option key={week.id} value={week.id}>
                  {week.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="mobile-type-filter" className="sr-only">
              Filter by resource type
            </label>
            <select
              id="mobile-type-filter"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-xl border border-[#262b28] bg-[#161a18] px-3 py-2 text-xs font-medium text-zinc-200 focus:border-[#495b35] focus:outline-none"
            >
              <option value="all">All resource types</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Main 3-part desktop grid: Browse by week | Resource list | Resource details */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
          {/* Desktop left rail: Browse by week */}
          <aside
            aria-label="Browse by week"
            className="hidden lg:flex lg:w-52 lg:shrink-0 lg:flex-col lg:gap-5"
          >
            <div>
              <p className="mb-2.5 text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
                Browse by week
              </p>

              <ul className="space-y-1">
                <li>
                  <button
                    type="button"
                    onClick={() => setSelectedWeek("all")}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d] ${
                      selectedWeek === "all"
                        ? "border border-[#39492a] bg-[#182015] text-[#d9f99d]"
                        : "text-zinc-300 hover:bg-[#161a18] hover:text-white"
                    }`}
                  >
                    <span>All weeks</span>
                    <span>{allResources.length}</span>
                  </button>
                </li>

                {weeks.map((week) => {
                  const isActive = selectedWeek === week.id;
                  return (
                    <li key={week.id}>
                      <button
                        type="button"
                        onClick={() => setSelectedWeek(week.id)}
                        className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2 text-left text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d] ${
                          isActive
                            ? "border border-[#39492a] bg-[#182015] font-semibold text-[#d9f99d]"
                            : "text-zinc-300 hover:bg-[#161a18] hover:text-white"
                        }`}
                      >
                        <span className="truncate">{week.label}</span>
                        <span className="shrink-0 text-zinc-500">
                          {week.count}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="rounded-xl border border-[#1f2421] bg-[#151917] p-3.5">
              <p className="text-xs font-semibold text-white">
                Materials, not messages.
              </p>
              <p className="mt-1 text-xs leading-relaxed text-zinc-400">
                Browse by week or search for the exact topic you need.
              </p>
            </div>
          </aside>

          {/* Middle column: Resource list */}
          <div className="min-w-0 flex-1 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <h3 className="text-sm font-semibold text-white sm:text-base">
                  {selectedWeek === "all"
                    ? "All resources"
                    : weeks.find((w) => w.id === selectedWeek)?.label ??
                      "Resources"}
                </h3>
                <p className="text-xs text-zinc-400">
                  Showing {sortedResources.length} of {allResources.length}{" "}
                  {allResources.length === 1 ? "material" : "materials"}
                </p>
              </div>

              <div className="lg:hidden">
                <label htmlFor="mobile-sort-order" className="sr-only">
                  Sort resources
                </label>
                <select
                  id="mobile-sort-order"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-[#262b28] bg-[#161a18] px-2.5 py-1.5 text-xs font-medium text-zinc-200 focus:border-[#495b35] focus:outline-none"
                >
                  <option value="week">Week ↑</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
              </div>
            </div>

            {allResources.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#262b28] p-8 text-center">
                <p className="text-sm font-medium text-zinc-200">
                  No resources shared for {unit.code} yet.
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Lecture notes, PDFs, and reference links will appear here.
                </p>
              </div>
            ) : sortedResources.length === 0 ? (
              <div className="rounded-xl border border-dashed border-[#262b28] p-8 text-center">
                <p className="text-sm font-medium text-zinc-200">
                  No resources match your search or filters.
                </p>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-3 inline-flex items-center rounded-lg border border-[#262b28] bg-[#161a18] px-3 py-1.5 text-xs font-medium text-[#d9f99d] hover:bg-[#1e2320]"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : sortBy === "week" ? (
              <div className="space-y-5">
                {weekGroups.map((group) => (
                  <div key={group.weekId} className="space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-[11px] font-semibold tracking-wider text-zinc-400 uppercase">
                        {group.weekLabel}
                      </h4>
                      <span className="text-[11px] text-zinc-500">
                        {group.items.length}{" "}
                        {group.items.length === 1 ? "item" : "items"}
                      </span>
                    </div>

                    <ul className="space-y-2.5">
                      {group.items.map((resource) => {
                        const isSelected = activeResource?.id === resource.id;
                        return (
                          <li key={resource.id}>
                            <button
                              type="button"
                              onClick={() => handleSelectResource(resource.id)}
                              className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d] ${
                                isSelected
                                  ? "border-[#39492a] bg-[#151b13]"
                                  : "border-[#1f2421] bg-[#151917] hover:border-[#2c332f]"
                              }`}
                            >
                              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#262b28] bg-[#111413]">
                                <ResourceTypeIcon
                                  type={resource.type}
                                  className="h-4 w-4"
                                />
                              </span>

                              <span className="min-w-0 flex-1">
                                <span className="block text-sm font-semibold text-white">
                                  {resource.title}
                                </span>
                                <span className="mt-1 block text-xs leading-relaxed text-zinc-400">
                                  {resource.description}
                                </span>
                                <span className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-zinc-400">
                                  <span className="font-medium text-zinc-300">
                                    {resource.addedBy}
                                  </span>
                                  {getRoleBadge(resource.publisherRole)}
                                  <span aria-hidden="true">·</span>
                                  <span>{resource.addedAt}</span>
                                  <span aria-hidden="true">·</span>
                                  <span>{resource.type}</span>
                                </span>
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <ul className="space-y-2.5">
                {sortedResources.map((resource) => {
                  const isSelected = activeResource?.id === resource.id;
                  return (
                    <li key={resource.id}>
                      <button
                        type="button"
                        onClick={() => handleSelectResource(resource.id)}
                        className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d] ${
                          isSelected
                            ? "border-[#39492a] bg-[#151b13]"
                            : "border-[#1f2421] bg-[#151917] hover:border-[#2c332f]"
                        }`}
                      >
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[#262b28] bg-[#111413]">
                          <ResourceTypeIcon
                            type={resource.type}
                            className="h-4 w-4"
                          />
                        </span>

                        <span className="min-w-0 flex-1">
                          <span className="block text-[11px] font-medium text-[#d9f99d]">
                            {resource.weekLabel}
                          </span>
                          <span className="mt-0.5 block text-sm font-semibold text-white">
                            {resource.title}
                          </span>
                          <span className="mt-1 block text-xs leading-relaxed text-zinc-400">
                            {resource.description}
                          </span>
                          <span className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] text-zinc-400">
                            <span className="font-medium text-zinc-300">
                              {resource.addedBy}
                            </span>
                            {getRoleBadge(resource.publisherRole)}
                            <span aria-hidden="true">·</span>
                            <span>{resource.addedAt}</span>
                            <span aria-hidden="true">·</span>
                            <span>{resource.type}</span>
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          {/* Desktop right column: Resource details */}
          <aside
            aria-label="Resource details"
            className="hidden lg:block lg:w-72 xl:w-80 lg:shrink-0 lg:sticky lg:top-6"
          >
            <h3 className="mb-2.5 text-sm font-semibold text-white">
              Resource details
            </h3>
            <ResourceDetailPanel resource={activeResource} />
          </aside>
        </div>
      </div>

      {/* Mobile detail bottom sheet */}
      {mobileDetailOpen && activeResource && (
        <div
          className="fixed inset-0 z-50 flex items-end lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Resource details"
        >
          <div
            className="fixed inset-0 bg-black/65 backdrop-blur-xs"
            onClick={() => setMobileDetailOpen(false)}
            aria-hidden="true"
          />
          <div className="relative z-10 max-h-[85vh] w-full overflow-y-auto rounded-t-2xl border-t border-[#262b28] bg-[#0e1110] p-4 shadow-2xl">
            <ResourceDetailPanel
              resource={activeResource}
              onClose={() => setMobileDetailOpen(false)}
            />
          </div>
        </div>
      )}
    </section>
  );
}
