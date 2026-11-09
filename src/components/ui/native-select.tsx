import { ChevronDown } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

const NativeSelect = React.forwardRef<
  HTMLSelectElement,
  React.ComponentProps<"select">
>(({ className, ...props }, ref) => (
  <div className="relative" data-slot="native-select-wrapper">
    <select
      ref={ref}
      data-slot="native-select"
      className={cn(
        "block min-h-11 w-full appearance-none rounded border border-input bg-white bg-none py-2 pl-2 pr-8 text-base text-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
    <ChevronDown
      aria-hidden="true"
      className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-foreground"
    />
  </div>
));
NativeSelect.displayName = "NativeSelect";

export { NativeSelect };
