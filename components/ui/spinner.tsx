"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SpinnerProps extends React.SVGAttributes<SVGSVGElement> {}

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(({ className, ...props }, ref) => {
    return (
      <Loader2
        ref={ref}
        className={cn("animate-spin", className)} // Apply spin animation
        {...props}
      />
    );
  }
); 
Spinner.displayName = "Spinner";

export { Spinner };