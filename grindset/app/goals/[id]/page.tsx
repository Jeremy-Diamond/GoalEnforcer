// import { Subtasks } from "../../../components/goals/subtasks";
import { GoalDetails } from "../../../components/goals/GoalDetails";
import { GoalPreferences } from "../../../components/goals/GoalPreferences";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/Tabs";

import { notFound } from "next/navigation";

const mockGoal = {
  id: "1",
  title: "Complete Website Redesign",
  description:
    "Finish the new website design and get client approval. This includes updating the homepage, product pages, and checkout flow to improve user experience and conversion rates.",
  startDate: "2025-03-15T00:00:00.000Z",
  endDate: "2025-04-15T00:00:00.000Z",
  progress: 65,
  tasks: [
    {
      id: "1-1",
      taskTitle: "Create wireframes",
      completed: true,
    },
    {
      id: "1-2",
      taskTitle: "Design homepage mockup",
      completed: true,
    },
    {
      id: "1-3",
      taskTitle: "Design product page templates",
      completed: true,
    },
    {
      id: "1-4",
      taskTitle: "Design checkout flow",
      completed: false,
    },
    {
      id: "1-5",
      taskTitle: "Get client feedback",
      completed: false,
    },
    {
      id: "1-6",
      taskTitle: "Implement revisions",
      completed: false,
    },
    {
      id: "1-7",
      taskTitle: "Final client approval",
      completed: false,
    },
  ],
  preferences: {
    emailReminders: true,
    reminderFrequency: "daily",
    deadlineTime: "18:00",
    allowCollaboration: false,
    collaborators: [],
  },
};

type GoalPageProps = {
  params: {
    id: string;
  };
};

export default async function GoalPage({ params }: GoalPageProps) {
  if (!params?.id) return notFound();
  const { id } = params;
  const goal = mockGoal; // I have to replace this with actual data fetching logic to fetch from the database
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="container mx-auto max-w-5xl space-y-6">
          <GoalDetails goal={goal} />

          <Tabs defaultValue="subtasks" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="subtasks">Subtasks</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>
            <TabsContent value="subtasks" className="mt-6">
              {/* <Subtasks goalId={goalId} tasks={goal.tasks} /> */}
            </TabsContent>
            <TabsContent value="preferences" className="mt-6">
              <GoalPreferences
                goalId={id}
                preferences={goal.preferences}
                disabled={true}
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
