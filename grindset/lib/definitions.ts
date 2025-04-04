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
  //tasks: Task[];
};