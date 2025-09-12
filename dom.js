const btnCrearEmpleado = document.getElementById("btnCrearEmpleado");
const formCrearEmpleado = document.getElementById("formCrearEmpleado");
const btnCrearMenu = document.getElementById("btnCrearMenu");
const formCrearMenu = document.getElementById("formCrearMenu");

btnCrearEmpleado.addEventListener("click", () => {
  formCrearEmpleado.classList.toggle("oculto");
});


btnCrearMenu.addEventListener("click", () => {
  formCrearMenu.classList.toggle("oculto");
});


//const contenedor = document.querySelector(".flex-contenedor");


//function crearMenu(img, nombre, precio, descripcion) {
//    return [
//        `<img src="${img}"/>`, // Incluyendo la imagen
//        `<h3>${nombre}</h3>`,
//        `<p>$${precio}</p>`,
//        `<p>${descripcion}</p>`
//    ];
//};

//const menu = crearMenu("img/hamburguesa.jpg","hamburguesa","100","pan y carne");

//contenedor.innerHTML = menu.join("");

