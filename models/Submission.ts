import mongoose from "mongoose";

const SubmissionSchema = new mongoose.Schema({
  assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment" },
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  answer: String,
  submittedDate: { type: Date, default: Date.now },
  reviewed: { type: Boolean, default: false }
});

export default mongoose.model("Submission", SubmissionSchema);
  