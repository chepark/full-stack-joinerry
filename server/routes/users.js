import express from "express";

let router = express.Router();

router.get("/current_user", (req, res) => {
  res.send(req.session);
});

router.get("/:id", (req, res) => {
  res.json({ message: "it is working" });
});

// When user liked a project.
router.patch("/:id", (req, res) => {});

export default router;
