interface SpinnerProps {
  label?: string;
}

export function Spinner({ label = "Cargando..." }: SpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-yellow-light border-t-brand-burgundy" />
      <p className="text-sm text-brand-gray">{label}</p>
    </div>
  );
}
