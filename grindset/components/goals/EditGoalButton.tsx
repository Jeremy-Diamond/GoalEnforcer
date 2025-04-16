"use client"; // Indicates that this component is a client-side component

// Import the `Edit` icon from the `lucide-react` library for the edit button
import { Edit } from "lucide-react";
// Import the `useRouter` hook for programmatic navigation
import { useRouter } from "next/navigation";
// Import the `Button` component for consistent button styling
import { Button } from "../ui/Button";

// Define the props for the `EditGoalButton` component
interface EditGoalButtonProps {
  goalId: string; // The ID of the goal to be edited
}

// Define the `EditGoalButton` component, which renders a button to navigate to the goal editing page
export default function EditGoalButton({ goalId }: EditGoalButtonProps) {
  // Hook for navigating to other pages
  const router = useRouter();

  return (
    <div className="flex items-center gap-2">
      {/* Button to navigate to the goal editing page */}
      <Button
        variant="outline" // Use the "outline" variant for the button styling
        size="sm" // Use the "small" size for the button
        className="gap-1 cursor-pointer hover:bg-yellow-500 hover:text-black" // Add hover effects for better UX
        onClick={() => {
          router.push(`/goals/${goalId}/edit`); // Navigate to the goal editing page when clicked
        }}
      >
        {/* Edit icon */}
        <Edit className="h-4 w-4" />
        {/* Button text */}
        <span>Edit</span>
      </Button>
    </div>
  );
}
