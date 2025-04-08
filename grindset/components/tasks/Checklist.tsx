'use client';

import { updateDaily } from "@/app/lib/actions";
import { useTransition } from "react";

type ChecklistProps = {
    tTitle: string;
    goalId: string;
    taskId: string;
    dcId: string;
    //ddate: Date;
    checked: boolean;
}

export default function Checklist ({goalId, taskId, dcId, checked, tTitle}:ChecklistProps) {
    console.log(goalId, taskId, dcId, checked, tTitle);
    const [isPending, startTransition] = useTransition();

    const updateDatabase = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        startTransition(() => {
            updateDaily(goalId, taskId, dcId, isChecked);
        });
    };
    //console.log("goal id: " + goalId);
    //console.log("task id: " + taskId);
    //console.log("check bool: " + checked);
    //console.log("dcID: " + dcId);
    //console.log("task title: " + tTitle);
    //console.log("ischecked " + isChecked);
    return (
        <div className="flex">
            {isPending && <p>Updating...</p>}
            <input 
                type="checkbox"  
                className="mr-4"
                defaultChecked={checked} 
                onChange={updateDatabase}
            />
            <div>{tTitle}</div>
        </div>
    )
}

// onChange={(e) => {

// }}/>