import { getDailyCompletionId, getGoalById } from "@/app/lib/actions";
import Checklist from "./Checklist";


type DailyChecklistProps = {
    gid: string;
    ddate:string;
}

export default async function DailyChecklist ({gid, ddate}:DailyChecklistProps) {
    
    const goal = await getGoalById(gid);
    if (!goal){
        return <p>Goal not found.</p>
    }
    const tasklist = goal.tasks;
    const gtitle = goal.title || "Untitled Goal"; 
    //const dateBack = new Date(ddate);

    return (
        <div className="border border-1 rounded-md p-4">
            <h2 className="font-bold text-lg">{gtitle}</h2>
    
            {tasklist.map((task: any) => {
                //console.log("Task:", task);
                const dc = task.dailyCompletion.find((entry: any) => {
                    //const entryDate = new Date(entry.dueDate).toDateString();
                    //console.log(entryDate);
                    //console.log((entry.dueDate).toDateString());
                    //console.log(new Date(ddate).toDateString());
                    
                    return new Date(entry.dueDate).toDateString() === new Date(ddate).toDateString()
                    
                
            });
    
            //const dcId = dc && dc._id ? String(dc._id) : null ;
            const dcId = dc?._id?.toString() ?? null;
            const isChecked = dc?.completed;
            const taskId = String(task._id);
            //console.log(dcId);
            //console.log(isChecked);
    
            return (
                <div key={taskId} className="flex items-center mb-2">
                    <Checklist
                        
                        goalId={goal._id.toString()}
                        taskId={taskId}
                        dcId={dcId}
                        tTitle={task.taskTitle}
                        checked={isChecked}
                    />
                </div>
            );
          })}
        </div>
      );

}

// return (
//     entryDate.getFullYear().toString() === dateBack.getFullYear().toString() &&
//     entryDate.getMonth().toString() === dateBack.getMonth().toString() &&
//     entryDate.getDate().toString() === dateBack.getDate().toString()
// );

//return (new Date(entry.dueDate).getDate() === dateBack.getDate()) 

//              return ((new Date(entry.dueDate).getDate() === dateBack.getDate()) && (new Date(entry.dueDate).getMonth() === dateBack.getMonth()) && (new Date(entry.dueDate).getFullYear() === dateBack.getFullYear()));


//key={`${task._id.toString()}-${dcId}`}


// return(
//     <div className="border border-1 rounded-md p-4">
//         <h2 className="font-bold text-lg">{gtitle}</h2>
//         {/* <p className="">{gdesc}</p> */}
//         {tasklist.map((task:any, index:number) => (

            
//             <div key={task._id.toString()} className="flex items-center mb-2">
//                 <input type="checkbox"  className="mr-4" />
//                 <div>{task.taskTitle}</div>
//             </div>
//         ))} 
        
        
//     </div>
// )

/* <Checklist goalId={goal._id} taskId={task._id} } */

//  {taskWithCompletionIds.map((task: any) => (
//     <div key={task._id} className="flex items-center mb-2">
//       <Checklist
//         goalId={gid}
//         taskId={task._id}
//         dcId={task.dcId}
//         tTitle={task.taskTitle}
//         checked={false}
//       />
//     </div>
//   ))}