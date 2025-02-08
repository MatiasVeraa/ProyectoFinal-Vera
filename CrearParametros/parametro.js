let bloque1 = document.getElementById("bloque1")
let bloque2 = document.getElementById("bloque2")
let bloque3 = document.getElementById("bloque3")
let bloque4 = document.getElementById("bloque4")

const productos = [
    { servicioproducto: 'sitio_web', complejidad: 'alto', precio: 200000 },
    { servicioproducto: 'sitio_web', complejidad: 'medio', precio: 100000 },
    { servicioproducto: 'sitio_web', complejidad: 'bajo', precio: 80000 },
    { servicioproducto: 'sitio_seo', complejidad: 'alto', precio: 270000 },
    { servicioproducto: 'sitio_seo', complejidad: 'medio', precio: 150000 },
    { servicioproducto: 'sitio_seo', complejidad: 'bajo', precio: 111000 },
    { servicioproducto: 'seo', complejidad: 'bajo', precio: 30000 },
    { servicioproducto: 'seo', complejidad: 'medio', precio: 50000 },
    { servicioproducto: 'seo', complejidad: 'alto', precio: 70000 },
    { servicioproducto: 'redes_sociales', complejidad: 'alto', precio: 50000 },
    { servicioproducto: 'redes_sociales', complejidad: 'medio', precio: 90000 },
    { servicioproducto: 'redes_sociales', complejidad: 'bajo', precio: 170000 },
];

console.log("Guardando productos en localStorage");
localStorage.setItem("productos", JSON.stringify(productos));

bloque1.innerHTML = `<h1 class="title"> Defini los Valores</h1>`;

bloque2.innerHTML = `<h2 class="subtitle"> Es una Beta. En la proxima actualizacion tambien podras cambiar los productos </h2>`;

bloque3.innerHTML = `
    <label for="rubro">Selecciona el servicio:</label>
    <select id="rubro">
        <option value="" disabled selected>Elige un campo</option>
        <option value="sitio_web">Sitio Web</option>
        <option value="seo">SEO</option>
        <option value="sitio_seo">Sitio Web + SEO</option>
        <option value="redes_sociales">Redes Sociales</option>
    </select>

    <label for="paginas">Selecciona la complejidad del proyecto:</label>
    <select id="paginas">
        <option value="" disabled selected>Elige un campo</option>
        <option value="bajo">Hasta 3 páginas</option>
        <option value="medio">Hasta 10 páginas</option>
        <option value="alto">Más de 10 páginas</option>
        <option value="bajo">1 Red Social</option>
        <option value="medio">2 Redes Sociales</option>
        <option value="alto">3 o más Redes Sociales</option>
    </select>

    <input type="number" id="precioInput" placeholder="Nuevo precio" />
    <button class="buttonform" type="submit">Actualizar Precio</button>
`;

const rubro = document.getElementById("rubro");
const paginas = document.getElementById("paginas");
const precioInput = document.getElementById("precioInput");
const botonenviar = document.querySelector(".buttonform");

botonenviar.addEventListener("click", (e) => {
    e.preventDefault();

    const servicioSeleccionado = rubro.value;
    const complejidadSeleccionada = paginas.value;
    const nuevoPrecio = parseFloat(precioInput.value);
    

    // Validación del precio
    if (isNaN(nuevoPrecio) || nuevoPrecio <= 0) {
        bloque4.innerHTML = `<p class="error"> Error al ingresar el precio </p>`;
        return;
    }

    // Buscar el producto en el array
    const indiceProducto = productos.findIndex(producto =>
        producto.servicioproducto === servicioSeleccionado && producto.complejidad === complejidadSeleccionada
    );

    if (indiceProducto !== -1) {
        // Modificar el precio
        productos[indiceProducto].precio = nuevoPrecio;

        // Actualizar productos en localStorage
        localStorage.setItem("productos", JSON.stringify(productos));

        bloque4.innerHTML = `<p> Precio actualizado correctamente </p>`;
    } else {
        bloque4.innerHTML = `<p> El dato fue incorrecto. Por favor intente nuevamente. </p>`;

    }

    });
