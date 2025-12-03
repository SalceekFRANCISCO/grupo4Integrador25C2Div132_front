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
    let acumulador = 0;
    carrito.forEach((producto, indice) => {
        carritoCargado +=
        `<div class="productos-carrito" >
            <li>
                <div>
                    <img src=".${producto.img_url}" alt="${producto.nombre}">
                    <p> ${producto.nombre} </p>
                    <p> Precio unitario: $${producto.precio}</p>
                    </div>
                    <div class="botones">
                    <button class="boton-carrito" onclick="restarProducto(${(producto.id)})"> - </>
                    <button class="boton-carrito" onclick="sumarProducto(${(producto.id)})" > + </>
                    <button class="boton-carrito" onclick="eliminarProducto(${(indice)})"> Eliminar </button>
                    <h4> Cantidad de productos: ${producto.cantidad} </h4>
                    <p> Subtotal: $${producto.total} </p>
                </div>
            </li>
        </div>`
        acumulador += producto.total;
    });

    carritoCargado += `</ul>
        <button class="boton-carrito" onclick="vaciarCarrito()" >Vaciar carrito</button>
        <h2>Total de carrito: $${acumulador}</>`;
    
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
        if (productoEncontrado.stock > 0) {
            productoEncontrado.stock -= 1;
            productoEncontrado.cantidad += 1;
            productoEncontrado.total = productoEncontrado.cantidad * productoEncontrado.precio;
        }
    else {
        alert("No hay más stock de ese producto.");
    }
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
    if (carrito.lenght === 0) {
        carrito = [];
        contenedorCarrito.innerHTML = "";
        guardarCarrito(carrito);
    }
    else {
        alert("El carrito ya está vacío.");
    }
}
//#endregion
function init() {
    mostrarCarrito();
}

init();