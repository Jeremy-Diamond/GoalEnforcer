// Import necessary components from the React Email library
import { Goal } from "@/app/lib/definitions";
import {
  Body,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

// Define the props for the `DailyGoalsReminder` component
interface DailyGoalsReminderProps {
  userName: string; // The name of the user receiving the email
  goal: Goal; // The goal object containing details about the user's goal
}

// Define the `DailyGoalsReminder` component, which generates an email template
export default function DailyGoalsReminder({
  userName,
  goal,
}: DailyGoalsReminderProps) {
  // Construct the URL for the goal details page
  const goalUrl = `https://goal-enforcer.vercel.app/goals/${goal.id}`;

  // Format the goal's deadline or provide a default message if no deadline is set
  const deadline = goal.endDate
    ? new Date(goal.endDate).toLocaleDateString()
    : "No deadline set";

  return (
    // Define the HTML structure of the email
    <Html>
      <Head />
      {/* Email preview text shown in email clients */}
      <Preview>Stay on track with your goal: {goal.title}</Preview>
      <Body
        style={{
          fontFamily: "Helvetica, Arial, sans-serif",
          backgroundColor: "#f9fafb",
          padding: "40px 16px",
        }}
      >
        <Container
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "10px",
            padding: "32px",
            maxWidth: "600px",
            margin: "0 auto",
            boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
          }}
        >
          {/* Header section with a title and motivational message */}
          <Section style={{ marginBottom: "24px", textAlign: "center" }}>
            <Text
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "#111827",
                margin: 0,
              }}
            >
              🎯 Daily Reminder
            </Text>
            <Text
              style={{
                fontSize: "16px",
                color: "#6b7280",
                marginTop: "4px",
              }}
            >
              You’re crushing it, {userName}!
            </Text>
          </Section>

          {/* Section displaying goal details */}
          <Section style={{ marginBottom: "24px" }}>
            {/* Link to the goal details page */}
            <Link
              href={goalUrl}
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#2563eb",
                textDecoration: "none",
                marginBottom: "8px",
                display: "inline-block",
              }}
            >
              Goal: {goal.title}
            </Link>
            {/* Goal description */}
            <Text
              style={{
                fontSize: "16px",
                color: "#374151",
                marginBottom: "4px",
              }}
            >
              {goal.description}
            </Text>
            {/* Goal deadline */}
            <Text style={{ fontSize: "14px", color: "#9ca3af" }}>
              Deadline: <strong>{deadline}</strong>
            </Text>
          </Section>

          {/* Section displaying today's tasks */}
          {goal.tasks?.length ? (
            <Section style={{ marginBottom: "24px" }}>
              <Text
                style={{
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                }}
              >
                Today’s Tasks:
              </Text>
              {/* List of tasks */}
              <ul style={{ paddingLeft: "20px", margin: 0 }}>
                {goal.tasks.map((task, index) => (
                  <li
                    key={index}
                    style={{
                      fontSize: "15px",
                      color: "#374151",
                      marginBottom: "8px",
                    }}
                  >
                    ☐ {task.taskTitle}
                  </li>
                ))}
              </ul>
            </Section>
          ) : (
            // Message if no tasks are added
            <Section style={{ marginBottom: "24px" }}>
              <Text style={{ fontSize: "15px", color: "#6b7280" }}>
                No tasks added yet. Take a minute to set a few actionable steps!
                ✍️
              </Text>
            </Section>
          )}

          {/* Call-to-action button to view the goal */}
          <Section style={{ textAlign: "center", marginBottom: "32px" }}>
            <Link
              href={goalUrl}
              style={{
                backgroundColor: "#1447e6",
                color: "#ffffff",
                padding: "12px 24px",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "bold",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              View Goal
            </Link>
          </Section>

          {/* Motivational message */}
          <Section style={{ textAlign: "center", marginTop: "16px" }}>
            <Text
              style={{
                fontSize: "16px",
                color: "#1447e6",
                fontWeight: "600",
                marginBottom: "8px",
              }}
            >
              You’ve got this 💪 Keep making progress!
            </Text>
            {/* Footer text */}
            <Text style={{ fontSize: "13px", color: "#9ca3af" }}>
              Grindset • Powered by Resend
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
