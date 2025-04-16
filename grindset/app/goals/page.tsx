// Import the `AddGoalButton` component, which provides a button to add a new goal
import AddGoalButton from "@/app/components/goals/AddGoalButton";

// Import the `GoalDetails` component, which displays detailed information about a goal
import { GoalDetails } from "@/app/components/goals/GoalDetails";

// Import the `DContainer` component, which displays daily tasks for a selected date
import DContainer from "@/app/components/tasks/DContainer";

// Import the `getCurrentUserGoals` function, which fetches the current user's goals
import { getCurrentUserGoals } from "@/app/lib/actions";

// Import the `DateNav` component, which provides navigation for selecting dates
import DateNav from "@/app/components/goals/DateNav";

// Define the `Goals` component, which is an asynchronous server-side component
export default async function Goals({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  // Fetch the current user's goals
  const goals = await getCurrentUserGoals();

  // Resolve the `searchParams` Promise to get the query parameters
  const selectparams = await searchParams;

  // Parse the `date` parameter from the query string into a JavaScript Date object
  const fixparams = new Date(selectparams.date + "T00:00:00");

  // Normalize the date to midnight (00:00:00) to avoid time zone issues
  const fix2 = fixparams.setHours(0, 0, 0, 0);

  // Use the parsed date or default to today's date if no date is provided
  const selectaDate = new Date(fix2 || new Date().setHours(0, 0, 0, 0));

  // Render the goals page layout
  return (
    <div className="flex flex-col items-center justify-start gap-5 mx-4 mb-12 min-h-screen">
      {/* Page title */}
      <h1 className="text-3xl font-semibold leading-none tracking-tight text-[#FFFFFF]">
        All Goals
      </h1>

      {/* Date navigation component */}
      <DateNav />

      {/* List of goals */}
      <ul className="flex flex-col gap-4 w-full max-w-7xl">
        {goals.length > 0 ? (
          <div className="flex flex-col gap-4 w-full">
            {/* Button to add a new goal */}
            <AddGoalButton />

            {/* Render details for each goal */}
            {goals.map((goal) => (
              <GoalDetails goal={goal} key={goal.id} />
            ))}
          </div>
        ) : (
          // Display a message if no goals are found
          <div className="flex flex-col items-center justify-center w-full p-4 gap-10 text-center border border-gray-700 rounded-md">
            <p className="text-gray-300">
              It seems like you do not have any goals yet.
            </p>
            {/* Button to add a new goal */}
            <AddGoalButton />
          </div>
        )}
      </ul>

      {/* Render the `DContainer` component if there are goals */}
      {goals.length > 0 && <DContainer gdate={selectaDate} />}
    </div>
  );
}
