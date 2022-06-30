import express from "express";
import passport from "passport";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
); // Ask permission to Google
router.get("/google/callback", passport.authenticate("google")); // getting code from Google

export default router;
