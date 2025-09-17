const escala = 50; 
let contadorMesas = 1;

// Helper para habilitar el arrastre de mesas
function habilitarArrastreMesas() {
    document.querySelectorAll(".mesa").forEach(mesa => {
        if (window.$ && $.ui && $(mesa).draggable) {
            $(mesa).draggable({ containment: "#plano" });
            $(mesa).draggable("enable");
        }
    });
}

// Helper para deshabilitar el arrastre de mesas
function deshabilitarArrastreMesas() {
    document.querySelectorAll(".mesa").forEach(mesa => {
        if (window.$ && $.ui && $(mesa).draggable) {
            $(mesa).draggable("disable");
        }
    });
}

// Muestra los controles para crear un nuevo plano (medidas)
function mostrarModoCreacionInicial() {
    document.getElementById("medidas").style.display = "flex";
    document.getElementById("crearBtn").style.display = "inline-block";
    document.getElementById("iniciarEdicionBtn").style.display = "none"; // Oculta el botón de edición
    document.getElementById("edicionMapaControles").classList.add("oculto"); // Oculta los controles de edición
    document.getElementById("plano").style.display = "none"; // Oculta el plano si estaba visible
    document.getElementById("plano").innerHTML = ""; // Limpia el plano
    deshabilitarArrastreMesas(); // Asegurarse de que no sean arrastrables
    contadorMesas = 1; // Resetear el contador de mesas
}

// Muestra el plano existente y el botón "Editar Plano Existente"
function mostrarModoVisualizacionPlanoExistente() {
    document.getElementById("medidas").style.display = "none";
    document.getElementById("crearBtn").style.display = "none";
    document.getElementById("iniciarEdicionBtn").style.display = "inline-block"; // Muestra el botón de edición
    document.getElementById("edicionMapaControles").classList.add("oculto"); // Oculta los controles de edición
    document.getElementById("plano").style.display = "block"; // Asegura que el plano esté visible
    deshabilitarArrastreMesas(); // Las mesas no deben ser arrastrables en este modo
}

// Activa el modo de edición para un plano ya creado
function activarModoEdicion() {
    document.getElementById("medidas").style.display = "none";
    document.getElementById("crearBtn").style.display = "none";
    document.getElementById("iniciarEdicionBtn").style.display = "none"; // Oculta el botón de "Editar Plano Existente"
    document.getElementById("edicionMapaControles").classList.remove("oculto"); // Muestra los controles de edición
    document.getElementById("plano").style.display = "block";
    habilitarArrastreMesas(); // Las mesas son arrastrables
}


function crearPlano() {
    const anchoMetros = parseFloat(document.getElementById("anchoInput").value);
    const largoMetros = parseFloat(document.getElementById("largoInput").value);

    if (!anchoMetros || anchoMetros <= 0 || !largoMetros || largoMetros <= 0) {
        alert("Ingresa valores válidos.");
        return;
    }

    const anchoPx = Math.round(anchoMetros * escala);
    const largoPx = Math.round(largoMetros * escala);

    const plano = document.getElementById("plano");
    plano.style.width = anchoPx + "px";
    plano.style.height = largoPx + "px";
    plano.style.border = "2px solid black";
    plano.style.display = "block";
    plano.innerHTML = ""; // Limpiar cualquier contenido anterior
    contadorMesas = 1; // Reiniciar contador de mesas

    activarModoEdicion(); // Después de crear el plano, entramos en modo edición
    document.getElementById("botonMesa").style.display = "inline-block"; // Asegura que el botón de añadir mesa esté visible
    document.getElementById("guardarBtn").style.display = "inline-block"; // Asegura que el botón de guardar esté visible
}

function agregarMesa() {
    const plano = document.getElementById("plano");
    const mesa = document.createElement("div");
    mesa.className = "mesa";
    mesa.textContent = "Mesa " + contadorMesas;
    // Posición inicial de la mesa (ajusta según necesites)
    mesa.style.left = "20px";
    mesa.style.top = (20 + (contadorMesas - 1) * 70) + "px"; // Aumentar el espacio inicial
    
    plano.appendChild(mesa);
    habilitarArrastreMesas(); // Asegurarse de que la nueva mesa también sea arrastrable
    contadorMesas++;
}

function guardarPlano() {
    const plano = {
        ancho: document.getElementById("plano").style.width,
        largo: document.getElementById("plano").style.height,
        mesas: []
    };

    document.querySelectorAll(".mesa").forEach(mesa => {
        plano.mesas.push({
            texto: mesa.textContent,
            left: mesa.style.left,
            top: mesa.style.top
        });
    });

    localStorage.setItem("planoRestaurante", JSON.stringify(plano));
    alert("Plano guardado!");
    mostrarModoVisualizacionPlanoExistente(); // Volvemos al modo de visualización después de guardar
}

function cargarPlano() {
    const datos = localStorage.getItem("planoRestaurante");
    if (!datos) return false;

    const plano = JSON.parse(datos);
    const planoDiv = document.getElementById("plano");

    planoDiv.style.width = plano.ancho;
    planoDiv.style.height = plano.largo;
    planoDiv.style.border = "2px solid black";
    planoDiv.style.display = "block";
    planoDiv.innerHTML = ""; // Limpiar contenido antes de cargar

    plano.mesas.forEach(m => {
        const mesa = document.createElement("div");
        mesa.className = "mesa";
        mesa.textContent = m.texto;
        mesa.style.left = m.left;
        mesa.style.top = m.top;
        planoDiv.appendChild(mesa);
    });

    return true;
}

// Función para borrar el plano y volver al inicio
function borrarPlanoYCargarNuevo() {
    localStorage.removeItem("planoRestaurante");
    mostrarModoCreacionInicial();
}

// Eventos
document.getElementById("crearBtn").addEventListener("click", crearPlano);
document.getElementById("botonMesa").addEventListener("click", agregarMesa);
document.getElementById("guardarBtn").addEventListener("click", guardarPlano);
// Listener para el nuevo botón "Editar Plano Existente"
document.getElementById("iniciarEdicionBtn").addEventListener("click", activarModoEdicion); 
// Listener para el nuevo botón "Borrar Plano y Crear Nuevo"
document.getElementById("borrarPlanoBtn").addEventListener("click", borrarPlanoYCargarNuevo);


// Al cargar la página
window.onload = function() {
    const planoExiste = cargarPlano();
    if (planoExiste) {
        mostrarModoVisualizacionPlanoExistente();
    } else {
        mostrarModoCreacionInicial();
    }
};