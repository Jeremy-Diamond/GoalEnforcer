'use server';
import { Goal}  from "../models/Goal";
import dbConnect from "./mongodb";
import { currentUser } from '@clerk/nextjs/server'

  
  interface GoalData {
    title: string;
    description?: string;
    tasks?: { taskTitle: string; description?: string; dailyCompletion?: { dueDate: Date; dayCount: number;}[] }[];
    startDate: string | Date;
    endDate: string | Date;
    completed: boolean;
    allowCollaboration: boolean;
    dailyDeadlineTime: string;
    reminderFrequency: string;
    userId: string;
  }
  
  export async function createGoal(data: GoalData) {
    try {
      //console.log('Data received in backend:', data); // Debugging line to check the data object
      await dbConnect();
  
      // Validate required fields
      if (!data.title) {
        throw new Error('Title is required.');
      }
      if (!data.userId) {
        throw new Error('User ID is required.');
      }
      if (!data.startDate || !data.endDate) {
        throw new Error('Start Date and End Date are required.');
      }
  
      // Convert startDate and endDate to Date objects if they are strings
      if (typeof data.startDate === 'string') {
        data.startDate = new Date(data.startDate);
      }
      if (typeof data.endDate === 'string') {
        data.endDate = new Date(data.endDate);
      }
  
      // Parse tasks if they are passed as a string
      if (typeof data.tasks === 'string') {
        data.tasks = JSON.parse(data.tasks);
      }
      //console.log('Tasks received in backend:', data.tasks); // Debugging line to check the tasks array
      // Ensure tasks and dailyCompletion are plain objects
      if (Array.isArray(data.tasks)) {
        data.tasks = data.tasks.map(task => ({
          ...(typeof task === 'object' && task !== null ? task : {}),
          taskTitle: task.taskTitle || 'Untitled Task', // Provide a default title if undefined
          dailyCompletion: Array.isArray(task.dailyCompletion)
            ? task.dailyCompletion.map(completion => ({
                ...completion,
                // Removed dayCount as it does not exist on the type
                dueDate: new Date(completion.dueDate), // Ensure dueDate is a Date object
              }))
            : [],
        }));
      }
  
      // Create the goal
      const result = await Goal.create(data);
      return result.acknowledged;
    } catch (error) {
      console.error('An error occurred while creating a goal', error);
      throw error;
    }
  }

export async function getCurrentUserGoals() {
    const user = await currentUser();
    //console.log("Current User:", user);
    try {
        await dbConnect();
        const goals = await Goal.find({ userId: user?.id }).exec();
        return goals;
    } catch (error) {
        console.error("An error occurred while getting all goals", error);
        return [];
    }
}

// get goal by id

export async function getGoalById(id: string) {
    try {
        await dbConnect();
        const goal = await Goal.findById(id).exec();
        return goal;
    } catch (error) {
        console.error("An error occurred while getting the goal", error);
        return null;
    }
}

// update goal by id

interface GoalUpdateData {
  title?: string;
  description?: string;
  tasks?: string | string[];
  status?: string;
  dueDate?: Date;
}

export async function updateGoalById(id: string, data: GoalUpdateData) {
  try {
    await dbConnect();

    // Parse the `tasks` field if it exists and is a string
    if (typeof data.tasks === 'string') {
      data.tasks = JSON.parse(data.tasks);
    }

    const result = await Goal.updateOne({ _id: id }, { $set: data });
    return result.acknowledged;
  } catch (error) {
    console.error('An error occurred while updating the goal', error);
    throw error;
  }
}

// delete goal by id
export async function deleteGoalById(id: string) {
    try {
        await dbConnect();
        const result = await Goal.deleteOne({ _id: id });
        return result.acknowledged;
    } catch (error) {
        console.error("An error occurred while deleting the goal", error);
        return null;
    }
}
