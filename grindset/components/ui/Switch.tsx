"use client"; // Indicates that this component is a client-side component

// Import the `Switch` module from Radix UI for creating accessible toggle switches
import * as SwitchPrimitives from "@radix-ui/react-switch";
// Import React for component creation
import * as React from "react";

// Import the `cn` utility function for conditional class name merging
import { cn } from "../../lib/utils";

// Define the `Switch` component using `React.forwardRef` for ref forwarding
const Switch = React.forwardRef<
  React.ComponentRef<typeof SwitchPrimitives.Root>, // Infer the element type from `SwitchPrimitives.Root`
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> // Extend the props of `SwitchPrimitives.Root`
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    ref={ref} // Forward the ref to the `SwitchPrimitives.Root` element
    className={cn(
      // Apply base styles and merge additional class names
      "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-blue-950",
      className
    )}
    {...props} // Spread additional props onto the `SwitchPrimitives.Root` element
  >
    {/* Define the thumb (toggle) of the switch */}
    <SwitchPrimitives.Thumb
      className={cn(
        // Apply styles for the thumb, including transitions for checked/unchecked states
        "pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      )}
    />
  </SwitchPrimitives.Root>
));

// Set the display name for the `Switch` component (useful for debugging)
Switch.displayName = SwitchPrimitives.Root.displayName;

// Export the `Switch` component for external use
export { Switch };
