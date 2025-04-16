export type Goal = {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  completed: boolean;
  allowCollaboration: boolean;
  dailyDeadlineTime: string;
  reminderFrequency: string;
  tasks: Task[];
};

export interface DailyCompletion {
  dueDate: string; // Example format: '2025-04-11'
  completed: boolean;
  _id: string;
}

export interface Task {
  id: string;
  taskTitle: string;
  completed: boolean;
  dailyCompletion: DailyCompletion[];
}

export interface GoalDetailsProps {
  goal: Goal;
  progress?: number;
}
