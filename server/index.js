import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import session from "express-session";
import passport from "passport";
import { config } from "dotenv";
import { googleStrategy, passportConfig } from "./services/passport.js";

import User from "./models/userModel.js";
import projectRoutes from "./routes/projects.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auths.js";

config();
googleStrategy(); //passport googleStrategy
passportConfig();

const app = express();
app.use(cors()); // Resolve No-Access-Control-Allow origin issue.
app.use(express.json());

app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/auth", authRoutes);

// routes
app.use("/api/projects", projectRoutes);

app.use("/api/users", userRoutes);

// connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("listening on port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
