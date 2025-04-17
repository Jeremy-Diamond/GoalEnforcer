// Define the structure of a task
export interface Task {
  _id?: string; // Optional MongoDB-generated ID for the task
  taskTitle: string; // Title of the task
  completed: boolean; // Indicates whether the task is completed
  dailyCompletion?: {
    dayCount: number; // The day number in the goal timeline
    dueDate: Date; // The due date for the task
    completed: boolean; // Indicates whether the task is completed on this day
  }[]; // Array of daily completion records for the task
}

// Define the structure of goal data used for creating or updating a goal
export interface GoalData {
  title: string; // Title of the goal
  description: string; // Description of the goal
  startDate: string; // Start date of the goal in string format
  endDate: string; // End date of the goal in string format
  completed: boolean; // Indicates whether the goal is completed
  receiveEmailReminders: boolean; // Indicates whether email reminders are enabled
  dailyDeadlineTime: string; // The daily deadline time for the goal
  reminderFrequency: string; // Frequency of reminders (e.g., daily, weekly)
  tasks: Task[]; // Array of tasks associated with the goal
  userId: string; // ID of the user who owns the goal
}

// Define the structure of a goal, typically used for retrieving or editing a goal
export interface Goal {
  _id?: string; // Optional MongoDB-generated ID for the goal
  id?: string; // Optional alternative ID for the goal
  title: string; // Title of the goal
  description: string; // Description of the goal
  startDate?: string; // Optional start date of the goal
  endDate?: string; // Optional end date of the goal
  completed?: boolean; // Optional flag indicating whether the goal is completed
  receiveEmailReminders?: boolean; // Optional flag for email reminders
  dailyDeadlineTime?: string; // Optional daily deadline time for the goal
  reminderFrequency?: string; // Optional frequency of reminders
  tasks?: Task[]; // Optional array of tasks associated with the goal
}
