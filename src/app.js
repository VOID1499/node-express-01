import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";


const app = express();
dotenv.config();
const allowedOrigins = ['https://void1499.github.io', 'https://void1499.github.io/taskAPP'];
app.use(cors({
    origin:allowedOrigins, //origenes aceptados
    credentials:true, //permite establecer cookies
    //allowedHeaders:"*", //encabezados aceptados
    //methods:["GET","POST","PUT","DELETE","PATCH"]
  }));
  
app.use(morgan("dev"));

app.use(cookieParser());
app.use(express.json({

  reviver: (key, value) => {
    if(key == "fecha") return new Date(value)
    return value
  }

}));


app.get("/",(req,res)=>{
  res.status(200).send("Hello world!")
});

app.use("/api", authRoutes);
app.use("/api", tasksRoutes);

export default app;
