import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import "./utils/loadEnv.js";
import {
  googleStrategy,
  githubStrategy,
  passportConfig,
} from "./services/passport.js";

import projectRoutes from "./routes/projects.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auths.js";

googleStrategy();
githubStrategy();
passportConfig();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const port = process.env.PORT || 4000;

app.use(cors({ origin: "https://joinerry.herokuapp.com", credentials: true })); // Resolve No-Access-Control-Allow origin issue.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.COOKIE_KEY,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
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

app.use(express.static(path.join(__dirname, "/client", "/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client", "/build", "index.html"));
});

// connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log("listening on port " + port);
    });
  })
  .catch((error) => {
    console.log(error);
  });
