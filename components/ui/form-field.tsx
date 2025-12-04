"use client";

import { cn } from "@/lib/utils";
import { MultiSelect } from "@/components/ui/multi-select";
import { Select } from "@/components/ui/select";

interface FormFieldProps {
  id: string;
  label: string;
  type?: "text" | "email" | "textarea" | "select" | "multiselect";
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  error?: string;
  options?: Array<{ value: string; label: string }>;
  value: string | string[];
  onChange: (value: string | string[]) => void;
  className?: string;
  variant?: "default" | "glass";
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
  variant = "default",
}: FormFieldProps) {
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(" ") || undefined;

  const isGlass = variant === "glass";

  const baseInputClasses = cn(
    "w-full rounded-xl border px-4 py-3 text-base transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:border-transparent",
    isGlass
      ? [
          "border-white/20 bg-white/5 text-white placeholder:text-white/40",
          "focus:ring-pink-light/50 focus:bg-white/10",
          "hover:border-white/30 hover:bg-white/10",
        ]
      : [
          "border-slate-300 hover:border-slate-400",
          "focus:ring-purple-primary",
        ],
    error && (isGlass ? "border-red-400/50 focus:ring-red-400/50" : "border-red-500 focus:ring-red-500")
  );

  const renderInput = () => {
    if (type === "textarea") {
      return (
        <textarea
          id={id}
          name={id}
          placeholder={placeholder}
          required={required}
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={describedBy}
          aria-invalid={error ? "true" : undefined}
          className={cn(baseInputClasses, "min-h-[100px] resize-y")}
          rows={3}
        />
      );
    }

    if (type === "select") {
      return (
        <Select
          id={id}
          options={options}
          value={value as string}
          onChange={onChange as (value: string) => void}
          placeholder={placeholder}
          variant={variant}
          error={!!error}
        />
      );
    }

    if (type === "multiselect") {
      const selectedValues = Array.isArray(value) ? value : [];
      return (
        <MultiSelect
          id={id}
          options={options}
          value={selectedValues}
          onChange={onChange as (value: string[]) => void}
          placeholder={placeholder}
          variant={variant}
          error={!!error}
        />
      );
    }

    return (
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value as string}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={describedBy}
        aria-invalid={error ? "true" : undefined}
        className={baseInputClasses}
      />
    );
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={type === "multiselect" ? undefined : id}
        className={cn(
          "text-sm font-medium",
          isGlass ? "text-white/90" : "text-text-primary"
        )}
      >
        {label}
        {required && <span className={cn("ml-1", isGlass ? "text-pink-light" : "text-red-500")}>*</span>}
      </label>

      {renderInput()}

      {helperText && !error && (
        <p id={helperId} className={cn("text-sm", isGlass ? "text-white/50" : "text-slate-500")}>
          {helperText}
        </p>
      )}

      {error && (
        <p id={errorId} className={cn("text-sm", isGlass ? "text-red-300" : "text-red-500")} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
