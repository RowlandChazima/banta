"use client";

import { useEffect, useRef } from "react";
import { useWorkspace } from "@/components/providers/WorkspaceProvider";
import MessageBubble from "./MessageBubble";
import MessageComposer from "./MessageComposer";

export default function UnitDiscussion({ unit }) {
  const { getMessages, addMessage } = useWorkspace();
  const messages = getMessages(unit.id);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  return (
    <section
      aria-label={`${unit.code} general discussion`}
      className="flex min-h-0 flex-1 flex-col bg-[#111413]"
    >
      {/* Scrollable conversation history */}
      <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
        <div className="mx-auto max-w-3xl space-y-4">
          <div className="flex items-start gap-2.5 rounded-xl border border-[#1f2421] bg-[#161a18] px-4 py-2.5 text-xs text-zinc-400">
            <svg
              className="mt-0.5 h-4 w-4 shrink-0 text-zinc-500"
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
            <div>
              <p className="font-medium text-zinc-300">
                Informal peer &amp; unit chat · Demo data
              </p>
              <p className="text-zinc-500">
                Official dates: Announcements and My obligations.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 py-1">
            <div className="h-px flex-1 bg-[#1f2421]" />
            <span className="text-[11px] font-medium tracking-wider text-zinc-500 uppercase">
              Today
            </span>
            <div className="h-px flex-1 bg-[#1f2421]" />
          </div>

          {messages.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#262b28] p-8 text-center">
              <p className="text-sm font-medium text-zinc-200">
                No messages yet in {unit.code}.
              </p>
              <p className="mt-1 text-xs text-zinc-500">
                Start the conversation below with a question or update.
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Composer */}
      <MessageComposer
        unitCode={unit.code}
        onSend={(text) => addMessage(unit.id, text)}
      />
    </section>
  );
}
