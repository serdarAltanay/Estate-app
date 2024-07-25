import argon2 from 'argon2';
import prisma from '../lib/prisma.js';

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

export const login = (req, res) => {
    //operations
};

export const logout = (req, res) => {
    //operations
};
