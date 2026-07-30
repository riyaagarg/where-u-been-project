// import { findUserById, findUserByIdAndUpdate, findUserByIdWithPassword } from "../repositories/user-repo.js"
// import bcrypt, { hash } from 'bcrypt'
// import multer from "multer";
// import path from "path";


// export const getUserProfile = async(userId) =>{
//     const user = await findUserById(userId)

//     if(!user){
//         throw new Error("User not found")
//     }
// console.log("profile service:", user);
//     return user
// }

// export const updateUserProfile = async(userId, updates)=>{

//     const allowedUpdates = {}

//     if(updates.Username) allowedUpdates.Name = updates.Name
//     if(updates.ProfileImg) allowedUpdates.Profileimage= updates.ProfileImage
//     if(updates.Bio) allowedUpdates.Bio= updates.Bio

//     const updatedUser = await findUserByIdAndUpdate(userId, allowedUpdates)

//     if(!updatedUser){
//         throw new Error("user not found");
        
//     }

//     return updatedUser

// }

// export const changeUserPassword = async(userId, oldPassword, newPassword)=>{

//     const user = await findUserByIdWithPassword(userId)

//     if(!user){
//         throw new Error("User not found")
//     }

//     const isMatch = await bcrypt.compare(oldPassword, user.Password)

//     if(!isMatch){
//         throw new Error("Old password incorrect")
//     }

//     const hashedPassword = await bcrypt.hash(newPassword,10)

//     const updatedUser = await findUserByIdAndUpdate(userId, {Password: hashedPassword})

//     return updatedUser;
// }
import { findUserById, findUserByIdAndUpdate, findUserByIdWithPassword } from "../repositories/user-repo.js"
import bcrypt from 'bcrypt'
import fs from "fs/promises";

export const getUserProfile = async (userId) => {
    const user = await findUserById(userId)
    if (!user) throw new Error("User not found")
    return user
}

export const updateUserProfile = async (userId, updates) => {
    const allowedUpdates = {}

    if (updates.Username) allowedUpdates.Name = updates.Username
    if (updates.ProfileImg) allowedUpdates.Profileimage = updates.ProfileImg
    if (updates.Bio) allowedUpdates.Bio = updates.Bio
    if (updates.Gender) allowedUpdates.Gender = updates.Gender

    const updatedUser = await findUserByIdAndUpdate(userId, allowedUpdates)
    if (!updatedUser) throw new Error("user not found");

    return updatedUser
}

export const uploadUserPhoto = async (userId, filename) => {
    const user = await findUserById(userId);
    const oldImage = user?.Profileimage;

    const imageUrl = `/uploads/profile-images/${filename}`;
    const updatedUser = await findUserByIdAndUpdate(userId, { Profileimage: imageUrl });
    if (!updatedUser) throw new Error("User not found");

    // clean up the old file, but never delete the schema default
    if (oldImage && oldImage.startsWith("/uploads/profile-images/")) {
        fs.unlink(`.${oldImage}`).catch(() => {}); // ignore if already missing
    }

    return updatedUser;
}

export const changeUserPassword = async (userId, oldPassword, newPassword) => {
    const user = await findUserByIdWithPassword(userId)
    if (!user) throw new Error("User not found")

    const isMatch = await bcrypt.compare(oldPassword, user.Password)
    if (!isMatch) throw new Error("Old password incorrect")

    const hashedPassword = await bcrypt.hash(newPassword, 10)
    return await findUserByIdAndUpdate(userId, { Password: hashedPassword });
}