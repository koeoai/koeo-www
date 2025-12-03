"use client";

import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  label: string;
  type?: "text" | "email" | "textarea" | "select";
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  error?: string;
  options?: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function FormField({
  id,
  label,
  type = "text",
  placeholder,
  helperText,
  required = false,
  error,
  options = [],
  value,
  onChange,
  className,
}: FormFieldProps) {
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(" ") || undefined;

  const baseInputClasses = cn(
    "w-full rounded-lg border px-4 py-3 text-base transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-purple-primary focus:border-transparent",
    error
      ? "border-red-500 focus:ring-red-500"
      : "border-slate-300 hover:border-slate-400"
  );

  const renderInput = () => {
    if (type === "textarea") {
      return (
        <textarea
          id={id}
          name={id}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={describedBy}
          aria-invalid={error ? "true" : undefined}
          className={cn(baseInputClasses, "min-h-[120px] resize-y")}
          rows={4}
        />
      );
    }

    if (type === "select") {
      return (
        <select
          id={id}
          name={id}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={describedBy}
          aria-invalid={error ? "true" : undefined}
          className={cn(baseInputClasses, "appearance-none bg-white")}
        >
          <option value="">{placeholder || "Select an option"}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={describedBy}
        aria-invalid={error ? "true" : undefined}
        className={baseInputClasses}
      />
    );
  };

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label
        htmlFor={id}
        className="text-sm font-medium text-text-primary"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      {renderInput()}
      
      {helperText && !error && (
        <p id={helperId} className="text-sm text-slate-500">
          {helperText}
        </p>
      )}
      
      {error && (
        <p id={errorId} className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
