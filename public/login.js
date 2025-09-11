const form = document.querySelector(".login");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const usuario = document.getElementById("usuario").value;
  const contraseña = document.getElementById("contraseña").value;

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ usuario, contraseña })
    });

    const data = await res.json();

    if (res.ok) {
      if (data.rol === "gerente") {
        window.location.href = "gerente.html";
      } else {
        mensaje.textContent = "Rol no reconocido: " + data.rol;
      }
    } else {
      mensaje.textContent = data.mensaje;
    }
  } catch (err) {
    mensaje.textContent = "Error al conectar con el servidor";
  }
});
