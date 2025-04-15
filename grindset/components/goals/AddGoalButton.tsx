import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/Button";

export default function AddGoalButton() {
  return (
    <div className="text-white text-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm m-2 cursor-pointer">
      <Link href="/goals/new" >
        <Button >
          <div className="flex  gap-1">
            <PlusIcon className="w-5 h-5"></PlusIcon>
            <p>Add Goal</p>
          </div>
          
      
        </Button>
      </Link>
    </div> 
  );
}




{/* <Button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 m-2 cursor-pointer">
<Link href="/goals/new" className="flex items-center gap-1">
  <PlusIcon className="w-5 h-5"></PlusIcon>
  <p>Add Goal</p>
</Link>
</Button> */}