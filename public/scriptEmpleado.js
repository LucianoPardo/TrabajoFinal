const formCrearEmpleado = document.querySelector("#formCrearEmpleado form");
const tablaBody = document.querySelector("#tablaEmpleados tbody");

formCrearEmpleado.addEventListener("submit",(e) =>{
    e.preventDefault();

    const empleadoNombre = document.getElementById("empleadoNombre").value;
    const empleadoApellido = document.getElementById("empleadoApellido").value;
    const empleadoDni = document.getElementById("empleadoDni").value;
    const empleadoFechaNacimiento = document.getElementById("empleadoFechaNacimiento").value;
    const empleadoCorreo = document.getElementById("empleadoCorreo").value;
    const empleadoTelefono =document.getElementById("empleadoTelefono").value;
    const empleadoDireccion = document.getElementById("empleadoDireccion").value;

    const fila = document.createElement("tr");

    fila.innerHTML = `
        <td>${empleadoNombre}</td>
        <td>${empleadoApellido}</td>
        <td>${empleadoDni}</td>
        <td>${empleadoFechaNacimiento}</td>
        <td>${empleadoCorreo}</td>
        <td>${empleadoTelefono}</td>
        <td>${empleadoDireccion}</td>
    `;

    tablaBody.appendChild(fila);

    formCrearEmpleado.reset();
});

