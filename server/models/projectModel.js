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
        },
      ],
      required: true,
    },
    content: { type: String, required: true },
    creator: { type: Schema.Types.ObjectId, ref: "user", required: true },
    startDate: Date,
    endDate: Date,
    contact: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
