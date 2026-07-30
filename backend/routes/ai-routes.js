import express from "express";
import protect from "../middleware/user-middleware.js";
import { funFactHandler } from "../controller/ai-controller.js";

const router = express.Router();
router.use(protect); // reuses your existing JWT auth check

router.post('/fun-fact', funFactHandler);

export default router;