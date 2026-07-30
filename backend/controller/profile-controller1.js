import { changeUserPassword, getUserProfile, updateUserProfile,  uploadUserPhoto } from "../services/profileService.js"
import { fileTypeFromBuffer } from "file-type";
import sharp from "sharp";


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

    // verify actual file content, not the client-supplied mimetype header
    const type = await fileTypeFromBuffer(req.file.buffer);
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!type || !allowed.includes(type.mime)) {
      return res.status(400).json({ message: "Invalid image file" });
    }

    // re-encode to strip any embedded scripts/exif payloads/polyglot tricks
    const filename = `${req.user.id}-${Date.now()}.webp`;
    await sharp(req.file.buffer)
      .resize(512, 512, { fit: "cover" })
      .webp({ quality: 80 })
      .toFile(`uploads/profile-images/${filename}`);

    const updatedUser = await uploadUserPhoto(req.id, filename);

    res.status(200).json({
      userId: updatedUser._id,
      Username: updatedUser.Name,
      ProfileImg: updatedUser.Profileimage,
      Bio: updatedUser.Bio,
      Gender: updatedUser.Gender,
    });
  } catch (err) {
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

export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) throw new Error('No image uploaded')
    const updatedUser = await updateUserProfile(req.id, { Profileimage: req.file.path })
    res.status(200).json({
      success: true,
      message: 'Profile image updated successfully',
      updatedUser
    })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
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
