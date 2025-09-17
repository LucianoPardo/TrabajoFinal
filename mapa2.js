document.addEventListener("DOMContentLoaded", () => {
  const escala = 50;
  let contadorMesas = 1;

  const planoDiv = document.getElementById("plano");
  const medidasDiv = document.getElementById("medidas");
  const iniciarEdicionBtn = document.getElementById("iniciarEdicionBtn");
  const edicionMapaControles = document.getElementById("edicionMapaControles");
  const anchoInput = document.getElementById("anchoInput");
  const largoInput = document.getElementById("largoInput");
  const crearBtn = document.getElementById("crearBtn");
  const botonMesa = document.getElementById("botonMesa");
  const guardarBtn = document.getElementById("guardarBtn");
  const borrarPlanoBtn = document.getElementById("borrarPlanoBtn");

  function habilitarArrastreMesas() {
    $(".mesa").draggable({ containment: "#plano", cursor: "move" });
  }

  function mostrarModoCreacion() {
    medidasDiv.classList.remove("oculto");
    iniciarEdicionBtn.style.display = "none";
    edicionMapaControles.classList.add("oculto");
    planoDiv.style.display = "none";
    planoDiv.innerHTML = "";
  }

  function mostrarModoEdicion() {
    medidasDiv.classList.add("oculto");
    iniciarEdicionBtn.style.display = "none";
    edicionMapaControles.classList.remove("oculto");
    planoDiv.style.display = "block";
    habilitarArrastreMesas();
  }

  function mostrarModoVisualizacion() {
    medidasDiv.classList.add("oculto");
    iniciarEdicionBtn.style.display = "inline-block";
    edicionMapaControles.classList.add("oculto");
    planoDiv.style.display = "block";
    $(".mesa").draggable("disable");
  }

  function crearPlano() {
    const anchoMetros = parseFloat(anchoInput.value);
    const largoMetros = parseFloat(largoInput.value);
    const limite = 50;

    if (
      isNaN(anchoMetros) ||
      isNaN(largoMetros) ||
      anchoMetros <= 0 ||
      largoMetros <= 0 ||
      anchoMetros > limite ||
      largoMetros > limite
    ) {
      alert(`Por favor ingresa valores válidos menores a ${limite}m`);
      return;
    }

    planoDiv.style.width = `${anchoMetros * escala}px`;
    planoDiv.style.height = `${largoMetros * escala}px`;
    planoDiv.innerHTML = "";
    contadorMesas = 1;
    mostrarModoEdicion();
  }

  function agregarMesa() {
    const mesa = document.createElement("div");
    mesa.className = "mesa";
    mesa.textContent = `Mesa ${contadorMesas}`;
    planoDiv.appendChild(mesa);
    contadorMesas++;
    habilitarArrastreMesas();
  }

  function guardarPlano() {
    const mesas = [];
    planoDiv.querySelectorAll(".mesa").forEach((mesa) => {
      mesas.push({
        id: mesa.textContent,
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
    alert("Plano guardado correctamente");
    mostrarModoVisualizacion();
  }

  function cargarPlano() {
    const planoData = localStorage.getItem("planoRestaurante");
    if (planoData) {
      const data = JSON.parse(planoData);
      planoDiv.style.width = data.width;
      planoDiv.style.height = data.height;
      planoDiv.innerHTML = "";
      data.mesas.forEach((mesaData) => {
        const mesa = document.createElement("div");
        mesa.className = "mesa";
        mesa.textContent = mesaData.id;
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

  // Eventos
  crearBtn.addEventListener("click", crearPlano);
  botonMesa.addEventListener("click", agregarMesa);
  guardarBtn.addEventListener("click", guardarPlano);
  borrarPlanoBtn.addEventListener("click", borrarPlano);
  iniciarEdicionBtn.addEventListener("click", mostrarModoEdicion);

  // Cargar plano existente
  if (cargarPlano()) {
    mostrarModoVisualizacion();
  } else {
    mostrarModoCreacion();
  }
});
