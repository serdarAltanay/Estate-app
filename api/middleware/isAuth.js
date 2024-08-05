import prisma from "../lib/prisma.js";
import argon2 from "argon2";

export const verifyAuth = async (req, res, next) => {
  const { username, password } = req.body;
  
  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // Check if the password is valid
    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to verify credentials!" });
  }
};
