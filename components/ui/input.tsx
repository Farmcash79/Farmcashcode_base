import * as React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      // className={cn(
      //   "h-10 w-full min-w-0 rounded-lg border border-slate-200 bg-transparent px-2.5 py-1 text-base transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-[#DBE6F2] focus-visible:ring-2 focus-visible:ring-[#DBE6F2] disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
      //   className,
      // )}
      className={cn(
        // UPDATED CORE STYLES
        "h-12 w-full min-w-0 rounded-xl bg-white px-4 text-sm",
        "border border-transparent shadow-sm ring-1 ring-[#f0f0f0]",
        "placeholder:text-[#b8b8b8]",
        "outline-none transition-all",
        "focus-visible:ring-2 focus-visible:ring-[#148C08]/20",
        "disabled:pointer-events-none disabled:opacity-50",
        "aria-invalid:ring-red-200",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
