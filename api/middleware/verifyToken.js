import jwt from "jsonwebtoken"

export const verifyToken = (req,res,next) => {
    const token = req.cookies.token
    if(!token)  return res.status(401).json({message:"Not authenticated!"})
    
    jwt.verify(token,process.env.JWT_KEY, async (err,payload) =>{
        if(err) return res.status(401).json({message:"token is not valid"})
        req.userId = payload.id
        next()
    })
}