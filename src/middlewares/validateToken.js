import jwt from "jsonwebtoken";

export const authRequired = async (req,res,next) =>{
    const { token } = req.body;
    if(!token) return res.status(401).json({message:"No token, sin autorizacion"})

    jwt.verify(token , process.env.SECRET_KEY,(error,decode)=>{
        if(error) return res.status(401).json({message:"Token no valido"})

       req.user = decode;
       next(); 
    })

}