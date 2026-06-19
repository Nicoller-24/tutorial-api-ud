interface SpinnerProps {
  label?: string;
}

export function Spinner({ label = "Cargando..." }: SpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-ud-yellow-light border-t-ud-burgundy" />
      <p className="text-sm text-ud-gray">{label}</p>
    </div>
  );
}
