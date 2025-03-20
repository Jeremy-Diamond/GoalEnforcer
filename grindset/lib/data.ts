import clientPromise from "./mongodb";
import { Goal } from './definitions';

export async function getAllGoals(): Promise<Goal[]> {
    try {
        //console.log("Getting all goals", clientPromise);
        const MongoClient = await clientPromise;
        //console.log(MongoClient);

        // Check if the environment variable is set
        if (!process.env.MONGODB_DB) {
            throw new Error("MONGODB_DB environment variable is not set");
        }

        const db = MongoClient.db(process.env.MONGODB_DB);
        //console.log("Connected to database", db);
        const collection = db.collection<Goal>('goals');
        const goals = await collection.find({}).toArray();
        //console.log("Returning all goals", goals);
        return goals;
    } catch (error) {
        console.error("An error occurred while getting all goals", error);
        return [];
    }
}