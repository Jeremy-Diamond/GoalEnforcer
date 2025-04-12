"use client";
import { Edit } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/Button";
interface EditGoalButtonProps {
  goalId: string;
}

export default function EditGoalButton({ goalId }: EditGoalButtonProps) {
  const router = useRouter();
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="gap-1 cursor-pointer hover:bg-yellow-500 hover:text-black"
        onClick={() => {
          router.push(`/goals/${goalId}/edit`);
        }}
      >
        <Edit className="h-4 w-4" />
        <span>Edit</span>
      </Button>
    </div>
  );
}
