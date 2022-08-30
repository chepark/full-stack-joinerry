import express from "express";
import User from "../models/userModel.js";
import { isUserAuthenticated } from "../middlewares/authMiddlware.js";
import {
  updateUser,
  getUserPosts,
  getUserLikes,
  deleteUserPost,
  updateUserLikes,
} from "../controllers/userController.js";
import "../utils/loadEnv.js";
import mongoose from "mongoose";
import { GridFsStorage } from "multer-gridfs-storage";
import multer from "multer";
import crypto from "crypto";
import path from "path";

const conn = mongoose.createConnection(process.env.MONGO_URI);

export let gfs;

conn.once("open", () => {
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "profileImages",
  });
});

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename,
          bucketName: "profileImages",
        };
        resolve(fileInfo);
      });
    });
  },
});

const checkFileType = (file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) return cb(null, true);
  cb("filetype");
};

const store = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

const uploadMiddleware = (req, res, next) => {
  const upload = store.single("profileImage");

  upload(req, res, function (err) {
    if (!req.file) return next();

    if (err) {
      if (err === "filetype") return res.status(400).json({ error: err });
    }

    next();
  });
};

let router = express.Router();

router.get("/current_user", isUserAuthenticated, async (req, res) => {
  console.log("current user");

  res.status(200).json(req.user);
});

router.post("/current_user/update", uploadMiddleware, updateUser);

// display profile image in Account Setting page.
router.get("/current_user/profileImage/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).json({ error: "Profile image does not exist." });

  const _id = new mongoose.Types.ObjectId(id);

  gfs.find({ _id }).toArray((err, files) => {
    if (!files || files.length === 0)
      return res.status(400).send("no files exist");
    // if a file exists, send the data
    gfs.openDownloadStream(_id).pipe(res);
  });
});

router.get("/current_user/posts", getUserPosts);

router.delete("/current_user/posts/:id", deleteUserPost);

router.get("/current_user/likes", getUserLikes);

router.get("/:id", (req, res) => {
  res.json({ message: "it is working" });
});

// When user liked a project.
router.patch("/:id", updateUserLikes);

export default router;
