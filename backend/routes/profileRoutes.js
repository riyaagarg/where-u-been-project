import express from 'express'
import { changePassword, getMe, updateProfile } from '../controller/profile-controller1.js'
import protect from '../middleware/user-middleware.js'

const router = express.Router()

router.get('/me',protect, getMe)
router.put('/update', protect, updateProfile)
router.put('/change-password', protect, changePassword)
export default router