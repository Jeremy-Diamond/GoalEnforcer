import { getCurrentUserGoals } from "@/app/lib/actions";
import DailyChecklist from "./DailyChecklist";

type DContainerProps = {
    gdate: Date;
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

export default async function DContainer ({gdate }: DContainerProps) {
    const todayDate = new Date();
    const viewthedate = gdate;
    const goal = await getCurrentUserGoals();
    let dateMessage = "";
    //console.log(gdate.toString());
    //console.log(viewthedate.toDateString());
    //console.log(viewthedate.getDay());

    if ( viewthedate.toDateString() === todayDate.toDateString()){
        dateMessage = "Today's Goals";
    } else {
        dateMessage = ((viewthedate.getMonth() + 1) + "/" + viewthedate.getDate() + "/" + viewthedate.getFullYear() + " Goals");
    }
        return (
            <div className="rounded-lg border border-[#2D3748] bg-[#1E2132] text-[#F8FAFC] shadow-md transition-colors p-4">
                {/* upper portion */}
                <div className="mb-4 md:flex md:justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-center">{dateMessage}</h2>
                        {/* <p>Your scheduled goals for today</p>  */}
                    </div>
                </div>

                {/* goal task lists */}
                <div className="md:flex ">
                    {goal.map((goal:Goal) => {
                        return (
                        <div key={goal._id.toString()} className="mb-4 md:mr-4"> 
                            <DailyChecklist gid={goal._id.toString()} ddate={gdate.toString()} />
                        </div>
                        );
                    })}
                </div>

            </div>
        )
}