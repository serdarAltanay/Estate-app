import express from "express";
import { updateUser, getUsers, deleteUser, uploadAvatar } from "../controllers/user-controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { verifyAuth } from "../middleware/isAuth.js";

const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.put("/:id", verifyToken, updateUser);
userRouter.post("/delete/:id", verifyToken, verifyAuth, deleteUser);
userRouter.post("/upload-avatar/:id", verifyToken, uploadAvatar);

export default userRouter;
