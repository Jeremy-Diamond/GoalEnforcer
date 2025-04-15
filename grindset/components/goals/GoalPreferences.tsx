"use client";

import { Bell, Clock } from "lucide-react";
import { useState } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/Card";
import { Input } from "../../components/ui/Input";
import { Label } from "../../components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/Select";
import { Switch } from "../../components/ui/Switch";

interface Preferences {
  reminderFrequency: string;
  deadlineTime: string;
  receiveEmailReminders: boolean;
  collaborators: string[];
}

interface GoalPreferencesProps {
  goalId: string;
  preferences: Preferences;
  disabled: boolean;
}

export function GoalPreferences({
  preferences: initialPreferences,
  disabled = false,
}: GoalPreferencesProps) {
  const [preferences, setPreferences] =
    useState<Preferences>(initialPreferences);

  const handleSwitchChange = (name: keyof Preferences, checked: boolean) => {
    setPreferences({ ...preferences, [name]: checked });
  };

  const handleSelectChange = (name: keyof Preferences, value: string) => {
    setPreferences({ ...preferences, [name]: value });
  };

  console.log(preferences);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <span>Reminder Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-reminders">Email Reminders</Label>
              <p className="text-sm text-muted-foreground">
                Receive email notifications about this goal
              </p>
            </div>
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
          {preferences.receiveEmailReminders && (
            <div className="space-y-2">
              <Label htmlFor="reminder-frequency">Reminder Frequency</Label>

              {disabled ? (
                <Input
                  id="reminder-frequency"
                  type="text"
                  value={preferences.reminderFrequency}
                  disabled={disabled}
                />
              ) : (
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

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <span>Deadline Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="deadline-time">Daily Deadline Time</Label>
            <Input
              id="deadline-time"
              type="time"
              value={preferences.deadlineTime}
              onChange={(e) =>
                handleSelectChange("deadlineTime", e.target.value)
              }
              disabled={disabled}
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
