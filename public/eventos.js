const btnCrearEmpleado = document.getElementById("btnCrearEmpleado");
const formCrearEmpleado = document.getElementById("formCrearEmpleado");

const btnCrearMenu = document.getElementById("btnCrearMenu");
const formCrearMenu = document.getElementById("formCrearMenu");

const btnStock = document.getElementById("btnStock");
const seccionStock = document.getElementById("seccionStock");

const btnAñadirProducto = document.getElementById("btnAñadirProducto");
const formularioStock = document.getElementById("formularioStock");

btnCrearEmpleado.addEventListener("click", () => {
  formCrearEmpleado.classList.toggle("oculto");
});


btnCrearMenu.addEventListener("click", () => {
  formCrearMenu.classList.toggle("oculto");
});

btnStock.addEventListener("click", () => {
  seccionStock.classList.toggle("oculto");
});

btnAñadirProducto.addEventListener("click", () => {
  formularioStock.classList.toggle("oculto");
});



