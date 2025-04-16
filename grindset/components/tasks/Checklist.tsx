"use client";

import { useProgressUpdate } from "@/app/context/ProgressContext";
import { updateDaily } from "@/app/lib/actions";
import { Goal } from "@/app/lib/definitions";
import { useTransition } from "react";

type ChecklistProps = {
  tTitle: string;
  goal: Goal;
  taskId: string;
  dcId: string;
  checked: boolean;
};

export default function Checklist({
  goal,
  taskId,
  dcId,
  checked,
  tTitle,
}: ChecklistProps) {
  const [isPending, startTransition] = useTransition();
  const { updateProgressFromGoal } = useProgressUpdate();

  const updateDatabase = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    console.log("ischecked type:", typeof isChecked);
    startTransition(() => {
      updateDaily(goal.id, taskId, dcId, isChecked)
        .then(() => {
          updateProgressFromGoal(goal.tasks);
        })
        .catch((error) => {
          console.error("Error updating daily completion:", error);
        });
    });
  };

  return (
    <div className="flex">
      {isPending && <p>Updating...</p>}
      <input
        type="checkbox"
        className="mr-4"
        defaultChecked={checked}
        onChange={updateDatabase}
      />
      <div>{tTitle}</div>
    </div>
  );
}
