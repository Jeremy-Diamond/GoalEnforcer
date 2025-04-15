export interface Task {
  _id?: string; // MongoDB will generate this automatically
  taskTitle: string;
  completed: boolean;
  dailyCompletion?: {
    dayCount: number;
    dueDate: Date;
    completed: boolean;
  }[];
}

export interface GoalData {
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

export interface Goal {
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
