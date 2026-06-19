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
      <label htmlFor={inputId} className="block text-sm font-medium text-ud-dark">
        {label}
      </label>
      <input
        id={inputId}
        className={`block w-full rounded-lg border border-ud-gray-light bg-white px-3 py-2 text-sm shadow-sm transition placeholder:text-ud-gray-light ud-input-focus disabled:bg-ud-gray-bg disabled:text-ud-gray ${error ? "border-ud-burgundy" : ""} ${className}`}
        {...props}
      />
      {hint && !error && <p className="text-xs text-ud-gray">{hint}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
