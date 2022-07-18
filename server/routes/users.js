import express from "express";
import { isUserAuthenticated } from "../middlewares/authMiddlware.js";
import {
  updateUser,
  getUserPosts,
  getUserLikes,
} from "../controllers/userController.js";
import User from "../models/userModel.js";

let router = express.Router();

router.get("/current_user", isUserAuthenticated, async (req, res) => {
  console.log("current user");
  res.status(200).json(req.user);
});

router.get("/current_user/posts", getUserPosts);

router.get("/current_user/likes", getUserLikes);

router.get("/:id", (req, res) => {
  res.json({ message: "it is working" });
});

// When user liked a project.
router.patch("/:id", updateUser);

export default router;
