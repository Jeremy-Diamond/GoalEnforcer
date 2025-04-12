import { formatDate } from "@/app/lib/utils";
import { Calendar, Clock, Target } from "lucide-react";

import Link from "next/link";
import { Card, CardContent } from "../../components/ui/Card";
import { Progress } from "../../components/ui/Progress";
import DeleteGoalButton from "./DeleteGoalButton";
import EditGoalButton from "./EditGoalButton";
interface DailyCompletion {
  completed: boolean;
}

interface Task {
  id: string;
  taskTitle: string;
  completed: boolean;
  dailyCompletion: DailyCompletion[];
}

interface Goal {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  progress: number;
  tasks: Task[];
}

interface GoalDetailsProps {
  goal: Goal;
}

const getDaysRemaining = (endDate: string) => {
  const end = new Date(endDate);
  const today = new Date();
  const diffTime = end.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export function GoalDetails({ goal }: GoalDetailsProps) {
  const startDate = new Date(goal.startDate);
  const endDate = new Date(goal.endDate);
  const daysRemaining = getDaysRemaining(goal.endDate);

  // Calculate completion percentage based on completed tasks
  let completedTasks = 0;

  const totalTasks = goal.tasks.length;

  const calculateCompletion = (tasks: Task[]): number => {
    tasks.forEach((task) => {
      task.dailyCompletion.forEach((daily: DailyCompletion) => {
        console.log("DAILY", daily);
        if (daily.completed) {
          completedTasks += 1;
        }
      });
    });

    return totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  };

  const completionPercentage = calculateCompletion(goal.tasks);

  return (
    <div className="w-full relative">
      <Link href={`/goals/${goal.id}`}>
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col space-y-4 md:flex-row md:items-start md:justify-between md:space-y-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-white">
                    {goal.title}
                  </h1>
                </div>
                <p className="text-gray-300">{goal.description}</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-center gap-2 rounded-md border p-3 border-gray-700 ">
                <Calendar className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-100">Timeline</p>
                  <p className="text-sm text-gray-400">
                    {formatDate(startDate, false)} -{" "}
                    {formatDate(endDate, false)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-md border p-3 border-gray-700 ">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-100">
                    Time Remaining
                  </p>
                  <p className="text-sm text-gray-400">
                    {daysRemaining > 0
                      ? `${daysRemaining} days left`
                      : daysRemaining === 0
                      ? "Due today"
                      : "Overdue"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-md border p-3 border-gray-700">
                <Target className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm font-medium text-gray-100">Tasks</p>
                  <p className="text-sm text-gray-400">
                    {completedTasks} of {totalTasks} completed
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-400">Progress</p>
                <p className="text-sm font-medium text-gray-400">
                  {completionPercentage}%
                </p>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </Link>
      <div className="flex items-center gap-2 z-10 absolute top-4 right-4">
        <DeleteGoalButton goalId={goal.id} />
        <EditGoalButton goalId={goal.id} />
      </div>
    </div>
  );
}
