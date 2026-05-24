import { type JSX } from "react";

export function TailwindCard(): JSX.Element {
  return (
    <div className="max-w-md rounded-card border border-border-default bg-surface-panel p-6 shadow-card">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-content-primary">
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-brand-300">
          Tailwind CSS v4 is working!
        </h2>
      </div>
      <p className="mb-4 text-content-secondary">
        This card is styled entirely with Tailwind utility classes shared from{" "}
        <code className="rounded bg-brand-900 px-1.5 py-0.5 text-sm font-semibold text-brand-300">
          @repo/ui
        </code>
        .
      </p>
      <div className="flex flex-wrap gap-2">
        <span className="rounded-full bg-brand-900 px-3 py-1 text-sm font-medium text-brand-300">
          Monorepo
        </span>
        <span className="rounded-full bg-brand-800 px-3 py-1 text-sm font-medium text-brand-200">
          Turborepo
        </span>
        <span className="rounded-full bg-brand-500/10 px-3 py-1 text-sm font-medium text-brand-300">
          Next.js 16
        </span>
      </div>
    </div>
  );
}
