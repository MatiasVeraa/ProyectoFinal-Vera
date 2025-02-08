document.addEventListener("DOMContentLoaded", function () {
    let bloque1 = document.getElementById("bloque1");
    let bloque2 = document.getElementById("bloque2");
    let bloque3 = document.getElementById("bloque3");
    let bloque4 = document.getElementById("bloque4");

    bloque1.innerHTML = `<h1 class="title">Tu presupuesto está casi listo</h1>`;
    bloque2.innerHTML = `<h2 class="subtitle">Llena el formulario con los datos correspondientes</h2>`;

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
            <option value="" disabled selected>Elige un servicio primero</option>
        </select>

        <label for="nombre">Ingresa tu nombre:</label>
        <input id="nombre" type="text" />

        <label for="apellido">Ingresa tu apellido:</label>
        <input id="apellido" type="text" />

        <label for="telefono">Ingresa tu número de celular:</label>
        <input id="telefono" type="tel" />
        <div id="errorTelefono" style="color: red;"></div>

        <label for="correo">Ingresa tu correo electrónico:</label>
        <input id="correo" type="email" />
    `;

    bloque4.innerHTML = `<button class="buttonform" type="button" id="enviar">Enviar Datos</button>`;

    const productos = JSON.parse(localStorage.getItem("productos")) || [];

    document.getElementById("rubro").addEventListener("change", function () {
        const servicio = this.value;
        const complejidadproyecto = document.getElementById("paginas");

        complejidadproyecto.innerHTML = "";

        if (servicio === "sitio_web" || servicio === "seo" || servicio === "sitio_seo") {
            complejidadproyecto.innerHTML = `
                <option value="" disabled selected>Elige un campo</option>
                <option value="bajo">Hasta 3 páginas</option>
                <option value="medio">Hasta 10 páginas</option>
                <option value="alto">Más de 10 páginas</option>
            `;
        } else if (servicio === "redes_sociales") {
            complejidadproyecto.innerHTML = `
                 <option value="" disabled selected>Elige un campo</option>
                <option value="bajo">1 Red Social</option>
                 <option value="medio">2 Redes Sociales</option>
                 <option value="alto">3 o más Redes Sociales</option>
    `;
        }
    });

    function enviarFormulario() {
        const telefono = document.getElementById("telefono").value;
        const mensajeerror = document.getElementById("errorTelefono");
        const servicioelejido = document.getElementById("rubro").value;
        const complejidadelejida = document.getElementById("paginas").value;

        const valido = telefono && !telefono.includes(' ') && telefono.length === 10 && !isNaN(telefono);

        if (valido) {
            // Comparar correctamente con los valores del localStorage
            const encontrarproducto = productos.find(producto =>
                producto.servicioproducto === servicioelejido && producto.complejidad === complejidadelejida
            );

            if (encontrarproducto) {
                bloque1.innerHTML = `<h1 class="title">Presupuesto Final</h1>`;
                bloque5.innerHTML = `
                    <ul>
                        <li>Servicio: ${encontrarproducto.servicioproducto}</li>
                        <li>Complejidad: ${encontrarproducto.complejidad}</li>
                        <li>Precio: $${encontrarproducto.precio}</li>
                    </ul><br>
                    <p> El presente documento tiene carácter meramente estimativo...</p>
                `;

                bloque2.innerHTML = `<button class="boton" id="pdf">Descargar PDF</button>`;
                bloque3.innerHTML = "";
                bloque4.innerHTML = "";

                setTimeout(() => {
                    document.getElementById("descargarPDF").addEventListener("click", capturarPantalla);
                }, 100);

            } else {
                document.getElementById("resultado").innerHTML = "No hay ningún producto que coincida con lo que buscas.";
            }

            mensajeerror.innerHTML = "";

            localStorage.setItem("datosFormulario", JSON.stringify({
                servicio: servicioelejido,
                complejidad: complejidadelejida,
                nombre: document.getElementById("nombre").value,
                apellido: document.getElementById("apellido").value,
                telefono: telefono,
                correo: document.getElementById("correo").value,
                precio: encontrarproducto ? encontrarproducto.precio : "No disponible"
            }));

            document.getElementById("enviar").disabled = false;
        } else {
            mensajeerror.innerHTML = "Número de teléfono inválido. Debe tener 10 dígitos sin espacios.";
            document.getElementById("enviar").disabled = true;
        }
    }

    document.getElementById("enviar").onclick = enviarFormulario;
});

function capturarPantalla() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4"
    });

    const pdfElement = document.getElementById("pdf");

    html2canvas(pdfElement, { scale: 2 }).then(canvas => {
        let imgData = canvas.toDataURL("image/png");

        let imgWidth = 190;
        let imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (imgHeight > 280) imgHeight = 280;

        doc.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        doc.save("presupuesto.pdf");
    });
}
