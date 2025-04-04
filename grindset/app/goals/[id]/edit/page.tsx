import CreateOrEditGoal from "@/app/components/CreateOrEditGoal";
import { getGoalById } from "@/app/lib/actions";

export default async function EditGoalPage({ params }: { params: { id: string } }) {
    const resolvedParams = await params; // Resolve the Promise
    const goalId = resolvedParams.id; // Access the resolved `id`
    //console.log("Resolved Params:", resolvedParams);
    const goal = await getGoalById(goalId)
    //convert goal to plan object
    const goalParam = JSON.parse(JSON.stringify(goal))
    //console.log("Goal Param:", goalParam);

  return (
    <CreateOrEditGoal mode="edit" goal={goalParam}/>
  );
}