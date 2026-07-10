import asyncHandler from "express-async-handler";
import Speaker from "../models/Speaker.js";
import cloudinary from "../config/cloudinary.js";
import { Readable } from "stream";

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

export const getAllSpeakers = asyncHandler(async (req, res) => {
  const speakers = await Speaker.find().sort({ priority_number: -1 });
  res.status(200).send(speakers);
});

export const addSpeaker = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Body is null");
  }

  let imageUrl = req.body.image || "";
  let cloudinaryId = "";

  if (req.file) {
    const result = await streamUpload(req.file.buffer);
    imageUrl = result.secure_url;
    cloudinaryId = result.public_id;
  }

  const payload = {
    ...req.body,
    image: imageUrl,
    cloudinaryId,
  };

  const speaker = await Speaker.create(payload);
  res.status(200).send(speaker);
});

export const updateSpeaker = asyncHandler(async (req, res) => {
  if (!req.body || !req.params.id) {
    res.status(400);
    throw new Error("Either the body is null or req.params.id is null");
  }

  const speaker = await Speaker.findById(req.params.id);
  if (!speaker) {
    res.status(400);
    throw new Error("Speaker not found");
  }

  let imageUrl = req.body.image || speaker.image;
  let cloudinaryId = speaker.cloudinaryId;

  if (req.file) {
    if (speaker.cloudinaryId && !speaker.cloudinaryId.startsWith("local-")) {
      try { await cloudinary.uploader.destroy(speaker.cloudinaryId); } catch(e){}
    }
    const result = await streamUpload(req.file.buffer);
    imageUrl = result.secure_url;
    cloudinaryId = result.public_id;
  }

  const payload = {
    ...req.body,
    image: imageUrl,
    cloudinaryId,
  };

  const updatedSpeaker = await Speaker.findByIdAndUpdate(
    req.params.id,
    { $set: payload },
    { new: true }
  );

  res.status(200).send(updatedSpeaker);
});

export const deleteSpeaker = asyncHandler(async (req, res) => {
  const speaker = await Speaker.findById(req.params.id);
  if (!speaker) {
    res.status(400);
    throw new Error("Speaker not found");
  }

  if (speaker.cloudinaryId && !speaker.cloudinaryId.startsWith("local-")) {
    try { await cloudinary.uploader.destroy(speaker.cloudinaryId); } catch(e){}
  }

  await Speaker.findByIdAndDelete(req.params.id);
  res.status(200).json(`${speaker.name} is deleted`);
});
