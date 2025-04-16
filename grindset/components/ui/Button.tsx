// Import the `Slot` component from Radix UI for rendering custom components
import { Slot } from "@radix-ui/react-slot";
// Import the `cva` function and `VariantProps` type from class-variance-authority for managing class variants
import { cva, type VariantProps } from "class-variance-authority";
// Import React for component creation
import * as React from "react";

// Import the `cn` utility function for conditional class name merging
import { cn } from "../../lib/utils";

// Define the `buttonVariants` using `cva` to manage button styles and variants
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    // Define style variants for the button
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90", // Default button style
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90", // Destructive button style
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground", // Outline button style
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80", // Secondary button style
        ghost: "hover:bg-accent hover:text-accent-foreground", // Ghost button style
        link: "text-primary underline-offset-4 hover:underline", // Link-style button
      },
      size: {
        default: "h-10 px-4 py-2", // Default button size
        sm: "h-9 rounded-md px-3", // Small button size
        lg: "h-11 rounded-md px-8", // Large button size
        icon: "h-10 w-10", // Icon button size
      },
    },
    // Define default variants for the button
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Define the props for the `Button` component
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, // Extend default button attributes
    VariantProps<typeof buttonVariants> {
  // Include variant props for styling
  asChild?: boolean; // Optional prop to render the button as a child component
}

// Define the `Button` component using `React.forwardRef` for ref forwarding
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    // Determine the component to render: `Slot` if `asChild` is true, otherwise a `button`
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))} // Apply the appropriate styles
        ref={ref} // Forward the ref to the rendered component
        {...props} // Spread additional props onto the component
      />
    );
  }
);

// Set the display name for the `Button` component (useful for debugging)
Button.displayName = "Button";

// Export the `Button` component and `buttonVariants` for external use
export { Button, buttonVariants };
