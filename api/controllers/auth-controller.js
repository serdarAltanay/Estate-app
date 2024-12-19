import argon2 from 'argon2';
import crypto from 'crypto';
import { nanoid } from 'nanoid';
import nodemailer from 'nodemailer';
import prisma from '../lib/prisma.js';
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import {uploadAvatar} from '../lib/multer.js';
import asyncHandler from '../middleware/asyncHandler.js';
dotenv.config()

export const register = (req, res) => {
  uploadAvatar.single('avatar')(req, res, async (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(500).json({ message: 'File upload error' });
      }
  
      const { username, email, password } = req.body;
      const avatarUrl = req.file ? `/uploads/avatar/${req.file.filename}` : null;
  
      try {
        // Encrypt the password
        const hashedPassword = await argon2.hash(password);
  
        // Create a new user with Prisma
        await prisma.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
            avatar: avatarUrl, // Save avatar URL to database
          },
        });
  
        res.status(201).json({ message: 'User created successfully' });
      } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Failed to create user!' });
      }
    });
  };

export const login = asyncHandler(async (req, res) => {
    const {username,password} = req.body;
    try {
    // if the user exists:
    const user = await prisma.user.findUnique({
        where:{username}
    })
    if(!user){
        res.status(401).json({message:"Invalid credentials!"})
    }

    //checking password:
    const isPasswwordValid = await argon2.verify(user.password,password);

    if(!isPasswwordValid) return res.status(500).json({message:"Failed to login!"})

    //generaing cookie token and sending to the user
    const age = 1000 * 60 * 60 * 24 ;

    const token = jwt.sign(
        {
            id:user.id,
            isAdmin:user.isAdmin
        },
        process.env.JWT_KEY,
        {
            expiresIn: age
        })

    const{password: userPassword,...userInfo} = user;
    
    res.cookie("token",token,{
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'production' ? false : true,
        maxAge: age
    }).status(200)
    .json(userInfo)
    console.log(token)
    }catch(err){
        console.log(err)
        res.status(500).json({message:"failed to login"})
    }
})

export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({mesage: "Logout Succesfully!"})
};






export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a random token using nanoid
    const token = nanoid(20);

    // Hash the token using Argon2
    const hashedToken = await argon2.hash(token);

    // Update user with reset token and expiry
    await prisma.user.update({
      where: { email },
      data: {
        resetPasswordToken: hashedToken,
        resetPasswordExpires: new Date(Date.now() + 3600000), // 1 hour from now
      },
    });

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_MAIL_PASSWORD, // Replace with the actual or app-specific password
      },
    });

    const mailOptions = {
      to: user.email,
      from: 'passwordreset@yourdomain.com',
      subject: 'Password Reset',
      text: `You are receiving this email because you (or someone else) requested a password reset.\n\n
        Please click on the following link, or paste it into your browser to reset your password:\n\n
        http://localhost:3000/reset-password/${token}\n\n
        If you did not request this, please ignore this email.`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    res.status(500).json({ message: 'Error in processing request', error });
  }
};


export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Find the user with a valid token
    const user = await prisma.user.findUnique({
      resetPasswordExpires: { $gt: Date.now() }, // Ensure the token is not expired
    });

    if (!user) {
      return res.status(400).json({ message: 'Token is invalid or expired' });
    }

    // Verify the token using Argon2
    const isValid = await argon2.verify(user.resetPasswordToken, token);
    if (!isValid) {
      return res.status(400).json({ message: 'Token is invalid or expired' });
    }

    // Update the password
    user.password = password; // Remember to hash this password using Argon2 or bcrypt
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Password successfully reset' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error resetting password', error });
  }
};
