import mongoose from "mongoose";
import Project from "../models/projectModel.js";

// get projects sorted by category or tech stack

// get all projects
const getProjects = async (req, res) => {
  const projects = await Project.find({}).sort({ createdAt: -1 });

  res.status(200).json(projects);
};

// get a project
const getProject = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "No such workout." });

  const project = await Project.findById(id);

  if (!project) return res.status(400).json({ error: "No project." });

  res.status(200).json(project);
};

// create a project
const createProject = async (req, res) => {
  const { title, category, techStack, roles, content, creator } = req.body;

  try {
    const project = await Project.create({
      title,
      category,
      techStack,
      roles,
      content,
      creator,
    });

    res.status(200).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { getProjects, getProject, createProject };
