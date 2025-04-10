import { GoalDetails } from "@/app/components/goals/GoalDetails";
import DContainer from "@/app/components/tasks/DContainer";
import { getCurrentUserGoals } from "@/app/lib/actions";
import Link from "next/link";

export default async function Goals({searchParams}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const goals = await getCurrentUserGoals();
  const selectparams = await searchParams;
  const fixparams = new Date(selectparams.date + "T00:00:00");
  //console.log("fixparams:" + fixparams);
  const fix2 = fixparams.setHours(0,0,0,0);
  //console.log("fixparams:" + fix2);
  //const rawDate = selectparams.date;
  //const parsedDate = new Date(`${rawDate}T00:00:00`);
  const selectaDate = new Date(fix2 || new Date().setHours(0,0,0,0)) ;
  //const selectaDate = new Date(selectparams.date || new Date().setHours(0,0,0,0)) ;
  //console.log(selectparams);
  //console.log("Parameters:" + selectaDate);
  //console.log("Found Goals:", goals);
  //testing different goal dates
  //const fakedate = new Date("Sun Apr 06 2025 14:38:36 GMT-0600 (Mountain Daylight Time)")
  
  //put in document to test other dates
  //<DContainer gdate={fakedate} />
  return (
    <div className="flex flex-col items-center justify-start gap-5 mx-4 mb-12 min-h-screen">
      <h1 className="text-3xl font-semibold leading-none tracking-tight text-[#FFFFFF]">
        All Goals
      </h1>
      <ul className="flex flex-col gap-4 w-full">
        {goals.map((goal) => (
          <Link href={`/goals/${goal.id}`} key={goal.id}>
            <GoalDetails goal={goal} />
          </Link>
        ))}
      </ul>
      {/* <DContainer /> */}
      <DContainer gdate={selectaDate} />
    </div>
  );
}
