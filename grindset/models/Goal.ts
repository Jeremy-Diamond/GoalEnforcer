import mongoose from "mongoose";
const {models,model} = mongoose;

const dailyCompletion = new mongoose.Schema({
    dayCount: { type: Number},
    dueDate: { type: Date},
    completed: { type: Boolean, default: false }
  });

const TaskSchema = new mongoose.Schema({
  taskTitle: { type: String, required: true },
  dailyCompletion: { type: [dailyCompletion], default: [] }
});

const GoalSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    completed: { type: Boolean, required: true },
    recieveEmailReminders: { type: Boolean, default: false },
    dailyDeadlineTime: { type: String, default: '' },
    reminderFrequency: { type: String, enum: ['daily', 'weekly', 'monthly'], default: '' },
    tasks: { type: [TaskSchema], default: [] }
  },{versionKey: false});

   
export const Goal = models.Goal || model("Goal", GoalSchema);