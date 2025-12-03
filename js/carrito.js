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
    let acumulador = 0;
    let carritoCargado = "<ul class=listaCarrito> ";

    carrito.forEach((producto, indice) => {
        carritoCargado +=
        `<div class="productos-carrito" >
            <li>
                <div class="clase">
                    <img src=".${producto.img_url}" alt="${producto.nombre}">
                        <div class=""info-producto"">
                            <p class="nombre-producto"> ${producto.nombre}</p>
                            <p class="precio-producto"> $${producto.precio} </p>
                        </div>
                </div>
                <div class="puto">
                    <div class="botones">
                    <button class="boton-carrito" onclick="sumarProducto(${(producto.id)})" > + </>
                        <button class="boton-carrito" onclick="restarProducto(${(producto.id)})"> - </>
                        <button class="boton-carrito" onclick="eliminarProducto(${(indice)})"> Eliminar </button>
                    </div>
                    <div class="datos-carrito">
                        <h4> Cantidad del Producto: ${producto.cantidad} </h4>
                        <p> Subtotal Producto: $${producto.total} </p>
                    </div>
                </div>
            </li>
        </div>`
        acumulador += producto.total;
    });

    carritoCargado += `</ul>
        <button class="boton-carrito" onclick="vaciarCarrito()" >Vaciar carrito</button>
        <button class="boton-carrito" onclick="finalizarCompra()" >Finalizar Compra</button>
        <h2 class="total-carrito">Total de carrito: $${acumulador}</>`;
    
    contenedorCarrito.innerHTML = carritoCargado;
    mostrarUsuario();
}

function finalizarCompra() {
    window.location.href = "ticket.html";
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
        productoEncontrado.stock += 1;
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
    if (carrito.lenght != 0) {
        carrito = [];
        contenedorCarrito.innerHTML = "";
        guardarCarrito(carrito);
    }
    else {
        alert("El carrito ya está vacío.");
    }
}

function mostrarUsuario() {
    const usuarioStorage = localStorage.getItem("usuario");
    if(usuarioStorage === null) {
        window.location.href = "login.html"
    }
    else {
        let contenedorUsuario = document.getElementById("contenedor-usuario");
        const usuario = usuarioStorage.toString();
        console.log(usuario);
        let htmlUsuario = `<h1>${usuario}, esta es su commpra actual </h1>`;
        contenedorUsuario.innerHTML = htmlUsuario;
    }
}

//#endregion

function init() {
    mostrarCarrito();
}

init();