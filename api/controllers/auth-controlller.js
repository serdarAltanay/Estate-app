import argon2 from 'argon2';
import prisma from '../lib/prisma.js';
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()


export const register = async (req, res) => {
    try {
        // getting request
        const { username, email, password } = req.body;

        //cryptation of password
        const hashedPasssword = await argon2.hash(password);

        //Creating new user with using prisma
        const newUser = await prisma.user.create({
            data: {
                username: username,
                email: email,
                password: hashedPasssword,
            },
        });

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
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
            id:user.id
        },
        process.env.JWT_KEY,
        {
            expiresIn: age
        })

   
    res.cookie("token",token,{
        httpOnly: true,
        // secure: true,
        maxAge: age
    }).status(200)
    .json({message:"Login Succesfully!"})

    }catch(err){
        console.log(err)
        res.status(500).json({message:"failed to login"})
    }
    
};

export const logout = (req, res) => {
    //operations
};
