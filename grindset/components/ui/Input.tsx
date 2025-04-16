// Import React for component creation
import * as React from "react";

// Import the `cn` utility function for conditional class name merging
import { cn } from "../../lib/utils";

// Define the props for the `Input` component
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  customProp?: string; // Optional custom property for additional functionality
}

// Define the `Input` component using `React.forwardRef` for ref forwarding
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type} // Set the input type (e.g., text, password, etc.)
        className={cn(
          // Apply base styles and merge additional class names
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus:ring-[#64748B] focus:ring-offset-0 focus:border-[#475569] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className // Merge additional class names passed via props
        )}
        ref={ref} // Forward the ref to the `input` element
        {...props} // Spread additional props onto the `input` element
      />
    );
  }
);

// Set the display name for the `Input` component (useful for debugging)
Input.displayName = "Input";

// Export the `Input` component for external use
export { Input };
