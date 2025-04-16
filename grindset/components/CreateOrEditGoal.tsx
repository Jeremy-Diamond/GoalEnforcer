"use client"; // Indicates that this component is a client-side component

// Import necessary hooks and utilities
import { useUser } from "@clerk/nextjs"; // Hook to get the current user
import { useRouter } from "next/navigation"; // Hook for programmatic navigation
import { useEffect, useState } from "react"; // React hooks for state and lifecycle management
import { createGoal, updateGoalById } from "../lib/actions"; // Functions to create or update a goal
import { formatTimeToInput } from "../lib/utils"; // Utility function to format time for input fields

// Define the structure of a task
interface Task {
  _id?: string; // Optional MongoDB-generated ID
  taskTitle: string; // Title of the task
  completed: boolean; // Whether the task is completed
  dailyCompletion?: {
    dayCount: number; // Day number in the goal timeline
    dueDate: Date; // Due date for the task
    completed: boolean; // Whether the task is completed on this day
  }[];
}

// Define the structure of goal data for creation or update
interface GoalData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  completed: boolean;
  receiveEmailReminders: boolean;
  dailyDeadlineTime: string;
  reminderFrequency: string;
  tasks: Task[];
  userId: string;
}

// Define the structure of a goal for editing
interface Goal {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  startDate?: string;
  endDate?: string;
  completed?: boolean;
  receiveEmailReminders?: boolean;
  dailyDeadlineTime?: string;
  reminderFrequency?: string;
  tasks?: Task[];
}

// Props for the `CreateOrEditGoal` component
interface CreateGoalProps {
  goal?: Goal; // Optional goal object for editing
  mode: "create" | "edit"; // Mode to determine if creating or editing a goal
}

// Define the `CreateOrEditGoal` component
export default function CreateOrEditGoal({ goal, mode }: CreateGoalProps) {
  const router = useRouter(); // Hook for navigation
  const user = useUser(); // Get the current user

  // State variables for goal fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [receiveEmailReminders, setreceiveEmailReminders] = useState(false);
  const [dailyDeadlineTime, setDailyDeadlineTime] = useState("");
  const [reminderFrequency, setReminderFrequency] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]); // State for tasks
  const [newTaskTitle, setNewTaskTitle] = useState(""); // State for the new task input

  // Pre-fill fields if in edit mode
  useEffect(() => {
    if (mode === "edit" && goal) {
      setTitle(goal.title);
      setDescription(goal.description);
      setStartDate(goal.startDate ? goal.startDate.split("T")[0] : "");
      setEndDate(goal.endDate ? goal.endDate.split("T")[0] : "");
      setCompleted(goal.completed || false);
      setreceiveEmailReminders(goal.receiveEmailReminders || false);
      setDailyDeadlineTime(formatTimeToInput(goal.dailyDeadlineTime));
      setReminderFrequency(goal.reminderFrequency || "");
      setTasks(goal.tasks || []); // Pre-fill tasks if editing
    }
  }, [mode, goal]);

  // Function to add a new task
  const addTask = () => {
    if (newTaskTitle.trim() === "") {
      console.error("Task title is empty. Task will not be added.");
      return; // Prevent adding empty tasks
    }

    // Calculate the number of days between startDate and endDate
    const start = new Date(new Date(startDate).setHours(0, 0, 0, 0));
    const end = new Date(new Date(endDate).setHours(0, 0, 0, 0));
    const days = Math.ceil(
      (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Generate the dailyCompletion array
    const dailyCompletion = Array.from({ length: days }, (_, i) => ({
      dayCount: i + 1,
      dueDate: new Date(start.getTime() + i * (1000 * 60 * 60 * 24)), // Increment by 1 day
      completed: false,
    }));

    // Add the new task
    const newTask = {
      taskTitle: newTaskTitle,
      completed: false,
      dailyCompletion,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle(""); // Clear the input field
  };

  // Function to remove a task
  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  // Function to update a task
  const updateTask = (index: number, updatedTask: Partial<Task>) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], ...updatedTask };
    setTasks(updatedTasks);
  };

  // Function to handle form submission
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Validate required fields
    if (!title.trim()) {
      alert("Title is required.");
      return;
    }
    if (!startDate.trim()) {
      alert("Start Date is required.");
      return;
    }
    if (!endDate.trim()) {
      alert("End Date is required.");
      return;
    }
    if (!reminderFrequency.trim()) {
      alert("Reminder Frequency is required.");
      return;
    }

    try {
      if (mode === "create") {
        // Create a new goal
        const goalData: GoalData = {
          title,
          description,
          startDate,
          endDate,
          completed,
          receiveEmailReminders,
          dailyDeadlineTime,
          reminderFrequency,
          tasks,
          userId: user.user?.id || "",
        };
        await createGoal(goalData);
      } else if (mode === "edit" && goal?._id) {
        // Update an existing goal
        const goalUpdateData = {
          title,
          description,
          startDate,
          endDate,
          completed,
          receiveEmailReminders,
          dailyDeadlineTime,
          reminderFrequency,
          tasks: JSON.stringify(tasks),
          userId: user.user?.id || "",
        };
        await updateGoalById(goal._id, goalUpdateData);
      }
    } catch (error) {
      console.error(
        "An error occurred while creating or updating the goal",
        error
      );
      alert("Failed to save the goal. Please try again.");
    }

    router.push("/goals"); // Navigate back to the goals page
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-4xl"
      >
        <h1 className="text-xl font-extrabold pb-4">Goal Details</h1>
        {/* Form fields for goal details */}
        {/* Tasks section */}
        {/* Submit button */}
      </form>
    </div>
  );
}
