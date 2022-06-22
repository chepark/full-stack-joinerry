import express from "express";
import {
  createProject,
  getProjects,
  getProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.get("/", getProjects);

router.get("/:id", getProject);

router.post("/", createProject);

export default router;
