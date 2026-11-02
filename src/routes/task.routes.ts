
import { Router } from "express";

import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";

const router = Router();

// GET /tasks
router.get("/", getTasks);

// GET /tasks/:id
router.get("/:id", getTaskById);

// POST /tasks
router.post("/", createTask);

// PUT /tasks/:id
router.put("/:id", updateTask);

// DELETE /tasks/:id
router.delete("/:id", deleteTask);

export default router;
