import * as React from "react";

import { cn } from "@/lib/utils";

import { Label } from "./label";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  errorText?: string;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      errorText,
      label,
      type,
      leftElement,
      wrapperClassName,
      rightElement,
      ...props
    },
    ref
  ) => {
    return (
      <div className={`flex w-full relative flex-col pt-2 ${wrapperClassName}`}>
        {label && <Label className="pb-3 font-bold">{label}</Label>}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md bg-muted px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-40",
            leftElement ? "pl-8" : "",
            errorText && "border border-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {leftElement && (
          <span
            className={`absolute bottom-2.5 text-sm left-2 ${
              props.disabled ? "opacity-40" : ""
            }`}
          >
            {leftElement}
          </span>
        )}{" "}
        {rightElement && (
          <span
            className={`absolute bottom-3 text-sm right-10 ${
              props.disabled ? "opacity-40" : ""
            }`}
          >
            {rightElement}
          </span>
        )}
        {errorText && (
          <p className="pt-1 font-semibold text-red-500">{errorText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
