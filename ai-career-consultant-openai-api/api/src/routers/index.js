import express from "express";

import { AIController } from "../controllers/index.js";

const router = express.Router();

router.get("/ai/questions", AIController.getQuestions);
router.post("/ai/report", AIController.getReport);

export default router;
