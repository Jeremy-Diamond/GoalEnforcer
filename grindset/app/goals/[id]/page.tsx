// Import the `getGoalById` function to fetch goal data by its ID
import { getGoalById } from "@/app/lib/actions";

// Import the `GoalDetails` component to display detailed information about the goal
import { GoalDetails } from "../../../components/goals/GoalDetails";

// Import the `GoalPreferences` component to display and manage goal preferences
import { GoalPreferences } from "../../../components/goals/GoalPreferences";

// Import the `Tabs` components for creating a tabbed interface
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/Tabs";

// Import the `SubtaskContainer` component to display and manage subtasks for the goal
import SubtaskContainer from "@/app/components/subtasks/SubtaskContainer";

// Define the `GoalPage` component, which is an asynchronous server-side component
export default async function GoalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Resolve the `params` Promise to get the route parameters
  const resolvedParams = await params;

  // Extract the `id` parameter from the resolved parameters
  const goalId = resolvedParams.id;

  // Fetch the goal data using the `getGoalById` function and the extracted `id`
  const goal = await getGoalById(goalId);

  // Add a `preferences` property to the goal object for easier access to preference-related data
  goal.preferences = {
    receiveEmailReminders: goal.receiveEmailReminders,
    reminderFrequency: goal.reminderFrequency,
    deadlineTime: goal.deadlineTime,
  };

  // Log the goal preferences to the console for debugging purposes
  console.log(goal.preferences);

  // Render the goal page layout
  return (
    <div className="flex min-h-screen flex-col">
      {/* Main content area */}
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="container mx-auto max-w-5xl space-y-6">
          {/* Display goal details */}
          <GoalDetails goal={goal} />

          {/* Tabbed interface for subtasks and preferences */}
          <Tabs defaultValue="subtasks" className="w-full">
            {/* Tab navigation */}
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="subtasks">Subtasks</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            {/* Subtasks tab content */}
            <TabsContent value="subtasks" className="mt-6">
              {/* Render the SubtaskContainer component to manage subtasks */}
              <SubtaskContainer gid={goalId} />
            </TabsContent>

            {/* Preferences tab content */}
            <TabsContent value="preferences" className="mt-6">
              {/* Render the GoalPreferences component to display goal preferences */}
              <GoalPreferences
                goalId={goalId}
                preferences={goal.preferences}
                disabled={true} // Preferences are displayed in a read-only state
              />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
