"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { validateEmail } from "@/lib/validation";

interface EmailCaptureProps {
  placeholder?: string;
  buttonText?: string;
  microcopy?: string;
  onSubmit: (email: string) => void;
  className?: string;
}

export function EmailCapture({
  placeholder = "Enter your work email",
  buttonText = "Request Access",
  microcopy = "We're gradually inviting teams into the private beta.",
  onSubmit,
  className,
}: EmailCaptureProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email
    const validationError = validateEmail(email);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    if (!email || email.trim() === "") {
      setError("Email is required");
      return;
    }
    
    setError(undefined);
    setIsSubmitting(true);
    
    try {
      await onSubmit(email);
      setEmail("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("w-full max-w-md", className)}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <label htmlFor="email-capture" className="sr-only">
              Email address
            </label>
            <input
              id="email-capture"
              type="email"
              placeholder={placeholder}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(undefined);
              }}
              aria-describedby={error ? "email-capture-error" : undefined}
              aria-invalid={error ? "true" : undefined}
              className={cn(
                "w-full rounded-lg border px-4 py-3 text-base transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-purple-primary focus:border-transparent",
                error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-slate-300 hover:border-slate-400"
              )}
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="whitespace-nowrap"
          >
            {isSubmitting ? "Submitting..." : buttonText}
          </Button>
        </div>
        
        {error && (
          <p id="email-capture-error" className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
        
        {microcopy && (
          <p className="text-sm text-slate-500">
            {microcopy}
          </p>
        )}
      </form>
    </div>
  );
}
