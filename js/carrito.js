let contenedorCarrito = document.getElementById("carrito-productos");

function obtenerCarrito() {

    const carritoActualJSON = localStorage.getItem('carrito') || '[]';

    let carrito = JSON.parse(carritoActualJSON);

    let carritoCargado = "<ul class=listaCarrito> ";

    carrito.forEach((producto) => {
        carritoCargado +=
        `<div class="sos">
            <li class="bloque-item">
            <p class="nombre-item">${producto.nombre} -- $${producto.precio}</p>
            </li>
        </div>`
    });

    carritoCargado += `</ul>`;
    // carritoCargado += `<button class="botonEliminar" onclick="vaciarCarritoCompleto()">Vaciar el carrito</button>`;
    // contenedorCarrito.innerHTML = cantidadProductosCarrito;
    
    
    contenedorCarrito.innerHTML = carritoCargado;
}


function init() {
    obtenerCarrito();
    // mostrarCarrito();
}

init();