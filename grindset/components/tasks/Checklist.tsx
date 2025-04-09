'use client';

import { updateDaily } from "@/app/lib/actions";
import { useTransition } from "react";

type ChecklistProps = {
    tTitle: string;
    goalId: string;
    taskId: string;
    dcId: string;
    checked: boolean;
}

export default function Checklist ({goalId, taskId, dcId, checked, tTitle}:ChecklistProps) {
    
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
                type="checkbox"  
                className="mr-4"
                defaultChecked={checked} 
                onChange={updateDatabase}
            />
            <div>{tTitle}</div>
        </div>
    )
}
