# Colorfly Studio 🎨

## Descripción del proyecto

Colorfly Studio es una aplicación web que permite generar paletas de colores aleatorios de una manera sencilla.

El proyecto fue desarrollado utilizando HTML, CSS y JavaScript, con el objetivo de poner en práctica los conocimientos adquiridos durante el aprendizaje de desarrollo web.

La aplicación permite generar diferentes combinaciones de colores, consultar sus códigos, bloquear los colores que se quieran conservar y recuperar paletas generadas anteriormente.

## Tecnologías utilizadas

- **HTML:** se utiliza para crear la estructura de la página, los botones, los selectores y los demás elementos.
- **CSS:** permite dar estilos a la aplicación, organizar las tarjetas de colores y adaptar el diseño a diferentes tamaños de pantalla.
- **JavaScript:** permite generar los colores aleatorios, realizar las conversiones, controlar los botones y guardar las paletas.
- **localStorage:** se utiliza para guardar información en el navegador y recuperarla cuando se vuelve a abrir la página.

## Funcionalidades del proyecto

### Generación de paletas

La aplicación permite generar paletas de 6, 8 o 9 colores aleatorios. Al presionar el botón **Generar paleta**, se crean nuevos colores y se muestran en tarjetas.

### Formatos de colores

Los colores se generan en formato hexadecimal (HEX) y pueden visualizarse también en formato HSL.

Para realizar la conversión se obtienen primero los valores RGB del color hexadecimal y después se calculan los valores HSL.

### Bloqueo de colores

Cada tarjeta tiene un botón con un candado que permite bloquear o desbloquear un color.

Cuando un color está bloqueado, se conserva en su posición al generar una nueva paleta, mientras los demás colores cambian.

### Copiar colores

Al hacer clic sobre una tarjeta o en el botón **Copiar**, se copia el código HEX del color al portapapeles.

La aplicación muestra un mensaje para indicar si el código se copió correctamente.

### Historial de paletas

La aplicación guarda automáticamente las últimas 10 paletas generadas.

Mediante un selector, el usuario puede consultar y recuperar una paleta anterior sin necesidad de generar nuevamente los mismos colores.

### Almacenamiento local

Se utiliza `localStorage` para guardar la paleta actual y el historial en el navegador.

Esto permite conservar los colores y los bloqueos al actualizar o volver a abrir la página, siempre que no se eliminen los datos almacenados.

### Diseño y animaciones

La aplicación tiene un diseño sencillo, con tarjetas de colores organizadas mediante CSS Grid.

También incluye una animación suave cuando se generan nuevos colores. Los colores bloqueados no presentan esta animación.

El diseño se adapta a diferentes tamaños de pantalla, como computadores, tabletas y celulares.

## Cómo utilizar Colorfly Studio

1. Abrir la aplicación en el navegador.
2. Seleccionar la cantidad de colores que se desea generar: 6, 8 o 9.
3. Elegir el formato en el que se quieren visualizar los códigos: HEX o HSL.
4. Presionar el botón **Generar paleta**.
5. Bloquear con el candado los colores que se quieran conservar.
6. Hacer clic sobre una tarjeta o en el botón **Copiar** para copiar el código hexadecimal.
7. Utilizar el historial para recuperar alguna de las últimas paletas generadas.

## Estructura del proyecto

El proyecto está organizado en tres archivos principales:

```text
Colorfly-Studio/
├── index.html
├── style.css
├── script.js
└── README.md
```

- `index.html`: contiene la estructura de la aplicación.
- `style.css`: contiene los estilos, colores, tamaños y distribución de los elementos.
- `script.js`: contiene las funciones que permiten generar, mostrar, bloquear, copiar y guardar los colores.
- `README.md`: contiene la descripción y las instrucciones del proyecto.

## Cómo ejecutar el proyecto

1. Descargar o clonar el repositorio desde GitHub.
2. Abrir la carpeta del proyecto en Visual Studio Code.
3. Abrir el archivo `index.html` utilizando Live Server.
4. La aplicación se abrirá en el navegador y estará lista para utilizarse.

Se recomienda utilizar Live Server para que la función de copiar colores al portapapeles funcione correctamente.

## Cómo publicar el proyecto en GitHub Pages

1. Crear un repositorio en GitHub.
2. Subir los archivos del proyecto al repositorio.
3. Entrar a **Settings** y seleccionar **Pages**.
4. En **Build and deployment**, seleccionar **Deploy from a branch**.
5. Elegir la rama `main` y la carpeta `/ (root)`.
6. Hacer clic en **Save**.
7. Esperar a que GitHub Pages publique el proyecto y genere el enlace de la página.

Una vez publicado, el proyecto puede utilizarse desde un navegador sin necesidad de instalar programas.

## Objetivo de aprendizaje

Con este proyecto se ponen en práctica conceptos básicos de programación y desarrollo web, como el uso de variables, funciones, condicionales, ciclos, arreglos y eventos en JavaScript.

También se trabaja con la manipulación de elementos HTML desde JavaScript, el uso de CSS Grid para organizar los colores y el almacenamiento de información mediante localStorage.

## Autor

Proyecto desarrollado por Libardo Carreño Sarmiento 