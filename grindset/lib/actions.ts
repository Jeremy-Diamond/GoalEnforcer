'use server';
import { Goal}  from "../models/Goal";
import dbConnect from "./mongodb";
import { currentUser } from '@clerk/nextjs/server'



export async function createGoal(formData: FormData) {
    try {
        const data = Object.fromEntries(formData.entries());
        dbConnect();
        const result = await Goal.insertOne(data);
        return result.acknowledged;
    } catch (error) {
        console.error("An error occurred while creating a goal", error);
        return null;
    }
}

export async function getCurrentUserGoals() {
    const user = await currentUser();
    console.log("Current User:", user);
    try {
        await dbConnect();
        const goals = await Goal.find({ userId: user?.id }).exec();
        return goals;
    } catch (error) {
        console.error("An error occurred while getting all goals", error);
        return [];
    }
}

// get goal by id

export async function getGoalById(id: string) {
    try {
        await dbConnect();
        const goal = await Goal.findById(id).exec();
        return goal;
    } catch (error) {
        console.error("An error occurred while getting the goal", error);
        return null;
    }
}

