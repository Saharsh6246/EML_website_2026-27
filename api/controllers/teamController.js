import asyncHandler from "express-async-handler";
import Team from "../models/Team.js";
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

export const getAllTeam = asyncHandler(async (req, res) => {
  const team = await Team.find().sort({ year: -1 });
  res.status(200).send(team);
});

export const getTeamByYear = asyncHandler(async (req, res) => {
  const team = await Team.find({ year: req.params.year });
  res.status(200).send(team);
});

export const addTeammate = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Body is null");
  }

  let photoUrl = req.body.photo || "";
  let cloudinaryId = "";

  if (req.file) {
    const result = await streamUpload(req.file.buffer);
    photoUrl = result.secure_url;
    cloudinaryId = result.public_id;
  }

  const payload = {
    ...req.body,
    photo: photoUrl,
    cloudinaryId,
  };

  const teammate = await Team.create(payload);
  res.status(200).send(teammate);
});

export const updateTeammate = asyncHandler(async (req, res) => {
  const teammate = await Team.findById(req.params.id);

  if (!teammate) {
    res.status(404);
    throw new Error("Teammate not found");
  }

  let photoUrl = req.body.photo || teammate.photo;
  let cloudinaryId = teammate.cloudinaryId;

  if (req.file) {
    if (teammate.cloudinaryId && !teammate.cloudinaryId.startsWith("local-")) {
      try { await cloudinary.uploader.destroy(teammate.cloudinaryId); } catch(e){}
    }
    const result = await streamUpload(req.file.buffer);
    photoUrl = result.secure_url;
    cloudinaryId = result.public_id;
  }

  const payload = {
    ...req.body,
    photo: photoUrl,
    cloudinaryId,
  };

  const updatedTeammate = await Team.findByIdAndUpdate(
    req.params.id,
    payload,
    { new: true }
  );

  res.status(200).json(updatedTeammate);
});

export const deleteTeammate = asyncHandler(async (req, res) => {
  const teammate = await Team.findById(req.params.id);

  if (!teammate) {
    res.status(404);
    throw new Error("Teammate not found");
  }

  if (teammate.cloudinaryId && !teammate.cloudinaryId.startsWith("local-")) {
    try { await cloudinary.uploader.destroy(teammate.cloudinaryId); } catch(e){}
  }

  await Team.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Teammate removed successfully" });
});
