import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import mongoose from "mongoose";
import User from "../models/userModel.js";

const googleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback",
      },
      async (accessToken, refreshToken, profile) => {
        // check if the user exists.
        const existingUser = await User.findOne({ authId: profile.id });

        if (existingUser) {
          console.log("user exists");
        } else {
          await User.create({
            authId: profile.id,
            userName: profile.displayName,
            email: profile.emails[0].value,
            profileImage: profile.photos[0] ? profile.photos[0].value : "",
          });
        }
      }
    )
  );
};

export default googleStrategy;
