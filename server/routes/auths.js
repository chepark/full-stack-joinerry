import express from "express";
import passport from "passport";

const router = express.Router();
const authSuccessURL = "http://localhost:4000/api/users/current_user";
const authErrorURL = "http://localhost:4000/auth/google/error";

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
); // Ask permission to Google

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureMessage: "Cannot login with Google. Please try again.",
    failureRedirect: authErrorURL,
    successRedirect: authSuccessURL,
  }),
  (req, res) => {
    console.log("req.session: ", req.session);
  }
); // getting code from Google

export default router;
