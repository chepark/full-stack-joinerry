import mongoose from "mongoose";

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    techStack: { type: [String], required: true },
    roles: {
      type: [
        {
          role: String,
          number: Number,
          isOpened: Boolean,
          startDate: Date,
          endDate: Date,
        },
      ],
      required: true,
    },
    content: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
