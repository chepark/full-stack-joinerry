import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import GithubStrategy from "passport-github2";
import mongoose from "mongoose";
import User from "../models/userModel.js";

const passportConfig = () => {
  // generate an identifying token
  passport.serializeUser((user, done) => {
    console.log("serialized done. Printing userId: ", user.id);
    done(null, user.id); // user.id is document id in mongoDB
  });

  // take the token and turn it into a user model
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      if (user) done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};

const googleStrategy = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "https://joinerry.herokuapp.com/auth/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        // check if the user exists.
        const existingUser = await User.findOne({ authId: profile.id });

        if (existingUser) {
          console.log("user exists");
          done(null, existingUser); // first arg for error, second to send userdata.
        } else {
          const newUser = await User.create({
            authId: profile.id,
            userName: profile.displayName,
            email: profile.emails[0].value,
            profileImage: "",
          });
          console.log("user created");
          done(null, newUser);
        }
      }
    )
  );
};

const githubStrategy = () => {
  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "https://joinerry-test.herokuapp.com/auth/github/callback",
        scope: ["user:email"],
      },
      async (accessToken, refreshToken, profile, done) => {
        // check if the user exists.
        const existingUser = await User.findOne({ authId: profile.id });
        console.log("profile", profile);
        if (existingUser) {
          console.log("user exists");
          done(null, existingUser);
        } else {
          const newUser = await User.create({
            authId: profile.id,
            userName: profile.displayName,
            email: profile.emails[0].value,
            profileImage: "",
          });
          done(null, newUser);
        }
      }
    )
  );
};

export { googleStrategy, githubStrategy, passportConfig };
