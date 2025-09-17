
const escala = 50; 
let contadorMesas = 1;
const MAX_MESAS = 100;

function crearPlano() {
    const anchoMetros = parseFloat(document.getElementById("anchoInput").value);
    const largoMetros = parseFloat(document.getElementById("largoInput").value);
    const min = 3;
    const max = 50;

    if (!anchoMetros || anchoMetros < min || anchoMetros > max) {
        alert(`El ancho debe estar entre ${min} y ${max} metros.`);
        return;
    }

    if (!largoMetros || largoMetros < min || largoMetros > max) {
        alert(`El largo debe estar entre ${min} y ${max} metros.`);
        return;
    }

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
    plano.innerHTML = "";
    contadorMesas = 1;

    document.getElementById("medidas").style.display = "none";
    document.getElementById("botonMesa").style.display = "inline-block";
    document.getElementById("guardarBtn").style.display = "inline-block";
}

function agregarMesa() {

    if (contadorMesas > MAX_MESAS) {
        alert(`No se pueden agregar más de ${MAX_MESAS} mesas en el plano.`);
        return;
    }

    const plano = document.getElementById("plano");
    const mesa = document.createElement("div");
    mesa.className = "mesa";
    mesa.textContent = "Mesa " + contadorMesas;
    mesa.style.left = "10px";
    mesa.style.top = (10 + (contadorMesas - 1) * 5) + "px";

    plano.appendChild(mesa);

    if (window.$ && $.ui && $(mesa).draggable) {
        $(mesa).draggable({ containment: "#plano" });
    }
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
    mostrarSoloPlano();
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
    planoDiv.innerHTML = "";

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

function mostrarSoloPlano() {
    document.getElementById("medidas").style.display = "none";
    document.getElementById("botonMesa").style.display = "none";
    document.getElementById("guardarBtn").style.display = "none";
    document.getElementById("modificarBtn").style.display = "inline-block";
}

function modoEdicion() {
    localStorage.removeItem("planoRestaurante");
    location.reload();
}

// Eventos
document.getElementById("crearBtn").addEventListener("click", crearPlano);
document.getElementById("botonMesa").addEventListener("click", agregarMesa);
document.getElementById("guardarBtn").addEventListener("click", guardarPlano);
document.getElementById("modificarBtn").addEventListener("click", modoEdicion);

// Al cargar la página
window.onload = function() {
    if (cargarPlano()) {
        mostrarSoloPlano();
    }
};






