import { Router } from "express";
import { submitAssignment, getMySubmission, getAssignmentSubmissions } from "../controllers/submission.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { validate } from "../middleware/validate.middleware";
import { submissionSchema } from "../utils/validators";

const router = Router();

router.post("/", authMiddleware, roleMiddleware("student"),  validate(submissionSchema), submitAssignment);
router.get("/me/:assignmentId", authMiddleware, roleMiddleware("student"), getMySubmission);
router.get("/assignment/:assignmentId", authMiddleware, roleMiddleware("teacher"), getAssignmentSubmissions);

export default router;