import { getCurrentUserGoals } from "@/app/lib/actions";



export default async function Goals(){

    const goals = await getCurrentUserGoals();
    console.log("Found Goals:",goals);
    return(
        <div>
            Goals main app page
            <ul>
                {goals.map((goal) => (
                    <li key={goal.id}>{goal.title}</li>
                ))}
            </ul>
        </div>
    );
}