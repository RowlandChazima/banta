"use client";

import { useState } from "react";
import { useWorkspace } from "@/components/providers/WorkspaceProvider";
import { getJoinedUnits } from "@/lib/mock-data";

export default function TodaysPlanPanel({ defaultUnitId }) {
  const { getStudySessions, addStudySession, toggleStudySession } =
    useWorkspace();
  const units = getJoinedUnits();
  const sessions = getStudySessions("all");

  const [formOpen, setFormOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [unitId, setUnitId] = useState(defaultUnitId);
  const [scheduledTime, setScheduledTime] = useState("19:00–20:00");
  const [duration, setDuration] = useState("60 min");

  function handleAddSession(event) {
    event.preventDefault();
    if (!title.trim()) return;
    addStudySession({ unitId, title, scheduledTime, duration });
    setTitle("");
    setFormOpen(false);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-[#1f2421] bg-[#151917] p-4 sm:p-5">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-[11px] font-semibold tracking-wider text-[#d9f99d] uppercase">
              Today&apos;s plan
            </p>
            <h3 className="mt-0.5 text-sm font-semibold text-white">
              Plan your day
            </h3>
          </div>
          <span className="rounded-md bg-[#1f2421] px-2 py-0.5 text-[11px] text-zinc-400">
            Personal
          </span>
        </div>

        {/* Study sessions list */}
        <div className="mt-4 space-y-2.5">
          {sessions.length === 0 ? (
            <p className="text-xs text-zinc-500">
              No personal study sessions planned for today yet.
            </p>
          ) : (
            sessions.map((session) => {
              const unitCode =
                units.find((u) => u.id === session.unitId)?.code ??
                session.unitId.toUpperCase();

              return (
                <div
                  key={session.id}
                  className={`flex items-start gap-2.5 rounded-xl border p-3 ${
                    session.completed
                      ? "border-[#1f2421] bg-[#121514] opacity-75"
                      : "border-[#2a3622] bg-[#161c14]"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleStudySession(session.id)}
                    aria-label={
                      session.completed
                        ? `Mark "${session.title}" incomplete`
                        : `Mark "${session.title}" complete`
                    }
                    aria-pressed={session.completed}
                    className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                      session.completed
                        ? "border-[#d9f99d] bg-[#d9f99d] text-[#111413]"
                        : "border-zinc-500 bg-transparent hover:border-[#d9f99d]"
                    }`}
                  >
                    {session.completed && (
                      <svg
                        className="h-3 w-3"
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

                  <div className="min-w-0 flex-1">
                    <p
                      className={`text-xs font-semibold ${
                        session.completed
                          ? "text-zinc-400 line-through"
                          : "text-white"
                      }`}
                    >
                      {session.title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-zinc-400">
                      {unitCode} · {session.scheduledTime} · {session.duration}
                    </p>
                    <p className="mt-1 text-[10px] text-zinc-500">
                      Study time, not a due date
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Add study session form */}
        {formOpen ? (
          <form
            onSubmit={handleAddSession}
            className="mt-4 space-y-2.5 border-t border-[#1f2421] pt-3.5"
          >
            <div>
              <label htmlFor="study-title" className="sr-only">
                Study session activity
              </label>
              <input
                id="study-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Revise binary trees"
                className="w-full rounded-lg border border-[#262b28] bg-[#111413] px-3 py-2 text-xs text-white placeholder:text-zinc-500 focus:border-[#495b35] focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <select
                aria-label="Study session unit"
                value={unitId}
                onChange={(e) => setUnitId(e.target.value)}
                className="rounded-lg border border-[#262b28] bg-[#111413] px-2 py-2 text-xs text-zinc-200 focus:border-[#495b35] focus:outline-none"
              >
                {units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.code}
                  </option>
                ))}
              </select>

              <input
                type="text"
                aria-label="Scheduled time"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                placeholder="19:00–20:00"
                className="rounded-lg border border-[#262b28] bg-[#111413] px-2.5 py-2 text-xs text-zinc-200 focus:border-[#495b35] focus:outline-none"
              />

              <select
                aria-label="Study session duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="rounded-lg border border-[#262b28] bg-[#111413] px-2 py-2 text-xs text-zinc-200 focus:border-[#495b35] focus:outline-none"
              >
                <option value="30 min">30 min</option>
                <option value="45 min">45 min</option>
                <option value="60 min">60 min</option>
                <option value="90 min">90 min</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="submit"
                disabled={!title.trim()}
                className="flex-1 rounded-lg bg-[#d9f99d] px-3 py-2 text-xs font-semibold text-[#111413] hover:bg-[#ccf381] disabled:opacity-40"
              >
                Save study block
              </button>
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="rounded-lg border border-[#262b28] px-3 py-2 text-xs text-zinc-300 hover:bg-[#1a1f1c]"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <button
            type="button"
            onClick={() => setFormOpen(true)}
            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl border border-[#2c3824] bg-[#171e15] px-3 py-2 text-xs font-semibold text-[#d9f99d] transition-colors hover:bg-[#1d271a] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d]"
          >
            <span>+ Plan study time</span>
          </button>
        )}
      </div>

      {/* Trust & boundary reminder card (desktop) */}
      <div className="hidden rounded-2xl border border-[#1f2421] bg-[#151917] p-4 lg:block">
        <h4 className="text-xs font-semibold text-white">
          Plan time. Keep the deadline.
        </h4>
        <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
          Personal tasks and study blocks never change official unit deadlines.
          Marking an obligation done does not submit coursework.
        </p>
      </div>
    </div>
  );
}
