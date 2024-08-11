import prisma from "../lib/prisma.js";
import { upload, deleteFile } from '../lib/multer.js';
import path from "path";
import argon2  from "argon2";


export const updateUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const {username,email} = req.body;
  
    if (id !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
  
    try {
      const updatedUser = await prisma.user.update({
        where: { id },
        data: {
            username,
            email
        }
      });
      res.status(200).json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to update users!" });
    }
  };


  export const getUsers = async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.status(200).json(users);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to get users!" });
    }
  };

  export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
      const user = await prisma.user.findUnique({
        where: { id },
      });
      res.status(200).json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to get user!" });
    }
  };


export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const tokenUserId = req.userId;
    const existingUser = await prisma.user.findUnique({ where: { id } });
    if (id !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
    
    try {
      await prisma.user.delete({
        where: { id },
      });
      const oldAvatar = existingUser.avatar;
      const oldAvatarPath = path.basename(oldAvatar);
      deleteFile(oldAvatarPath);
      res.clearCookie("token").status(200).json({mesage: "deleted Succesfully!"})
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to delete user!" });
    }
  };
  
  export const uploadAvatar = async (req, res) => {
    upload.single('avatar')(req, res, async (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(500).json({ message: 'File upload error' });
      }
  
      const id = req.params.id;
      const file = req.file;
  
      if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }
  
      const avatarUrl = `/uploads/${file.filename}`;
  
      try {
        console.log(`Updating user ${id} with avatar URL: ${avatarUrl}`);
        const updatedUser = await prisma.user.update({
          where: { id },
          data: { avatar: avatarUrl },
        });
        res.status(200).json({ message: 'Avatar uploaded successfully', user: updatedUser });
      } catch (err) {
        console.error('Error updating user avatar:', err);
        res.status(500).json({ message: 'Failed to upload avatar' });
      }
    });
  }

  export const changePasswordNormally = async (req,res) =>{
    const {oldPassword,newPassword} = req.body
    const id = req.params.id
    const user = await prisma.user.findUnique({
      where:{id}
    })

    const isPasswwordValid = await argon2.verify(user.password,oldPassword);
    if(!isPasswwordValid) return res.status(500).json({message:"Failed to verify user!"})

    try{
      const hashedNewPassword = await argon2.hash(newPassword);

      await prisma.user.update({
        where: { id },
        data: {
            password:hashedNewPassword
        }
      });
      res.clearCookie("token").status(200).json({mesage: "password chanced Succesfully!"})
    }catch(err){
      console.log(err);
      res.status(500).json({ message: "Failed to update password!" });
    }
  }
  
  