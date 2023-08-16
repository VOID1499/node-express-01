import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { login ,register ,logout ,profile } from "../controllers/auth.controller.js";
import { registerSchema , loginSchema } from "../schemas/auth.schema.js";
import { validateSchema } from "../middlewares/validatorSchema.js";
const router = Router();

router.post("/register", validateSchema(registerSchema), register)
router.post("/login", validateSchema(loginSchema) ,login)
router.post("/logout", logout)
router.get("/profile", authRequired , profile)




export default router;