document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica de navegación y paneles principales ---
    const navButtons = document.querySelectorAll('.nav-button');
    const contentSections = document.querySelectorAll('.content-section');
    const formularios = document.querySelectorAll('.cajaFormulario');


    // Muestra la sección inicial
    const initialSection = document.getElementById('usuarios-content');
    if (initialSection) {
        initialSection.classList.remove('oculto');
    }

    const showContent = (targetId) => {
        contentSections.forEach(section => {
            section.classList.add('oculto');
        });
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.remove('oculto');
        }
    };

    // ...código anterior de pruebajs.js...

// ... (código anterior)

// ...código anterior de eventos.js...

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        navButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        const targetId = button.getAttribute('data-target');
        showContent(targetId);
        formularios.forEach(form => form.classList.add('oculto'));

        if (targetId === 'mapa-content') {
            const planoExiste = localStorage.getItem("planoRestaurante");
            if (planoExiste) {
                window.mapa.cargarPlano();
                window.mapa.mostrarModoVisualizacion();
            } else {
                window.mapa.mostrarModoCreacion();
            }
        }
    });
});

// ...el resto de tu código de eventos.js...

// ... (resto del código)

    // --- Alternar botones anidados (sin cambios) ---
    const btnCrearEmpleado = document.getElementById("btnCrearEmpleado");
    const formCrearEmpleado = document.getElementById("formCrearEmpleado");
    btnCrearEmpleado.addEventListener('click', (event) => {
        event.stopPropagation(); // Evita que el clic se propague al documento
        formCrearEmpleado.classList.toggle('oculto');
    });

    const btnCrearMenu = document.getElementById("btnCrearMenu");
    const formCrearMenu = document.getElementById("formCrearMenu");
    btnCrearMenu.addEventListener('click', (event) => {
        event.stopPropagation();
        formCrearMenu.classList.toggle('oculto');
    });

    const btnAñadirProducto = document.getElementById("btnAñadirProducto");
    const formularioStock = document.getElementById("formularioStock");
    btnAñadirProducto.addEventListener('click', (event) => {
        event.stopPropagation();
        formularioStock.classList.toggle('oculto');
    });

 
    // --- Lógica del formulario de Stock (sin cambios) ---
    const formularioStockForm = document.querySelector("#formularioStock form");
    const tablaBody = document.querySelector("#tablaProductos tbody");
    if (formularioStockForm) {
        formularioStockForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const stockNombre = document.getElementById("stockNombre").value;
            const stockPrecio = document.getElementById("stockPrecio").value;
            const stockDescripcion = document.getElementById("stockDescripcion").value;
            const stockCantidad = document.getElementById("stockCantidad").value;

            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${stockNombre}</td>
                <td>${stockPrecio}</td>
                <td>${stockDescripcion}</td>
                <td>${stockCantidad}</td>
            `;

            tablaBody.appendChild(fila);
            formularioStockForm.reset();
        });
    }

    // --- Lógica corregida para cerrar formularios ---
    document.addEventListener('click', (event) => {
        // Cierra todos los formularios si el clic no fue dentro de un formulario ni en un botón de toggle
        const isClickInsideForm = event.target.closest('.cajaFormulario');
        const isToggleButton = event.target.closest('.content-section button');

        if (!isClickInsideForm && !isToggleButton) {
            formularios.forEach(form => form.classList.add('oculto'));
        }
    });

    // Exponer funciones al ámbito global
window.cargarPlano = cargarPlano;
window.mostrarModoEdicion = mostrarModoEdicion;
window.mostrarModoCreacion = mostrarModoCreacion;
window.habilitarArrastreMesas = habilitarArrastreMesas;

});