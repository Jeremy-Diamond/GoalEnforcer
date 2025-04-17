// Import the `getGoalById` function to fetch goal data by its ID
import { getGoalById } from "@/app/lib/actions";
// Import the `Subtask` component to render individual subtasks
import Subtask from "./Subtask";

// Define the structure of a `Task` object
interface Task {
  _id: string; // Unique identifier for the task
  taskTitle: string; // Title of the task
}

// Define the `SubtaskContainer` component, which fetches and displays subtasks for a specific goal
export default async function SubtaskContainer({ gid }: { gid: string }) {
  // Fetch the goal data using the provided goal ID
  const thegoal = await getGoalById(gid);

  // Extract the tasks from the goal object and cast them to the `Task` type
  const goaltasks = thegoal.tasks as Task[];

  return (
    <div className="max-w-7xl w-full relative rounded-lg border border-[#2D3748] bg-[#1E2132] text-[#F8FAFC] shadow-md p-6">
      {/* Map over the tasks and render a `Subtask` component for each task */}
      {goaltasks.map((task) => (
        <div key={task._id}>
          {/* Render the `Subtask` component with the task title */}
          <Subtask tt={task.taskTitle} />
        </div>
      ))}
    </div>
  );
}
