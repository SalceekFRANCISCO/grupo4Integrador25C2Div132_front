let boton_login = document.getElementById("form-login");

console.log(boton_login);

boton_login.addEventListener("submit", function (event) {
    event.preventDefault();
    window.location.href = "productos.html"
})