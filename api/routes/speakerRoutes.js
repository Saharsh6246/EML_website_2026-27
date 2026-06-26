import express from "express"
const router = express.Router(); 
import { getAllSpeakers, addSpeaker, deleteSpeaker, updateSpeaker } from "../controllers/speakerController.js";

router.get("/", getAllSpeakers)
router.post("/", addSpeaker)
router.put("/:id", updateSpeaker)
router.delete("/:id",deleteSpeaker)



export default router