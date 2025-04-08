import { getCurrentUserGoals } from "@/app/lib/actions";
import DailyChecklist from "./DailyChecklist";
import { Button } from "../ui/Button";

type DContainerProps = {
    gdate?:Date;
}

interface DailyCompletion {
    _id: string;
    completed: boolean;
    dueDate: Date;
}

interface Task {
    _id: string;
    taskTitle: string;
    dailyCompletion: DailyCompletion[];
}

interface Goal {
    _id: string;
    title: string;
    tasks: Task[];
}

export default async function DContainer ({gdate = new Date()}: DContainerProps) {
    const todayDate = new Date();
    const viewthedate = gdate;
    const goal = await getCurrentUserGoals();
    let dateMessage = "";
    //console.log("Goals retrieved:", goal); 
    //console.log("Date passed:", gdate);

    if ( viewthedate.toDateString() === todayDate.toDateString()){
        dateMessage = "Today's Goals";
    } else {
        dateMessage = (viewthedate.getMonth() + "/" + viewthedate.getDate() + "/" + viewthedate.getFullYear() + " Goals");
    }
        return (
            <div className="rounded-lg border border-[#2D3748] bg-[#1E2132] text-[#F8FAFC] shadow-md transition-colors p-4">
                {/* upper portion */}
                <div className="mb-4 md:flex md:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-center">{dateMessage}</h2>
                        {/* <p>Your scheduled goals for today</p>  */}
                    </div>
                    <div className="collapse md:visible">
                        <button className="border border-1 border-white rounded-md pl-2 pr-2 mr-1 text-lg">{"<"}</button>
                        <button className="border border-1 border-white rounded-md pl-2 pr-2 text-lg">{">"}</button>
                    </div>
                </div>

                {/* goal task lists */}
                <div className="md:flex ">
                    {goal.map((goal:Goal) => {
                        //console.log("goal data: ", goal);
                        //console.log("goal id:", goal._id.toString());
                        //console.log("gdate", gdate);
                        return (
                        <div key={goal._id.toString()} className="mb-4 md:mr-4"> 
                            <DailyChecklist gid={goal._id.toString()} ddate={gdate.toString()} />
                        </div>
                        );
                    })}
                </div>

            </div>
        )

    //(gdate.getDate() === todayDate.getDate()) && (gdate.getMonth() === todayDate.getMonth()) && (gdate.getFullYear() === todayDate.getFullYear())
}