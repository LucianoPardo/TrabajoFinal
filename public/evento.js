// Espera a que todo el contenido de la página se cargue primero
document.addEventListener('DOMContentLoaded', () => {

  // 1. Seleccionamos los elementos del HTML con los que vamos a trabajar
  const btnStock = document.getElementById('btnStock');
  const seccionStock = document.getElementById('seccionStock');
  const btnAñadirProducto = document.getElementById('btnAñadirProducto');
  const formularioStock = document.getElementById('formularioStock');

  // 2. Creamos el evento para el botón principal "Stock"
  btnStock.addEventListener('click', (event) => {
    // Detenemos la propagación para que el clic no active el listener del 'document'
    event.stopPropagation();
    // Mostramos la sección de la tabla y el botón de añadir
    seccionStock.classList.remove('oculto');
  });

  // 3. Creamos el evento para el botón "Añadir Producto"
  btnAñadirProducto.addEventListener('click', (event) => {
    // Detenemos la propagación por la misma razón
    event.stopPropagation();
    // Mostramos el formulario para agregar un nuevo producto
    formularioStock.classList.remove('oculto');
  });

  // 4. Creamos un evento general para cerrar todo si se hace clic fuera
  document.addEventListener('click', (event) => {
    // Verificamos si el clic NO fue dentro de la sección de stock
    // Y si el clic TAMPOCO fue en el botón que la abre
    if (!seccionStock.contains(event.target) && event.target !== btnStock) {
      // Si se cumplen las condiciones, ocultamos todo de nuevo
      seccionStock.classList.add('oculto');
      formularioStock.classList.add('oculto');
    }
  });

});