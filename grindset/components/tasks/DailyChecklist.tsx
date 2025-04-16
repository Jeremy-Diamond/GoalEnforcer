// Import the `getGoalById` function to fetch goal data by its ID
import { getGoalById } from "@/app/lib/actions";
// Import the `Checklist` component to render individual tasks
import Checklist from "./Checklist";

// Define the props for the `DailyChecklist` component
type DailyChecklistProps = {
  gid: string; // The ID of the goal
  ddate: string; // The selected date in string format
};

// Define the structure of a daily completion record
interface DailyCompletion {
  _id: string; // Unique identifier for the daily completion record
  completed: boolean; // Indicates if the task was completed on the given date
  dueDate: Date; // The due date for the task
}

// Define the structure of a task
interface Task {
  _id: string; // Unique identifier for the task
  taskTitle: string; // Title of the task
  dailyCompletion: DailyCompletion[]; // Array of daily completion records
}

// Define the `DailyChecklist` component, which displays a checklist of tasks for a specific goal and date
export default async function DailyChecklist({
  gid,
  ddate,
}: DailyChecklistProps) {
  // Fetch the goal data using the provided goal ID
  const goal = await getGoalById(gid);

  // If the goal is not found, display an error message
  if (!goal) {
    return <p>Goal not found.</p>;
  }

  // Extract the list of tasks and the goal title
  const tasklist = goal.tasks;
  const gtitle = goal.title || "Untitled Goal"; // Default to "Untitled Goal" if no title is provided

  // Parse the selected date, start date, and end date
  const selectedDate = new Date(ddate);
  const startDate = new Date(goal.startDate);
  const endDate = new Date(goal.endDate);

  // Check if the selected date is within the goal's date range
  const indaRange = selectedDate >= startDate && selectedDate <= endDate;

  // If the selected date is within the range, render the checklist
  if (indaRange) {
    return (
      <div className="border border-1 rounded-md p-4">
        {/* Display the goal title */}
        <h2 className="text-2xl font-bold text-white text-center mb-4">
          {gtitle}
        </h2>

        {/* Map over the tasks and render a `Checklist` component for each task */}
        {tasklist.map((task: Task) => {
          // Find the daily completion record for the selected date
          const dc = task.dailyCompletion.find((entry: DailyCompletion) => {
            return (
              new Date(entry.dueDate).toDateString() ===
              selectedDate.toDateString()
            );
          });

          // Extract the daily completion ID and completion status
          const dcId = dc?._id?.toString() ?? ""; // Default to an empty string if no ID is found
          const isChecked = dc?.completed ?? false; // Default to `false` if no completion status is found
          const taskId = String(task._id); // Convert the task ID to a string

          return (
            <div key={taskId} className="flex items-center mb-2">
              {/* Render the `Checklist` component for the task */}
              <Checklist
                goalId={goal._id.toString()} // Pass the goal ID
                taskId={taskId} // Pass the task ID
                dcId={dcId} // Pass the daily completion ID
                tTitle={task.taskTitle} // Pass the task title
                checked={isChecked} // Pass the completion status
                selectedDate={selectedDate} // Pass the selected date
              />
            </div>
          );
        })}
      </div>
    );
  }
}
