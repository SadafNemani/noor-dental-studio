"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/cn";

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  function Input({ className, ...props }, ref) {
    const isInvalid = props["aria-invalid"] === true;
    return (
      <input
        ref={ref}
        {...props}
        className={cn(
          "rounded-button-sm font-body text-body text-charcoal border bg-white px-4 py-2.5 transition-colors duration-200 outline-none",
          "focus:border-pine focus:ring-pine/20 focus:ring-2",
          isInvalid ? "border-error" : "border-sand",
          className
        )}
      />
    );
  }
);

export default Input;
