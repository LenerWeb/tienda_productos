import { pool } from "../config/db.js";

// obtener todos los productos
export const obtenerProductos = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM productos");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//obtener un producto por ID
export const obtenerProductoPorId = async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM productos WHERE id_producto = ?", [req.params.id]);
        if (rows.length === 0) return res.status(404).json({ mensaje: "Producto no encontrado" });
        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
};

// crear un nuevo producto