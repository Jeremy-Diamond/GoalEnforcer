// Import utility functions and components
import { formatDate } from "@/app/lib/utils"; // Utility function for formatting dates
import { Calendar, Clock, Target } from "lucide-react"; // Icons for UI elements
import Link from "next/link"; // For client-side navigation
import { Card, CardContent } from "../../components/ui/Card"; // Card components for layout
import { Progress } from "../../components/ui/Progress"; // Progress bar component
import DeleteGoalButton from "./DeleteGoalButton"; // Button to delete a goal
import EditGoalButton from "./EditGoalButton"; // Button to edit a goal

// Define interfaces for the goal, tasks, and daily completion
interface DailyCompletion {
  completed: boolean; // Indicates if the task was completed on a specific day
}

interface Task {
  id: string; // Unique identifier for the task
  taskTitle: string; // Title of the task
  completed: boolean; // Indicates if the task is completed
  dailyCompletion: DailyCompletion[]; // Array of daily completion statuses
}

interface Goal {
  id: string; // Unique identifier for the goal
  title: string; // Title of the goal
  description: string; // Description of the goal
  startDate: string; // Start date of the goal
  endDate: string; // End date of the goal
  progress: number; // Progress percentage of the goal
  tasks: Task[]; // Array of tasks associated with the goal
}

interface GoalDetailsProps {
  goal: Goal; // Props containing the goal object
}

// Function to calculate the number of days remaining until the goal's end date
const getDaysRemaining = (endDate: string) => {
  const end = new Date(endDate);
  const today = new Date();
  const diffTime = end.getTime() - today.getTime(); // Difference in milliseconds
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convert to days
  return diffDays;
};

// Define the `GoalDetails` component, which displays detailed information about a goal
export function GoalDetails({ goal }: GoalDetailsProps) {
  const startDate = new Date(goal.startDate); // Parse the start date
  const endDate = new Date(goal.endDate); // Parse the end date
  const daysRemaining = getDaysRemaining(goal.endDate); // Calculate days remaining

  // Calculate completion percentage based on completed tasks
  let completedTasks = 0; // Counter for completed tasks
  const totalTasks = goal.tasks.length; // Total number of tasks

  const calculateCompletion = (tasks: Task[]): number => {
    tasks.forEach((task) => {
      task.dailyCompletion.forEach((daily: DailyCompletion) => {
        if (daily.completed) {
          completedTasks += 1; // Increment counter for each completed task
        }
      });
    });

    // Calculate the percentage of completed tasks
    return totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;
  };

  const completionPercentage = calculateCompletion(goal.tasks); // Get the completion percentage

  return (
    <div className="w-full relative">
      {/* Link to the goal details page */}
      <Link href={`/goals/${goal.id}`}>
        <Card>
          <CardContent className="p-6">
            {/* Header section with goal title and description */}
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

            {/* Goal details: timeline, time remaining, and tasks */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {/* Timeline section */}
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

              {/* Time remaining section */}
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

              {/* Tasks section */}
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

            {/* Progress bar section */}
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

      {/* Action buttons: delete and edit */}
      <div className="flex items-center gap-2 z-10 absolute top-4 right-4">
        <DeleteGoalButton goalId={goal.id} />
        <EditGoalButton goalId={goal.id} />
      </div>
    </div>
  );
}
