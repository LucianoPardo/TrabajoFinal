const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde "public"
app.use(express.static(path.join(__dirname, "public")));

// Ruta login
app.post("/login", (req, res) => {
  console.log(req.body); // Ver qué llega
  const { usuario, contraseña } = req.body;

  const data = fs.readFileSync("usuarios.json");
  const usuarios = JSON.parse(data);

  const user = usuarios.find(
    u => u.usuario === usuario && u.contraseña === contraseña
  );

  if (user) {
    res.json({ mensaje: "Login exitoso", rol: user.rol });
  } else {
    res.status(401).json({ mensaje: "Credenciales inválidas" });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
