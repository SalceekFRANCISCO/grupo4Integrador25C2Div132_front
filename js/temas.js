const preferedColorScheme = window.matchMedia("(prefers-color-scheme: dark").matches ? "dark" : "light";
// matchMedia toma el color del sistema operativo del usuario. Para ya agarrar por defecto el que él use.
const slider = document.getElementById("slider");

const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    //documentElemennt es la parte raíz del documento. En este caso, el documento HTMl.
    localStorage.setItem("theme", theme);
}

setTheme(localStorage.getItem("theme") || preferedColorScheme);
// Le paso el valor de tema de localStorage o, en caso de que no exista, le paso el tema por defecto que usa en su computadora.

const cambiarTema = () => {
    let switchTheme = localStorage.getItem("theme") === "dark" ? "light" : "dark";
    //Esto es cuando aprieta el botón. Le hago una validación. Si el valor actual es dark, pasa la página a light.
    // Si el valor actual no es dark, pasa la página a dark.
    // Esto es para cambiar cada vez que clickeas
    setTheme(switchTheme);
}

slider.addEventListener("click", cambiarTema);