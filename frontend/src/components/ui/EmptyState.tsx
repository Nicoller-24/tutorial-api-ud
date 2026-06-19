import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-ud-yellow/40 bg-white px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-ud-yellow-light text-2xl ring-2 ring-ud-yellow/30">
        📚
      </div>
      <h3 className="font-serif text-lg font-semibold text-ud-dark">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-ud-gray">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
