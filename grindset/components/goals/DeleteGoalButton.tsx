"use client"; // Indicates that this component is a client-side component

// Import the `TrashIcon` component for the delete icon
import { TrashIcon } from "lucide-react";
// Import the `useState` hook for managing component state
import { useState } from "react";
// Import the `Button` component for consistent button styling
import { Button } from "../ui/Button";

// Import the `useRouter` hook for programmatic navigation
import { useRouter } from "next/navigation";
// Import the `deleteGoalById` function to handle goal deletion
import { deleteGoalById } from "../../lib/actions";

// Define the `DeleteGoalButton` component, which renders a button to delete a goal
export default function DeleteGoalButton({ goalId }: { goalId: string }) {
  // State to manage the visibility of the confirmation modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hook for navigating to other pages
  const router = useRouter();

  // Function to handle the deletion of the goal
  const handleDelete = async () => {
    try {
      // Call the API to delete the goal by its ID
      await deleteGoalById(goalId);
      // Navigate back to the goals page after deletion
      router.push("/goals");
    } catch (error) {
      // Log any errors that occur during deletion
      console.error("Error deleting goal:", error);
    }
  };

  return (
    <>
      {/* Button to open the confirmation modal */}
      <Button
        onClick={() => setIsModalOpen(true)} // Open the modal when clicked
        className="cursor-pointer text-white bg-red-800 hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-2.5 m-2 flex items-center gap-1"
      >
        {/* Trash icon */}
        <TrashIcon className="w-5 h-5" />
        {/* Button text */}
        <span>Delete Goal</span>
      </Button>

      {/* Confirmation modal */}
      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-xl flex justify-center items-center z-50">
          {/* Modal content */}
          <div className="bg-blue-950 backdrop-blur-sm rounded-xl p-6 shadow-lg w-full max-w-md text-center">
            {/* Modal title */}
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            {/* Modal message */}
            <p className="mb-6">Are you sure you want to delete this goal?</p>
            {/* Modal action buttons */}
            <div className="flex justify-center gap-4">
              {/* Button to confirm deletion */}
              <Button
                onClick={handleDelete} // Call the delete function when clicked
                className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded cursor-pointer"
              >
                Yes, Delete
              </Button>
              {/* Button to cancel and close the modal */}
              <Button
                onClick={() => setIsModalOpen(false)} // Close the modal when clicked
                className="bg-gray-300 text-gray-800 hover:bg-gray-400 px-4 py-2 rounded cursor-pointer"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
