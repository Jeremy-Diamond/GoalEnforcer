import { formatDate } from "@/app/lib/utils";
import { Calendar, Clock, Edit, Target } from "lucide-react";
import Link from "next/link";

import { Button } from "../../components/ui/Button";
import { Card, CardContent } from "../../components/ui/Card";
import { Progress } from "../../components/ui/Progress";

interface Task {
  id: string;
  taskTitle: string;
  completed: boolean;
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
  const completedTasks = goal.tasks.filter((task) => task.completed).length;
  const totalTasks = goal.tasks.length;
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-start md:justify-between md:space-y-0">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">{goal.title}</h1>
            </div>
            <p className="text-muted-foreground">{goal.description}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href={`/goals/${goal.id}/edit`}>
              <Button variant="outline" size="sm" className="gap-1">
                <Edit className="h-4 w-4" />
                <span>Edit</span>
              </Button>
            </Link>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-2 rounded-md border p-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Timeline</p>
              <p className="text-sm text-muted-foreground">
                {formatDate(startDate, false)} - {formatDate(endDate, false)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-md border p-3">
            <Clock className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Time Remaining</p>
              <p className="text-sm text-muted-foreground">
                {daysRemaining > 0
                  ? `${daysRemaining} days left`
                  : daysRemaining === 0
                  ? "Due today"
                  : "Overdue"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-md border p-3">
            <Target className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Tasks</p>
              <p className="text-sm text-muted-foreground">
                {completedTasks} of {totalTasks} completed
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Progress</p>
            <p className="text-sm font-medium">{completionPercentage}%</p>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}
