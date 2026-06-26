import Gallery from "../models/Gallery.js";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

// Helper function to upload to cloudinary using streams
const streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (error, result) => {
        if (error) reject(error);
        resolve(result);
      }
    );
    const readableStream = Readable.from(buffer);
    readableStream.pipe(stream);
  });
};

// Upload image
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const result = await streamUpload(req.file.buffer);

    const newImage = new Gallery({
      title: req.body.title || "Untitled",
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
    });

    const savedImage = await newImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all images
export const getAllImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete image
export const deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }

    // Delete from cloudinary
    await cloudinary.uploader.destroy(image.cloudinaryId);

    // Delete from database
    await Gallery.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
