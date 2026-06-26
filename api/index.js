import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import teamRoutes from "./routes/teamRoutes.js";
import speakerRoutes from "./routes/speakerRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";

import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use("/api/team", teamRoutes);
app.use("/api/speakers", speakerRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/gallery", galleryRoutes);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongodb");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("Mongodb disconnected");
});
mongoose.connection.on("connected", () => {
  console.log("Mongodb connected");
});

app.get("/", (req, res) => {
  res.send("This is mahesh");
});

app.listen(PORT, () => {
  connect();
  console.log(`Listening on port ${PORT}`);
});
