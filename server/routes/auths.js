import express from "express";
import passport from "passport";
import { logoutUser } from "../controllers/authController.js";

const router = express.Router();
const authSuccessURL = "http://localhost:3000/success";
const authErrorURL = "http://localhost:3000/error";
const mainPageURL = "http://localhost:3000/";

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

router.get("/logout", logoutUser);

export default router;
