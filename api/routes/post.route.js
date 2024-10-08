import express from "express"
import {verifyToken} from "../middleware/verifyToken.js"
import {updatePost,getPost,getPosts,deletePost,addPost} from "../controllers/post-controller.js"

const postRouter = express.Router()

postRouter.get("/",getPosts)//it works with user id
postRouter.get("/:id",getPost)
postRouter.post("/",verifyToken,addPost)
postRouter.put("/:id",verifyToken,updatePost)
postRouter.delete("/:id", verifyToken, deletePost);


export default postRouter;