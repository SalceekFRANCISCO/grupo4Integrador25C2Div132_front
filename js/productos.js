let contenedorProductos = document.getElementById("contenedor-productos");
// let contenedorCarrito = document.getElementById("carrito-productos");

const url = "http://localhost:3000/api/productos";

let productos = [];
let carrito = [];

async function obtenerProductos() {
    try {
        let respuesta = await fetch(url)
        let data = await respuesta.json();

        //console.log(contenedorProductos);
        productos = data.payload;
        configurarEventos();
        mostrarProductos(productos);
        mostrarUsuario();

    } catch(error) {
        console.log(error);

    }
}

function mostrarProductos(array) {
    let htmlProducto = "";
    array.forEach((producto) => {
        console.log(producto);
        if (producto.activo === 1) {
            cantidad = mostrarCantidad(producto);
            htmlProducto += `
            <div class = "card-producto">
                <img src=".${producto.img_url}" alt="${producto.nombre}">
                <h5>${producto.nombre}</h5>
                <p>$${producto.precio}</p>
                <p>${cantidad}
            </div>`;
        }
    });
    
    contenedorProductos.innerHTML = htmlProducto;
}

function mostrarCantidad(producto) {
    if (producto.stock > 5) {
        return `Disponible </p>
            <button class="boton-carrito" onclick="agregarAlCarrito(${(producto.id)})"> Agregar carrito</button>`
    }
    else {
        if (producto.stock > 0) {
            return `Últimas unidades</p>
            <button class="boton-carrito" onclick="agregarAlCarrito(${(producto.id)})"> Agregar carrito</button>`
        }
        else {
            return `AGOTADO`;
        }
        
    }
}

function ordenarProductos(array, parametro, direccion){
    const productosOrdenados = [...array];

    productosOrdenados.sort((a, b) => {
        let valorA = a[parametro];
        let valorB = b[parametro];
        let comparacion = 0;

        if (valorA > valorB) {
            comparacion = 1;
        } else {
            comparacion = -1;
        }

        return direccion === "asc" ? comparacion : comparacion * -1;

    });
    console.log(array);
    return productosOrdenados;
}

function filtrarProductos(array, propiedad) {
    let productosFiltrados = [];
    if (propiedad === "todos") {
        productosFiltrados = [...array];
    }
    else {
        array.forEach (producto => {
            if (producto.categoria === propiedad) {
                productosFiltrados.push(producto);
            }
        })
    }
    return productosFiltrados;
}

function configurarEventos() {
    let propiedadSelect = document.getElementById("propiedad-select");
    let direccionSelect = document.getElementById("direccion-select");
    let filtroSelect = document.getElementById("propiedad-filtro");

    const actualizarProductosMostrados = () => {
        const propiedad = propiedadSelect.value;
        const direccion = direccionSelect.value;
        const filtro = filtroSelect.value;
        let productosAcomodados = [...productos];
        productosAcomodados = filtrarProductos(productosAcomodados, filtro);
        productosAcomodados = ordenarProductos(productosAcomodados, propiedad, direccion);
        mostrarProductos(productosAcomodados);
    }
    propiedadSelect.addEventListener('change', actualizarProductosMostrados);
    direccionSelect.addEventListener('change', actualizarProductosMostrados);
    filtroSelect.addEventListener('change', actualizarProductosMostrados);
}   

function agregarAlCarrito(id) {
    const carritoActualJSON = localStorage.getItem('carrito') || '[]';
    const carritoExistente = JSON.parse(carritoActualJSON);
    
    let productoEncontrado = carritoExistente.find(producto => producto.id == id);
    if(productoEncontrado){
        if (productoEncontrado.stock > 0) {
            productoEncontrado.stock -= 1;
            productoEncontrado.cantidad = (productoEncontrado.cantidad || 0) + 1;
            productoEncontrado.total = (productoEncontrado.total || productoEncontrado.precio) + productoEncontrado.precio;
        }
        else {
            alert("No hay más unidades disponibles de ese producto");
        }
    }
    else {
        
        let productoNuevo = productos.find(producto => producto.id == id); //esto es para encontrar el producto en el carrito con rows
        
        productoNuevo.cantidad = 1;
        carritoExistente.push(productoNuevo);
        productoNuevo.total = productoNuevo.precio;
        productoNuevo.stock -= 1;
    }
    
    const carritoLocalS = JSON.stringify(carritoExistente);
    localStorage.setItem("carrito",carritoLocalS);
    mostrarProductos(productos);
}

function mostrarUsuario() {
    const usuarioStorage = localStorage.getItem("usuario");
    let contenedorUsuario = document.getElementById("contenedor-usuario");
    const usuario = usuarioStorage.toString();
    console.log(usuario);
    let htmlUsuario = `<h1>Estos son nuestros productos, ${usuario} </h1>`;
    contenedorUsuario.innerHTML = htmlUsuario;
}

function init() {
    obtenerProductos();
}

init();