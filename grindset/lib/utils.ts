import { User } from "@clerk/nextjs/server";
import { type ClassValue, clsx } from "clsx";
import schedule from "node-schedule";
import { Resend } from "resend";
import { twMerge } from "tailwind-merge";
import DailyGoalsReminder from "../components/email/EmailTemplate";
import { Goal } from "./definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date, includeTime = false): string {
  const options: Intl.DateTimeFormatOptions = {
    hour: includeTime ? "numeric" : undefined,
    minute: includeTime ? "numeric" : undefined,
    hour12: includeTime ? true : undefined,
  };

  return date.toLocaleString("en-US", options);
}

export function formatTimeToInput(timeString?: string): string {
  if (!timeString) return "";
  const [hours, minutes] = timeString.split(":");
  const formattedHours = hours.padStart(2, "0"); // Add leading zero if needed
  return `${formattedHours}:${minutes}`;
}

export async function sendReminderEmail(user: User) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to send reminder email");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending reminder email:", error);
    throw error;
  }
}

function getCronExpression(
  frequency: "daily" | "weekly" | "monthly",
  hour: number,
  minute: number
) {
  switch (frequency) {
    case "daily":
      return `${minute} ${hour} * * *`; // every day at hour:minute
    case "weekly":
      return `${minute} ${hour} * * 0`; // every Sunday
    case "monthly":
      return `${minute} ${hour} 1 * *`; // 1st of each month
    default:
      throw new Error("Invalid frequency");
  }
}

export async function scheduleEmailReminders(user: User, goal: Goal) {
  try {
    console.log("Scheduling email reminder for user:", user);
    const frequency = goal.reminderFrequency;
    const time = goal.dailyDeadlineTime;
    const goalId = goal.id;
    const resend = new Resend(process.env.RESEND_API_KEY);

    const [hour, minute] = time ? time.split(":").map(Number) : [0, 0];
    const email = user?.emailAddresses[0]?.emailAddress;
    const username = user.firstName;
    const startDate = goal.startDate;
    const endDate = goal.endDate;

    if (!frequency || !["daily", "weekly", "monthly"].includes(frequency)) {
      throw new Error("Invalid or missing reminder frequency");
    }
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
      existingJob.cancel();
    }

    // Schedule the job
    schedule.scheduleJob(
      jobName,
      { start: startDate, end: endDate, rule: cron },
      async function () {
        const { data, error } = await resend.emails.send({
          from: "GrindSet <no-reply@terrymcbrideimages.com>",
          to: [email],
          subject: `Your ${frequency} goal reminder`,
          react: DailyGoalsReminder({
            userName: username || "User",
            goal: goal,
          }),
        });

        if (error) {
          console.error("Email sending error:", error);
        } else {
          console.log("Reminder email sent to:", data);
        }
      }
    );

    return Response.json({ message: "Reminder scheduled successfully." });
  } catch (error) {
    console.error("Error scheduling email reminders:", error);
    throw error;
  }
}
