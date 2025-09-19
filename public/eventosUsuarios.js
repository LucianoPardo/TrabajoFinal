// Botones
const btnBebidas = document.getElementById("btnBebidas");
const btnComida = document.getElementById("btnComida");
const btnPostres = document.getElementById("btnPostres");
const btnEnsaladas = document.getElementById("btnEnsaladas");

// Secciones
const seccionBebidas = document.getElementById("seccionBebidas");
const seccionComida = document.getElementById("seccionComida");
const seccionPostres = document.getElementById("seccionPostres");
const seccionEnsaladas = document.getElementById("seccionEnsaladas");

const secciones = [seccionBebidas, seccionComida, seccionPostres, seccionEnsaladas];

// Función que muestra/oculta
function toggleSeccion(seccion) {
  // Si la sección ya está visible → se oculta
  if (!seccion.classList.contains("oculto")) {
    seccion.classList.add("oculto");
    return;
  }

  // Ocultar todas primero
  secciones.forEach(s => s.classList.add("oculto"));

  // Mostrar la que corresponde
  seccion.classList.remove("oculto");
}

// Eventos
btnBebidas.addEventListener("click", () => toggleSeccion(seccionBebidas));
btnComida.addEventListener("click", () => toggleSeccion(seccionComida));
btnPostres.addEventListener("click", () => toggleSeccion(seccionPostres));
btnEnsaladas.addEventListener("click", () => toggleSeccion(seccionEnsaladas));
