// Import the CreateOrEditGoal component, which is used for creating or editing a goal
import CreateOrEditGoal from "@/app/components/CreateOrEditGoal";

// Import the getGoalById function, which fetches a goal by its ID from the database or API
import { getGoalById } from "@/app/lib/actions";

// Define the EditGoalPage component, which is an asynchronous server-side component
export default async function EditGoalPage({
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

  // Convert the goal object to a plain JavaScript object (if needed for serialization)
  const goalParam = JSON.parse(JSON.stringify(goal));

  // Render the CreateOrEditGoal component in "edit" mode, passing the fetched goal data as a prop
  return <CreateOrEditGoal mode="edit" goal={goalParam} />;
}
