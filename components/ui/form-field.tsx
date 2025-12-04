"use client";

import { cn } from "@/lib/utils";

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

  const handleMultiSelectChange = (optionValue: string) => {
    const currentValues = Array.isArray(value) ? value : [];
    if (currentValues.includes(optionValue)) {
      onChange(currentValues.filter((v) => v !== optionValue));
    } else {
      onChange([...currentValues, optionValue]);
    }
  };

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
        <select
          id={id}
          name={id}
          required={required}
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          aria-describedby={describedBy}
          aria-invalid={error ? "true" : undefined}
          className={cn(baseInputClasses, "appearance-none", isGlass ? "bg-white/5" : "bg-white")}
        >
          <option value="" className={isGlass ? "bg-purple-deep text-white" : ""}>
            {placeholder || "Select an option"}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} className={isGlass ? "bg-purple-deep text-white" : ""}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    if (type === "multiselect") {
      const selectedValues = Array.isArray(value) ? value : [];
      return (
        <fieldset id={id} aria-describedby={describedBy} aria-invalid={error ? "true" : undefined} className="space-y-2">
          {options.map((option) => (
            <label
              key={option.value}
              className={cn(
                "flex items-center gap-3 cursor-pointer group rounded-lg p-2 -mx-2 transition-all duration-200",
                isGlass ? "hover:bg-white/5" : "hover:bg-slate-50"
              )}
            >
              <input
                type="checkbox"
                name={`${id}[]`}
                value={option.value}
                checked={selectedValues.includes(option.value)}
                onChange={() => handleMultiSelectChange(option.value)}
                className={cn(
                  "h-5 w-5 rounded border-2 transition-all duration-200",
                  isGlass
                    ? "border-white/30 bg-white/5 text-pink-light focus:ring-pink-light/50 checked:bg-gradient-to-r checked:from-purple-primary checked:to-magenta checked:border-transparent"
                    : "border-slate-300 text-purple-primary focus:ring-purple-primary"
                )}
              />
              <span className={cn(
                "text-sm transition-colors",
                isGlass ? "text-white/80 group-hover:text-white" : "text-text-primary group-hover:text-purple-primary"
              )}>
                {option.label}
              </span>
            </label>
          ))}
        </fieldset>
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
