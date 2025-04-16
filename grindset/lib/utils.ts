// Import necessary modules and utilities
import { User } from "@clerk/nextjs/server"; // User type from Clerk for authentication
import { type ClassValue, clsx } from "clsx"; // Utility for conditional class name merging
import schedule from "node-schedule"; // Library for scheduling jobs
import { Resend } from "resend"; // Library for sending emails
import { twMerge } from "tailwind-merge"; // Utility for merging Tailwind CSS classes
import DailyGoalsReminder from "../components/email/EmailTemplate"; // React component for email template
import { Goal } from "./definitions"; // Goal type definition

// Utility function to merge class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs)); // Merge class names using `clsx` and `twMerge`
}

// Utility function to format a date as a string
export function formatDate(date: Date, includeTime = false): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: includeTime ? "numeric" : undefined, // Include hour if `includeTime` is true
    minute: includeTime ? "numeric" : undefined, // Include minute if `includeTime` is true
    hour12: includeTime ? true : undefined, // Use 12-hour format if `includeTime` is true
  };

  return date.toLocaleString("en-US", options); // Format the date using locale settings
}

// Utility function to format a time string for input fields
export function formatTimeToInput(timeString?: string): string {
  if (!timeString) return ""; // Return an empty string if no time is provided
  const [hours, minutes] = timeString.split(":"); // Split the time string into hours and minutes
  const formattedHours = hours.padStart(2, "0"); // Add leading zero to hours if needed
  return `${formattedHours}:${minutes}`; // Return the formatted time string
}

// Function to send a reminder email via an API
export async function sendReminderEmail(user: User) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/send`, // API endpoint for sending emails
      {
        method: "POST", // HTTP POST method
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify(user), // Send the user data in the request body
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send reminder email"); // Throw an error if the response is not OK
    }

    const data = await response.json(); // Parse the response JSON
    return data; // Return the parsed data
  } catch (error) {
    console.error("Error sending reminder email:", error); // Log the error
    throw error; // Rethrow the error for further handling
  }
}

// Function to generate a cron expression based on frequency and time
function getCronExpression(
  frequency: "daily" | "weekly" | "monthly", // Frequency of the reminder
  hour: number, // Hour of the reminder
  minute: number // Minute of the reminder
) {
  switch (frequency) {
    case "daily":
      return `${minute} ${hour} * * *`; // Every day at hour:minute
    case "weekly":
      return `${minute} ${hour} * * 0`; // Every Sunday at hour:minute
    case "monthly":
      return `${minute} ${hour} 1 * *`; // 1st of each month at hour:minute
    default:
      throw new Error("Invalid frequency"); // Throw an error for invalid frequency
  }
}

// Function to schedule email reminders for a user and goal
export async function scheduleEmailReminders(user: User, goal: Goal) {
  try {
    console.log("Scheduling email reminder for user:", user);

    // Extract necessary details from the goal
    const frequency = goal.reminderFrequency; // Reminder frequency (daily, weekly, monthly)
    const time = goal.dailyDeadlineTime; // Daily deadline time
    const goalId = goal.id; // Goal ID
    const resend = new Resend(process.env.RESEND_API_KEY); // Initialize Resend with API key

    const [hour, minute] = time ? time.split(":").map(Number) : [0, 0]; // Parse time into hour and minute
    const email = user?.emailAddresses[0]?.emailAddress; // Get the user's email address
    const username = user.firstName; // Get the user's first name
    const startDate = goal.startDate; // Start date of the goal
    const endDate = goal.endDate; // End date of the goal

    console.log("Parsed time:", { hour, minute });
    console.log("Scheduling details:", {
      frequency,
      hour,
      minute,
      email,
      username,
      goalId,
      startDate,
      endDate,
    });

    // Validate the frequency
    if (!frequency || !["daily", "weekly", "monthly"].includes(frequency)) {
      throw new Error("Invalid or missing reminder frequency");
    }

    // Generate the cron expression
    const cron = getCronExpression(
      frequency as "daily" | "weekly" | "monthly",
      hour,
      minute
    );

    // Unique job name based on user email and frequency
    const jobName = `${goalId}-${frequency}-reminder`;

    // Cancel existing job if it exists
    const existingJob = schedule.scheduledJobs[jobName];
    if (existingJob) {
      existingJob.cancel(); // Cancel the existing job
    }

    // Schedule the job
    schedule.scheduleJob(
      jobName,
      { start: startDate, end: endDate, rule: cron }, // Job schedule details
      async function () {
        // Send the reminder email
        const { data, error } = await resend.emails.send({
          from: "GrindSet <no-reply@terrymcbrideimages.com>", // Sender email
          to: [email], // Recipient email
          subject: `Your ${frequency} goal reminder`, // Email subject
          react: DailyGoalsReminder({
            userName: username || "User", // User's name or default to "User"
            goal: goal, // Goal details
          }),
        });

        if (error) {
          console.error("Email sending error:", error); // Log email sending errors
        } else {
          console.log("Reminder email sent to:", data); // Log successful email sending
        }
      }
    );

    return Response.json({ message: "Reminder scheduled successfully." }); // Return success response
  } catch (error) {
    console.error("Error scheduling email reminders:", error); // Log scheduling errors
    throw error; // Rethrow the error for further handling
  }
}
