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