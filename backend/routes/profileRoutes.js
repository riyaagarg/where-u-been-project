// import express from 'express'
// import { changePassword, getMe, updateProfile } from '../controller/profile-controller1.js'
// import protect from '../middleware/user-middleware.js'

// const router = express.Router()

// router.get('/me',protect, getMe)
// router.put('/update', protect, updateProfile)
// router.put('/change-password', protect, changePassword)
// export default router
import upload from "../middleware/upload-middleware.js";
import express from "express";
import rateLimit from "express-rate-limit";
import  protect  from "../middleware/user-middleware.js";
import  storage  from "../middleware/upload-middleware.js";
import { uploadPhotoController, updateProfile, uploadProfileImage } from "../controller/profile-controller1.js";

const router = express.Router();

const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: "Too many uploads, try again later" },
});

router.patch(
  "/profile/photo",
  protect ,      // req.user.id must exist before the controller/service run
  uploadLimiter,
  uploadProfileImage,  // multer parses multipart, populates req.file
  uploadPhotoController
);
router.patch('/image', protect, upload.single('profileImage'), uploadProfileImage)

export default router;