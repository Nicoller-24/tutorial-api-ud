import { useToast } from "../../hooks/useToast";

const styles = {
  success: "bg-ud-burgundy text-white",
  error: "bg-ud-burgundy-dark text-white",
  info: "bg-ud-yellow text-ud-charcoal font-semibold",
};

export function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex w-full max-w-sm flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-start justify-between gap-3 rounded-sm px-4 py-3 text-sm shadow-lg ${styles[toast.type]}`}
        >
          <span>{toast.message}</span>
          <button
            type="button"
            onClick={() => removeToast(toast.id)}
            className="shrink-0 opacity-80 hover:opacity-100"
            aria-label="Cerrar notificación"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}
