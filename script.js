
const contenedor = document.getElementById("contenedorDeColores");
const selectorCantidad = document.getElementById("cantidadDeColores");
const selectorFormato = document.getElementById("formatoColor");
const botonGenerar = document.getElementById("generadorDeColores");
const mensajeEstado = document.getElementById("mensajeEstado");

let colores = [];

function crearColor() {
    const tono = Math.floor(Math.random() * 360);
    const saturacion = Math.floor(Math.random() * 81) + 20;
    const luminosidad = Math.floor(Math.random() * 71) + 15;

    return {
        tono: tono,
        saturacion: saturacion,
        luminosidad: luminosidad,
        bloqueado: false
    };
}

function convertirAHex(tono, saturacion, luminosidad) {
    const s = saturacion / 100;
    const l = luminosidad / 100;
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((tono / 60) % 2 - 1));
    const m = l - c / 2;

    let rojo = 0;
    let verde = 0;
    let azul = 0;

    if (tono < 60) {
        rojo = c;
        verde = x;
    } else if (tono < 120) {
        rojo = x;
        verde = c;
    } else if (tono < 180) {
        verde = c;
        azul = x;
    } else if (tono < 240) {
        verde = x;
        azul = c;
    } else if (tono < 300) {
        rojo = x;
        azul = c;
    } else {
        rojo = c;
        azul = x;
    }

    const r = Math.round((rojo + m) * 255).toString(16).padStart(2, "0");
    const g = Math.round((verde + m) * 255).toString(16).padStart(2, "0");
    const b = Math.round((azul + m) * 255).toString(16).padStart(2, "0");

    return `#${r}${g}${b}`.toUpperCase();
}

function obtenerCodigo(color) {
    if (selectorFormato.value === "HEX") {
        return convertirAHex(
            color.tono,
            color.saturacion,
            color.luminosidad
        );
    }

    return `hsl(${color.tono}, ${color.saturacion}%, ${color.luminosidad}%)`;
}

function mostrarPaleta() {
    contenedor.replaceChildren();

    for (let i = 0; i < colores.length; i++) {
        const color = colores[i];

        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjetaColor");

        tarjeta.style.backgroundColor =
            `hsl(${color.tono}, ${color.saturacion}%, ${color.luminosidad}%)`;

        const botonBloquear = document.createElement("button");
        botonBloquear.type = "button";
        botonBloquear.classList.add("botonBloquear");
        botonBloquear.textContent = color.bloqueado ? "🔒" : "🔓";

        botonBloquear.title = color.bloqueado
            ? "Desbloquear color"
            : "Bloquear color";

        botonBloquear.setAttribute(
            "aria-label",
            color.bloqueado ? "Desbloquear color" : "Bloquear color"
        );

        botonBloquear.setAttribute(
            "aria-pressed",
            String(color.bloqueado)
        );

        botonBloquear.addEventListener("click", function () {
            color.bloqueado = !color.bloqueado;
            mostrarPaleta();
        });

        const etiqueta = document.createElement("div");
        etiqueta.classList.add("etiquetaColor");

        const titulo = document.createElement("h3");
        titulo.textContent = selectorFormato.value;

        const codigo = document.createElement("p");
        codigo.textContent = obtenerCodigo(color);

        const botonCopiar = document.createElement("button");
        botonCopiar.type = "button";
        botonCopiar.classList.add("botonCopiar");
        botonCopiar.textContent = "Copiar";

        botonCopiar.addEventListener("click", async function () {
            try {
                await navigator.clipboard.writeText(obtenerCodigo(color));
                mensajeEstado.textContent = "Código copiado: " + obtenerCodigo(color);
            } catch (error) {
                mensajeEstado.textContent = "No se pudo copiar. Abre la página en localhost o HTTPS.";
            }
        });

        etiqueta.appendChild(titulo);
        etiqueta.appendChild(codigo);
        etiqueta.appendChild(botonCopiar);

        tarjeta.appendChild(botonBloquear);
        tarjeta.appendChild(etiqueta);

        contenedor.appendChild(tarjeta);
    }
}

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
    mensajeEstado.textContent = "";
    mostrarPaleta();
    mensajeEstado.textContent = "¡paleta creada con èxito!";

        setTimeout(function () {
        mensajeEstado.textContent = "";
        }, 3000);
}

selectorCantidad.addEventListener("change", generarPaleta);
selectorFormato.addEventListener("change", mostrarPaleta);
botonGenerar.addEventListener("click", generarPaleta);

generarPaleta();
