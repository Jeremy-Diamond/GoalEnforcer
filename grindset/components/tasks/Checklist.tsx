'use client';

import { updateDaily } from "@/app/lib/actions";
import {  useTransition } from "react";
//import { useEffect } from "react";
import { useRouter } from "next/navigation";
//useState,

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
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    //const [isChecked, setIsChecked] = useState(checked);
    
    //   useEffect(() => {
    //     setIsChecked(checked);
    //   }, [checked]);
    // if (!dcId) {
    //     console.warn("Skipping update: dcId is missing");
    //     return;
    //   }

    const updateDatabase = (e: React.ChangeEvent<HTMLInputElement>) => {
        const isitChecked = e.target.checked;
        //console.log("ischecked type:", typeof isChecked);
        startTransition(() => {
            updateDaily(goalId, taskId, dcId, isitChecked).then(() => {
                router.refresh();
            })
            //setIsChecked(isitChecked);
            
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
                checked={checked} 
                onChange={updateDatabase}
            />
            <div>{tTitle}</div>
        </div>
    )
}
