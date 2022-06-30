import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import { config } from "dotenv";
import googleStrategy from "./services/passport.js";

import projectRoutes from "./routes/projects.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auths.js";

config();
googleStrategy(); //passport googleStrategy

const app = express();
app.use(cors()); // Resolve No-Access-Control-Allow origin issue.
app.use(express.json());

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/projects", projectRoutes);
//app.use("/api/users", userRoutes);

app.use("/auth", authRoutes);

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
