import express from "express";
import multer from "multer";
import { getAllSpeakers, addSpeaker, deleteSpeaker, updateSpeaker } from "../controllers/speakerController.js";

const router = express.Router(); 
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", getAllSpeakers);
router.post("/", upload.single('image'), addSpeaker);
router.put("/:id", upload.single('image'), updateSpeaker);
router.delete("/:id", deleteSpeaker);

export default router;