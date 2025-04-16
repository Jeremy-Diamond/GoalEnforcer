"use server"; // Indicates that this file contains server-side logic

// Import necessary modules and utilities
import { currentUser } from "@clerk/nextjs/server"; // Function to get the current authenticated user
import { Goal } from "../models/Goal"; // Mongoose model for the `Goal` collection
import dbConnect from "./mongodb"; // Utility to connect to the MongoDB database
import { scheduleEmailReminders } from "./utils"; // Utility to schedule email reminders

// Define the structure of the `GoalData` object for creating a goal
interface GoalData {
  title: string;
  description?: string;
  tasks?: {
    taskTitle: string;
    description?: string;
    dailyCompletion?: { dueDate: Date; dayCount: number }[];
  }[];
  startDate: string | Date;
  endDate: string | Date;
  completed: boolean;
  receiveEmailReminders: boolean;
  dailyDeadlineTime: string;
  reminderFrequency: string;
  userId: string;
}

// Function to create a new goal
export async function createGoal(data: GoalData) {
  try {
    await dbConnect(); // Connect to the database

    // Validate required fields
    if (!data.title) {
      throw new Error("Title is required.");
    }
    if (!data.userId) {
      throw new Error("User ID is required.");
    }
    if (!data.startDate || !data.endDate) {
      throw new Error("Start Date and End Date are required.");
    }

    // Convert `startDate` and `endDate` to Date objects if they are strings
    if (typeof data.startDate === "string") {
      data.startDate = new Date(data.startDate);
    }
    if (typeof data.endDate === "string") {
      data.endDate = new Date(data.endDate);
    }

    // Parse tasks if they are passed as a string
    if (typeof data.tasks === "string") {
      data.tasks = JSON.parse(data.tasks);
    }

    // Ensure tasks and dailyCompletion are properly formatted
    if (Array.isArray(data.tasks)) {
      data.tasks = data.tasks.map((task) => ({
        ...(typeof task === "object" && task !== null ? task : {}),
        taskTitle: task.taskTitle || "Untitled Task", // Provide a default title if undefined
        dailyCompletion: Array.isArray(task.dailyCompletion)
          ? task.dailyCompletion.map((completion) => ({
              ...completion,
              dueDate: new Date(completion.dueDate), // Ensure `dueDate` is a Date object
            }))
          : [],
      }));
    }

    // Create the goal in the database
    const result = await Goal.create(data);

    // If email reminders are enabled, schedule them
    if (data.receiveEmailReminders) {
      const user = await currentUser(); // Get the current user
      if (!user) {
        throw new Error("User not found");
      } else {
        await scheduleEmailReminders(user, result); // Schedule email reminders
      }
    }

    return result.acknowledged; // Return the result of the operation
  } catch (error) {
    console.error("An error occurred while creating a goal", error);
    throw error; // Rethrow the error for further handling
  }
}

// Function to retrieve all goals for the current user
export async function getCurrentUserGoals() {
  const user = await currentUser(); // Get the current authenticated user
  try {
    await dbConnect(); // Connect to the database
    const goals = await Goal.find({ userId: user?.id }).exec(); // Find goals by user ID
    return goals; // Return the list of goals
  } catch (error) {
    console.error("An error occurred while getting all goals", error);
    return []; // Return an empty array in case of an error
  }
}

// Function to retrieve a goal by its ID
export async function getGoalById(id: string) {
  try {
    await dbConnect(); // Connect to the database
    const goal = await Goal.findById(id).exec(); // Find the goal by its ID
    return goal; // Return the goal
  } catch (error) {
    console.error("An error occurred while getting the goal", error);
    return null; // Return `null` in case of an error
  }
}

// Define the structure of the `GoalUpdateData` object for updating a goal
interface GoalUpdateData {
  title?: string;
  description?: string;
  tasks?: string | string[];
  status?: string;
  dueDate?: Date;
}

// Function to update a goal by its ID
export async function updateGoalById(id: string, data: GoalUpdateData) {
  try {
    await dbConnect(); // Connect to the database

    // Parse the `tasks` field if it exists and is a string
    if (typeof data.tasks === "string") {
      data.tasks = JSON.parse(data.tasks);
    }

    const result = await Goal.updateOne({ _id: id }, { $set: data }); // Update the goal
    return result.acknowledged; // Return the result of the operation
  } catch (error) {
    console.error("An error occurred while updating the goal", error);
    throw error; // Rethrow the error for further handling
  }
}

// Function to delete a goal by its ID
export async function deleteGoalById(id: string) {
  try {
    await dbConnect(); // Connect to the database
    const result = await Goal.deleteOne({ _id: id }); // Delete the goal
    return result.acknowledged; // Return the result of the operation
  } catch (error) {
    console.error("An error occurred while deleting the goal", error);
    return null; // Return `null` in case of an error
  }
}

// Define the structure of a task and its daily completion
type Task = {
  _id: string;
  taskTitle: string;
  dailyCompletion: DailyCompletion[];
};

type DailyCompletion = {
  _id: string;
  dayCount: number;
  dueDate: Date;
  completed: boolean;
};

// Function to retrieve the daily completion ID for a specific task and date
export async function getDailyCompletionId(
  goalId: string,
  taskId: string,
  taskdate: Date
) {
  const taskdateDay = taskdate.toDateString(); // Convert the date to a string
  try {
    await dbConnect(); // Connect to the database

    const goal = await Goal.findOne({
      _id: goalId,
      "task._id": taskId,
    }); // Find the goal and task

    if (!goal) {
      console.error("Goal or task not found");
      return null; // Return `null` if not found
    }

    const task = goal.tasks.find((t: Task) => t._id.toString() === taskId); // Find the task

    if (!task) {
      console.error("Task not found");
      return null; // Return `null` if not found
    }

    const dailyCompletion = task.dailyCompletion.find(
      (d: DailyCompletion) => d.dueDate.toDateString() === taskdateDay
    ); // Find the daily completion record

    if (!dailyCompletion) {
      console.error("DailyCompletion not found for the date");
      return null; // Return `null` if not found
    }

    return dailyCompletion._id.toString(); // Return the daily completion ID
  } catch (error) {
    console.error("Error finding daily completion:", error);
    return null; // Return `null` in case of an error
  }
}

// Function to update the daily completion status of a task
export async function updateDaily(
  goalId: string,
  taskId: string,
  completedId: string,
  completed: boolean
) {
  try {
    await dbConnect(); // Connect to the database
    const updateDaily = await Goal.findOneAndUpdate(
      {
        _id: goalId,
        "tasks._id": taskId,
        "tasks.dailyCompletion._id": completedId,
      },
      {
        $set: {
          "tasks.$.dailyCompletion.$[elem].completed": completed, // Update the completion status
        },
      },
      {
        arrayFilters: [{ "elem._id": completedId }], // Filter for the specific daily completion record
        new: true, // Return the updated document
      }
    );

    if (!updateDaily) {
      console.error("Goal or task not found, or update failed");
      return null; // Return `null` if the update failed
    }

    return { success: true }; // Return success if the update was successful
  } catch (error) {
    console.error("An error occurred while updating the task", error);
    throw error; // Rethrow the error for further handling
  }
}
