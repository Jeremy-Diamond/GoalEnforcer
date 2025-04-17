'use client';

import { updateDaily } from "@/app/lib/actions";
import { useState, useTransition } from "react";
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
    //selectedDate
}:ChecklistProps) {

    // useEffect(() => {
    //     // This effect runs whenever the selectedDate changes
    //     console.log("Selected Date changed:", selectedDate);
    //   }, [selectedDate]);

    const [isPending, startTransition] = useTransition();
    const [isChecked, setIsChecked] = useState(checked);

      useEffect(() => {
        setIsChecked(checked);
      }, [checked]);


    const updateDatabase = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isitChecked = e.target.checked;
        //console.log("ischecked type:", typeof isChecked);
        startTransition(() => {
            updateDaily(goalId, taskId, dcId, isitChecked);
            setIsChecked(!isChecked);
        });
    };

    //console.log("checked" + checked);
    //console.log("ischecked" + isChecked);
    //console.log

    return (
        <div className="flex">
            {isPending && <p>Updating...</p>}
            <input 
                title="updateDatabase"
                type="checkbox"  
                className="mr-4"
                checked={isChecked} 
                onChange={updateDatabase}
            />
            <div>{tTitle}</div>
        </div>
    )
}
