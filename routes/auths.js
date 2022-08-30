import express from "express";
import passport from "passport";
import { logoutUser } from "../controllers/authController.js";

const router = express.Router();
const authSuccessURL = "https://joinerry-test.herokuapp.com/success";
const authErrorURL = "https://joinerry-test.herokuapp.com/error";

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

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["user:email"],
  })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureMessage: "Cannot login with Github. Please try again.",
    failureRedirect: authErrorURL,
    successRedirect: authSuccessURL,
  }),
  (req, res) => {
    console.log("req.session: ", req.session);
  }
);

router.get("/logout", logoutUser);

export default router;
