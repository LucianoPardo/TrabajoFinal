// tabla

const formStock = document.querySelector("#Stock form");
const tablaBody = document.querySelector("#tablaProductos tbody");

formStock.addEventListener("submit", (e) => {
  e.preventDefault(); // Evita que la página se recargue

  // Tomar valores de los inputs
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const descripcion = document.getElementById("descripcion").value;
  const cantidad = document.getElementById("cantidad").value;

  // Crear una nueva fila
  const fila = document.createElement("tr");

  // Crear celdas y poner los valores
  fila.innerHTML = `
    <td>${nombre}</td>
    <td>${precio}</td>
    <td>${descripcion}</td>
    <td>${cantidad}</td>
  `;

  // Agregar fila a la tabla
  tablaBody.appendChild(fila);

  // Limpiar formulario
  formStock.reset();
});
