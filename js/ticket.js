let boton_imprimir = document.getElementById("boton-imprimir");
boton_imprimir.addEventListener("click", imprimirTicket);
const urlVentas = "http://localHost:3000/api/ventas" 


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
        precio: precioTotal,
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
        alert("Surgió un error con la venta. Intente nuevamentem más tarde.");
    }

}