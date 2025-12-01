let contenedorCarrito = document.getElementById("carrito-productos");

function obtenerCarrito() {

    const carritoActualJSON = localStorage.getItem('carrito') || '[]';

    let carrito = JSON.parse(carritoActualJSON);

    let carritoCargado = "<ul class=listaCarrito> ";

    carrito.forEach((producto, indice) => {
        carritoCargado +=
        `<div class="sos">
            <li class="bloque-item">
            <p class="nombre-item">${producto.nombre} -- $${producto.precio}</p>
            <button onclick="eliminarProducto(${(indice)})" >eliminar</button>
            <button >cantidad +</button>
            </li>
        </div>`
    });

    carritoCargado += `</ul>`;
    // carritoCargado += `<button class="botonEliminar" onclick="vaciarCarritoCompleto()">Vaciar el carrito</button>`;
    // contenedorCarrito.innerHTML = cantidadProductosCarrito;
    
    
    contenedorCarrito.innerHTML = carritoCargado;
}

function eliminarProducto(indice){
    // obtener localStorage carrito
    const carritoLocalStorage = localStorage.getItem('carrito');
    // transformar el carrito a js object
    const carritoParseado = JSON.parse(carritoLocalStorage);
    // buscar el indice y eliminar
    
    carritoParseado.splice(indice,1);

    // guardar de nuevo el carrito
    const carritoLocalS = JSON.stringify(carritoParseado);
    localStorage.setItem("carrito",carritoLocalS);
    // mostrar de nuevo el carrito
    obtenerCarrito();
}



function init() {
    obtenerCarrito();
    // mostrarCarrito();
}

init();