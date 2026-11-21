"use client";

import { useState } from "react";

export function ResourceTypeIcon({ type, className = "h-5 w-5" }) {
  switch (type) {
    case "PDF":
      return (
        <svg
          className={`${className} text-sky-300`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
          <path d="M9 15h6" />
          <path d="M9 11h3" />
        </svg>
      );
    case "Notes":
      return (
        <svg
          className={`${className} text-[#d9f99d]`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
      );
    case "Link":
      return (
        <svg
          className={`${className} text-violet-300`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
          <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
        </svg>
      );
    default:
      return (
        <svg
          className={`${className} text-amber-300`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      );
  }
}

function getCategoryLabel(category) {
  switch (category) {
    case "notes":
      return "Lecture Notes";
    case "pdf":
      return "PDF Document";
    case "link":
      return "External Link";
    default:
      return "Other Resource";
  }
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

export default function ResourceDetailPanel({ resource, onClose }) {
  const [noticeResourceId, setNoticeResourceId] = useState(null);

  if (!resource) {
    return (
      <div className="rounded-2xl border border-[#1f2421] bg-[#151917] p-5 text-center">
        <p className="text-sm font-medium text-zinc-200">
          Select a resource
        </p>
        <p className="mt-1 text-xs text-zinc-400">
          Choose any material from the library to inspect its details and
          options.
        </p>
      </div>
    );
  }

  const showDemoNotice = noticeResourceId === resource.id;

  function triggerDemoNotice() {
    setNoticeResourceId(resource.id);
  }

  return (
    <div className="rounded-2xl border border-[#1f2421] bg-[#151917] p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#2a3324] bg-[#161b14]">
            <ResourceTypeIcon type={resource.type} />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-semibold tracking-wider text-[#d9f99d] uppercase">
              {getCategoryLabel(resource.category)}
            </p>
            <p className="mt-0.5 text-xs text-zinc-400">{resource.fileMeta}</p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close resource details"
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-[#1f2421] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d]"
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
        )}
      </div>

      <h3 className="mt-4 text-base font-semibold text-white">
        {resource.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-300">
        {resource.description}
      </p>

      <dl className="mt-5 space-y-3 border-t border-[#1f2421] pt-4 text-xs">
        <div>
          <dt className="text-zinc-500">Publisher</dt>
          <dd className="mt-0.5 flex flex-wrap items-center gap-2 font-medium text-zinc-200">
            <span>{resource.addedBy}</span>
            {getRoleBadge(resource.publisherRole)}
          </dd>
        </div>

        <div>
          <dt className="text-zinc-500">Date added</dt>
          <dd className="mt-0.5 font-medium text-zinc-200">
            {resource.addedAt}
          </dd>
        </div>

        <div>
          <dt className="text-zinc-500">Topic</dt>
          <dd className="mt-0.5 font-medium text-zinc-200">
            {resource.weekLabel}
          </dd>
        </div>
      </dl>

      {/* Type-dependent actions */}
      <div className="mt-5 space-y-2.5">
        {(resource.category === "pdf" || resource.category === "notes") && (
          <>
            <button
              type="button"
              onClick={triggerDemoNotice}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d9f99d] px-4 py-2.5 text-xs font-semibold text-[#111413] transition-colors hover:bg-[#ccf381] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d]"
            >
              <span>
                {resource.category === "pdf" ? "Open PDF" : "Open Notes"}
              </span>
              <span aria-hidden="true">↗</span>
            </button>
            <button
              type="button"
              onClick={triggerDemoNotice}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#2a302d] bg-[#1a1f1c] px-4 py-2.5 text-xs font-medium text-zinc-200 transition-colors hover:bg-[#222824] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d]"
            >
              <span>Download</span>
            </button>
          </>
        )}

        {resource.category === "link" && (
          <button
            type="button"
            onClick={triggerDemoNotice}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d9f99d] px-4 py-2.5 text-xs font-semibold text-[#111413] transition-colors hover:bg-[#ccf381] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d]"
          >
            <span>Open Link</span>
            <span aria-hidden="true">↗</span>
          </button>
        )}

        {resource.category === "other" && (
          <button
            type="button"
            onClick={triggerDemoNotice}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#d9f99d] px-4 py-2.5 text-xs font-semibold text-[#111413] transition-colors hover:bg-[#ccf381] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d]"
          >
            <span>Download</span>
          </button>
        )}

        {showDemoNotice ? (
          <p
            role="status"
            className="rounded-lg border border-[#39492a] bg-[#161b14] px-3 py-2 text-[11px] leading-relaxed text-[#d9f99d]"
          >
            Demo mode: Real file downloads and external URLs are not connected
            in this UI milestone.
          </p>
        ) : (
          <p className="text-[11px] text-zinc-500">
            Demo preview · File storage not connected yet.
          </p>
        )}
      </div>
    </div>
  );
}
