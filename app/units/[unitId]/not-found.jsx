import Link from "next/link";

export default function UnitNotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
        Unit not found
      </p>
      <h1 className="mt-2 text-xl font-semibold text-white">
        We couldn&apos;t find that unit offering
      </h1>
      <p className="mt-2 text-sm text-zinc-400">
        This unit may not be in your joined demo units list, or the link may be
        incorrect.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center rounded-xl bg-[#d9f99d] px-4 py-2 text-sm font-semibold text-[#111413] transition-colors hover:bg-[#ccf381] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d9f99d]"
      >
        ← Back to Overview
      </Link>
    </div>
  );
}
