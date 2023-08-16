import  { z } from  "zod";

export const createTaskSchema = z.object({

    titulo:z.string().nonempty({message:"El titulo es requerido"}).min(4,{message:"El titulo debe contener 4 caracteres minimo"},),
    descripcion:z.string().nonempty({message:"La descripcion es requerida"}).min(6,{message:"La descripcion debe contener 6 caracteres minimos"}),
    fecha:z.date({invalid_type_error:"Se esperaba un tipo fecha"}).optional()

})