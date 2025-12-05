let boton_imprimir = document.getElementById("boton-imprimir");
boton_imprimir.addEventListener("click", imprimirTicket);
const urlVentas = "http://localHost:3000/api/ventas" 

const urlLogin = "http://localHost:3000/login" 

let puto = document.getElementById("puto")
puto.addEventListener("click",iniciarSesion)



function iniciarSesion(){
    // const response = await fetch(urlVentas, {
    //     method: "GET",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    // });

    // const result = await response.json();

    // if (response.ok) {
    //     console.log("todo ok");
        
    // }
    // else {
    //     alert("Surgió un error con la venta. Intente nuevamente más tarde.");
    // }

    window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
}

function mostrarCompraFinal() {
    const carritoActualJSON = localStorage.getItem('carrito') || '[]';
    const carrito = JSON.parse(carritoActualJSON);
    console.table(carrito);
    let compraFinal = document.getElementById("contenedor-compra-final");
    let compraFinalHTML = "";
    if (carrito.lenght === 0) {
        compraFinalHTML = "<h1>Error: no se ha cargado ningún producto en el carrito.<h1>";
    }
    else {
        let contador = 1;
        let totalCompra = 0;
        carrito.forEach(producto => {
            let totalProducto = producto.precio * producto.cantidad;
            compraFinalHTML += `<div class="info-producto">
            <h3> Producto número ${contador}: <h3>
            <h4> Nombre: ${producto.nombre} <h4>
            <h4> Precio: $${producto.precio} <h4>
            <h4> Cantidad: ${producto.cantidad} <h4>
            <h4> Subotal: $${totalProducto} <h4>
            </div>`;
            totalCompra += totalProducto;
            contador += 1;
        });
        compraFinalHTML += `<div class="contenedor-info">
                                <h2> Total de la compra: $${totalCompra} </h2>
                                </div>`
    }
    compraFinal.innerHTML = compraFinalHTML;
}

function imprimirTicket() {
    let carritoActualJSON = localStorage.getItem("carrito");
    const carrito = JSON.parse(carritoActualJSON);
    console.table(carrito);
    console.log(carrito);
    let idProductos = [];
    const {jsPDF} = window.jspdf;
    const doc = new jsPDF();
    let y = 20;
    doc.setFontSize(18);
    doc.text("Ticket de compra:", 20, y);
    y+= 20;
    doc.setFontSize(12);

    carrito.forEach(producto => {
        idProductos.push(producto.id);
        doc.text(`${producto.nombre} - $${producto.precio} x ${producto.cantidad}`, 40, y);

        y += 10;
        
    });
    const precioTotal = carrito.reduce((total, producto) => total + parseInt(producto.precio) * parseInt(producto.cantidad), 0);
    y += 5;
    doc.setFontSize(15);
    doc.text(`Total: $${precioTotal}`, 20, y);
    doc.save("ticket.pdf");

    registrarVenta(precioTotal, idProductos);
}

async function registrarVenta(precioTotal, idProductos) {
    const fecha = new Date().toLocaleString("sv-SE", {hour12: false}).replace("T", " ");
    let nombreUsuario = localStorage.getItem("usuario");

    const data = {
        fecha: fecha,
        nombreUsuario: nombreUsuario,
        total: precioTotal,
        productos: idProductos
    }
    

    const response = await fetch(urlVentas, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    const result = await response.json();

    if (response.ok) {
        localStorage.removeItem("usuario");
        localStorage.removeItem("carrito");
        alert("Venta creada con éxito");
        window.location.href = "login.html";
    }
    else {
        alert("Surgió un error con la venta. Intente nuevamente más tarde.");
    }

}

function init() {
    mostrarCompraFinal();
};

init();