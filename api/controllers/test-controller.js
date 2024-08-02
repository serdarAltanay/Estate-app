import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const shouldBeLoggedIn = async (req,res) => {

    // const token = req.cookies.token
    // if(!token)  return res.status(401).json({message:"Not authenticated!"})
    
    // jwt.verify(token,process.env.JWT_KEY, async (err,payload) =>{
    //     if(err) return res.status(401).json({message:"token is not valid"})
    // })

    // console.log(req.userId)

    res.status(200).json({mssage:"You are authenticated"})
}
export const shouldBeAdmin = async (req,res) => {
    const token = req.cookies.token
    if(!token) return res.status(401).json({message:"Not authenticated"})
    jwt.verify(token,process.env.JWT_KEY,async (err,payload) => {
        if(err) return res.status(401).json({message:"token is not valid"})
        if(!payload.isAdmin) return res.status(403).json({message:"Not authorized!"})
    })
    res.status(200).json({mssage:"You are authenticated"})
}