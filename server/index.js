import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { config } from "dotenv";

import { router as projectRoutes } from "./routes/projects.js";

config();

const app = express();

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use(("/api/projects", projectRoutes));

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
