import { getGoalById } from "@/app/lib/actions"
import Subtask from "./Subtask";

interface Task {
    _id: string;
    taskTitle: string;
    
  }

export default async function SubtaskContainer ({gid}: {gid:string}) {

    //const theparams = await params;
    //const goalid = gid;

    // const thegoal = await getGoalById(gid);
    // const goaltasks = thegoal.tasks as Task[];

    // {goaltasks.map((task: Task) => {
    //     const tt = task.taskTitle
    //     console.log(tt);

    

    // return (
    //     <div key={task._id}>
    //         <Subtask tt={tt}/>
    //     </div>
    // );})}

    const thegoal = await getGoalById(gid);
    const goaltasks = thegoal.tasks as Task[];
  
    return (
      <div className="max-w-7xl w-full relative rounded-lg border border-[#2D3748] bg-[#1E2132] text-[#F8FAFC] shadow-md p-6">
        {goaltasks.map((task) => (
          <div key={task._id}>
            <Subtask tt={task.taskTitle} />
          </div>
        ))}
      </div>
    );
}


