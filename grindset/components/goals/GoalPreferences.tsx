"use client"; // Indicates that this component is a client-side component

// Import necessary icons and hooks
import { Bell, Clock } from "lucide-react"; // Icons for reminder and deadline settings
import { useState } from "react"; // Hook for managing component state

// Import UI components for layout and form controls
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card"; // Card components for layout
import { Input } from "../../components/ui/Input"; // Input component for text and time inputs
import { Label } from "../../components/ui/Label"; // Label component for form fields
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/Select"; // Select dropdown components
import { Switch } from "../../components/ui/Switch"; // Switch component for toggling options

// Define the structure of the preferences object
interface Preferences {
  reminderFrequency: string; // Frequency of reminders (e.g., daily, weekly)
  deadlineTime: string; // Time of the daily deadline
  receiveEmailReminders: boolean; // Whether email reminders are enabled
  collaborators: string[]; // List of collaborators for the goal
}

// Define the props for the `GoalPreferences` component
interface GoalPreferencesProps {
  goalId: string; // The ID of the goal
  preferences: Preferences; // The initial preferences for the goal
  disabled: boolean; // Whether the form is in a read-only state
}

// Define the `GoalPreferences` component, which manages and displays goal preferences
export function GoalPreferences({
  preferences: initialPreferences,
  disabled = false,
}: GoalPreferencesProps) {
  // State to manage the current preferences
  const [preferences, setPreferences] =
    useState<Preferences>(initialPreferences);

  // Function to handle changes to the switch (e.g., enabling/disabling email reminders)
  const handleSwitchChange = (name: keyof Preferences, checked: boolean) => {
    setPreferences({ ...preferences, [name]: checked });
  };

  // Function to handle changes to the select dropdown or input fields
  const handleSelectChange = (name: keyof Preferences, value: string) => {
    setPreferences({ ...preferences, [name]: value });
  };

  // Log the current preferences for debugging purposes
  console.log(preferences);

  return (
    <div className="space-y-6">
      {/* Reminder Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" /> {/* Reminder icon */}
            <span>Reminder Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Email Reminders Toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-reminders">Email Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Receive email notifications about this goal
              </p>
            </div>
            {/* Render the switch only if the form is not disabled */}
            {disabled ? null : (
              <Switch
                id="email-reminders"
                checked={preferences.receiveEmailReminders}
                onCheckedChange={(checked) =>
                  handleSwitchChange("receiveEmailReminders", checked)
                }
              />
            )}
          </div>

          {/* Reminder Frequency Dropdown */}
          {preferences.receiveEmailReminders && (
            <div className="space-y-2">
              <Label htmlFor="reminder-frequency">Reminder Frequency</Label>
              {disabled ? (
                // Read-only input for disabled state
                <Input
                  id="reminder-frequency"
                  type="text"
                  value={preferences.reminderFrequency}
                  disabled={disabled}
                />
              ) : (
                // Select dropdown for choosing reminder frequency
                <Select
                  value={preferences.reminderFrequency}
                  onValueChange={(value) =>
                    handleSelectChange("reminderFrequency", value)
                  }
                >
                  <SelectTrigger id="reminder-frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deadline Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" /> {/* Deadline icon */}
            <span>Deadline Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Daily Deadline Time Input */}
          <div className="space-y-2">
            <Label htmlFor="deadline-time">Daily Deadline Time</Label>
            <Input
              id="deadline-time"
              type="time"
              value={preferences.deadlineTime}
              onChange={(e) =>
                handleSelectChange("deadlineTime", e.target.value)
              }
              disabled={disabled} // Disable input if the form is read-only
            />
            <p className="text-sm text-muted-foreground">
              Tasks will be considered due by this time each day
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
