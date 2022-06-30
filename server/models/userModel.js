import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    authId: { type: String, required: true },
    userName: String,
    profileImage: String,
    email: { type: String, required: true },
    bio: String,
    social: {
      instagram: String,
      twitter: String,
      linkedin: String,
      github: String,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "project" }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "project" }],
    contact: String,
  },
  { timestamp: true }
);

export default mongoose.model("User", userSchema);
