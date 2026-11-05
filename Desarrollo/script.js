
const contenedor = document.getElementById("contenedorDeColores");
const selectorCantidad = document.getElementById("cantidadDeColores");
const selectorFormato = document.getElementById("formatoColor");
const botonGenerar = document.getElementById("generadorDeColores");
const mensajeEstado = document.getElementById("mensajeEstado");
const botonCopiarPaleta = document.getElementById("copiarPaleta");

let colores = [];
let historial = [];

// Crear un color hexadecimal
function crearColor() {
    const numero = Math.floor(Math.random() * 16777216);
    const hex = "#" + numero.toString(16).padStart(6, "0").toUpperCase();

    return {
        hex: hex,
        bloqueado: false
    };
}

// Convertir HEX a HSL pasando por RGB
function convertirAHsl(hex) {
    const rojo = parseInt(hex.slice(1, 3), 16) / 255;
    const verde = parseInt(hex.slice(3, 5), 16) / 255;
    const azul = parseInt(hex.slice(5, 7), 16) / 255;

    const mayor = Math.max(rojo, verde, azul);
    const menor = Math.min(rojo, verde, azul);
    const diferencia = mayor - menor;

    let tono = 0;
    let saturacion = 0;
    const luminosidad = (mayor + menor) / 2;

    if (diferencia !== 0) {
        if (mayor === rojo) {
            tono = ((verde - azul) / diferencia) % 6;
        } else if (mayor === verde) {
            tono = (azul - rojo) / diferencia + 2;
        } else {
            tono = (rojo - verde) / diferencia + 4;
        }

        tono = tono * 60;

        if (tono < 0) {
            tono = tono + 360;
        }

        saturacion = diferencia / (1 - Math.abs(2 * luminosidad - 1));
    }

    return `hsl(${Math.round(tono)}, ${Math.round(saturacion * 100)}%, ${Math.round(luminosidad * 100)}%)`;
}

// Obtener el código seleccionado
function obtenerCodigo(color) {
    if (selectorFormato.value === "HSL") {
        return convertirAHsl(color.hex);
    }

    return color.hex;
}

// Guardar la paleta actual
function guardarPaleta() {
    localStorage.setItem("paletaColorfly", JSON.stringify(colores));
}

// Guardar el historial
function guardarHistorial() {
    historial.unshift(JSON.parse(JSON.stringify(colores)));

    if (historial.length > 10) {
        historial.pop();
    }

    localStorage.setItem("historialColorfly", JSON.stringify(historial));
    mostrarHistorial();
}

// Copiar un color
async function copiarColor(hex) {
    try {
        await navigator.clipboard.writeText(hex);
        mensajeEstado.textContent = "Código copiado: " + hex;
    } catch (error) {
        mensajeEstado.textContent = "No se pudo copiar. Abre la página en localhost o HTTPS.";
    }
}

async function copiarPaletaCompleta() {
    let codigos = "";

    for (let i = 0; i < colores.length; i++) {
        codigos += obtenerCodigo(colores[i]) + "\n";
    }

    try {
        await navigator.clipboard.writeText(codigos);
        mensajeEstado.textContent = "¡Paleta completa copiada en " + selectorFormato.value + "!";
    } catch (error) {
        mensajeEstado.textContent = "No se pudo copiar la paleta.";
    }
}


// Mostrar la paleta
function mostrarPaleta(animar = false) {
    contenedor.replaceChildren();

    for (let i = 0; i < colores.length; i++) {
        const color = colores[i];

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjetaColor");
        tarjeta.style.backgroundColor = color.hex;

        // Animar solamente cuando se genera una paleta
        // Los colores bloqueados no se animan
        if (animar && !color.bloqueado) {
            tarjeta.animate(
                [
                    { opacity: 0, transform: "translateY(10px)" },
                    { opacity: 1, transform: "translateY(0)" }
                ],
                {
                    duration: 300,
                    easing: "ease-out"
                }
            );
        }

        // Botón de bloqueo
        const botonBloquear = document.createElement("button");
        botonBloquear.type = "button";
        botonBloquear.classList.add("botonBloquear");
        botonBloquear.textContent = color.bloqueado ? "🔒" : "🔓";

        botonBloquear.title = color.bloqueado
            ? "Desbloquear color"
            : "Bloquear color";

        botonBloquear.setAttribute(
            "aria-label",
            botonBloquear.title
        );

        botonBloquear.setAttribute(
            "aria-pressed",
            String(color.bloqueado)
        );

        botonBloquear.addEventListener("click", function (evento) {
            evento.stopPropagation();

            color.bloqueado = !color.bloqueado;

            botonBloquear.textContent = color.bloqueado ? "🔒" : "🔓";

            botonBloquear.title = color.bloqueado
                ? "Desbloquear color"
                : "Bloquear color";

            botonBloquear.setAttribute(
                "aria-label",
                botonBloquear.title
            );

            botonBloquear.setAttribute(
                "aria-pressed",
                String(color.bloqueado)
            );

            mensajeEstado.textContent = color.bloqueado
                ? "¡Color bloqueado!"
                : "¡Color desbloqueado!";

            guardarPaleta();
        });

        // Etiqueta
        const etiqueta = document.createElement("div");
        etiqueta.classList.add("etiquetaColor");

        const titulo = document.createElement("h3");
        titulo.textContent = selectorFormato.value;

        const codigo = document.createElement("p");
        codigo.textContent = obtenerCodigo(color);

        // Botón copiar
        const botonCopiar = document.createElement("button");
        botonCopiar.type = "button";
        botonCopiar.classList.add("botonCopiar");
        botonCopiar.textContent = "Copiar";

        botonCopiar.addEventListener("click", function (evento) {
            evento.stopPropagation();
            copiarColor(obtenerCodigo(color));
        });

        // Copiar al hacer clic en la tarjeta
        tarjeta.addEventListener("click", function () {
            copiarColor(obtenerCodigo(color));
        });

        etiqueta.appendChild(titulo);
        etiqueta.appendChild(codigo);
        etiqueta.appendChild(botonCopiar);

        tarjeta.appendChild(botonBloquear);
        tarjeta.appendChild(etiqueta);

        contenedor.appendChild(tarjeta);
    }
}

