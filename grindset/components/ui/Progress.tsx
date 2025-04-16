"use client"; // Indicates that this component is a client-side component

// Import the `Progress` module from Radix UI for creating accessible progress bars
import * as ProgressPrimitive from "@radix-ui/react-progress";
// Import React for component creation
import * as React from "react";

// Import the `cn` utility function for conditional class name merging
import { cn } from "../../lib/utils";

// Define the `Progress` component using `React.forwardRef` for ref forwarding
const Progress = React.forwardRef<
  React.ComponentRef<typeof ProgressPrimitive.Root>, // Infer the element type from `ProgressPrimitive.Root`
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> // Extend the props of `ProgressPrimitive.Root`
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref} // Forward the ref to the `ProgressPrimitive.Root` element
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-black/70", // Base styles for the progress bar container
      className // Merge additional class names passed via props
    )}
    {...props} // Spread additional props onto the `ProgressPrimitive.Root` element
  >
    {/* Indicator for the progress bar */}
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-blue-500 transition-all" // Base styles for the progress indicator
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }} // Dynamically set the width based on the `value` prop
    />
  </ProgressPrimitive.Root>
));

// Set the display name for the `Progress` component (useful for debugging)
Progress.displayName = ProgressPrimitive.Root.displayName;

// Export the `Progress` component for external use
export { Progress };
