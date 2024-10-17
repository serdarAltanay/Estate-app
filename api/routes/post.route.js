import express from "express"
import { verifyToken } from "../middleware/verifyToken.js"
import {
    updatePost,
    getPost, 
    getPosts, 
    deletePost, 
    addPost 
} from "../controllers/post-controller.js"
import { uploadPostImages } from "../lib/multer.js"

const postRouter = express.Router()

postRouter.get("/", getPosts)
postRouter.get("/:id", getPost)
postRouter.post("/", verifyToken, uploadPostImages.array('images', 10), addPost);
postRouter.put("/:id", verifyToken, updatePost)
postRouter.delete("/:id", verifyToken, deletePost);


export default postRouter;