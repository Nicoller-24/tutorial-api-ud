import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "rounded-full bg-brand-yellow font-bold text-brand-charcoal hover:bg-yellow-300 focus:ring-brand-yellow disabled:bg-brand-gray-light disabled:text-brand-gray",
  secondary:
    "rounded-sm bg-white font-semibold text-brand-burgundy ring-1 ring-brand-burgundy/30 hover:bg-brand-yellow-light focus:ring-brand-burgundy",
  danger:
    "rounded-sm bg-brand-burgundy font-semibold text-white hover:bg-brand-burgundy-dark focus:ring-brand-burgundy disabled:bg-brand-gray-light",
  ghost:
    "rounded-sm bg-transparent font-medium text-brand-gray hover:bg-brand-yellow-light hover:text-brand-charcoal focus:ring-brand-yellow",
};

export function Button({
  variant = "primary",
  loading = false,
  className = "",
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" />
      )}
      {children}
    </button>
  );
}
