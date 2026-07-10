import express from "express";
import multer from "multer";
import {
  addTeammate,
  getTeamByYear,
  updateTeammate,
  deleteTeammate,
  getAllTeam,
} from "../controllers/teamController.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getAllTeam);
router.get("/:year", getTeamByYear);
router.post("/", upload.single('photo'), addTeammate);
router.put("/:id", upload.single('photo'), updateTeammate);
router.delete("/:id", deleteTeammate);

export default router;
