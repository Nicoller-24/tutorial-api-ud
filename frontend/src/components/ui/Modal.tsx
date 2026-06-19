import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({ open, title, onClose, children, footer }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-brand-charcoal/60 backdrop-blur-sm"
        aria-label="Cerrar modal"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-sm bg-white shadow-xl">
        <div className="h-1 bg-brand-burgundy" aria-hidden="true" />
        <div className="flex items-center justify-between border-b border-black/10 px-6 py-4">
          <h2 className="text-lg font-bold uppercase tracking-wide text-brand-charcoal">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-brand-gray hover:bg-brand-gray-bg hover:text-brand-charcoal"
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer && (
          <div className="flex justify-end gap-3 border-t border-black/10 bg-brand-gray-bg px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
