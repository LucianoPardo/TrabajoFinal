document.addEventListener('DOMContentLoaded', () => {
    const escala = 50;
    let contadorMesas = 1;

    const planoDiv = document.getElementById("plano");
    const medidasDiv = document.getElementById("medidas");
    const anchoInput = document.getElementById("anchoInput");
    const largoInput = document.getElementById("largoInput");
    const crearBtn = document.getElementById("crearBtn");
    const iniciarEdicionBtn = document.getElementById("iniciarEdicionBtn");
    const edicionMapaControles = document.getElementById("edicionMapaControles");
    const botonMesa = document.getElementById("botonMesa");
    const guardarBtn = document.getElementById("guardarBtn");
    const borrarPlanoBtn = document.getElementById("borrarPlanoBtn");

    function habilitarArrastreMesas() {
        if (window.$ && $.ui) {
            $(".mesa").draggable({ containment: "#plano", cursor: "move" });
        }
    }

    function deshabilitarArrastreMesas() {
        if (window.$ && $.ui) {
            $(".mesa").draggable("disable");
        }
    }

    function mostrarModoCreacion() {
        medidasDiv.style.display = "flex";
        crearBtn.style.display = "inline-block";
        iniciarEdicionBtn.style.display = "none";
        edicionMapaControles.classList.add("oculto");
        planoDiv.style.display = "none";
        planoDiv.innerHTML = "";
        contadorMesas = 1;
    }

    function mostrarModoVisualizacion() {
        medidasDiv.style.display = "none";
        crearBtn.style.display = "none";
        iniciarEdicionBtn.style.display = "inline-block";
        edicionMapaControles.classList.add("oculto");
        planoDiv.style.display = "block";
        deshabilitarArrastreMesas();
    }

    function mostrarModoEdicion() {
        medidasDiv.style.display = "none";
        crearBtn.style.display = "none";
        iniciarEdicionBtn.style.display = "none";
        edicionMapaControles.classList.remove("oculto");
        planoDiv.style.display = "block";
        habilitarArrastreMesas();
    }

    function crearPlano() {
        const anchoMetros = parseFloat(anchoInput.value);
        const largoMetros = parseFloat(largoInput.value);

        if (!anchoMetros || anchoMetros <= 0 || !largoMetros || largoMetros <= 0) {
            alert("Ingresa valores válidos.");
            return;
        }

        planoDiv.style.width = `${anchoMetros * escala}px`;
        planoDiv.style.height = `${largoMetros * escala}px`;
        planoDiv.style.border = "2px solid black";
        planoDiv.style.display = "block";
        planoDiv.innerHTML = "";
        contadorMesas = 1;

        mostrarModoEdicion();
    }

    function agregarMesa() {
        const mesa = document.createElement("div");
        mesa.className = "mesa";
        mesa.textContent = `Mesa ${contadorMesas}`;
        mesa.style.left = "20px";
        mesa.style.top = `${20 + (contadorMesas - 1) * 70}px`;
        planoDiv.appendChild(mesa);
        habilitarArrastreMesas();
        contadorMesas++;
    }

    function guardarPlano() {
        const mesas = [];
        planoDiv.querySelectorAll(".mesa").forEach((mesa) => {
            mesas.push({
                texto: mesa.textContent,
                left: mesa.style.left,
                top: mesa.style.top,
            });
        });

        const planoData = {
            width: planoDiv.style.width,
            height: planoDiv.style.height,
            mesas: mesas,
        };

        localStorage.setItem("planoRestaurante", JSON.stringify(planoData));
        alert("Plano guardado!");
        mostrarModoVisualizacion();
    }

    function cargarPlano() {
        const planoData = localStorage.getItem("planoRestaurante");
        if (planoData) {
            const data = JSON.parse(planoData);
            planoDiv.style.width = data.width;
            planoDiv.style.height = data.height;
            planoDiv.style.border = "2px solid black";
            planoDiv.innerHTML = "";

            data.mesas.forEach((mesaData) => {
                const mesa = document.createElement("div");
                mesa.className = "mesa";
                mesa.textContent = mesaData.texto;
                mesa.style.left = mesaData.left;
                mesa.style.top = mesaData.top;
                planoDiv.appendChild(mesa);
            });
            return true;
        }
        return false;
    }

    function borrarPlano() {
        if (confirm("¿Seguro deseas borrar el plano?")) {
            localStorage.removeItem("planoRestaurante");
            mostrarModoCreacion();
        }
    }

    // Eventos para los botones del mapa
    if (crearBtn) crearBtn.addEventListener("click", crearPlano);
    if (iniciarEdicionBtn) {
        iniciarEdicionBtn.addEventListener('click', (event) => {
            event.stopPropagation();
            edicionMapaControles.classList.toggle('oculto');
            if (!edicionMapaControles.classList.contains('oculto')) {
                habilitarArrastreMesas();
            } else {
                deshabilitarArrastreMesas();
            }
        });
    }
    if (botonMesa) botonMesa.addEventListener("click", agregarMesa);
    if (guardarBtn) guardarBtn.addEventListener("click", guardarPlano);
    if (borrarPlanoBtn) borrarPlanoBtn.addEventListener("click", borrarPlano);

    // Exponer las funciones que eventos.js necesita en el objeto global window.mapa
    window.mapa = {
        cargarPlano,
        mostrarModoEdicion,
        mostrarModoCreacion,
        mostrarModoVisualizacion
    };
});