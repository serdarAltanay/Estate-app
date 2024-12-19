import express from "express"
import { register, login, logout, forgotPassword, resetPassword } from "../controllers/auth-controller.js"

const auth = express.Router()

auth.post("/register", register)
auth.post("/login", login)
auth.post("/logout", logout)
auth.post("/forgot-password",forgotPassword)
auth.post("/reset-password/:token",resetPassword)


export default auth;