let boton_login = document.getElementById("form-login");

console.log(boton_login);

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