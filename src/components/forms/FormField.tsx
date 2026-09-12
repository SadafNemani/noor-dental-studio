"use client";

import { useId, isValidElement, cloneElement, type ReactElement } from "react";
import { cn } from "@/lib/cn";

type FormFieldProps = {
  label: string;
  error?: string;
  required?: boolean;
  children: ReactElement<{
    id?: string;
    "aria-invalid"?: boolean;
    "aria-describedBy"?: string;
    required?: boolean;
  }>;
  className?: string;
};

export default function FormField({ label, error, required, children, className }: FormFieldProps) {
  const inputId = useId();
  const errorId = useId();

  const field = isValidElement(children)
    ? cloneElement(children, {
        id: inputId,
        required,
        "aria-invalid": !!error,
        "aria-describedBy": error ? errorId : undefined,
      })
    : children;

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <label htmlFor={inputId} className="font-body text-label text-charcoal">
        {label}
        {required && (
          <span className="text-error" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {field}
      {error && (
        <p id={errorId} role="alert" className="font-body text-label text-error">
          {error}
        </p>
      )}
    </div>
  );
}
