import { Request, Response, NextFunction } from "express";
import Submission from "../models/Submission";

export const submitAssignment = async (req: any, res: Response, next: NextFunction) => {
  try {
    console.log('submitAssignment', req.body, req.user)
    const existing = await Submission.findOne({ 
        assignmentId: req.body.assignmentId, 
        studentId: req.user.id 
    });
    
    if (existing) {
        return res.status(400).json({ message: "You have already submitted this assignment." });
    }

    const submission = await Submission.create({
      assignmentId: req.body.assignmentId,
      studentId: req.user.id,
      answer: req.body.answer
    });
    res.status(201).json(submission);
  } catch (error) {
    next(error);
  }
};

export const getMySubmission = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { assignmentId } = req.params;
        const submission = await Submission.findOne({ 
            assignmentId, 
            studentId: req.user.id 
        });
        res.json(submission || null); // Return null if not found (frontend handles this)
    } catch (error) {
        next(error);
    }
}

export const getAssignmentSubmissions = async (req: any, res: Response, next: NextFunction) => {
    try {
        const { assignmentId } = req.params;
        const submissions = await Submission.find({ assignmentId }).populate('studentId', 'name email');
        res.json(submissions);
    } catch (error) {
        next(error);
    }
}