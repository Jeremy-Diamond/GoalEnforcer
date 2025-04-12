"use client";

import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/Button";

import { useRouter } from "next/navigation";
import { deleteGoalById } from "../../lib/actions";

export default function DeleteGoalButton({ goalId }: { goalId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const handleDelete = async (e: React.MouseEvent) => {
    try {
      await deleteGoalById(goalId);
      router.push("/goals");
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer text-white bg-red-800 hover:bg-red-600 font-medium rounded-lg text-sm px-4 py-2.5 m-2 flex items-center gap-1"
      >
        <TrashIcon className="w-5 h-5" />
        <span>Delete Goal</span>
      </Button>

      {isModalOpen && (
        <div className="fixed inset-0 backdrop-blur-xl flex justify-center items-center z-50">
          <div className="bg-blue-950 backdrop-blur-sm rounded-xl p-6 shadow-lg w-full max-w-md text-center">
            <h2 className="text-lg font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-6">Are you sure you want to delete this goal?</p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={handleDelete}
                className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded cursor-pointer"
              >
                Yes, Delete
              </Button>
              <Button
                onClick={() => setIsModalOpen(false)}
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
