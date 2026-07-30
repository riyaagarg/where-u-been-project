import express from 'express'
import {signUp, logIn } from '../controller/user-auth-controller.js'
import protect from '../middleware/user-middleware.js'
import {uploadPhotoController, getMe, updateProfile, changePassword} from '../controller/profile-controller1.js'


const router = express.Router()

router.post('/signup', signUp)
router.post('/login', logIn)
router.patch('/profile', protect, updateProfile)




export default router;
