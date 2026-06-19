import type { ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  loading?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "rounded-full bg-ud-yellow font-bold text-ud-charcoal hover:bg-yellow-300 focus:ring-ud-yellow disabled:bg-ud-gray-light disabled:text-ud-gray",
  secondary:
    "rounded-sm bg-white font-semibold text-ud-burgundy ring-1 ring-ud-burgundy/30 hover:bg-ud-yellow-light focus:ring-ud-burgundy",
  danger:
    "rounded-sm bg-ud-burgundy font-semibold text-white hover:bg-ud-burgundy-dark focus:ring-ud-burgundy disabled:bg-ud-gray-light",
  ghost:
    "rounded-sm bg-transparent font-medium text-ud-gray hover:bg-ud-yellow-light hover:text-ud-charcoal focus:ring-ud-yellow",
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
