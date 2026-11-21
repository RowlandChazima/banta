"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWorkspace } from "@/components/providers/WorkspaceProvider";
import { getUnitObligations } from "@/lib/mock-data";

function getInitials(label) {
  return label
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getRoleSubtitle(role) {
  if (role === "class_rep") return "Class Rep";
  if (role === "lecturer") return "Lecturer";
  return "Peer";
}

function AnnouncementsContextSidebar({ unit }) {
  const { getUnreadAnnouncementCount } = useWorkspace();
  const unreadCount = getUnreadAnnouncementCount(unit.id);
  const { sharedEvents } = getUnitObligations(unit.id);
  const nextDeadline = sharedEvents.find((evt) => evt.status === "upcoming");

  return (
    <aside
      aria-label="Unit announcements summary"
      className="hidden lg:flex lg:w-72 xl:w-80 lg:shrink-0 lg:flex-col lg:justify-between lg:border-l lg:border-[#1f2421] lg:bg-[#0e1110] lg:p-5"
    >
      <div className="space-y-4 overflow-y-auto">
        <p className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
          Unit at a glance
        </p>

        {/* Unread announcements card */}
        <div className="rounded-xl border border-[#1f2421] bg-[#151917] p-4">
          <div className="flex items-baseline gap-2.5">
            <span className="text-2xl font-bold text-[#d9f99d]">
              {unreadCount}
            </span>
            <div>
              <p className="text-sm font-medium text-white">
                unread {unreadCount === 1 ? "announcement" : "announcements"}
              </p>
              <p className="text-xs text-zinc-400">
                {unreadCount === 0
                  ? "You're all caught up."
                  : "Updates waiting in your feed."}
              </p>
            </div>
          </div>
        </div>

        {/* Next deadline card */}
        <div className="rounded-xl border border-[#1f2421] bg-[#151917] p-4">
          <p className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
            Next deadline
          </p>
          {nextDeadline ? (
            <div className="mt-2.5">
              <p className="text-sm font-semibold text-white">
                {nextDeadline.title}
              </p>
              <p className="mt-1 text-xs font-medium text-[#d9f99d]">
                {nextDeadline.dueAt}
              </p>
              {nextDeadline.locationOrChannel && (
                <p className="mt-1 text-xs text-zinc-400">
                  {nextDeadline.locationOrChannel}
                </p>
              )}
              <Link
                href={`/units/${unit.id}/obligations`}
                className="mt-3 inline-flex items-center text-xs font-medium text-[#d9f99d] hover:underline"
              >
                View my obligations →
              </Link>
            </div>
          ) : (
            <p className="mt-2 text-xs text-zinc-400">
              No upcoming shared deadlines for {unit.code}.
            </p>
          )}
        </div>

        {/* Trust & provenance note */}
        <div className="rounded-xl border border-[#1f2421] bg-[#151917] p-4">
          <h3 className="text-sm font-semibold text-white">
            Updates you can trust
          </h3>
          <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
            Only lecturers and class reps can publish announcements here. Class
            rep posts remain marked as unverified until confirmed by a lecturer.
          </p>
          <div className="mt-3 border-t border-[#1f2421] pt-3">
            <p className="text-xs font-medium text-zinc-300">
              Have a question?
            </p>
            <Link
              href={`/units/${unit.id}`}
              className="mt-1 inline-flex items-center text-xs font-medium text-[#d9f99d] hover:underline"
            >
              Open General Discussion →
            </Link>
          </div>
        </div>
      </div>

      <p className="mt-6 text-[11px] text-zinc-500">
        Demo data · {unit.code}
      </p>
    </aside>
  );
}

export default function UnitDetailsPanel({ unit }) {
  const pathname = usePathname();
  const { getMessages } = useWorkspace();

  if (
    pathname === `/units/${unit.id}/resources` ||
    pathname === `/units/${unit.id}/obligations`
  ) {
    return null;
  }

  if (pathname === `/units/${unit.id}/announcements`) {
    return <AnnouncementsContextSidebar unit={unit} />;
  }

  const messages = getMessages(unit.id);

  // Collect unique non-self participants from the unit's conversation
  const participantsMap = new Map();
  for (const msg of messages) {
    if (msg.authorRole === "self") continue;
    if (!participantsMap.has(msg.authorLabel)) {
      participantsMap.set(msg.authorLabel, {
        label: msg.authorLabel,
        role: msg.authorRole,
      });
    }
  }
  const participants = Array.from(participantsMap.values());

  return (
    <aside
      aria-label="Unit details"
      className="hidden lg:flex lg:w-72 xl:w-80 lg:shrink-0 lg:flex-col lg:justify-between lg:border-l lg:border-[#1f2421] lg:bg-[#0e1110] lg:p-5"
    >
      <div className="space-y-6 overflow-y-auto">
        <div>
          <h2 className="text-sm font-semibold text-white">Unit details</h2>
        </div>

        {/* About this unit */}
        <section aria-labelledby="about-unit-heading" className="space-y-1.5">
          <h3
            id="about-unit-heading"
            className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase"
          >
            About this unit
          </h3>
          <p className="text-xs font-semibold text-[#d9f99d]">{unit.code}</p>
          <p className="text-sm font-semibold text-white">{unit.title}</p>
          <p className="text-xs text-zinc-400">{unit.semester}</p>
        </section>

        {/* Participants in conversation */}
        <section
          aria-labelledby="participants-heading"
          className="space-y-3 border-t border-[#1f2421] pt-5"
        >
          <h3
            id="participants-heading"
            className="text-xs font-semibold text-zinc-300"
          >
            In this conversation
          </h3>

          {participants.length === 0 ? (
            <p className="text-xs text-zinc-500">
              No active participants in demo history yet.
            </p>
          ) : (
            <ul className="space-y-2.5">
              {participants.map((person) => {
                const isRep = person.role === "class_rep";
                return (
                  <li key={person.label} className="flex items-center gap-2.5">
                    <span
                      aria-hidden="true"
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                        isRep
                          ? "bg-[#232d1c] text-[#d9f99d]"
                          : "bg-[#1c201e] text-zinc-300"
                      }`}
                    >
                      {getInitials(person.label)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-zinc-200">
                        {person.label}
                      </p>
                      {isRep ? (
                        <span className="inline-block rounded bg-[#232d1c] px-1.5 py-0.5 text-[10px] font-medium text-[#d9f99d]">
                          Class Rep
                        </span>
                      ) : (
                        <p className="text-[11px] text-zinc-500">
                          {getRoleSubtitle(person.role)}
                        </p>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </section>

        {/* Helpful space note */}
        <section className="space-y-1.5 border-t border-[#1f2421] pt-5">
          <h3 className="text-xs font-semibold text-zinc-300">
            A space for your unit
          </h3>
          <p className="text-xs leading-relaxed text-zinc-400">
            Questions, quick clarifications and conversations with your
            classmates.
          </p>
        </section>
      </div>

      {/* Bottom callout */}
      <div className="mt-6 rounded-xl border border-[#293323] bg-[#161b14] p-3.5">
        <div className="flex items-start gap-2.5">
          <svg
            className="mt-0.5 h-4 w-4 shrink-0 text-[#d9f99d]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
          </svg>
          <div className="text-xs leading-relaxed">
            <p className="font-semibold text-[#d9f99d]">
              Looking for official dates?
            </p>
            <p className="mt-0.5 text-zinc-400">
              Check{" "}
              <Link
                href={`/units/${unit.id}/announcements`}
                className="text-zinc-200 underline decoration-zinc-600 underline-offset-2 hover:text-white"
              >
                Announcements
              </Link>{" "}
              and{" "}
              <Link
                href={`/units/${unit.id}/obligations`}
                className="text-zinc-200 underline decoration-zinc-600 underline-offset-2 hover:text-white"
              >
                My obligations
              </Link>{" "}
              for unit deadlines.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
