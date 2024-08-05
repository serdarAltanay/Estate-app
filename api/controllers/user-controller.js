import prisma from "../lib/prisma.js";

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
  
    if (id !== tokenUserId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }
    
    try {
      await prisma.user.delete({
        where: { id },
      });
      res.clearCookie("token").status(200).json({mesage: "deleted Succesfully!"})
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Failed to delete user!" });
    }
  };
  