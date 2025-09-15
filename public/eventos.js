document.addEventListener('DOMContentLoaded', () => {
  const btnCrearEmpleado = document.getElementById("btnCrearEmpleado");
  const formCrearEmpleado = document.getElementById("formCrearEmpleado");

  const btnCrearMenu = document.getElementById("btnCrearMenu");
  const formCrearMenu = document.getElementById("formCrearMenu");

  const btnStock = document.getElementById("btnStock");
  const seccionStock = document.getElementById("seccionStock");

  const btnAñadirProducto = document.getElementById("btnAñadirProducto");
  const formularioStock = document.getElementById("formularioStock");

  btnCrearEmpleado.addEventListener('click', (event) =>{
    event.stopPropagation();
    formCrearEmpleado.classList.remove('oculto');
  });

  document.addEventListener('click',(event)=> {
    if(!formCrearEmpleado.contains(event.target) && event.target!==btnCrearEmpleado){
      formCrearEmpleado.classList.add('oculto');
    }
  });

  btnCrearMenu.addEventListener('click', (event) =>{
    event.stopPropagation();
    formCrearMenu.classList.remove('oculto');
  });

  document.addEventListener('click',(event)=> {
    if(!formCrearMenu.contains(event.target) && event.target!==btnCrearMenu){
      formCrearMenu.classList.add('oculto');
    }
  });  
  btnStock.addEventListener('click', (event) =>{
    event.stopPropagation();
    seccionStock.classList.remove('oculto');
  });

  btnAñadirProducto.addEventListener('click',(event)=>{
    event.stopPropagation();
    formularioStock.classList.remove('oculto');
  })


  document.addEventListener('click',(event)=> {
    if(!seccionStock.contains(event.target) && event.target !== btnStock){
      seccionStock.classList.add('oculto');
      formularioStock.classList.add('oculto');
    }
  });  
});

