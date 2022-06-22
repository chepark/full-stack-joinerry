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
    return res.status(404).json({ error: "Invalid project id." });

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

// update a project
const updateProject = async (req, res) => {
  const { id } = req.params;
  const dataToUpdate = { ...req.body };

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "Invalid project id." });

  const project = await Project.findOneAndUpdate(
    { _id: id },
    {
      ...dataToUpdate,
    }
  );

  if (!project) return res.status(400).json({ error: "No project to update." });

  res.status(200).json({ project });
};

// delete a project
const deleteProject = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  // check id is valid.
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "Invalid project id." });

  const project = await Project.findOneAndDelete({ _id: id });

  // If project does not exist,
  // return error.
  if (!project) return res.status(400).json({ error: "No project to delete." });

  // send a response
  // if a project is deleted.
  res.status(200).json({ project });
};

export { getProjects, getProject, createProject, updateProject, deleteProject };
