import express from "express";
import {
  addTeammate,
  getTeamByYear,
  updateTeammate,
  deleteTeammate,
} from "../controllers/teamController.js";
const router = express.Router();

router.get("/:year", getTeamByYear);
router.post("/", addTeammate);
router.put("/:id", updateTeammate);
router.delete("/:id", deleteTeammate);

export default router;
