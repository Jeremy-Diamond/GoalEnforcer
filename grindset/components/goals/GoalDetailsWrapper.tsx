"use client";

import { useProgress } from "@/app/context/ProgressContext";
import { Goal } from "@/app/lib/definitions";
import { GoalDetails } from "./GoalDetails";

export default function GoalDetailsWrapper({ goal }: { goal: Goal }) {
  const { progress } = useProgress();

  return <GoalDetails progress={progress} goal={goal} />;
}
