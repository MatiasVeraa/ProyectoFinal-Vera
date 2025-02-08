const express = require("express");  
const jwt = require("jsonwebtoken");  
const cors = require("cors");  


const app = express();
app.use(express.json());
app.use(cors());

const SECRET_KEY = "secreto123";

// Usuarios registrados 
const usuarios = [
    { usuario: "admin", password: "123" },
    { usuario: "usuario1", password: "clave123" }
];

// Endpoint para autenticación
app.post("/api/login", (req, res) => {
    const { usuario, password } = req.body;
    const user = usuarios.find(u => u.usuario === usuario && u.password === password);

    if (!user) {
        return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign({ usuario }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ token });
});

// Iniciar el servidor en el puerto 3000
app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));
