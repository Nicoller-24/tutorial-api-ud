import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, id, className = "", ...props }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="block text-sm font-medium text-brand-dark">
        {label}
      </label>
      <input
        id={inputId}
        className={`block w-full rounded-lg border border-brand-gray-light bg-white px-3 py-2 text-sm shadow-sm transition placeholder:text-brand-gray-light app-input-focus disabled:bg-brand-gray-bg disabled:text-brand-gray ${error ? "border-brand-burgundy" : ""} ${className}`}
        {...props}
      />
      {hint && !error && <p className="text-xs text-brand-gray">{hint}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
