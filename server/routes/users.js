import express from "express";

let router = express.Router();

router.get("/:id", (req, res) => {
  res.json({ message: "it is working" });
});

// When user liked a project.
router.patch("/:id", (req, res) => {});

// When user created a project

export default router;
