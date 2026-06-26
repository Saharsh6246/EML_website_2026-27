import asyncHandler from "express-async-handler";
import Speaker from "../models/Speaker.js";

export const getAllSpeakers = asyncHandler(async (req, res) => {
  const speakers = await Speaker.find();
  res.status(200).send(speakers);
});

export const addSpeaker = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
  }

  // console.log(req.body);

  const speaker = await Speaker.create(req.body);
  res.status(200).send(speaker);
  // res.status(200);
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

  const updatedSpeaker = await Speaker.findByIdAndUpdate(
    req.params.id,
    { $set: req.body },
    { new: true }
  );

  res.status(200).send(updatedSpeaker);
});

export const deleteSpeaker = asyncHandler(async (req, res) => {
  console.log(req.params.id);
  const speaker = await Speaker.findById(req.params.id);
  if (!speaker) {
    res.status(400);
    throw new Error("Speaker not found");
  }

  await Speaker.findByIdAndDelete(req.params.id);
  res.status(200).json(`${speaker.name} is deleted`);
});


// {
//     "name": "mahesh karhale" ,
//     "lecture_title": "this is title",
//     "description": "This is desc",
//     "image": "https://media.licdn.com/dms/image/D5603AQGv2NnrrIxSUQ/profile-displayphoto-shrink_800_800/0/1707976353343?e=2147483647&v=beta&t=aV3Hv5NPwP7IminPx2T65j5yIW3M7gQcvMUbK8CFXvs",
//     "yt_link": "h"
//   }
