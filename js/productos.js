let contenedorProductos = document.getElementById("contenedor-productos");
const url = "http://localhost:3000/api/productos"

async function obtenerProductos() {
    
    try {
        let respuesta = await fetch(url)
        let data = await respuesta.json();

        console.log(contenedorProductos);
        let productos = data.payload;
        mostrarProductos(productos);

    } catch(error) {

        console.log(error);

    }
                    
}

function mostrarProductos(array) {
    console.table(array);
    console.log(array)

    let htmlProducto = "";

    array.forEach(producto => {
        cantidad = mostrarCantidad(producto);
        htmlProducto += `
        <div class = "card-producto">
            <img src=".${producto.img_url}" alt="${producto.nombre}">
            <h5>${producto.nombre}</h5>
            <p>$${producto.precio}</p>
            <p>${cantidad}</p>
        </div>`;
    });
    console.log(htmlProducto);
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

function init() {
    obtenerProductos();
}

init();