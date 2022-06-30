import mongoose from "mongoose";
import Project from "../models/projectModel.js";

// get projects sorted by category or tech stack

// get all projects
const getProjects = async (req, res) => {
  let query = {};

  // create query object.
  if (req.query.category === "latest" && req.query.tags === "null") query = {};
  else {
    req.query.category !== "latest" && (query.category = req.query.category);
    req.query.tags !== "null" && (query.techStack = { $in: [req.query.tags] });
  }

  // set values to pass them as skip() and limit() arguments.
  const numberOfDocuments = await Project.countDocuments(query).exec();
  const pageNumber = parseInt(req.query.pageNumber);
  const limit = 15;

  const startIndex = (pageNumber - 1) * limit;
  const endIndex = pageNumber * limit;
  let results = {};

  if (endIndex < numberOfDocuments) {
    results.hasMore = {
      page: pageNumber + 1,
      limit: limit,
    };
  }

  results.projects = await Project.find(query).skip(startIndex).limit(limit);
  // .sort({
  //   createdAt: -1,
  // });
  // console.log(results);
  res.status(200).json(results);
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
  //   const { userId } = req.body;

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
