document.addEventListener("DOMContentLoaded", function() {
    console.log('Script cargado y ejecutado');

let footer = document.getElementById ("footer");

footer.innerHTML = `
<button class="boton2 boton-container" id="home">Crear Presupuesto</button>
<button class="boton2 boton-container" id="definir1">Definir Valores</button>
<button class="boton2 boton-container" id="presupuestoboton">Crear Presupuesto</button>
<button class="boton2 boton-container" id="definir2">Definir Valores</button>

`;

});