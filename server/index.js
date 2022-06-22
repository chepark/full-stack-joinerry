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

app.listen(process.env.PORT, () => {
  console.log("listening on port " + process.env.PORT);
});
