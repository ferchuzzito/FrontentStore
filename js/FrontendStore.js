'use strict'

let pagina = 1;
document.addEventListener('DOMContentLoaded', function () {

     // trae las playeras
     mostrarPlayeras();
     mostrarSeccion()
     cambiarSeccion();
});

async function mostrarPlayeras() {
     try {
          const resultado = await fetch('./playeras.json');
          const db = await resultado.json();
          const {
               playeras
          } = db;
          // Generar el HTML
          playeras.forEach(playera => {
               const {
                    id,
                    imagen,
                    nombre,
                    precio
               } = playera;

               const playerasDiv = document.createElement('DIV');
               playerasDiv.classList.add('producto');
               playerasDiv.dataset.idProducto = id;

               const linkProducto = document.createElement('A');
               linkProducto.setAttribute('href', 'Producto.html')
               const infoProducto = document.createElement('DIV');
               infoProducto.classList.add('producto__informacion');

               const nombrePlayeras = document.createElement('P');
               nombrePlayeras.textContent = nombre;
               nombrePlayeras.classList.add('producto__nombre');

               const imagenPlayeras = document.createElement('IMG');
               imagenPlayeras.setAttribute('src', imagen);
               imagenPlayeras.classList.add('producto__imagen');

               const precioPlayeras = document.createElement('p');
               precioPlayeras.textContent = `$${precio}`;
               precioPlayeras.classList.add('producto__precio');

               linkProducto.appendChild(imagenPlayeras);
               infoProducto.appendChild(nombrePlayeras);
               infoProducto.appendChild(precioPlayeras);
               linkProducto.appendChild(infoProducto);
               playerasDiv.appendChild(linkProducto)
               document.querySelector('#playeras').appendChild(playerasDiv);

          });

     } catch (error) {
          console.log(error);
     }
};

function cambiarSeccion() {
     const enlaces = document.querySelectorAll('.navegacion .navegacion__enlace');
     enlaces.forEach(enlace => {
          enlace.addEventListener('click', e => {
               e.preventDefault();
               pagina = parseInt(e.target.dataset.menu);
               mostrarSeccion();
          });
     });
}

function mostrarSeccion() {

     // Eliminar mostrar-seccion de la sección anterior
     const seccionAnterior = document.querySelector('.mostrar-seccion');
     if (seccionAnterior) {
          seccionAnterior.classList.remove('mostrar-seccion');
     }

     const seccionActual = document.querySelector(`#menu-${pagina}`);
     seccionActual.classList.add('mostrar-seccion');

     // Eliminar la clase de actual en el tab anterior
     const tabAnterior = document.querySelector('.navegacion__enlace navegacion__enlace--activo');
     if (tabAnterior) {
          tabAnterior.classList.remove('navegacion__enlace--activo');
     }

     // Resalta el Tab Actual
     const tab = document.querySelector(`[data-menu="${pagina}"]`);
     tab.classList.add('navegacion__enlace--activo');
}