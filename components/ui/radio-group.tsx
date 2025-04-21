import * as React from "react";
import { Label } from "@/components/ui/label";
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-x-4", className)}
      {...props} />
  )
})
RadioGroup.displayName = "RadioGroup";

const RadioGroupItem = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<"button">
>(({ className, children, ...props }, ref) => {  
  return (
    <div className="flex items-center">
      <button
        ref={ref}
        className={cn(
          "peer h-4 w-4 rounded-full border border-gray-300 text-gray-300 ring-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary data-[state=checked]:border-primary",
          className
        )}
        {...props} />
      {children && (
            <Label
              htmlFor={props.id}
              className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {children}
            </Label>
      )}
    </div>
  )
});
RadioGroupItem.displayName = "RadioGroupItem";

export { RadioGroup, RadioGroupItem };