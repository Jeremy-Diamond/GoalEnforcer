import mongoose from "mongoose";
const {models,model} = mongoose;

const TaskDateSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    completed: { type: Boolean, default: false }
  });

const TaskSchema = new mongoose.Schema({
  taskTitle: { type: String, required: true },
  dates: { type: [TaskDateSchema], default: [] }
});

const GoalSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    completed: { type: Boolean, required: true },
    tasks: { type: [TaskSchema], default: [] }
  });

   
export const Goal = models.Goal || model("Goal", GoalSchema);