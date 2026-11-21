function getRoleBadge(role) {
  if (role === "class_rep") {
    return (
      <span className="rounded bg-[#232d1c] px-1.5 py-0.5 text-[10px] font-medium text-[#d9f99d]">
        Class Rep
      </span>
    );
  }
  if (role === "lecturer") {
    return (
      <span className="rounded bg-[#172a23] px-1.5 py-0.5 text-[10px] font-medium text-emerald-300">
        Lecturer
      </span>
    );
  }
  return null;
}

function getInitials(label) {
  return label
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function MessageBubble({ message }) {
  const isSelf = message.authorRole === "self";
  const isRep = message.authorRole === "class_rep";

  if (isSelf) {
    return (
      <div className="flex flex-col items-end">
        <div className="w-full max-w-[85%] sm:max-w-[72%]">
          <div className="mb-1 flex items-center justify-between gap-3 px-1">
            <span className="text-xs font-medium text-zinc-300">
              {message.authorLabel}
            </span>
            <span className="text-[11px] text-zinc-500">
              {message.timestamp}
            </span>
          </div>
          <div className="rounded-2xl rounded-br-sm bg-[#d9f99d] px-4 py-2.5 text-[#111413]">
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message.body}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div
        aria-hidden="true"
        className={`mt-5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
          isRep
            ? "bg-[#232d1c] text-[#d9f99d]"
            : "bg-[#1e2320] text-zinc-300"
        }`}
      >
        {getInitials(message.authorLabel)}
      </div>

      <div className="min-w-0 flex-1 sm:max-w-[72%]">
        <div className="mb-1 flex items-center justify-between gap-3 px-0.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-semibold text-zinc-200">
              {message.authorLabel}
            </span>
            {getRoleBadge(message.authorRole)}
          </div>
          <span className="shrink-0 text-[11px] text-zinc-500">
            {message.timestamp}
          </span>
        </div>

        <div
          className={`rounded-2xl rounded-tl-sm border px-4 py-2.5 text-zinc-100 ${
            isRep
              ? "border-[#263122] bg-[#161d15]"
              : "border-[#232826] bg-[#181b1a]"
          }`}
        >
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {message.body}
          </p>
        </div>
      </div>
    </div>
  );
}
