import userModel from "../models/user.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createToken } from "../libs/jwt.js";

export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    const userSaved = await newUser.save();
    const token = await createToken({ id: userSaved._id });

    res.cookie("token", token);
    res.status(200).json({ message: "Usuario registado!" });
  } catch (error) {
    res.json({message:error})
  }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const userFound = await User.findOne({email})
        if(!userFound) return res.status(400).json({message:"Usuario no encontrado"})
       
        const matchPassword = await bcrypt.compare(password,userFound.password)
        if(!matchPassword) return res.status(400).json({message:"Credenciales no validas"})

        const token = await createToken({ id: userFound._id });

        res.status(200).json({user:userFound,token:token});
      } catch (error) {
        res.status(500).send(error)
      }

};

export const logout = (req, res) => {
    res.cookie("token","",{
        expires:new Date(0)
    })
    res.sendStatus(200);
};


export const profile = async (req,res)=>{

    const userFound = await User.findById(req.user.id)
    if(!userFound) return res.status(400).json({message:"Usuario no encontrado"});

    res.status(200).json({
        username:userFound.username,
        email:userFound.email,
        createdAt:userFound.createdAt,
        updatedAt:userFound.updatedAt
    })
}
