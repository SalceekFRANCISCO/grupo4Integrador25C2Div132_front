let contenedorCarrito = document.getElementById("carrito-productos");

//#region Funciones del carrito.
function obtenerCarrito() {
    const carritoActualJSON = localStorage.getItem('carrito') || '[]';
    console.log(carritoActualJSON);
    const carrito = JSON.parse(carritoActualJSON);
    return carrito;
}

function mostrarCarrito() {
    const carrito = obtenerCarrito();
    let carritoCargado = "<ul class=listaCarrito> ";
    carrito.forEach((producto, indice) => {
        carritoCargado +=
        `<div class="productos-carrito" >
            <li>
                <div>
                    <img src=".${producto.img_url}" alt="${producto.nombre}">
                    <p>${producto.nombre} -- $${producto.precio}</p>
                    </div>
                    <div class="botones">
                    <button onclick="restarProducto(${(producto.id)})"> - </>
                    <button>${producto.cantidad}</button>
                    <button onclick="sumarProducto(${(producto.id)})" > + </>
                    <button onclick="eliminarProducto(${(indice)})" >eliminar</button>
                    <p>TOTAL : ${producto.total}</p>
                </div>
            </li>
        </div>`
    });

    carritoCargado += `</ul>
        <button onclick="vaciarCarrito()" >Vaciar carrito</button>`;
    
    contenedorCarrito.innerHTML = carritoCargado;
}

function guardarCarrito(carrito) {
    const carritoLocalS = JSON.stringify(carrito);
    localStorage.setItem("carrito",carritoLocalS);
}
//#endregion

//#region Funciones de los productos.
function eliminarProducto(indice){
    let carrito = obtenerCarrito();
    carrito.splice(indice,1);
    guardarCarrito(carrito);
    mostrarCarrito();
}

function sumarProducto(id){
    let carrito = obtenerCarrito();
    // buscar el producto
    let productoEncontrado = carrito.find(producto => producto.id == id);
    // sumar la cantidad
    if(productoEncontrado){
        productoEncontrado.cantidad += 1;
        productoEncontrado.total = productoEncontrado.cantidad * productoEncontrado.precio;
    }
    console.log(productoEncontrado);
    guardarCarrito(carrito);
    mostrarCarrito();
}

function restarProducto(id){
    let carrito = obtenerCarrito();
    // buscar el producto
    let productoEncontrado = carrito.find(producto => producto.id == id);
    let indiceEncontrado = carrito.findIndex(producto => producto.id == id);
    // restar la cantidad
    if(productoEncontrado){
        productoEncontrado.cantidad -= 1;
        if(productoEncontrado.cantidad <= 0){
            eliminarProducto(indiceEncontrado);
            return;
        }
        else{
            productoEncontrado.total = productoEncontrado.cantidad * productoEncontrado.precio;
        }
    }
    // validar que no se pueda poner negativa
    // guardar el carrito en el localStorage
    guardarCarrito(carrito);
    mostrarCarrito()
}

function vaciarCarrito() {
    let carrito = obtenerCarrito();
    carrito = [];
    contenedorCarrito.innerHTML = "";
    guardarCarrito(carrito);
}
//#endregion
function init() {
    mostrarCarrito();
}

init();