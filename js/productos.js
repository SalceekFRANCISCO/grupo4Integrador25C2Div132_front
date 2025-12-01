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
            return "Últimas unidades disponibles"
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
}   

function agregarAlCarrito(id) {
    const carritoActualJSON = localStorage.getItem('carrito') || '[]';
    const carritoExistente = JSON.parse(carritoActualJSON);

    let productoEncontrado = productos.find(producto => producto.id == id);

    carritoExistente.push(productoEncontrado);


    const carritoLocalS = JSON.stringify(carritoExistente);
    localStorage.setItem("carrito",carritoLocalS);

    // let carrito = JSON.parse(carritoActualJSON);

    // const carritoActualizadoJSON = JSON.stringify(carrito);

    // localStorage.setItem('carrito', carritoActualizadoJSON);

    // localStorage.clear();
    // console.table(carrito);
    // mostrarCarrito();
}


// function mostrarCarrito() {
//     let cantidadCarrito = carrito.length;

//     if(cantidadCarrito === 0){
//         console.log("carrito vacio");
        
//     }
//     else{
//         // console.log(carrito);
        
//         let carritoCargado = "<ul class=listaCarrito> ";
    
//         carritoCargado +=`<h2 class="carrito-titulo">Carrito</h2>`
//         carrito.forEach((producto) => {
//                 carritoCargado +=
//                 `<div class="sos">
//                     <li class="bloque-item">
//                     <p class="nombre-item">${producto.nombre} -- $${producto.precio}</p>
//                     </li>
//                 </div>`
//         });

//         // carritoCargado += `<h3 class="total">Total: $ ${total}</p> </h3>`;
//         carritoCargado += `</ul>`;
//         // carritoCargado += `<button class="botonEliminar" onclick="vaciarCarritoCompleto()">Vaciar el carrito</button>`;
//         // contenedorCarrito.innerHTML = cantidadProductosCarrito;
//         console.log(contenedorCarrito);
//         console.log(carritoCargado);
        
        
//         contenedorCarrito.innerHTML = carritoCargado;
//     }


// }




// esta no debe estar aqui
// function mostrarCarrito(){
//     let cantidadCarrito = carritoPersonal.length;

//     if(cantidadCarrito === 0){
//         vaciarCarrito();
//     }
//     else{
//         let total = calcularTotal(carritoPersonal);
//         let cantidadProductosCarrito = `<p> Carrito:${cantidadCarrito} Productos</p>`;
//         let carritoCargado = "<ul class=listaCarrito> ";

//         carritoCargado +=`<h2 class="carrito-titulo">Carrito</h2>`
//         carritoPersonal.forEach((fruta,indice) => {
//                 carritoCargado +=
//                 `<div class="sos">
//                     <li class="bloque-item">
//                     <p class="nombre-item">${fruta.nombre}-- $${fruta.precio}</p>
//                     <button class="botonEliminar" onclick="eliminarFruta(${(indice)})">Eliminar</button>
//                     </li>
//                 </div>`
//         });

//         carritoCargado += `<h3 class="total">Total: $ ${total}</p> </h3>`;
//         carritoCargado += `<button class="botonEliminar" onclick="vaciarCarritoCompleto()">Vaciar el carrito</button>`;
//         carritocantidad.innerHTML = cantidadProductosCarrito;
        
//         carrito.innerHTML = carritoCargado;
//     }
    
// };



function init() {
    obtenerProductos();
    // mostrarCarrito();
}

init();