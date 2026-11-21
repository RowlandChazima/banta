"use client";

function getTypeStyle(kind) {
  switch (kind) {
    case "CAT":
      return "border-sky-900/50 bg-[#192231] text-sky-300";
    case "Assignment":
      return "border-emerald-900/50 bg-[#182620] text-emerald-300";
    case "Exam":
      return "border-violet-900/50 bg-[#221d30] text-violet-300";
    case "Study Session":
      return "border-[#39492a] bg-[#1a2216] text-[#d9f99d]";
    default:
      return "border-[#2b312d] bg-[#1f2421] text-zinc-300";
  }
}

export default function ObligationCard({
  item,
  unitCode,
  onToggle,
  onReschedule,
}) {
  const isShared = item.source === "shared";
  const isOverdue = !item.completed && item.status === "overdue";

  return (
    <article
      className={`rounded-2xl border p-4 transition-colors ${
        item.completed
          ? "border-[#1c201e] bg-[#131615] opacity-80"
          : isOverdue
          ? "border-[#4c2626] bg-[#1d1313]"
          : "border-[#1f2421] bg-[#151917]"
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Completion toggle */}
        <button
          type="button"
          onClick={onToggle}
          aria-label={
            item.completed
              ? `Mark "${item.title}" as incomplete`
              : `Mark "${item.title}" as complete`
          }
          aria-pressed={item.completed}
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d] ${
            item.completed
              ? "border-[#d9f99d] bg-[#d9f99d] text-[#111413]"
              : isOverdue
              ? "border-rose-400/70 bg-transparent hover:border-rose-300"
              : "border-zinc-600 bg-transparent hover:border-[#d9f99d]"
          }`}
        >
          {item.completed && (
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          )}
        </button>

        {/* Main content */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h4
              className={`text-sm font-semibold sm:text-base ${
                item.completed
                  ? "text-zinc-400 line-through"
                  : "text-white"
              }`}
            >
              {item.title}
            </h4>

            <span
              className={`inline-flex shrink-0 items-center rounded-md border px-2 py-0.5 text-[11px] font-semibold ${getTypeStyle(
                item.kind
              )}`}
            >
              {item.kind}
            </span>
          </div>

          {/* Source & provenance */}
          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
            {isShared ? (
              <span className="inline-flex items-center rounded bg-[#232d1c] px-1.5 py-0.5 text-[11px] font-medium text-[#d9f99d]">
                Shared
              </span>
            ) : (
              <span className="inline-flex items-center rounded bg-[#1b2430] px-1.5 py-0.5 text-[11px] font-medium text-sky-300">
                Personal
              </span>
            )}

            <span className="font-medium text-zinc-300">{unitCode}</span>

            {isShared ? (
              <>
                <span className="text-zinc-500">·</span>
                <span className="text-zinc-400">{item.publisherLabel}</span>
                <span className="text-zinc-500">·</span>
                <span
                  className={
                    item.verificationState === "lecturer_published"
                      ? "text-emerald-400/90"
                      : "text-amber-300/85"
                  }
                >
                  {item.verificationState === "lecturer_published"
                    ? "Lecturer published (Demo)"
                    : "Not lecturer-verified (Demo)"}
                </span>
              </>
            ) : (
              <>
                <span className="text-zinc-500">·</span>
                <span className="text-zinc-400">Private · Only you</span>
              </>
            )}
          </div>

          {/* Date, location & actions */}
          <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <span
                className={
                  isOverdue
                    ? "font-medium text-rose-300"
                    : item.completed
                    ? "text-zinc-500"
                    : "font-medium text-zinc-200"
                }
              >
                {item.dueAt}
              </span>
              {item.locationOrChannel && (
                <>
                  <span className="text-zinc-600">·</span>
                  <span className="text-zinc-400">
                    {item.locationOrChannel}
                  </span>
                </>
              )}
            </div>

            {isOverdue && !isShared && onReschedule && (
              <button
                type="button"
                onClick={onReschedule}
                className="font-medium text-[#d9f99d] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d]"
              >
                Reschedule to tomorrow
              </button>
            )}

            {item.completed && isShared && (
              <span className="text-[11px] text-zinc-500">
                Done locally · Official record unchanged
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
