// import { Subtasks } from "../../../components/goals/subtasks";
import { getGoalById } from "@/app/lib/actions";
import { GoalDetails } from "../../../components/goals/GoalDetails";
import { GoalPreferences } from "../../../components/goals/GoalPreferences";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/Tabs";
import SubtaskContainer from "@/app/components/subtasks/SubtaskContainer";

//import { notFound } from "next/navigation";

export default async function GoalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params; // Resolve the Promise
  const goalId = resolvedParams.id; // Access the resolved `id`
  const goal = await getGoalById(goalId);
  goal.preferences = {
    receiveEmailReminders: goal.receiveEmailReminders,
    reminderFrequency: goal.reminderFrequency,
    deadlineTime: goal.deadlineTime,
  };
  console.log(goal.preferences);
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
              <SubtaskContainer gid={goalId}/>
            </TabsContent>
            <TabsContent value="preferences" className="mt-6">
              <GoalPreferences
                goalId={goalId}
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
