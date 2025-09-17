document.addEventListener('DOMContentLoaded', () => {
    // 1. Seleccionamos los elementos necesarios del formulario de menú
    const formCrearMenu = document.querySelector('#formCrearMenu .formulario');
    const imagenInput = document.getElementById('imagen');
    const platoNombreInput = document.getElementById('platoNombre');
    const platoPrecioInput = document.getElementById('platoPrecio');
    const platoDescripcionInput = document.getElementById('platoDescripcion');

    // El contenedor donde se mostrarán las tarjetas de los menús creados
    const menuPreviewContainer = document.createElement('div');
    menuPreviewContainer.id = 'menuPreviewContainer';
    // Insertamos el contenedor justo después del formulario
    formCrearMenu.parentElement.insertAdjacentElement('afterend', menuPreviewContainer);

    // 2. Añadimos un listener para el evento 'submit' del formulario
    formCrearMenu.addEventListener('submit', (event) => {
        // Evitamos que la página se recargue al enviar el formulario
        event.preventDefault();

        // 3. Obtenemos los valores de los inputs
        const nombre = platoNombreInput.value;
        const precio = platoPrecioInput.value;
        const descripcion = platoDescripcionInput.value;
        const imagenFile = imagenInput.files[0]; // El archivo de imagen

        // Verificamos que se haya seleccionado una imagen
        if (!imagenFile) {
            alert('Por favor, selecciona una imagen para el menú.');
            return;
        }

        // Creamos una URL temporal para poder mostrar la imagen seleccionada
        const imagenUrl = URL.createObjectURL(imagenFile);

        // 4. Creamos la tarjeta del menú con los datos obtenidos
        crearTarjetaMenu(imagenUrl, nombre, precio, descripcion);

        // 5. Limpiamos el formulario para el siguiente ingreso
        formCrearMenu.reset();
    });

    /**
     * Función que crea y muestra una tarjeta de menú en el contenedor de vista previa.
     * @param {string} imagenUrl - La URL de la imagen del plato.
     * @param {string} nombre - El nombre del plato.
     * @param {string} precio - El precio del plato.
     * @param {string} descripcion - La descripción del plato.
     */
    function crearTarjetaMenu(imagenUrl, nombre, precio, descripcion) {
        // Creamos los elementos HTML para la tarjeta
        const menuCard = document.createElement('div');
        menuCard.classList.add('menu-card');

        const cardImage = document.createElement('img');
        cardImage.src = imagenUrl;
        cardImage.alt = `Imagen de ${nombre}`;

        const cardTitle = document.createElement('h3');
        cardTitle.textContent = nombre;

        const cardPrice = document.createElement('p');
        cardPrice.classList.add('price');
        cardPrice.textContent = `$${precio}`;

        const cardDescription = document.createElement('p');
        cardDescription.textContent = descripcion;

        // Ensamblamos la tarjeta
        menuCard.appendChild(cardImage);
        menuCard.appendChild(cardTitle);
        menuCard.appendChild(cardPrice);
        menuCard.appendChild(cardDescription);

        // Añadimos la tarjeta al contenedor
        menuPreviewContainer.appendChild(menuCard);
    }
});