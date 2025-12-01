let contenedorProductos = document.getElementById("contenedor-productos");
// let contenedorCarrito = document.getElementById("carrito-productos");

const preferedColorScheme = window.matchMedia("(prefers-color-scheme: dark").matches ? "dark" : "light";
// matchMedia toma el color del sistema operativo del usuario. Para ya agarrar por defecto el que él use.
const slider = document.getElementById("slider");


const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    //documentElemennt es la parte raíz del documento. En este caso, el documento HTMl.
    localStorage.setItem("theme", theme);
}

setTheme(localStorage.getItem("theme") || preferedColorScheme);

const cambiarTema = () => {
    let switchTheme = localStorage.getItem("theme") === "dark" ? "light" : "dark";
    setTheme(switchTheme);

}


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

    } catch(error) {
        console.log(error);

    }

}

function mostrarProductos(array) {
    let htmlProducto = "";

    array.forEach((producto) => {
        cantidad = mostrarCantidad(producto);
        htmlProducto += `
        <div class = "card-producto">
            <img src=".${producto.img_url}" alt="${producto.nombre}">
            <h5>${producto.nombre}</h5>
            <p>$${producto.precio}</p>
            <p>${cantidad}</p>
            <button onclick="agregarAlCarrito(${(producto.id)})"> Agregar carrito</button>
        </div>`;
    });
    
    contenedorProductos.innerHTML = htmlProducto;
}

function mostrarCantidad(producto) {
    if (producto.stock > 5) {
        return "Disponible";
    }
    else {
        if (producto.stock > 0) {
            return "Últimas unidades"
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
/*
    switch (parametro) {
        case 1: {
                for(let i = 0; i < array.length; i++) {
                    for (let j = 0; j < i; j++) {
                        if (array[i].nombre < array[j].nombre) {
                            let temporal = array[j];
                            array[j] = array[i];
                            array[i] = temporal;
                        }
                    } 
                }
            console.log("Ordeno por nombre" + array);
            break;
        }
        case -1: {
                for(let i = 0; i < array.length; i++) {
                    for (let j = 0; j < i; j++) {
                        if (array[i].precio < array[j].precio) {
                            let temporal = array[j];
                            array[j] = array[i];
                            array[i] = temporal;
                        }
                    } 
                }
            console.log("Ordeno por precio" + array);
            break;
        }
    }
*/
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
    /*
    let ordenarSelect = document.getElementById("ordenar-select");
    ordenarSelect.addEventListener('change', (event) => {
        console.log(productos);
        ordenarProductos(productos, parseInt(event.target.value));
        });
*/
    let propiedadSelect = document.getElementById("propiedad-select");
    let direccionSelect = document.getElementById("direccion-select");
    let filtroSelect = document.getElementById("propiedad-filtro");
    console.log(filtroSelect.value);

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
    slider.addEventListener("click", cambiarTema);
}   

function agregarAlCarrito(id) {
    const carritoActualJSON = localStorage.getItem('carrito') || '[]';
    const carritoExistente = JSON.parse(carritoActualJSON);
    
    let productoEncontrado = carritoExistente.find(producto => producto.id == id);
    
    if(productoEncontrado){
        
        productoEncontrado.cantidad = (productoEncontrado.cantidad || 0) + 1;
        productoEncontrado.total = (productoEncontrado.total || productoEncontrado.precio) + productoEncontrado.precio;
    }
    else{
        
        let productoNuevo = productos.find(producto => producto.id == id); //esto es para encontrar el producto en el carrito con rows
        
        productoNuevo.cantidad = 1;
        carritoExistente.push(productoNuevo);
        productoNuevo.total = productoNuevo.precio;
        
    }
    
    const carritoLocalS = JSON.stringify(carritoExistente);
    localStorage.setItem("carrito",carritoLocalS);
    // localStorage.clear()
}

function init() {
    obtenerProductos();
}

init();