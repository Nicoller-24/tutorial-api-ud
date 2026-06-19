import type { ReactNode } from "react";

interface PageContainerProps {
  children: ReactNode;
  title?: string;
  description?: string;
  action?: ReactNode;
}

export function PageContainer({ children, title, description, action }: PageContainerProps) {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {(title || action) && (
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title && <h1 className="font-serif text-2xl font-bold tracking-tight text-ud-dark">{title}</h1>}
            {description && <p className="mt-1 text-sm text-ud-gray">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {children}
    </main>
  );
}
