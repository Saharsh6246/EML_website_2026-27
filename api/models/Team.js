import mongoose from "mongoose";

const TeamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    vertical: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Team', TeamSchema);
