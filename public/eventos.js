document.addEventListener('DOMContentLoaded', () => {
  // --- Selección de todos los elementos ---
  const btnCrearEmpleado = document.getElementById("btnCrearEmpleado");
  const formCrearEmpleado = document.getElementById("formCrearEmpleado");

  const btnCrearMenu = document.getElementById("btnCrearMenu");
  const formCrearMenu = document.getElementById("formCrearMenu");

  const btnStock = document.getElementById("btnStock");
  const seccionStock = document.getElementById("seccionStock");
  
  const btnAñadirProducto = document.getElementById("btnAñadirProducto");
  const formularioStock = document.getElementById("formularioStock");

  const btnMapa = document.getElementById("btnMapa");
  const crearMapa = document.getElementById("crearMapa");

  const btnEdicion = document.getElementById("btnEdicion");
  const edicionMapa = document.getElementById("edicionMapa");


  // Agrupamos los botones principales con sus paneles correspondientes
  const panelesPrincipales = [
    { boton: btnCrearEmpleado, panel: formCrearEmpleado },
    { boton: btnCrearMenu, panel: formCrearMenu },
    { boton: btnStock, panel: seccionStock },
    { boton: btnMapa, panel: crearMapa }
  ];

  // Función para cerrar TODOS los paneles abiertos
  const cerrarTodo = () => {
    panelesPrincipales.forEach(({ panel }) => panel.classList.add('oculto'));
    formularioStock.classList.add('oculto');
  };

  // --- Lógica para los botones principales ---
  panelesPrincipales.forEach(({ boton, panel }) => {
    boton.addEventListener('click', (event) => {
      event.stopPropagation();
      const estabaAbierto = !panel.classList.contains('oculto');
      cerrarTodo();
      if (!estabaAbierto) {
        panel.classList.remove('oculto');
      }
    });
  });

  // --- Lógica especial para el botón anidado "Añadir Producto" ---
  btnAñadirProducto.addEventListener('click', (event) => {
    event.stopPropagation();
    formularioStock.classList.toggle('oculto');
  });

  btnEdicion.addEventListener('click',(event)=>{
    event.stopPropagation();
    edicionMapa.classList.toggle('oculto');
  }) 

  // --- Detector de clics en toda la página (LA PARTE CORREGIDA) ---
  document.addEventListener('click', (event) => {
    // Verificamos si el clic ocurrió DENTRO de alguno de los paneles principales.
    // El método .some() revisa el array y devuelve 'true' si al menos uno cumple la condición.
    // El método .contains() revisa si un elemento (donde se hizo clic) está dentro de otro (el panel).
    const clicDentroDeUnPanel = panelesPrincipales.some(({ panel }) => panel.contains(event.target));

    // Si el clic NO fue dentro de ningún panel, entonces cerramos todo.
    if (!clicDentroDeUnPanel) {
      cerrarTodo();
    }
  });

  // --- Detener propagación en los formularios ---
  // Esta es la segunda parte de la solución: cuando hacemos clic dentro de un formulario,
  // evitamos que ese clic "suba" y sea detectado por otros elementos.
  formCrearEmpleado.addEventListener('click', (event) => event.stopPropagation());
  formCrearMenu.addEventListener('click', (event) => event.stopPropagation());
  seccionStock.addEventListener('click', (event) => event.stopPropagation());
  crearMapa.addEventListener('click', (event) => event.stopPropagation());
});