import { changeUserPassword, getUserProfile, updateUserProfile } from "../services/profileService.js"

export const getMe = async(req, res)=>{
    try {
        console.log("request", req)
        const user = await getUserProfile(req.id)
    console.log("profile controller", user);
        res.status(200).json({
            success: true,
            message: 'profile fetched successfully',
            user
        })
    } catch (err) {
        res.status(400).json({
            success: false,
            message: err.message,
        
        })
    }

}

export const updateProfile = async(req, res)=>{
    try {
        const updatedUser = await updateUserProfile(req.id, req.body)
        res.status(200).json({
            success: true,
            message: 'User profile updated successfully',
            updatedUser
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message
        })
    }
}

export const changePassword = async(req, res) =>{
    try {
        const {oldPassword, newPassword} = req.body
        const updatedUser = await changeUserPassword(req.id, oldPassword, newPassword)

        res.status(200).json({
            success: true,
            message: "Password updated succesfully",
            updatedUser
        })
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "bass kii hai kya tere"
        })
    }
}
