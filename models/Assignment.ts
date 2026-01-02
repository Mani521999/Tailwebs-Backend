import mongoose from "mongoose";

const AssignmentSchema = new mongoose.Schema(
  {
    teacherId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: String,
    description: String,
    dueDate: Date,
    status: {
      type: String,
      enum: ["Draft", "Published", "Completed"],
      default: "Draft"
    }
  },
  { timestamps: true }
);

export default mongoose.model("Assignment", AssignmentSchema);
