"use client"; // Indicates that this component is a client-side component

// Import the `Tabs` module from Radix UI for creating accessible tab components
import * as TabsPrimitive from "@radix-ui/react-tabs";
// Import React for component creation
import * as React from "react";

// Import the `cn` utility function for conditional class name merging
import { cn } from "../../lib/utils";

// Define the root `Tabs` component
const Tabs = TabsPrimitive.Root;

// Define the `TabsList` component, which serves as the container for the tab triggers
const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>, // Infer the element type from `TabsPrimitive.List`
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> // Extend the props of `TabsPrimitive.List`
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref} // Forward the ref to the `TabsPrimitive.List` element
    className={cn(
      // Apply base styles and merge additional class names
      "inline-flex h-10 items-center justify-center rounded-md bg-blue-950 p-1 text-muted-foreground",
      className
    )}
    {...props} // Spread additional props onto the `TabsPrimitive.List` element
  />
));
TabsList.displayName = TabsPrimitive.List.displayName; // Set the display name for debugging purposes

// Define the `TabsTrigger` component, which represents an individual tab trigger
const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>, // Infer the element type from `TabsPrimitive.Trigger`
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> // Extend the props of `TabsPrimitive.Trigger`
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref} // Forward the ref to the `TabsPrimitive.Trigger` element
    className={cn(
      // Apply base styles and merge additional class names
      "relative px-4 py-2 text-sm font-medium transition-all rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 data-[state=active]:text-primary data-[state=active]:bg-blue-900 data-[state=active]:border-primary hover:bg-accent/20",
      className
    )}
    {...props} // Spread additional props onto the `TabsPrimitive.Trigger` element
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName; // Set the display name for debugging purposes

// Define the `TabsContent` component, which represents the content of a tab
const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>, // Infer the element type from `TabsPrimitive.Content`
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> // Extend the props of `TabsPrimitive.Content`
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref} // Forward the ref to the `TabsPrimitive.Content` element
    className={cn(
      // Apply base styles and merge additional class names
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props} // Spread additional props onto the `TabsPrimitive.Content` element
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName; // Set the display name for debugging purposes

// Export all tab-related components for external use
export { Tabs, TabsContent, TabsList, TabsTrigger };
