const btnCrearEmpleado = document.getElementById("btnCrearEmpleado");
const formCrearEmpleado = document.getElementById("formCrearEmpleado");
const btnCrearMenu = document.getElementById("btnCrearMenu");
const formCrearMenu = document.getElementById("formCrearMenu");
const btnStock = document.getElementById("btnStock");
const formStock = document.getElementById("formStock")

btnCrearEmpleado.addEventListener("click", () => {
  formCrearEmpleado.classList.toggle("oculto");
});


btnCrearMenu.addEventListener("click", () => {
  formCrearMenu.classList.toggle("oculto");
});

btnStock.addEventListener("click", () => {
  formStock.classList.toggle("oculto");
});

