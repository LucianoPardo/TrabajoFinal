const btnCrearEmpleado = document.getElementById("btnCrearEmpleado");
const formCrearEmpleado = document.getElementById("formCrearEmpleado");
const btnCrearMenu = document.getElementById("btnCrearMenu");
const formCrearMenu = document.getElementById("formCrearMenu");
const btnStock = document.getElementById("btnStock");
const seccionStock = document.getElementById("seccionStock");
const btnAñadirProducto = document.getElementById("btnAñadirProducto");
const formularioStock = document.getElementById("formularioStock");

let abierto = null;

function toggle(form) {
  if (abierto && abierto !== form) abierto.classList.add("oculto");
  form.classList.toggle("oculto");
  abierto = form.classList.contains("oculto") ? null : form;
}

btnCrearEmpleado.onclick = () => toggle(formCrearEmpleado);
btnCrearMenu.onclick = () => toggle(formCrearMenu);
btnStock.onclick = () => toggle(seccionStock);
btnAñadirProducto.onclick = () => toggle(formularioStock);

document.addEventListener("click", e => {
  if (
    abierto &&
    !abierto.contains(e.target) &&         // no clic dentro del formulario abierto
    !e.target.closest("button") &&         // no clic en botones
    !e.target.closest("#seccionStock")     // 👈 permite todo lo que está dentro de la sección stock
  ) {
    abierto.classList.add("oculto");
    abierto = null;
  }
});

