// tabla

const formularioStock = document.querySelector("#formularioStock form");
const tablaBody = document.querySelector("#tablaProductos tbody");

formularioStock.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita que la página se recargue

  // Tomar valores de los inputs
  const stockNombre = document.getElementById("stockNombre").value;
  const stcokPrecio = document.getElementById("stockPrecio").value;
  const stockDescripcion = document.getElementById("stockDescripcion").value;
  const stockCantidad = document.getElementById("stockCantidad").value;

  // Crear una nueva fila
  const fila = document.createElement("tr");

  // Crear celdas y poner los valores
  fila.innerHTML = `
    <td>${stockNombre}</td>
    <td>${stcokPrecio}</td>
    <td>${stockDescripcion}</td>
    <td>${stockCantidad}</td>
  `;

  // Agregar fila a la tabla
  tablaBody.appendChild(fila);

  // Limpiar formulario
  formularioStock.reset();
});
