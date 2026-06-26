import asyncHandler from "express-async-handler";
import Team from "../models/Team.js";

// @desc : Get the speaker Data
// @route: GET /api/team/:year
// @access : public

export const getTeamByYear = asyncHandler(async (req, res) => {
  const team = await Team.find({ year: req.params.year });
  res.status(200).send(team);
});

export const addTeammate = asyncHandler(async (req, res) => {
  if (!req.body) {
    res.status(400);
  }

  const teammate = await Team.create(req.body);
  res.status(200).send(teammate);
});
export const updateTeammate = asyncHandler(async (req, res) => {
  const teammate = await Team.findById(req.params.id);

  if (!teammate) {
    res.status(404);
    throw new Error("Teammate not found");
  }

  const updatedTeammate = await Team.findByIdAndUpdate(
    req.params.id,
    req.body,
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

  await Team.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: "Teammate removed successfully" });
});

// {
//     "name": "Arjav",
//     "position": "Students' Head",
//     "year": 2023,
//     "photo": "https://media.licdn.com/dms/image/D5603AQGv2NnrrIxSUQ/profile-displayphoto-shrink_800_800/0/1707976353343?e=2147483647&v=beta&t=aV3Hv5NPwP7IminPx2T65j5yIW3M7gQcvMUbK8CFXvs",
//     "vertical": ""

//   }
