let bloque1 = document.getElementById("bloque1");
let bloque2 = document.getElementById("bloque2");
let bloque3 = document.getElementById("bloque3");
let bloque4 = document.getElementById("bloque4");
let bloque5= document.getElementById("bloque5");



bloque1.innerHTML= `<h1 class="title">Bienvenido a Presupuestos DA</h1> `;
bloque2.innerHTML=`<h1 class="subtitle">Elegi la opcion que te gustaria ver</h1> `
bloque3.innerHTML=  ` 
                        <button class="boton boton-container" id="presupuestoboton">Crear Presupuesto</button>
                        <button class="boton boton-container" id="definir">Definir Valores</button>
                       `

bloque4.innerHTML=` 
                
                <button class="boton boton-container" id="honorario">Honorarios</button>
                `


document.getElementById("presupuestoboton").onclick = () => {
     window.location.href = "../Presupuesto/listarar.html"; 
     };

document.getElementById("honorario").onclick = () => {
     window.location.href = "../Honorarios/honorario.html"; 
     };

     document.getElementById("definir").onclick = async () => {

            bloque1.innerHTML= `<h1 class="title">Valida tus datos</h1> `
            bloque2.innerHTML= `<h2 class="subtitle">Area restringida para administradores </h2> `
            
    
            bloque5.innerHTML= ` 
                                <label for="adminuser">Ingresa tu usuario:</label>
                                <input  id="user" type="text" />
                                <label for="adminpss">Ingresa tu contraseña:</label>
                                            <input id="pss" type="password" /> 
                                <button class="buttonform" type="button" id="login">Enviar Datos</button>`;           

            bloque3.innerHTML = "" ;
            bloque4.innerHTML= "" ;                               

      
            document.getElementById("login").onclick = async () => {
              const usuario = document.getElementById("user").value;
              const password = document.getElementById("pss").value;
      
              if (!usuario || !password) {
                  document.getElementById("mensaje").textContent = "Debe ingresar usuario y contraseña.";
                  return;
              }
      
              try {
                  const response = await fetch("http://localhost:3000/api/login", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ usuario, password })
                  });
      
                  const data = await response.json();
      
                  if (response.ok) {
                      localStorage.setItem("token", data.token);  // Guardar token
                      bloque2.innerHTML = `<h2 class="subtitle">Acceso concedido  Redirigiendo...</h2>`;
                      setTimeout(() => {
                          window.location.href = "../CrearParametros/parametro.html"; 
                      }, 2000); // Redirige después de 2 segundos
                  } else {
                      document.getElementById("mensaje").textContent = "Usuario o contraseña incorrectos ";
                  }
              } catch (error) {
                  console.error("Error:", error);
                  document.getElementById("mensaje").textContent = "Error en la autenticación.";
              }
          };
      };
      