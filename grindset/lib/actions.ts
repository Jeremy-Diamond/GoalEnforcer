'use server';
import { Goal}  from "../models/Goal";
import dbConnect from "./mongodb";


export async function createGoal(formData: FormData) {
    try {
        const data = Object.fromEntries(formData.entries());
        console.log("Validated Data:", data);
        dbConnect();
        const result = await Goal.insertOne(data);
        return {
            acknowledged: result.acknowledged,
            insertedId: result.insertedId.toString(),
        };
    } catch (error) {
        console.error("An error occurred while creating a goal", error);
        return null;
    }
}

export async function getAllGoals() {
    try {
        await dbConnect();
        const goals = await Goal.find({}).exec();
        return goals;
    } catch (error) {
        console.error("An error occurred while getting all goals", error);
        return [];
    }
}

