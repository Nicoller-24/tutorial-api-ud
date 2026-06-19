import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({ label, error, id, className = "", ...props }: TextareaProps) {
  const textareaId = id || label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="space-y-1.5">
      <label htmlFor={textareaId} className="block text-sm font-medium text-brand-dark">
        {label}
      </label>
      <textarea
        id={textareaId}
        rows={4}
        className={`block w-full rounded-lg border border-brand-gray-light bg-white px-3 py-2 text-sm shadow-sm transition placeholder:text-brand-gray-light app-input-focus ${error ? "border-brand-burgundy" : ""} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
