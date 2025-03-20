import { getAllGoals } from "@/app/lib/data";


export default async function Goals(){

    const goals = await getAllGoals();
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