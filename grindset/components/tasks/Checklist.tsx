'use client';

import { updateDaily } from "@/app/lib/actions";
import { useTransition } from "react";
import { useEffect } from "react";

type ChecklistProps = {
    tTitle: string;
    goalId: string;
    taskId: string;
    dcId: string;
    checked: boolean;
    selectedDate: Date;
}

export default function Checklist ({
    goalId, 
    taskId, 
    dcId, 
    checked, 
    tTitle,
    selectedDate
}:ChecklistProps) {
    
    useEffect(() => {
        // This effect runs whenever the selectedDate changes
        console.log("Selected Date changed:", selectedDate);
      }, [selectedDate]);

    const [isPending, startTransition] = useTransition();

    const updateDatabase = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        console.log("ischecked type:", typeof isChecked);
        startTransition(() => {
            updateDaily(goalId, taskId, dcId, isChecked);
        });
    };

    return (
        <div className="flex">
            {isPending && <p>Updating...</p>}
            <input 
                title="updateDatabase"
                type="checkbox"  
                className="mr-4"
                defaultChecked={checked} 
                onChange={updateDatabase}
            />
            <div>{tTitle}</div>
        </div>
    )
}
