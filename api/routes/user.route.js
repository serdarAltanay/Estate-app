import express from "express";
import { updateUser,getUsers,deleteUser } from "../controllers/user-controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAuth } from "../middleware/isAuth.js";

const userRouter = express.Router()

userRouter.get("/", getUsers);
userRouter.put("/:id", verifyToken, updateUser);
userRouter.post("/delete/:id", verifyToken, verifyAuth, deleteUser);;

export default userRouter