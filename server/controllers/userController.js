import mongoose from "mongoose";
import User from "../models/userModel.js";

const updateUser = async (req, res) => {
  const { id } = req.params;
  console.log("REQ", req.body);

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ error: "Invalid user id." });

  const user = await User.findById(id);

  let query = { $set: {} };
  for (let key in req.body) {
    if (user[key] && user[key] !== req.body[key])
      query.$set[key] = req.body[key];
  }

  const updatedField = await User.updateOne({ _id: id }, query);
  if (!updatedField)
    return res.status(400).json({ error: "Error occurs while updating user." });

  const updatedUser = await User.findById(id);
  console.log("UPDATED USER:", updatedUser);
  res.status(200).json({ updatedUser });
};

const addPostToUser = async (project) => {
  return await User.findByIdAndUpdate(project.creator.toString(), {
    $push: { posts: project._id.toString() },
  });
};

const getUserPosts = async (req, res) => {
  const data = await User.findById(req.user._id)
    .select("posts")
    .populate("posts");

  if (!data)
    return res.status(400).json({ error: "Error in getting user posts." });
  res.status(200).json({ posts: data.posts });
};

const getUserLikes = async (req, res) => {
  const data = await User.findById(req.user._id)
    .select("likes")
    .populate("likes");

  if (!data)
    return res.status(400).json({ error: "Error in getting user likes." });
  res.status(200).json({ posts: data.likes });
};

export { updateUser, addPostToUser, getUserPosts, getUserLikes };
