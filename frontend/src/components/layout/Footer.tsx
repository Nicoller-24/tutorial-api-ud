export function Footer() {
  return (
    <footer className="mt-auto bg-ud-charcoal text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-2 text-center sm:flex-row sm:justify-between sm:text-left">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide">
              Universidad Distrital Francisco José de Caldas
            </p>
            <p className="mt-1 text-xs text-white/70">
              Oficina Asesora de Tecnologías e Información (OATI)
            </p>
          </div>
          <p className="text-xs text-white/60">Prueba técnica — Enunciado 4 · Tutoriales 1:1</p>
        </div>
      </div>
      <div className="h-1 bg-ud-burgundy" aria-hidden="true" />
    </footer>
  );
}
