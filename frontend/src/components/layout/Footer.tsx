export function Footer() {
  return (
    <footer className="mt-auto bg-brand-charcoal text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide">Tutorial Admin</p>
            <p className="mt-1 text-xs text-white/70">SPA React + API FastAPI</p>
          </div>
          <p className="text-xs text-white/60">Tutoriales con detalle 1:1</p>
        </div>
      </div>
      <div className="h-1 bg-brand-burgundy" aria-hidden="true" />
    </footer>
  );
}
