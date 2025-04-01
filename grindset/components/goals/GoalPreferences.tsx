"use client";

import { Bell, Clock, Users } from "lucide-react";
import { useState } from "react";

import { Button } from "../../components/ui/Button";
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
  emailReminders: boolean;
  reminderFrequency: string;
  deadlineTime: string;
  allowCollaboration: boolean;
  collaborators: string[];
}

interface GoalPreferencesProps {
  goalId: string;
  preferences: Preferences;
}

export function GoalPreferences({
  goalId,
  preferences: initialPreferences,
}: GoalPreferencesProps) {
  const [preferences, setPreferences] =
    useState<Preferences>(initialPreferences);
  const [newCollaborator, setNewCollaborator] = useState("");

  const handleSwitchChange = (name: keyof Preferences, checked: boolean) => {
    setPreferences({ ...preferences, [name]: checked });

    // Here I will save the updated preference to the database
    console.log(`Preference ${name} changed to ${checked} for goal ${goalId}`);
  };

  const handleSelectChange = (name: keyof Preferences, value: string) => {
    setPreferences({ ...preferences, [name]: value });

    // Here I will save the updated preference to the database
    console.log(`Preference ${name} changed to ${value} for goal ${goalId}`);
  };

  const handleAddCollaborator = () => {
    if (
      newCollaborator.trim() &&
      !preferences.collaborators.includes(newCollaborator)
    ) {
      const updatedCollaborators = [
        ...preferences.collaborators,
        newCollaborator,
      ];
      setPreferences({ ...preferences, collaborators: updatedCollaborators });
      setNewCollaborator("");

      // Here I will save the updated preference to the database
      console.log(`Collaborator added to goal ${goalId}:`, newCollaborator);
    }
  };

  const handleRemoveCollaborator = (collaborator: string) => {
    const updatedCollaborators = preferences.collaborators.filter(
      (c) => c !== collaborator
    );
    setPreferences({ ...preferences, collaborators: updatedCollaborators });

    // Here I will save the updated preference to the database
    console.log(`Collaborator removed from goal ${goalId}:`, collaborator);
  };

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
            <Switch
              id="email-reminders"
              checked={preferences.emailReminders}
              onCheckedChange={(checked) =>
                handleSwitchChange("emailReminders", checked)
              }
            />
          </div>

          {preferences.emailReminders && (
            <div className="space-y-2">
              <Label htmlFor="reminder-frequency">Reminder Frequency</Label>
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
            />
            <p className="text-sm text-muted-foreground">
              Tasks will be considered due by this time each day
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span>Collaboration Settings</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="allow-collaboration">Allow Collaboration</Label>
              <p className="text-sm text-muted-foreground">
                Let others view and edit this goal
              </p>
            </div>
            <Switch
              id="allow-collaboration"
              checked={preferences.allowCollaboration}
              onCheckedChange={(checked) =>
                handleSwitchChange("allowCollaboration", checked)
              }
            />
          </div>

          {preferences.allowCollaboration && (
            <div className="space-y-3">
              <div className="flex items-end gap-2">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="collaborator-email">Add Collaborator</Label>
                  <Input
                    id="collaborator-email"
                    type="email"
                    placeholder="Email address"
                    value={newCollaborator}
                    onChange={(e) => setNewCollaborator(e.target.value)}
                  />
                </div>
                <Button onClick={handleAddCollaborator}>Add</Button>
              </div>

              {preferences.collaborators.length > 0 ? (
                <div className="space-y-2">
                  <Label>Collaborators</Label>
                  <div className="rounded-md border">
                    {preferences.collaborators.map((collaborator) => (
                      <div
                        key={collaborator}
                        className="flex items-center justify-between border-b p-3 last:border-0"
                      >
                        <span className="text-sm">{collaborator}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveCollaborator(collaborator)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No collaborators added yet
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Preferences</Button>
      </div>
    </div>
  );
}
