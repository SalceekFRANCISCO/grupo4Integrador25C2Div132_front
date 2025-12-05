let boton_login = document.getElementById("form-login");
const urlLogin = "http://localHost:3000/login";
let botonAdmin = document.getElementById("boton-iniciar-sesion");
botonAdmin.addEventListener("click",iniciarSesion); 

boton_login.addEventListener("submit", function (event) {
    event.preventDefault();

    let formData = new FormData(event.target);
    console.log("Formdata es: " + formData);
    let data = Object.fromEntries(formData.entries());
    console.log("La data es:", data);

    let usuario = data;
    console.log(usuario.nombre);
    localStorage.setItem("usuario", usuario.nombre);

    window.location.href = "productos.html"
});

function iniciarSesion(){
    window.location.href = urlLogin;
}