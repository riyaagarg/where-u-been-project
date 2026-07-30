import { changeUserPassword, getUserProfile, updateUserProfile,  uploadUserPhoto } from "../services/profileService.js"



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


export const uploadPhotoController = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // req.file.path is the Cloudinary URL when using multer-storage-cloudinary
    const updatedUser = await uploadUserPhoto(req.id, req.file.path);

    res.status(200).json({
      userId: updatedUser._id,
      Username: updatedUser.Name,
      ProfileImg: updatedUser.Profileimage,
      Bio: updatedUser.Bio,
      Gender: updatedUser.Gender,
    });
  } catch (err) {
    console.log("UPLOAD ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};
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

// export const uploadProfileImage = async (req, res) => {
//   try {
//     if (!req.file) throw new Error('No image uploaded')
//     const updatedUser = await updateUserProfile(req.id, { Profileimage: req.file.path })
//     res.status(200).json({
//       success: true,
//       message: 'Profile image updated successfully',
//       updatedUser
//     })
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message })
//   }
// }

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
