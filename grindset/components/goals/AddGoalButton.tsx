// Import the `PlusIcon` component from the `lucide-react` library for the "+" icon
import { PlusIcon } from "lucide-react";

// Import the `Link` component from Next.js for client-side navigation
import Link from "next/link";

// Import the `Button` component for consistent button styling
import { Button } from "../ui/Button";

// Define the `AddGoalButton` component, which renders a button to navigate to the goal creation page
export default function AddGoalButton() {
  return (
    // Wrapper div for styling the button container
    <div className="text-white text-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm m-2 cursor-pointer">
      {/* Link to the goal creation page */}
      <Link href="/goals/new">
        {/* Button component for consistent styling */}
        <Button>
          {/* Flex container for the icon and text */}
          <div className="flex gap-1">
            {/* "+" icon */}
            <PlusIcon className="w-5 h-5" />
            {/* Button text */}
            <p>Add Goal</p>
          </div>
        </Button>
      </Link>
    </div>
  );
}
