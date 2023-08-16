import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { createTaskSchema } from "../schemas/tasks.schema.js";
import { validateSchema } from "../middlewares/validatorSchema.js";
import {getTask,getTasks,createTask,updateTask,deleteTask,} from "../controllers/tasks.controller.js";


const router = Router();
router.get("/tasks",  authRequired, getTasks);
router.get("/tasks/:id", authRequired, getTask);
router.post("/tasks", authRequired ,validateSchema(createTaskSchema), createTask);
router.put("/tasks/:id",validateSchema(createTaskSchema) , authRequired, updateTask);
router.delete("/tasks/:id",  authRequired, deleteTask);

export default router;
