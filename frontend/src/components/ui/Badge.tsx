interface BadgeProps {
  published: boolean;
}

export function Badge({ published }: BadgeProps) {
  if (published) {
    return (
      <span className="inline-flex items-center rounded-sm bg-brand-yellow px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-brand-charcoal">
        Publicado
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-sm bg-brand-charcoal-light px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-white/90">
      Oculto
    </span>
  );
}
