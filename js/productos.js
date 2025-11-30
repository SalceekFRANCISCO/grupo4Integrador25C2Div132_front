let contenedorProductos = document.getElementById("contenedor-productos");
const url = "http://localhost:3000/api/productos";
let productos = [];

async function obtenerProductos() {
    try {
        let respuesta = await fetch(url)
        let data = await respuesta.json();

        //console.log(contenedorProductos);
        productos = data.payload;
        mostrarProductos(productos);

    } catch(error) {
        console.log(error);

    }

}

function mostrarProductos(array) {
//    console.table(array);
//    console.log(array)
    let htmlProducto = "";
    console.log(array);
//    ordenarProductos(array, 1);

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
    //console.log(htmlProducto);
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

function ordenarProductos(array, parametro){
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
    console.log(array);
    mostrarProductos(array)
}

function configurarEventos() {
    let ordenarSelect = document.getElementById("ordenar-select");
    ordenarSelect.addEventListener('change', (event) => {
        console.log(productos);
        ordenarProductos(productos, parseInt(event.target.value));
        });
}

function init() {
    obtenerProductos();
    configurarEventos();
}

init();