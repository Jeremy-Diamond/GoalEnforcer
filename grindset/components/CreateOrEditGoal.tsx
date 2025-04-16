'use client';

import { useState, useEffect } from 'react';
import { createGoal, updateGoalById } from '../lib/actions';
import { useUser } from '@clerk/nextjs';
import { formatTimeToInput } from '../lib/utils';
import { useRouter } from 'next/navigation';

interface Task {
  _id?: string; // MongoDB will generate this automatically
  taskTitle: string;
  completed: boolean;
  dailyCompletion?: {
    dayCount: number;
    dueDate: Date;
    completed: boolean;
  }[];
}

interface GoalData {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  completed: boolean;
  recieveEmailReminders: boolean;
  dailyDeadlineTime: string;
  reminderFrequency: string;
  tasks: Task[];
  userId: string;
}

interface Goal {
  _id?: string;
  id?: string;
  title: string;
  description: string;
  startDate?: string;
  endDate?: string;
  completed?: boolean;
  recieveEmailReminders?: boolean;
  dailyDeadlineTime?: string;
  reminderFrequency?: string;
  tasks?: Task[];
}

interface CreateGoalProps {
  goal?: Goal;
  mode: 'create' | 'edit';
}

export default function CreateOrEditGoal({ goal, mode }: CreateGoalProps) {
  const router = useRouter();
  const user = useUser();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [completed, setCompleted] = useState(false);
  const [recieveEmailReminders, setrecieveEmailReminders] = useState(false);
  const [dailyDeadlineTime, setDailyDeadlineTime] = useState('');
  const [reminderFrequency, setReminderFrequency] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]); // State for tasks
  const [newTaskTitle, setNewTaskTitle] = useState(''); // State for the new task input

  useEffect(() => {
    if (mode === 'edit' && goal) {
      setTitle(goal.title);
      setDescription(goal.description);
      setStartDate(goal.startDate ? goal.startDate.split('T')[0] : '');
      setEndDate(goal.endDate ? goal.endDate.split('T')[0] : '');
      setCompleted(goal.completed || false);
      setrecieveEmailReminders(goal.recieveEmailReminders || false);
      setDailyDeadlineTime(formatTimeToInput(goal.dailyDeadlineTime));
      setReminderFrequency(goal.reminderFrequency || '');
      setTasks(goal.tasks || []); // Pre-fill tasks if editing
    }
  }, [mode, goal]);

  const addTask = () => {
    if (newTaskTitle.trim() === '') {
      console.error('Task title is empty. Task will not be added.');
      return; // Prevent adding empty tasks
    }
  
    //console.log('Adding task:', newTaskTitle); // Debugging line to check the task title
  
    // Calculate the number of days between startDate and endDate
    //const start = new Date(startDate);

    const startover = new Date(startDate);
    const start2 = startover.setHours(0,0,0,0);
    const start = new Date(start2);

    const endover = new Date(endDate);
    const end2 = endover.setHours(0,0,0,0);
    const end = new Date(end2);
    //const end = new Date(endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)); // Difference in days
  
    // Generate the dailyCompletion array
    const dailyCompletion = Array.from({ length: days }, (_, i) => ({
      dayCount: i + 1,
      dueDate: new Date(start.getTime() + i * (1000 * 60 * 60 * 24)), // Increment by 1 day
      completed: false,
    }));
  
    // Add the new task with all required fields
    const newTask = {
      taskTitle: newTaskTitle,
      completed: false,
      dailyCompletion,
    };
  
    //console.log('New task being added:', newTask); // Debugging line to check the task structure
  
    setTasks([...tasks, newTask]);
    setNewTaskTitle(''); // Clear the input field
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const updateTask = (index: number, updatedTask: Partial<Task>) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], ...updatedTask };
    setTasks(updatedTasks);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  
    // Validate required fields
    if (!title.trim()) {
      alert('Title is required.');
      return;
    }
    if (!startDate.trim()) {
      alert('Start Date is required.');
      return;
    }
    if (!endDate.trim()) {
      alert('End Date is required.');
      return;
    }
    if (!reminderFrequency.trim()) {
      alert('Reminder Frequency is required.');
      return;
    }
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('startDate', startDate);
    formData.append('endDate', endDate);
    formData.append('completed', completed.toString());
    formData.append('recieveEmailReminders', recieveEmailReminders.toString());
    formData.append('dailyDeadlineTime', dailyDeadlineTime);
    formData.append('reminderFrequency', reminderFrequency);
    formData.append('userId', user.user?.id || '');
    formData.append('tasks', JSON.stringify(tasks)); // Add tasks as a JSON string
  
    try {
      if (mode === 'create') {
        //console.log('Creating goal with data:', formData); // Debugging line to check the form data
        //console.log('string',JSON.parse(formData.get('tasks') as string),)
        const goalData: GoalData = {
          title,
          description,
          startDate,
          endDate,
          completed,
          recieveEmailReminders,
          dailyDeadlineTime,
          reminderFrequency,
          tasks: JSON.parse(formData.get('tasks') as string),
          userId: user.user?.id || '',
        };
        await createGoal({
          ...goalData,
          tasks: goalData.tasks.map(task => ({
            taskTitle: task.taskTitle,
            dailyCompletion: task.dailyCompletion?.map(dc => ({
              dueDate: dc.dueDate,
              dayCount: dc.dayCount,
            })),
          })),
          allowCollaboration: false
        });
      } else if (mode === 'edit' && goal?._id) {
        const goalUpdateData = {
          title,
          description,
          startDate,
          endDate,
          completed,
          recieveEmailReminders,
          dailyDeadlineTime,
          reminderFrequency,
          tasks: JSON.stringify(tasks),
          userId: user.user?.id || ''
        };
        await updateGoalById(goal._id, goalUpdateData);
        //router.push("/goals")
      }
    } catch (error) {
      console.error('An error occurred while creating or updating the goal', error);
      alert('Failed to save the goal. Please try again.');
    }
    router.push("/goals")
  }

  return (
<div className="flex items-center justify-center min-h-screen bg-gray-900">
  <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-4xl">
  <h1 className="text-xl font-extrabold pb-4" >Goal Details</h1>
    <div className="grid grid-cols-2 gap-6">
      {/* Left Column */}
      <div>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="w-full p-2 text-white rounded-md border border-gray-600"
            placeholder="Enter goal title"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">Description:</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            className="w-full p-2 text-white rounded-md border border-gray-600"
            placeholder="Enter goal description"
          />
        </div>

        {/* Start Date */}
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(event) => setStartDate(event.target.value)}
            className="w-full p-2 text-white rounded-md border border-gray-600"
            placeholder="Select start date"
          />
        </div>

        {/* End Date */}
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(event) => setEndDate(event.target.value)}
            className="w-full p-2 text-white rounded-md border border-gray-600"
            placeholder="Select end date"
          />
        </div>
      </div>

      {/* Right Column */}
      <div>
        {/* Receive Email Reminders */}
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">Receive Email Reminders:</label>
          <div className="flex items-center">
            <input
              type="checkbox"
              title="Receive Email Reminders"
              checked={recieveEmailReminders}
              onChange={(event) => setrecieveEmailReminders(event.target.checked)}
              className="mr-2"
            />
            <span className="text-white">Check box to receive email reminders</span>
          </div>
        </div>

        {/* Daily Deadline Time */}
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">Daily Deadline Time:</label>
          <input
            type="time"
            title="Daily deadline time"
            value={dailyDeadlineTime}
            onChange={(event) => setDailyDeadlineTime(event.target.value)}
            className="w-full p-2 text-white rounded-md border border-gray-600"
          />
        </div>

        {/* Reminder Frequency */}
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">Reminder Frequency:</label>
          <select
            title='reminderFrequency'
            value={reminderFrequency}
            onChange={(event) => setReminderFrequency(event.target.value)}
            className="w-full p-2 text-white rounded-md border border-gray-600"
          >
            <option className="text-black" value="">Select frequency</option>
            <option className="text-black" value="daily">Daily</option>
            <option className="text-black" value="weekly">Weekly</option>
            <option className="text-black" value="monthly">Monthly</option>
          </select>
        </div>
      </div>
    </div>

    {/* Tasks Section */}
    <div className="mt-6 mb-4">
      <label className="block text-white text-sm font-bold mb-2">Daily Tasks:</label>
      <div className="flex items-center mb-2">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(event) => setNewTaskTitle(event.target.value)}
          className="w-full p-2 text-white rounded-md border border-gray-600"
          placeholder="Enter task title"
        />
        <button
          type="button"
          onClick={addTask}
          className="ml-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Add
        </button>
      </div>
      <ul className="list-disc pl-5">
        {tasks.map((task, index) => (
          <li key={index} className="flex items-center justify-between mb-2">
            <input
              type="text"
              value={task.taskTitle}
              onChange={(event) => updateTask(index, { taskTitle: event.target.value })}
              className="w-full p-2 text-white rounded-md border border-gray-600"
              title="Task title"
              placeholder="Enter task title"
            />
            <button
              type="button"
              onClick={() => removeTask(index)}
              className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>

    {/* Submit Button */}
    <button
      type="submit"
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      {mode === 'create' ? 'Create Goal' : 'Update Goal'}
    </button>
  </form>
</div>

  );
}