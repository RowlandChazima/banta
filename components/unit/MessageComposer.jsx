"use client";

import { useState } from "react";

export default function MessageComposer({ unitCode, onSend }) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setText("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-[#1f2421] bg-[#0e1110] px-4 py-3 sm:px-6"
    >
      <div className="mx-auto flex max-w-3xl items-center gap-2.5">
        <div className="flex flex-1 items-center rounded-2xl border border-[#262b28] bg-[#161a18] px-3.5 py-2 focus-within:border-[#495b35]">
          <label htmlFor="unit-message-input" className="sr-only">
            Message {unitCode} general discussion
          </label>
          <input
            id="unit-message-input"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={`Message ${unitCode}...`}
            className="w-full bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          disabled={!text.trim()}
          aria-label="Send message"
          className="inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl bg-[#d9f99d] px-3.5 text-sm font-semibold text-[#111413] transition-colors hover:bg-[#ccf381] disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d]"
        >
          <span className="hidden sm:inline">Send</span>
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </button>
      </div>
    </form>
  );
}
