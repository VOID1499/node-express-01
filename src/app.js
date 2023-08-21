import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";

const app = express();
dotenv.config();

app.use(morgan("dev"));
app.use(cors({
  origin:'https://task-app-rtam.onrender.com',
  httpOnly:false,
  allowedHeaders:"*"
}))
app.use(
  express.json({
    reviver: (key, value) => {
      if (key == "fecha") return new Date(value);
      return value;
    },
  })
);

app.get("/", (req, res) => {
  res.status(200).send("Hello world!");
});

app.use("/api", authRoutes);
app.use("/api", tasksRoutes);

export default app;
