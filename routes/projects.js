import express from "express";

import {
  createProject,
  getProjects,
  getProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

const router = express.Router();

// Get all projects
router.get("/", getProjects);

router.get("/:id", getProject);

// Create a project
router.post("/", createProject);

// Edit a project
// router.patch("/:id", updateProject);
router.put("/:id", updateProject);

// Delete a project
router.delete("/:id", deleteProject);

export default router;
