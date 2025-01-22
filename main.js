let bloque1 = document.getElementById("bloque1");
let bloque2 = document.getElementById("bloque2");
let bloque3 = document.getElementById("bloque3");

function inicio() {
    // Establece el contenido inicial del bloque 1
    bloque1.innerHTML = `
        <h1>ARMEMOS TU PRESUPUESTO</h1>
        <h2>Llená los campos con los parámetros y te haremos el presupuesto</h2>
        <h3>Elegí el país de donde sacaremos la referencia de los precios</h3>
    `;

    // Crea los botones en el bloque 2
    bloque2.innerHTML = `
        <button id="mi_boton">Estados Unidos</button>
        <button id="mi_boton2">Argentina</button>
    `;

    // Agrega eventos de clic
    document.getElementById("mi_boton").onclick = listaeu;
    document.getElementById("mi_boton2").onclick = listaar;
}



function listaeu() {

    

    // Declaración de productos globales
   
    bloque1.innerHTML = `
        <h1>Fill out the form with the corresponding information</h1>
        <h3>Your budget is almost ready</h3>
    `;

    bloque2.innerHTML = `
        <label for="job">Select the service:</label>
        <select id="job">
            <option value="" disabled selected>Choose a field</option>
            <option value="website">Web Site</option>
            <option value="seo">SEO</option>
            <option value="website_seo">Web Site + SEO</option>
            <option value="social_media">Social Media</option>
        </select>
        <p id="result"></p>
        
        <label for="complexity">Select the complexity of the project:</label>
        <select id="complexity">
            <option value="" disabled selected>Choose a field</option>
            <option value="low">Up to 3 pages</option>
            <option value="medium">Up to 10 pages</option>
            <option value="high">More than 10 pages</option>
            <option value="social_media1">1 Social Media</option>
            <option value="social_media2">2 Social Media</option>
            <option value="social_media3">3 or more Social Media</option>
        </select>

        <label for="name">Enter your name:</label>
        <input id="name" type="text" />

        <label for="last_name">Enter your last name:</label>
        <input id="last_name" type="text" />

        <label for="phone">Enter your phone number:</label>
        <input id="phone" type="tel" />
        <div id="errorPhone" style="color: red;"></div>

        <label for="email">Enter your email:</label>
        <input id="email" type="email" />
    `;

    document.getElementById("job").addEventListener("change", function () {
        const service = this.value;
        const complexitySelect = document.getElementById("complexity");

        complexitySelect.innerHTML = "";

        if (service === "website" || service === "seo" || service === "website_seo") {
            complexitySelect.innerHTML = `
                <option value="" disabled selected>Choose a field</option>
                <option value="low">Up to 3 pages</option>
                <option value="medium">Up to 10 pages</option>
                <option value="high">More than 10 pages</option>
            `;
        } else if (service === "social_media") {
            complexitySelect.innerHTML = `
                <option value="" disabled selected>Choose a field</option>
                <option value="social_media1">1 Social Media</option>
                <option value="social_media2">2 Social Media</option>
                <option value="social_media3">3 or more Social Media</option>
            `;
        }
    });

    const products = [
        { service: 'website', complexity: 'high', price: 2000 },
        { service: 'website', complexity: 'medium', price: 1000 },
        { service: 'website', complexity: 'low', price: 700 },
        { service: 'website_seo', complexity: 'high', price: 2700 },
        { service: 'website_seo', complexity: 'medium', price: 1500 },
        { service: 'website_seo', complexity: 'low', price: 1000 },
        { service: 'seo', complexity: 'low', price: 300 },
        { service: 'seo', complexity: 'medium', price: 500 },
        { service: 'seo', complexity: 'high', price: 700 },
        { service: 'social_media', complexity: 'social_media1', price: 200 },
        { service: 'social_media', complexity: 'social_media2', price: 400 },
        { service: 'social_media', complexity: 'social_media3', price: 600 },
        { }
    ];

    bloque3.innerHTML = `
        <button type="button" id="enviar">Submit</button>
        <button type="button" id="clear">Clear</button>
    `;

    document.getElementById("enviar").onclick = () => {
        const phone = document.getElementById("phone").value;
        const errorPhone = document.getElementById("errorPhone");

        const isValidPhone = phone && !phone.includes(' ') && phone.length === 10 && !isNaN(phone);

        if (isValidPhone) {
            errorPhone.innerHTML = "";

            const selectedservice = document.getElementById("job").value;
            const selectedcomplexity = document.getElementById("complexity").value;

            const matchingproduct = products.find(product => 
                product.service === selectedservice && product.complexity === selectedcomplexity
            );

            const result = document.getElementById("result");
            result.innerHTML = matchingproduct 
                ? `The price for your selected service is: $${matchingproduct.price}` 
                : "Sorry, no matching product found.";
            
            localStorage.setItem("formData", JSON.stringify({
                service: document.getElementById("job").value,
                complexity: document.getElementById("complexity").value,
                name: document.getElementById("name").value,
                last_name: document.getElementById("last_name").value,
                phone: document.getElementById("phone").value,
                email: document.getElementById("email").value,
            }));
        } else {
            errorPhone.innerHTML = "Invalid phone number. It should have 10 digits without spaces.";
            document.getElementById("enviar").disabled = true;
        }
    };

    document.getElementById("phone").addEventListener("input", () => {
        const phone = document.getElementById("phone").value;
        const errorPhone = document.getElementById("errorPhone");

        const isValidPhone = phone && !phone.includes(' ') && phone.length === 10 && !isNaN(phone);

        isValidPhone ? (
            errorPhone.innerHTML = "",
            document.getElementById("enviar").disabled = false
        ) : (
            errorPhone.innerHTML = "Invalid phone number. It should have 10 digits without spaces.",
            document.getElementById("enviar").disabled = true
        );
    });

    document.getElementById("clear").onclick = () => {
        document.getElementById("phone").value = "";
        document.getElementById("name").value = "";
        document.getElementById("last_name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("result").innerHTML="";
        document.getElementById("job").selectedIndex = 0;
        document.getElementById("complexity").selectedIndex = 0;
        localStorage.removeItem("formData");
        

        document.getElementById("errorPhone").innerHTML = "";
        document.getElementById("enviar").disabled = false;
    };
}

    
function listaar() {
    bloque1.innerHTML = `
        <h1>Llena el formulario con los datos correspondientes</h1>
        <h3>Tu presupuesto está casi listo</h3>
    `;

    bloque2.innerHTML = `
        <label for="rubro">Selecciona el servicio:</label>
        <select id="rubro">
            <option value="" disabled selected>Elige un campo</option>
            <option value="sitio_web">Sitio Web</option>
            <option value="seo">SEO</option>
            <option value="sitio_seo">Sitio Web + SEO</option>
            <option value="redes_sociales">Redes Sociales</option>
        </select>
        <p id="resultado"></p>
        
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
                <option value="red_social1">1 Red Social</option>
                <option value="red_social2">2 Redes Sociales</option>
                <option value="red_social3">3 o más Redes Sociales</option>
            `;
        }
    });

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

    bloque3.innerHTML = `
        <button type="button" id="enviar">Enviar Datos </button>
        <button type="button" id="borrar">Borrar Datos </button>
    `;


    document.getElementById("enviar").onclick = () => {
        const telefono = document.getElementById("telefono").value;
        const mensajeerror = document.getElementById("errorTelefono");
        const servicioelejido = document.getElementById("rubro").value;
        const complejidadelejida = document.getElementById("paginas").value;
    
        const valido = telefono && !telefono.includes(' ') && telefono.length === 10 && !isNaN(telefono);
    
        if (valido) {
            const encontrarproducto = productos.find(producto => 
                producto.servicioproducto === servicioelejido && producto.complejidad === complejidadelejida
            );
            
    
            const resultado = document.getElementById("resultado");
            resultado.innerHTML = encontrarproducto 
                ? `El precio del servicio elejido es de: $${encontrarproducto.precio} Pesos Argentinos` 
                : "No hay ningun producto que coincida con lo que buscas.";
    
            mensajeerror.innerHTML = "";  // Limpiar mensaje de error
            localStorage.setItem("datosFormulario", JSON.stringify({
                servicio: servicioelejido,
                complejidad: complejidadelejida,
                nombre: document.getElementById("nombre").value,
                apellido: document.getElementById("apellido").value,
                telefono: telefono,
                correo: document.getElementById("correo").value,
            }));
        } else {
            mensajeerror.innerHTML = "Número de teléfono inválido. Debe tener 10 dígitos sin espacios.";
            document.getElementById("enviar").disabled = true;
        }
    };
    
    // Verificación en tiempo real del teléfono
    document.getElementById("telefono").addEventListener("input", () => {
        const telefono = document.getElementById("telefono").value;
        const mensajeerror = document.getElementById("errorTelefono");

        const valido = telefono && !telefono.includes(' ') && telefono.length === 10 && !isNaN(telefono);

        valido ? (
            mensajeerror.innerHTML = "",
            document.getElementById("enviar").disabled = false
        ) : (
            mensajeerror.innerHTML = "Número de teléfono inválido. Debe tener 10 dígitos sin espacios.",
            document.getElementById("enviar").disabled = true
        );
    });

    // Limpiar el formulario y habilitar el botón de nuevo
    document.getElementById("borrar").onclick = () => {
        document.getElementById("telefono").value = "";
        document.getElementById("nombre").value = "";
        document.getElementById("apellido").value = "";
        document.getElementById("correo").value = "";
        document.getElementById("resultado").innerHTML="";
        document.getElementById("rubro").selectedIndex = 0;
        document.getElementById("paginas").selectedIndex = 0;
        localStorage.removeItem("datosFormulario");
    

        document.getElementById("errorTelefono").innerHTML = ""; // Limpiar el mensaje de error
        document.getElementById("enviar").disabled = false; // Habilitar el botón de nuevo
    };
}

inicio();
