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

interface DailyGoalsReminderProps {
  userName: string;
  goal: Goal;
}

export default function DailyGoalsReminder({
  userName,
  goal,
}: DailyGoalsReminderProps) {
  const goalUrl = `https://goal-enforcer.vercel.app/goals/${goal.id}`;
  const deadline = goal.endDate
    ? new Date(goal.endDate).toLocaleDateString()
    : "No deadline set";

  return (
    <Html>
      <Head />
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
          {/* Header */}
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

          {/* Goal Details */}
          <Section style={{ marginBottom: "24px" }}>
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
            <Text
              style={{
                fontSize: "16px",
                color: "#374151",
                marginBottom: "4px",
              }}
            >
              {goal.description}
            </Text>
            <Text style={{ fontSize: "14px", color: "#9ca3af" }}>
              Deadline: <strong>{deadline}</strong>
            </Text>
          </Section>

          {/* Task List */}
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
            <Section style={{ marginBottom: "24px" }}>
              <Text style={{ fontSize: "15px", color: "#6b7280" }}>
                No tasks added yet. Take a minute to set a few actionable steps!
                ✍️
              </Text>
            </Section>
          )}

          {/* CTA Button */}
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

          {/* Motivation */}
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
            <Text style={{ fontSize: "13px", color: "#9ca3af" }}>
              Grindset • Powered by Resend
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
