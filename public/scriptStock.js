let productos = [];

document.getElementById("formProducto").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const precio = parseFloat(document.getElementById("precio").value);
  const descripcion = document.getElementById("descripcion").value;
  const cantidad = parseInt(document.getElementById("cantidad").value);

  const producto = { nombre, precio, descripcion, cantidad };
  productos.push(producto);

  alert("Producto agregado con éxito 🎉");
  e.target.reset();
});

document.getElementById("btnMostrar").addEventListener("click", function() {
  const lista = document.getElementById("listaStock");
  lista.innerHTML = "";
  if (productos.length === 0) {
    lista.innerHTML = "<p>No hay productos en stock.</p>";
    return;
  }

  productos.forEach((p, index) => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
      <strong>${p.nombre}</strong><br>
      Precio: $${p.precio}<br>
      Descripción: ${p.descripcion}<br>
      Cantidad: <span id="cantidad-${index}">${p.cantidad}</span>
      <button class="btnStock" onclick="cambiarStock(${index}, 1)">+</button>
      <button class="btnStock" onclick="cambiarStock(${index}, -1)">-</button>
    `;
    lista.appendChild(div);
  });
});

function cambiarStock(index, cambio) {
  productos[index].cantidad += cambio;
  if (productos[index].cantidad < 0) productos[index].cantidad = 0;

  document.getElementById(`cantidad-${index}`).innerText = productos[index].cantidad;
}
