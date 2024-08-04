import express from "express";
import { updateUser } from "../controllers/user-controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const userRouter = express.Router()

userRouter.put("/:id",verifyToken,updateUser)

export default userRouter