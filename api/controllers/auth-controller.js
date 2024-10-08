import argon2 from 'argon2';
import prisma from '../lib/prisma.js';
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import {upload} from '../lib/multer.js';
dotenv.config()

export const register = (req, res) => {
    upload.single('avatar')(req, res, async (err) => {
      if (err) {
        console.error('Multer error:', err);
        return res.status(500).json({ message: 'File upload error' });
      }
  
      const { username, email, password } = req.body;
      const avatarUrl = req.file ? `/uploads/${req.file.filename}` : null;
  
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

export const login = async (req, res) => {
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
        // secure: true,
        maxAge: age
    }).status(200)
    .json(userInfo)
    console.log(token)
    }catch(err){
        console.log(err)
        res.status(500).json({message:"failed to login"})
    }
    
};

export const logout = (req, res) => {

    res.clearCookie("token").status(200).json({mesage: "Logout Succesfully!"})
    
};
