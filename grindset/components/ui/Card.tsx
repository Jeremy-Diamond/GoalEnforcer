// Import React for component creation
import * as React from "react";
// Import the `cn` utility function for conditional class name merging
import { cn } from "../../lib/utils";

// Define the `Card` component, which serves as a container with consistent styling
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref} // Forward the ref to the `div` element
    className={cn(
      "rounded-lg border border-[#2D3748] bg-[#1E2132] text-[#F8FAFC] shadow-md hover:bg-[#2A2D3E] transition-colors", // Base styles for the card
      className // Merge additional class names passed via props
    )}
    {...props} // Spread additional props onto the `div` element
  />
));
Card.displayName = "Card"; // Set the display name for debugging purposes

// Define the `CardHeader` component, which serves as the header section of the card
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref} // Forward the ref to the `div` element
    className={cn("flex flex-col space-y-1.5 p-6", className)} // Base styles for the header
    {...props} // Spread additional props onto the `div` element
  />
));
CardHeader.displayName = "CardHeader"; // Set the display name for debugging purposes

// Define the `CardTitle` component, which displays the title of the card
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref} // Forward the ref to the `h3` element
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-[#FFFFFF]", // Base styles for the title
      className // Merge additional class names passed via props
    )}
    {...props} // Spread additional props onto the `h3` element
  />
));
CardTitle.displayName = "CardTitle"; // Set the display name for debugging purposes

// Define the `CardDescription` component, which displays a description inside the card
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref} // Forward the ref to the `p` element
    className={cn("text-sm text-[#CBD5E1]", className)} // Base styles for the description
    {...props} // Spread additional props onto the `p` element
  />
));
CardDescription.displayName = "CardDescription"; // Set the display name for debugging purposes

// Define the `CardContent` component, which serves as the main content area of the card
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref} // Forward the ref to the `div` element
    className={cn("p-6 pt-0", className)} // Base styles for the content area
    {...props} // Spread additional props onto the `div` element
  />
));
CardContent.displayName = "CardContent"; // Set the display name for debugging purposes

// Define the `CardFooter` component, which serves as the footer section of the card
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref} // Forward the ref to the `div` element
    className={cn("flex items-center p-6 pt-0", className)} // Base styles for the footer
    {...props} // Spread additional props onto the `div` element
  />
));
CardFooter.displayName = "CardFooter"; // Set the display name for debugging purposes

// Export all card-related components for external use
export {
  Card, // Main card container
  CardContent, // Main content area
  CardDescription, // Description section
  CardFooter, // Footer section
  CardHeader, // Header section
  CardTitle,
};
