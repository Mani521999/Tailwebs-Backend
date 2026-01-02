import { Request, Response, NextFunction } from "express";
import Assignment from "../models/Assignment";
import Submission from "../models/Submission";

export const createAssignment = async (req: any, res: Response, next: NextFunction) => {
  try {
    const assignment = await Assignment.create({
      ...req.body,
      teacherId: req.user.id
    });
    res.status(201).json(assignment);
  } catch (error) {
    next(error);
  }
};

// NEW: Update status (Publish OR Complete)
export const updateAssignmentStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.body; // Expecting { status: "Published" } or { status: "Completed" }
    const assignment = await Assignment.findById(req.params.id);

    if (!assignment) return res.status(404).json({ message: "Assignment not found" });

    // Add logic to prevent re-opening completed assignments if needed
    assignment.status = status;
    await assignment.save();
    res.json(assignment);
  } catch (error) {
    next(error);
  }
};

// NEW: Get assignments created by the specific teacher
export const getTeacherAssignments = async (req: any, res: Response, next: NextFunction) => {
  try {
    const assignments = await Assignment.find({ teacherId: req.user.id });
    res.json(assignments);
  } catch (error) {
    next(error);
  }
};

export const getPublishedAssignments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const assignments = await Assignment.find({ status: "Published" }); // Filter properly
    res.json(assignments);
  } catch (error) {
    next(error);
  }
};


export const deleteAssignment = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const assignment = await Assignment.findById(id);

    if (!assignment) {
      return res.status(404).json({ message: "Assignment not found" });
    }
    const ownerId = assignment.teacherId?.toString();

    if (!ownerId || ownerId !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized: You do not own this assignment" });
    }

    if (assignment.status !== "Draft") {
      return res.status(400).json({
        message: "Forbidden: Only assignments in 'Draft' status can be deleted."
      });
    }

    await Assignment.findByIdAndDelete(id);
    await Submission.deleteMany({ assignmentId: id });

    return res.json({ message: "Assignment deleted successfully" });
  } catch (error) {
    next(error);
  }
};