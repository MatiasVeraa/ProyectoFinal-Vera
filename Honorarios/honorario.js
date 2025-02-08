let bloque1 = document.getElementById("bloque1");
let bloque2 = document.getElementById("bloque2");
let bloque3 = document.getElementById("bloque3");
let bloque4 = document.getElementById ("bloque4");


bloque1.innerHTML = `
<h1 class="title">Honorarios</h1>

`;

bloque2.innerHTML = `
<h2 class="subtitle">La transparencia nos destaca, estos son los valores de los servicios</h2>

`;


const productos = JSON.parse(localStorage.getItem("productos")) || [];



// Verificar si hay productos y mostrarlos en una lista
if (productos.length > 0) {
    let listaProductos = "<ul>";
    
    productos.forEach(producto => {
        listaProductos += `
            <li>
                Servicio: ${producto.servicioproducto} - 
                Complejidad: ${producto.complejidad} - 
                Precio: $${producto.precio}
            </li>
        `;
    });
    
    listaProductos += "</ul>";
    
    bloque3.innerHTML = listaProductos;  // Insertar la lista en bloque3
} else {
    bloque3.innerHTML = "<p>No se encontraron productos en localStorage.</p>";
}
