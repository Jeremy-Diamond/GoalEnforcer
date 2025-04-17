// Import the `mongoose` library for MongoDB interactions
import mongoose, { Connection } from "mongoose";

// Retrieve the MongoDB connection URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI || "";

// Check if the MongoDB URI is defined
if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local" // Throw an error if the URI is missing
  );
}

// Cache the database connection to reuse it across function calls
let cachedDb: Connection | null = null;

// Define the `dbConnect` function to establish a connection to MongoDB
export default async function dbConnect() {
  // If a cached connection exists, return it
  if (cachedDb) {
    return cachedDb;
  }

  // Establish a new connection to MongoDB
  const db = await mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 10000, // Timeout after 10 seconds if the server is unreachable
  });

  // Cache the database connection for future use
  cachedDb = db.connection;

  // Return the database connection
  return db;
}
