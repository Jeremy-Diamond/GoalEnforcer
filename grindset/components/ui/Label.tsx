"use client"; // Indicates that this component is a client-side component

// Import the `LabelPrimitive` module from Radix UI for creating accessible labels
import * as LabelPrimitive from "@radix-ui/react-label";
// Import the `cva` function and `VariantProps` type from class-variance-authority for managing class variants
import { cva, type VariantProps } from "class-variance-authority";
// Import React for component creation
import * as React from "react";

// Import the `cn` utility function for conditional class name merging
import { cn } from "../../lib/utils";

// Define the base styles for the `Label` component using `cva`
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" // Base styles for the label, including disabled states
);

// Define the `Label` component using `React.forwardRef` for ref forwarding
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>, // Infer the element type from `LabelPrimitive.Root`
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & // Extend the props of `LabelPrimitive.Root`
    VariantProps<typeof labelVariants> // Include variant props for styling
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref} // Forward the ref to the `LabelPrimitive.Root` element
    className={cn(labelVariants(), className)} // Apply base styles and merge additional class names
    {...props} // Spread additional props onto the `LabelPrimitive.Root` element
  />
));

// Set the display name for the `Label` component (useful for debugging)
Label.displayName = LabelPrimitive.Root.displayName;

// Export the `Label` component for external use
export { Label };
