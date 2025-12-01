const preferedColorScheme = window.matchMedia("(prefers-color-scheme: dark").matches ? "dark" : "light";
// matchMedia toma el color del sistema operativo del usuario. Para ya agarrar por defecto el que él use.
const slider = document.getElementById("slider");

const setTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    //documentElemennt es la parte raíz del documento. En este caso, el documento HTMl.
    localStorage.setItem("theme", theme);
}

setTheme(localStorage.getItem("theme") || preferedColorScheme);

const cambiarTema = () => {
    let switchTheme = localStorage.getItem("theme") === "dark" ? "light" : "dark";
    setTheme(switchTheme);
}

slider.addEventListener("click", cambiarTema);