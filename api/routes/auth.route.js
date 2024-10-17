import express from "express"
import { register, login, logout } from "../controllers/auth-controller.js"

const auth = express.Router()

auth.post("/register", register)
auth.post("/login", login)
auth.post("/logout", logout)

export default auth;