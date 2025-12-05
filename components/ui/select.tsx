"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  id: string;
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variant?: "default" | "glass";
  error?: boolean;
  disabled?: boolean;
}

export function Select({
  id,
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  variant = "default",
  error = false,
  disabled = false,
}: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [dropdownPosition, setDropdownPosition] = React.useState({ top: 0, left: 0, width: 0 });
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const isGlass = variant === "glass";

  const selectedOption = options.find((o) => o.value === value);

  // Update dropdown position
  const updatePosition = React.useCallback(() => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, []);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // Update position on scroll/resize
  React.useEffect(() => {
    if (isOpen) {
      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);
      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    }
  }, [isOpen, updatePosition]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleTriggerClick = () => {
    if (!disabled) {
      updatePosition();
      setIsOpen(!isOpen);
    }
  };

  const dropdownContent = isOpen && typeof window !== "undefined" && (
    <div
      ref={dropdownRef}
      role="listbox"
      style={{
        position: "absolute",
        top: dropdownPosition.top,
        left: dropdownPosition.left,
        width: dropdownPosition.width,
      }}
      className={cn(
        "z-[9999] max-h-60 overflow-y-auto overscroll-contain rounded-xl border p-1 shadow-lg",
        isGlass
          ? [
              "border-white/20 bg-purple-deep/95 backdrop-blur-xl",
              "[&::-webkit-scrollbar]:w-2",
              "[&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-white/5",
              "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-white/20",
              "[&::-webkit-scrollbar-thumb:hover]:bg-white/30",
            ]
          : [
              "border-slate-200 bg-white",
              "[&::-webkit-scrollbar]:w-2",
              "[&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-slate-100",
              "[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300",
              "[&::-webkit-scrollbar-thumb:hover]:bg-slate-400",
            ]
      )}
    >
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="option"
            aria-selected={isSelected}
            onClick={() => handleSelect(option.value)}
            className={cn(
              "flex w-full items-center justify-between rounded-lg px-3 py-3 text-left text-sm transition-colors",
              "min-h-[44px]",
              isGlass
                ? [
                    "text-white/80 hover:bg-white/10 hover:text-white active:bg-white/15",
                    isSelected && "bg-white/10 text-white",
                  ]
                : [
                    "text-slate-700 hover:bg-slate-100 active:bg-slate-200",
                    isSelected && "bg-purple-primary/10 text-purple-primary",
                  ]
            )}
          >
            <span>{option.label}</span>
            {isSelected && (
              <svg
                className={cn("h-4 w-4", isGlass ? "text-pink-light" : "text-purple-primary")}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        id={id}
        onClick={handleTriggerClick}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={cn(
          "flex h-[48px] w-full items-center justify-between rounded-xl border px-4 py-2 text-left text-base transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:border-transparent",
          isGlass
            ? [
                "border-white/20 bg-white/5 text-white",
                "focus:ring-pink-light/50 focus:bg-white/10",
                "hover:border-white/30 hover:bg-white/10",
              ]
            : ["border-slate-300 bg-white hover:border-slate-400", "focus:ring-purple-primary"],
          error && (isGlass ? "border-red-400/50" : "border-red-500"),
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        <span className={cn(!selectedOption && (isGlass ? "text-white/40" : "text-slate-400"))}>
          {selectedOption?.label || placeholder}
        </span>
        <svg
          className={cn(
            "ml-2 h-5 w-5 flex-shrink-0 transition-transform duration-200",
            isOpen && "rotate-180",
            isGlass ? "text-white/60" : "text-slate-400"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {dropdownContent && createPortal(dropdownContent, document.body)}
    </div>
  );
}
