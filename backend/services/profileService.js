import { findUserById, findUserByIdAndUpdate, findUserByIdWithPassword } from "../repositories/user-repo.js"
import bcrypt, { hash } from 'bcrypt'

export const getUserProfile = async(userId) =>{
    const user = await findUserById(userId)

    if(!user){
        throw new Error("User not found")
    }
console.log("profile service:", user);
    return user
}

export const updateUserProfile = async(userId, updates)=>{

    const allowedUpdates = {}

    if(updates.name) allowedUpdates.name = updates.name
    if(updates.profileImage) allowedUpdates.profileImage= updates.profileImage
    if(updates.bio) allowedUpdates.bio= updates.bio

    const updatedUser = await findUserByIdAndUpdate(userId, allowedUpdates)

    if(!updatedUser){
        throw new Error("user not found");
        
    }

    return updatedUser

}

export const changeUserPassword = async(userId, oldPassword, newPassword)=>{

    const user = await findUserByIdWithPassword(userId)

    if(!user){
        throw new Error("User not found")
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password)

    if(!isMatch){
        throw new Error("Old password incorrect")
    }

    const hashedPassword = await bcrypt.hash(newPassword,10)

    const updatedUser = await findUserByIdAndUpdate(userId, {password: hashedPassword})

    return updatedUser;
}