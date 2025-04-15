import { getGoalById } from "@/app/lib/actions";
import Checklist from "./Checklist";



type DailyChecklistProps = {
    gid: string;
    ddate:string;
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
  


export default async function DailyChecklist ({gid, ddate}:DailyChecklistProps) {
    
    const goal = await getGoalById(gid);
    if (!goal){
        return <p>Goal not found.</p>
    }
    const tasklist = goal.tasks;
    const gtitle = goal.title || "Untitled Goal"; 

    const selectedDate = new Date(ddate);

    const startDate = new Date(goal.startDate);
    const endDate = new Date(goal.endDate);

    const indaRange = selectedDate >= startDate && selectedDate <= endDate;

    if (indaRange) {

    return (
        <div className="border border-1 rounded-md p-4">
            <h2 className="font-bold text-lg">{gtitle}</h2>
    
            {tasklist.map((task: Task) => {
                const dc = task.dailyCompletion.find((entry: DailyCompletion) => {
                    return new Date(entry.dueDate).toDateString() === selectedDate.toDateString()
                }
            );
    
            const dcId = dc?._id?.toString() ?? "";
            const isChecked = dc?.completed ?? false;
            const taskId = String(task._id);
            // console.log("dc:" + isChecked);
            return (
                <div key={taskId} className="flex items-center mb-2">
                    <Checklist
                        goalId={goal._id.toString()}
                        taskId={taskId}
                        dcId={dcId}
                        tTitle={task.taskTitle}
                        checked={isChecked}
                        selectedDate={selectedDate}
                    />
                </div>
            );
          })}
        </div>
      );
    }  
}
