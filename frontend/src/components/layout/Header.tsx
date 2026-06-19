import { Link, useLocation } from "react-router-dom";

import { UdCrest } from "./UdCrest";

function NavLink({ to, label }: { to: string; label: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`whitespace-nowrap text-xs font-bold uppercase tracking-wide transition sm:text-sm ${
        isActive ? "text-ud-yellow" : "text-white hover:text-ud-yellow"
      }`}
    >
      {label}
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 shadow-md">
      {/* Barra superior — estilo portal UD */}
      <div className="bg-ud-charcoal text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs sm:px-6 lg:px-8">
          <span className="font-semibold tracking-wide">OATI · Universidad Distrital</span>
          <a
            href="https://www.udistrital.edu.co"
            target="_blank"
            rel="noopener noreferrer"
            className="opacity-80 transition hover:text-ud-yellow hover:opacity-100"
          >
            udistrital.edu.co ↗
          </a>
        </div>
      </div>

      {/* Franja blanca — logo e identidad */}
      <div className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-4">
            <UdCrest className="h-14 w-11 text-ud-charcoal sm:h-16 sm:w-12" />
            <div className="hidden h-12 w-px bg-ud-gray-light sm:block" aria-hidden="true" />
            <div>
              <p className="font-serif text-base font-semibold uppercase leading-tight tracking-wide text-ud-charcoal sm:text-lg">
                Universidad Distrital
              </p>
              <p className="font-serif text-sm font-medium uppercase tracking-wide text-ud-charcoal sm:text-base">
                Francisco José de Caldas
              </p>
            </div>
          </Link>

          <div className="ml-auto hidden text-right md:block">
            <p className="text-sm font-semibold uppercase tracking-wide text-ud-burgundy">
              Gestión de tutoriales
            </p>
            <p className="text-xs text-ud-gray">Prueba técnica OATI — Enunciado 4</p>
          </div>
        </div>
      </div>

      {/* Subnavegación — gris con corte diagonal */}
      <div className="relative bg-ud-charcoal-light">
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-white sm:w-16"
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-4 py-2 pl-14 text-xs text-white/90 sm:px-6 sm:pl-20 sm:text-sm lg:px-8">
          Panel administrativo · Aprendizaje virtual
        </div>
      </div>

      {/* Navegación principal — burdeos con separadores / */}
      <nav className="bg-ud-burgundy text-white" aria-label="Navegación principal">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-1 px-4 py-3 sm:px-6 lg:px-8">
          <NavLink to="/" label="Dashboard" />
          <span className="ud-nav-slash" aria-hidden="true">
            /
          </span>
          <NavLink to="/tutorials/new" label="Nuevo tutorial" />
        </div>
      </nav>
    </header>
  );
}
