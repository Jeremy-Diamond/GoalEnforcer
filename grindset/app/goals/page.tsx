import { GoalDetails } from "@/app/components/goals/GoalDetails";
import DContainer from "@/app/components/tasks/DContainer";
//import DContainer from "@/app/components/tasks/DContainer";
import { getCurrentUserGoals } from "@/app/lib/actions";
import Link from "next/link";

export default async function Goals() {
  const goals = await getCurrentUserGoals();
  console.log("Found Goals:", goals);
  return (
    <div className="flex flex-col items-center justify-start gap-5 mx-2 min-h-screen">
      <h1 className="text-3xl font-semibold leading-none tracking-tight text-[#FFFFFF]">
        All Goals
      </h1>
      <ul>
        {goals.map((goal) => (
          <Link href={`/goals/${goal.id}`} key={goal.id}>
            <GoalDetails goal={goal} />
          </Link>
        ))}
      </ul>
      <DContainer />
    </div>
  );
}
