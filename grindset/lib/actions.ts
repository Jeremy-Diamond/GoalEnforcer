'use server';
import { z } from "zod";
import clientPromise from "./mongodb";


const goalFormSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(3).max(100),
    description: z.string().min(1).max(500),
});

const CreateGoal = goalFormSchema.omit({ id: true });

export async function createGoal(formData: FormData) {
    try {
        const data = Object.fromEntries(formData.entries());
        const validatedData = CreateGoal.parse(data);
        console.log("Validated Data:", validatedData);
        const MongoClient = await clientPromise;
        const db = MongoClient.db(process.env.MONGODB_DB);
        const collection = db.collection('goals');
        const result = await collection.insertOne(validatedData);
        return {
            acknowledged: result.acknowledged,
            insertedId: result.insertedId.toString(),
        };
    } catch (error) {
        console.error("An error occurred while creating a goal", error);
        return null;
    }
}