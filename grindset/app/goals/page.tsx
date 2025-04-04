import { GoalDetails } from "@/app/components/goals/GoalDetails";
import { getCurrentUserGoals } from "@/app/lib/actions";

export default async function Goals() {
  const goals = await getCurrentUserGoals();
  console.log("Found Goals:", goals);
  return (
    <div>
      <h1>All Goals</h1>
      <ul>
        {goals.map((goal) => (
          <GoalDetails goal={goal} key={goal.id} />
        ))}
      </ul>
    </div>
  );
}
