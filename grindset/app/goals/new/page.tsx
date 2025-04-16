// Import the `CreateOrEditGoal` component, which is used for creating or editing a goal
import CreateOrEditGoal from "@/app/components/CreateOrEditGoal";

// Define the `Goals` component, which renders the goal creation page
export default function Goals() {
  return (
    // Render the `CreateOrEditGoal` component in "create" mode
    <CreateOrEditGoal mode="create" />
  );
}
