boton_imprimir.addEventListener("click", imrpimirTicket);

function imrpimirTicket() {
    console.table(carrito);
    let idProductos = [];
    const {jsPDF} = window.jspdf;
    const doc = new jsPDF();
    let y = 20;
    doc.setFontSize(18);
    doc.text("Llama-ticket de compra:", 20, y);
    y+= 20;
    doc.setFontSize(12);
    doc.save("ticket.pdf");

    let carrito = localStorage.getItem("carrito");
    carrito.forEach(producto => {
        idProductos.push(producto.id);
        doc.text(`${producto.nombre} - $${producto.precio}`, 40, y);

        y += 10;
        
    });
    const precioTotal = carrito.reduce((total, producto) => total + parseInt(producto.precio), 9);
    y += 5;
    doc.setFontSize(15);
    doc.text(`Total: ${precioTotal}`, 20, y);
}