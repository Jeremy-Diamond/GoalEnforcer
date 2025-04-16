import { getGoalById } from "@/app/lib/actions";
import { GoalPreferences } from "../../../components/goals/GoalPreferences";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/Tabs";
//import { notFound } from "next/navigation";
import DContainer from "@/app/components/tasks/DContainer";
import ProgressContextProvider from "@/app/context/ProgressContext";

export default async function GoalPage({
  params,
}: {
  params: Promise<{ id: string; date: string }>;
}) {
  const resolvedParams = await params; // Resolve the Promise
  const goalId = resolvedParams.id; // Access the resolved `id`
  const goal = await getGoalById(goalId);
  goal.preferences = {
    emailReminders: true,
    allowCollaboration: goal.allowCollaboration,
    reminderFrequency: goal.reminderFrequency,
    deadlineTime: goal.deadlineTime,
  };
  const fixparams = new Date(resolvedParams.date + "T00:00:00");
  //console.log("fixparams:" + fixparams);
  const fix2 = fixparams.setHours(0, 0, 0, 0);
  //console.log("fixparams:" + fix2);
  //const rawDate = selectparams.date;
  //const parsedDate = new Date(`${rawDate}T00:00:00`);
  const selectaDate = new Date(fix2 || new Date().setHours(0, 0, 0, 0));
  return (
    <ProgressContextProvider initialTasks={goal.tasks}>
      <div className="flex min-h-screen flex-col">
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="container mx-auto max-w-5xl space-y-6">
            {/* <GoalDetailsWrapper goal={goal} /> */}

            <Tabs defaultValue="subtasks" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="subtasks">Subtasks</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
              </TabsList>
              <TabsContent value="subtasks" className="mt-6">
                <DContainer gdate={selectaDate} />
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
    </ProgressContextProvider>
  );
}
