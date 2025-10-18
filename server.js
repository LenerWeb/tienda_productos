import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./config/db.js";


// import routes
import productosRoutes from "./routes/productos.js"


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// rutas
app.use("/api/productos", productosRoutes)


// prueba de conexion a la base de datos
app.get("/api/test-db", async (req, res) =>{
    try{
        const[rows] = await pool.query("SELECT NOW() AS fecha");
        res.json({ ok: true, conexion: "exitosa", fecha: rows[0].fecha });
    } catch (err) {
        res.status(500).json({ ok: false, error: err.message });
    }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}` ));