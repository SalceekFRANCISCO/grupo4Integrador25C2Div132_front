let contenedorCarrito = document.getElementById("carrito-productos");

function obtenerCarrito() {

    const carritoActualJSON = localStorage.getItem('carrito') || '[]';

    let carrito = JSON.parse(carritoActualJSON);

    let carritoCargado = "<ul class=listaCarrito> ";

    carrito.forEach((producto, indice) => {
        carritoCargado +=
        `<div class="productos-carrito" >
            <li>
                <div>
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

function sumarProducto(id){
    // Traer el carrito del storage
    const carritoActualJSON = localStorage.getItem('carrito') || '[]';
    // parseo
    const carritoExistente = JSON.parse(carritoActualJSON);
    // buscar el producto
    let productoEncontrado = carritoExistente.find(producto => producto.id == id);
    // sumar la cantidad
    if(productoEncontrado){
        productoEncontrado.cantidad += 1;
        productoEncontrado.total = productoEncontrado.cantidad * productoEncontrado.precio;
        
    }
    console.log(productoEncontrado);
    // guardar el carrito en el localStorage
    const carritoLocalS = JSON.stringify(carritoExistente);
    localStorage.setItem("carrito",carritoLocalS);
    obtenerCarrito();
}

function restarProducto(id){
    // Traer el carrito del storage
    const carritoActualJSON = localStorage.getItem('carrito') || '[]';
    // parseo
    const carritoExistente = JSON.parse(carritoActualJSON);
    // buscar el producto
    let productoEncontrado = carritoExistente.find(producto => producto.id == id);

    let indiceEncontrado = carritoExistente.findIndex(producto => producto.id == id);
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
    const carritoLocalS = JSON.stringify(carritoExistente);
    localStorage.setItem("carrito",carritoLocalS);
    obtenerCarrito();

}

function vaciarCarrito() {
    const carritoActualJSON = localStorage.getItem('carrito');
    let carritoExistente = JSON.parse(carritoActualJSON);
    carritoExistente = [];
    contenedorCarrito.innerHTML = "";
    const carritoLocalS = JSON.stringify(carritoExistente);
    localStorage.setItem("carrito",carritoLocalS);
}

function init() {
    obtenerCarrito();
    // mostrarCarrito();
}

init();