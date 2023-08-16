import { string, z } from "zod";

export const registerSchema = z.object({
  username: z.string({ required_error: "El nombre de usuario es requeirdo" }).nonempty({message:"El nombre de usuario es requerido"}),
  email: z.string({ required_error: "El email es requerido" }).email({
    message: "Email invalido",
  }),
  password: string().min(6, {
    message: "La contraseña debe contener minimo 6 caracteres",
  }),
});


export const loginSchema = z.object({
    email:z.string({required_error:"El email es requerido"}).email({message:"Email invalido"}),
    password:z.string({required_error:"La contraseña es requerida"}).nonempty({message:"Contraseña requerida"})
})