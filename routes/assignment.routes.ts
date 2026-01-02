import { Router } from "express";
import {
  createAssignment,
  updateAssignmentStatus,
  getPublishedAssignments,
  getTeacherAssignments,
  deleteAssignment
} from "../controllers/assignment.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { roleMiddleware } from "../middleware/role.middleware";
import { validate } from "../middleware/validate.middleware";
import { assignmentSchema } from "../utils/validators";
const router = Router();

router.post("/", authMiddleware, roleMiddleware("teacher"), validate(assignmentSchema),createAssignment);
// Changed publish to generic status update
router.put("/:id/status", authMiddleware, roleMiddleware("teacher"), updateAssignmentStatus);
// New route for teacher dashboard
router.get("/teacher", authMiddleware, roleMiddleware("teacher"), getTeacherAssignments);
router.get("/published", authMiddleware, getPublishedAssignments);
router.delete("/:id", authMiddleware, roleMiddleware("teacher"), deleteAssignment);

export default router;
