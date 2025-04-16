"use client";
import React, { useContext, useState } from "react";
import { Goal } from "../lib/definitions";

const ProgressContext = React.createContext<{
  progress: number;
}>({
  progress: 0,
});

const ProgressUpdateContext = React.createContext<{
  updateProgressFromGoal: (tasks: Goal["tasks"]) => void;
}>({
  updateProgressFromGoal: () => {},
});
const getCurrentProgress = (tasks: Goal["tasks"]) => {
  let totalCompleted = 0;
  let totalEntries = 0;

  tasks.forEach((task) => {
    task.dailyCompletion.forEach((entry) => {
      totalEntries += 1;
      if (entry.completed) {
        totalCompleted += 1;
      }
    });
  });

  return totalEntries === 0
    ? 0
    : Math.round((totalCompleted / totalEntries) * 100);
};

export function useProgress() {
  return useContext(ProgressContext);
}

export function useProgressUpdate() {
  return useContext(ProgressUpdateContext);
}

export default function ProgressContextProvider({
  children,
  initialTasks,
}: {
  children: React.ReactNode;
  initialTasks: Goal["tasks"];
}) {
  const [progress, setProgress] = useState(getCurrentProgress(initialTasks));

  const updateProgressFromGoal = (tasks: Goal["tasks"]) => {
    const newProgress = getCurrentProgress(tasks);
    setProgress(newProgress);
  };

  return (
    <ProgressContext.Provider value={{ progress }}>
      <ProgressUpdateContext.Provider value={{ updateProgressFromGoal }}>
        {children}
      </ProgressUpdateContext.Provider>
    </ProgressContext.Provider>
  );
}
