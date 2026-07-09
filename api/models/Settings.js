import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema(
  {
    brochure_link: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Settings", SettingsSchema);
