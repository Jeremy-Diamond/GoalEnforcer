"use client"; // Indicates that this component is a client-side component

// Import the `Select` module from Radix UI for creating accessible select dropdowns
import * as SelectPrimitive from "@radix-ui/react-select";
// Import icons for dropdown interactions
import { Check, ChevronDown, ChevronUp } from "lucide-react";
// Import React for component creation
import * as React from "react";
// Import the `cn` utility function for conditional class name merging
import { cn } from "../../lib/utils";

// Define the root `Select` component
const Select = SelectPrimitive.Root;
// Define the `SelectGroup` component for grouping items
const SelectGroup = SelectPrimitive.Group;
// Define the `SelectValue` component for displaying the selected value
const SelectValue = SelectPrimitive.Value;

// Define the `SelectTrigger` component, which acts as the button to open the dropdown
const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref} // Forward the ref to the `SelectPrimitive.Trigger` element
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-[#112240] bg-[#0A192F] px-3 py-2 text-sm text-[#CCD6F6] ring-offset-background placeholder:text-[#8892B0] focus:outline-none focus:ring-1 focus:ring-[#1E40AF] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-[#112240] [&>span]:line-clamp-1", // Base styles for the trigger
      className // Merge additional class names passed via props
    )}
    {...props} // Spread additional props onto the `SelectPrimitive.Trigger` element
  >
    {children} {/* Render the children inside the trigger */}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 text-[#CCD6F6] opacity-80" />{" "}
      {/* Dropdown icon */}
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

// Define the `SelectScrollUpButton` component for scrolling up in the dropdown
const SelectScrollUpButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref} // Forward the ref to the `SelectPrimitive.ScrollUpButton` element
    className={cn(
      "flex cursor-default items-center justify-center py-1", // Base styles for the scroll-up button
      className
    )}
    {...props} // Spread additional props onto the `SelectPrimitive.ScrollUpButton` element
  >
    <ChevronUp className="h-4 w-4 text-[#CCD6F6]" /> {/* Upward arrow icon */}
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

// Define the `SelectScrollDownButton` component for scrolling down in the dropdown
const SelectScrollDownButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref} // Forward the ref to the `SelectPrimitive.ScrollDownButton` element
    className={cn(
      "flex cursor-default items-center justify-center py-1", // Base styles for the scroll-down button
      className
    )}
    {...props} // Spread additional props onto the `SelectPrimitive.ScrollDownButton` element
  >
    <ChevronDown className="h-4 w-4 text-[#CCD6F6]" />{" "}
    {/* Downward arrow icon */}
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

// Define the `SelectContent` component, which renders the dropdown content
const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref} // Forward the ref to the `SelectPrimitive.Content` element
      className={cn(
        "relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-[#112240] bg-[#0A192F] text-[#CCD6F6] shadow-md", // Base styles for the dropdown content
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", // Positioning styles
        className
      )}
      position={position} // Set the dropdown position
      {...props} // Spread additional props onto the `SelectPrimitive.Content` element
    >
      <SelectScrollUpButton /> {/* Scroll-up button */}
      <SelectPrimitive.Viewport
        className={cn(
          "p-1", // Padding for the viewport
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]" // Dynamic sizing for the viewport
        )}
      >
        {children} {/* Render the dropdown items */}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton /> {/* Scroll-down button */}
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

// Define the `SelectLabel` component for labeling groups of items
const SelectLabel = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref} // Forward the ref to the `SelectPrimitive.Label` element
    className={cn(
      "py-1.5 pl-8 pr-2 text-sm font-semibold text-[#CCD6F6]", // Base styles for the label
      className
    )}
    {...props} // Spread additional props onto the `SelectPrimitive.Label` element
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

// Define the `SelectItem` component for rendering individual dropdown items
const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref} // Forward the ref to the `SelectPrimitive.Item` element
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm text-[#CCD6F6] outline-none hover:bg-[#112240] focus:bg-[#1E40AF] data-[disabled]:pointer-events-none data-[disabled]:opacity-50", // Base styles for the dropdown item
      className
    )}
    {...props} // Spread additional props onto the `SelectPrimitive.Item` element
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-[#CCD6F6]" /> {/* Checkmark icon */}
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>{" "}
    {/* Render the item text */}
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

// Define the `SelectSeparator` component for separating groups of items
const SelectSeparator = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref} // Forward the ref to the `SelectPrimitive.Separator` element
    className={cn("my-1 h-px bg-[#1E40AF]", className)} // Base styles for the separator
    {...props} // Spread additional props onto the `SelectPrimitive.Separator` element
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// Export all components for external use
export {
  Select, // Root component
  SelectContent, // Dropdown content
  SelectGroup, // Grouping of items
  SelectItem, // Individual dropdown item
  SelectLabel, // Label for groups
  SelectScrollDownButton, // Scroll-down button
  SelectScrollUpButton, // Scroll-up button
  SelectSeparator, // Separator between groups
  SelectTrigger, // Trigger button
  SelectValue,
};
