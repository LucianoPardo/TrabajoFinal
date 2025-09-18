const form = document.querySelector(".login");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", async (e) => {
  // 1. Prevenimos que la página se recargue
  e.preventDefault();

  // 2. Obtenemos los valores de los inputs
  const usuario = document.getElementById("usuario").value;
  const contrasenia = document.getElementById("contraseña").value;

  try {
    // 3. Hacemos la petición al servidor
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, contrasenia })
    });

    const data = await res.json();

    // 4. Verificamos si la respuesta del servidor fue exitosa (status 2xx)
    if (res.ok) {
      // Bloque para manejar los diferentes roles
      switch (data.rol) {
        case "gerente":
          window.location.href = "gerente.html"; // Lo dejo como ejemplo
          break;
        case "empleado":
          window.location.href = ""; // Rellenar con el enlace correcto
          break;
        case "usuario":
          window.location.href = "usuario.html"; // Rellenar con el enlace correcto
          break;
        default:
          mensaje.textContent = "Rol no reconocido: " + data.rol;
          break;
      }
    } else {
      // Bloque para manejar los mensajes de error específicos desde el servidor
      if (data.error === "usuario_invalido") {
        mensaje.textContent = "Usuario incorrecto";
      } else if (data.error === "contrasena_invalida") {
        mensaje.textContent = "Contraseña incorrecta";
      } else {
        mensaje.textContent = data.mensaje || "Error en el inicio de sesión";
      }
    }
  } catch (err) {
    // 5. Manejamos errores de conexión
    mensaje.textContent = "Error al conectar con el servidor";
  }
});