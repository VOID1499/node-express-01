import mongoose from "mongoose";


export const connectDB = async() =>{
    try {
        const urlDB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.boseul3.mongodb.net/${process.env.DB_NAME}`
        await mongoose.connect(urlDB)
        console.log("Conexion DB realizada")
    } catch (error) {
        console.log(`Error al conectar DB ${error}`)
    }
}