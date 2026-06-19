import { Link, useLocation } from "react-router-dom";

function NavLink({ to, label }: { to: string; label: string }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`whitespace-nowrap text-xs font-bold uppercase tracking-wide transition sm:text-sm ${
        isActive ? "text-brand-yellow" : "text-white hover:text-brand-yellow"
      }`}
    >
      {label}
    </Link>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-40 shadow-md">
      <div className="bg-brand-charcoal text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1.5 text-xs sm:px-6 lg:px-8">
          <span className="font-semibold tracking-wide">Panel administrativo</span>
          <span className="text-white/70">Aprendizaje virtual</span>
        </div>
      </div>

      <div className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex shrink-0 flex-col">
            <p className="font-serif text-base font-semibold uppercase leading-tight tracking-wide text-brand-burgundy sm:text-lg">
              Tutorial Admin
            </p>
            <p className="text-sm text-brand-gray">Gestión de tutoriales y detalle 1:1</p>
          </Link>

          <div className="ml-auto hidden text-right md:block">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-burgundy">
              Dashboard
            </p>
            <p className="text-xs text-brand-gray">CRUD completo · API REST</p>
          </div>
        </div>
      </div>

      <div className="relative bg-brand-charcoal-light">
        <div
          className="pointer-events-none absolute left-0 top-0 h-full w-12 bg-white sm:w-16"
          style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
          aria-hidden="true"
        />
        <div className="mx-auto max-w-7xl px-4 py-2 pl-14 text-xs text-white/90 sm:px-6 sm:pl-20 sm:text-sm lg:px-8">
          Tutoriales · Detalle asociado · Publicación
        </div>
      </div>

      <nav className="bg-brand-burgundy text-white" aria-label="Navegación principal">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-1 px-4 py-3 sm:px-6 lg:px-8">
          <NavLink to="/" label="Dashboard" />
          <span className="app-nav-slash" aria-hidden="true">
            /
          </span>
          <NavLink to="/tutorials/new" label="Nuevo tutorial" />
        </div>
      </nav>
    </header>
  );
}
