// Import the `getCurrentUserGoals` function to fetch the current user's goals
import { getCurrentUserGoals } from "@/app/lib/actions";
// Import the `DailyChecklist` component to render the checklist for each goal
import DailyChecklist from "./DailyChecklist";

// Define the props for the `DContainer` component
type DContainerProps = {
  gdate: Date; // The selected date for displaying tasks
};

// Define the structure of a daily completion recordimport { getCurrentUserGoals } from "@/app/lib/actions";
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
        dateMessage = "Today's Daily Tasks";
    } else {
        dateMessage = ((viewthedate.getMonth() + 1) + "/" + viewthedate.getDate() + "/" + viewthedate.getFullYear() + " Daily Tasks");
    }
        return (
            <div className="rounded-lg border border-[#2D3748] bg-[#1E2132] text-[#F8FAFC] shadow-md transition-colors p-6 max-w-7xl w-full relative">
                {/* upper portion */}
                <div className="mb-4 md:flex ">
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
interface DailyCompletion {
  _id: string; // Unique identifier for the daily completion record
  completed: boolean; // Indicates if the task was completed on the given date
  dueDate: Date; // The due date for the task
}

// Define the structure of a task
interface Task {
  _id: string; // Unique identifier for the task
  taskTitle: string; // Title of the task
  dailyCompletion: DailyCompletion[]; // Array of daily completion records
}

// Define the structure of a goal
interface Goal {
  _id: string; // Unique identifier for the goal
  title: string; // Title of the goal
  tasks: Task[]; // Array of tasks associated with the goal
}

// Define the `DContainer` component, which displays daily tasks for the selected date
export default async function DContainer({ gdate }: DContainerProps) {
  const todayDate = new Date(); // Get today's date
  const viewthedate = gdate; // The date to display tasks for
  const goal = await getCurrentUserGoals(); // Fetch the current user's goals
  let dateMessage = ""; // Message to display the selected date

  // Determine the date message based on whether the selected date is today
  if (viewthedate.toDateString() === todayDate.toDateString()) {
    dateMessage = "Today's Daily Tasks"; // Display "Today's Daily Tasks" if the selected date is today
  } else {
    // Format the selected date as "MM/DD/YYYY Daily Tasks"
    dateMessage = `${viewthedate.getMonth() + 1}/${viewthedate.getDate()}/${viewthedate.getFullYear()} Daily Tasks`;
  }

  return (
    <div className="rounded-lg border border-[#2D3748] bg-[#1E2132] text-[#F8FAFC] shadow-md transition-colors p-6 max-w-7xl w-full relative">
      {/* Upper portion: Display the date message */}
      <div className="mb-4 md:flex">
        <div>
          <h2 className="text-2xl font-bold text-center">{dateMessage}</h2>
          {/* <p>Your scheduled goals for today</p> */}
        </div>
      </div>

      {/* Goal task lists */}
      <div className="md:flex">
        {/* Map over the user's goals and render a `DailyChecklist` for each goal */}
        {goal.map((goal: Goal) => {
          return (
            <div key={goal._id.toString()} className="mb-4 md:mr-4">
              {/* Render the `DailyChecklist` component for the goal */}
              <DailyChecklist
                gid={goal._id.toString()} // Pass the goal ID
                ddate={gdate.toString()} // Pass the selected date
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
