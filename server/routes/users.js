import express from "express";
import { isUserAuthenticated } from "../middlewares/authMiddlware.js";
import { updateUser } from "../controllers/userController.js";

let router = express.Router();

router.get("/current_user", isUserAuthenticated, (req, res) => {
  console.log("SESSION??", req.session);
  res.status(200).json(req.user);
});

router.get("/:id", (req, res) => {
  res.json({ message: "it is working" });
});

// When user liked a project.
router.patch("/:id", updateUser);

export default router;
