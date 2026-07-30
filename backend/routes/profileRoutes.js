import express from "express";
import rateLimit from "express-rate-limit";
import protect from "../middleware/user-middleware.js";
import upload from "../middleware/upload-middleware.js";
import { uploadPhotoController, updateProfile, getMe, changePassword } from "../controller/profile-controller1.js";

const router = express.Router();

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many uploads, try again later" },
});

router.get("/me", protect, getMe);

router.patch("/profile", protect, updateProfile); // name / bio / gender

router.patch(
  "/profile/photo",
  protect,
  uploadLimiter,
  upload.single("photo"), 
  (req, res, next) => {
    console.log("=== REACHED CONTROLLER LAYER ===");
    console.log("req.file:", req.file);
    next();
  },
  uploadPhotoController
);

router.put("/change-password", protect, changePassword);

export default router;