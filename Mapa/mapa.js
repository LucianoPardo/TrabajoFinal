const escala = 50; 
let contadorMesas = 1;


 window.crearPlano = function () {
    console.log("crearPlano invocado");
    const anchoVal = document.getElementById("anchoInput").value;
    const largoVal = document.getElementById("largoInput").value;

    const anchoMetros = parseFloat(anchoVal);
    const largoMetros = parseFloat(largoVal);

    if (!anchoMetros || anchoMetros <= 0) {
        alert("Por favor ingresa un ancho válido (número mayor que 0).");
        return;
    }
      if (!largoMetros || largoMetros <= 0) {
        alert("Por favor ingresa un largo válido (número mayor que 0).");
        return;
    }

    const anchoPx = Math.round(anchoMetros * escala);
    const largoPx = Math.round(largoMetros * escala);

    const plano = document.getElementById("plano");
    plano.style.width = anchoPx + "px";
    plano.style.height = largoPx + "px";
    plano.style.border = "2px solid black";
    plano.style.display = "block";

    plano.style.marginLeft = "auto";
    plano.style.marginRight = "auto";

    plano.innerHTML = "";
    contadorMesas = 1;

    document.getElementById("medidas").style.display = "none";
    document.getElementById("botonMesa").style.display = "inline-block";
};


window.agregarMesa = function () {
    const plano = document.getElementById("plano");
    if (!plano || plano.style.display === "none") {
        alert("Primero crea el plano.");
        return;
    }

    const mesa = document.createElement("div");
    mesa.className = "mesa";
    mesa.textContent = "Mesa " + contadorMesas;

    
    mesa.style.left = "10px";
    mesa.style.top = (10 + (contadorMesas - 1) * 5) + "px";

    plano.appendChild(mesa);

    
    if (window.$ && $.ui && $(mesa).draggable) {
        $(mesa).draggable({
            containment: "#plano"
        });
    } else {
        console.warn("jQuery UI no cargado: draggable no funcionará");
    }

    contadorMesas++;
};


const crearBtn = document.getElementById("crearBtn");
if (crearBtn) crearBtn.addEventListener("click", window.crearPlano);

const botonMesa = document.getElementById("botonMesa");
if (botonMesa) botonMesa.addEventListener("click", window.agregarMesa);