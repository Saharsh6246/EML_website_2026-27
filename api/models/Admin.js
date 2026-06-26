import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  googleId: String,
});

export default mongoose.model("Admin", AdminSchema);
