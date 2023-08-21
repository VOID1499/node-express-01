import userModel from "../models/user.model.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createToken } from "../libs/jwt.js";



//register
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


    res.status(200).json({user:userSaved,token:token});
  } catch (error) {
    if(error.code == "11000") return res.status(400).json({error:[`${Object.values(error.keyValue)[0]} no disponible`]})
    res.status(400).json(error);

  }
};

//login

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


//profile
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