// Generar una nueva paleta
function generarPaleta() {
    const cantidad = Number(selectorCantidad.value);
    const nuevaPaleta = [];

    for (let i = 0; i < cantidad; i++) {
        if (colores[i] && colores[i].bloqueado) {
            nuevaPaleta.push(colores[i]);
        } else {
            nuevaPaleta.push(crearColor());
        }
    }

    colores = nuevaPaleta;

    guardarPaleta();
    guardarHistorial();

    mostrarPaleta(true);

    mensajeEstado.textContent = "¡Paleta creada con éxito!";

    setTimeout(function () {
        mensajeEstado.textContent = "";
    }, 3000);
}

// Crear el selector de historial
const seccionHistorial = document.createElement("div");
seccionHistorial.style.marginTop = "25px";
seccionHistorial.style.textAlign = "center";

const tituloHistorial = document.createElement("h3");
tituloHistorial.textContent = "Historial de paletas";

const selectorHistorial = document.createElement("select");
selectorHistorial.setAttribute("aria-label", "Historial de paletas");
selectorHistorial.style.padding = "10px";
selectorHistorial.style.borderRadius = "8px";
selectorHistorial.style.border = "1px solid #d5d0eb";
selectorHistorial.style.maxWidth = "100%";

seccionHistorial.appendChild(tituloHistorial);
seccionHistorial.appendChild(selectorHistorial);

contenedor.insertAdjacentElement("afterend", seccionHistorial);

// Mostrar las paletas guardadas en el selector
function mostrarHistorial() {
    selectorHistorial.replaceChildren();

    const opcionInicial = document.createElement("option");
    opcionInicial.value = "";
    opcionInicial.textContent = "Selecciona una paleta anterior";
    selectorHistorial.appendChild(opcionInicial);

    for (let i = 0; i < historial.length; i++) {
        const opcion = document.createElement("option");
        opcion.value = i;
        opcion.textContent = "Paleta " + (historial.length - i);
        selectorHistorial.appendChild(opcion);
    }

    selectorHistorial.value = "";
}

// Recuperar una paleta del historial
selectorHistorial.addEventListener("change", function () {
    if (selectorHistorial.value === "") {
        return;
    }

    const posicion = Number(selectorHistorial.value);

    colores = JSON.parse(JSON.stringify(historial[posicion]));

    selectorCantidad.value = String(colores.length);

    guardarPaleta();
    mostrarPaleta();

    mensajeEstado.textContent = "¡Paleta recuperada!";
});

// Cargar datos guardados
function cargarPaleta() {
    try {
        const historialGuardado = JSON.parse(
            localStorage.getItem("historialColorfly")
        );

        if (Array.isArray(historialGuardado)) {
            historial = historialGuardado;
        }

        const paletaGuardada = JSON.parse(
            localStorage.getItem("paletaColorfly")
        );

        if (
            Array.isArray(paletaGuardada) &&
            [6, 8, 9].includes(paletaGuardada.length) &&
            paletaGuardada.every(function (color) {
                return color &&
                    typeof color.hex === "string" &&
                    /^#[0-9A-F]{6}$/i.test(color.hex) &&
                    typeof color.bloqueado === "boolean";
            })
        ) {
            colores = paletaGuardada;
            selectorCantidad.value = String(colores.length);

            mostrarPaleta();
            mostrarHistorial();
            return;
        }
    } catch (error) {
        // Si no hay datos válidos, se genera una nueva paleta
    }

    generarPaleta();
}

// Eventos
selectorCantidad.addEventListener("change", generarPaleta);
selectorFormato.addEventListener("change", function () {
    mostrarPaleta();
});
botonGenerar.addEventListener("click", generarPaleta);
botonCopiarPaleta.addEventListener("click", copiarPaletaCompleta);

// Iniciar
cargarPaleta();
