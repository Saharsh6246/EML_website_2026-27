import asyncHandler from "express-async-handler";
import Settings from "../models/Settings.js";

export const getSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({});
  }
  res.status(200).send(settings);
});

export const updateSettings = asyncHandler(async (req, res) => {
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create(req.body);
  } else {
    settings = await Settings.findOneAndUpdate(
      {},
      { $set: req.body },
      { new: true }
    );
  }
  res.status(200).send(settings);
});
