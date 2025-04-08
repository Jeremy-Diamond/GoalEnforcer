import { getCurrentUserGoals } from "@/app/lib/actions";
import DailyChecklist from "./DailyChecklist";

type DContainerProps = {
    gdate?:string;
}

export default async function DContainer ({gdate = new Date().toString()}: DContainerProps) {
    let todayDate = new Date();
    let viewthedate = new Date(gdate);
    const goal = await getCurrentUserGoals();

    //console.log("Goals retrieved:", goal); 
    //console.log("Date passed:", gdate);

    if ( viewthedate.toDateString() === todayDate.toDateString()){
        
        return (
            <div>
                {/* upper portion */}
                <div>
                    <div>
                        <h2>Today{"'"}s Goals</h2>
                        <p>Your scheduled goals for today</p> 
                    </div>
                    <div>
                        <button>{"<"}</button>
                        <button>{">"}</button>
                    </div>
                </div>

                {/* goal task lists */}
                <div className="md:flex">
                    {goal.map((goal:any) => {
                        //console.log("goal data: ", goal);
                        //console.log("goal id:", goal._id.toString());
                        //console.log("gdate", gdate);
                        return (
                        <div key={goal._id.toString()} className="mb-4 md:mr-4"> 
                            <DailyChecklist gid={goal._id.toString()} ddate={gdate} />
                        </div>
                        );
                    })}
                </div>

            </div>
        )
    } else {
        return (
            <div>
                {/* {viewMonth + " " + viewDate + " " + viewYear} */}
                <p>Coming soon to a theatre near you</p>
            </div>
        )
    }

    //(gdate.getDate() === todayDate.getDate()) && (gdate.getMonth() === todayDate.getMonth()) && (gdate.getFullYear() === todayDate.getFullYear())
}