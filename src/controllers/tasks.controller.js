import Task from "./../models/task.model.js"

//todas las peticiones tienen añadido el user id que viene del middleware anterior de autenticacion 

//listar tareas del usuario autenticado
export const getTasks = async (req, res) => {
  try {
        const tasks = await Task.find({user:req.user.id}).populate("user")
        res.status(200).json(tasks)
    } catch (error) {
    res.status(500).json({ message: error.message });
    }
};

//buscar tarea
export const getTask = async (req, res) => {
  try {
    const taskFound = await Task.findById(req.params.id);
    if (!taskFound) return res.status(404).json({ message: "Tarea no encontrada" });
    res.status(200).json({taskFound})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//crear tarea
export const createTask = async (req, res) => {
  const {titulo ,descripcion ,fecha} = req.body;
  try {
    const newTask = new Task({ titulo,descripcion,fecha,user:req.user.id });
    await newTask.save();
    res.sendStatus(200);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//actualizar tarea
export const updateTask = async (req, res) => {
    try {
        console.log(req.body)
        const taskUpdated = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if (!taskUpdated) return res.status(404).json({ message: "No se encontro la tarea para actualizar" });
        res.status(200).json({message:"Tarea actualizada"})

    } catch (error) {
        
    }
};

//eliminar tarea
export const deleteTask = async (req, res) => {
    try {
        const taskDeleted = await Task.findByIdAndDelete(req.params.id);
        if (!taskDeleted) return res.status(404).json({ message: "No se encontro la tarea para eliminar" });
        res.status(200).json({message:"Tarea eliminada"})
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};
