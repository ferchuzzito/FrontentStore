'use strict'
document.addEventListener('DOMContentLoaded', function () {

     // trae las playeras
     mostrarPlayeras();

});
async function mostrarPlayeras() {
     try {
          const resultado = await fetch('./playeras.json');
          const db = await resultado.json();
          const {
               playeras
          } = db;
          console.log(playeras)
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
               console.log(playerasDiv);

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
}