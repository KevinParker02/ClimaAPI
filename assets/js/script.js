//Obtener los elementos del index

// Va sin # porque ya le decimos que viene de un elemento ID
const ObtCiudad = document.getElementById("ciudad");
const obtenerPronosticoBtn = document.getElementById("ObtPronostico");
const PronosticoDiv = document.getElementById("pronostico");
const errorContainer = document.getElementById("ErroMsg");

obtenerPronosticoBtn.addEventListener('click', obtenerPronostico);

function obtenerPronostico(){
    const ciudad = ObtCiudad.value.trim();

    if(ciudad===''){
        mostrarError("Debe ingresar una ciudad valida...");
        return
    }

    // Aquí deberás pegar tu API key.
    const apiKey = "5f5b834238dbbf0dd53be24d9c9adb2a";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;

    //Una solicitud HTTP utilizando fecth con la URL construida
    fetch(url)
        .then(response => response.json())
        .then(data => {
            mostrarPronostico(data);
        })
        //Mensaje de error para que no se caiga el código.
        .catch(error=>{
            mostrarError("Error al mostrar el pronóstico, reintente...");
        });
};

//Recibe los datos de 'data'
function mostrarPronostico(data){
    // Constante con parámetros.
    const{name, main, weather, wind}=data;
    // Obtenemos la temperatura (cada datro se encuentra en la página de OpenWeather).
    const icono = weather[0].icon;
    const temperatura = main.temp;
    // --------- las ráfagas de viento.
    const rafagasViento = wind.speed;
    // --------- la humedad.
    const humedad = main.humidity;
    // --------- la descripcion.
    const desc = weather[0].description;

    // No me funcionaron los estilos en CSS asi que obligado a hacerlo aquí
    const pronosticoHTML = `
        <div class="card" style="text-align: center; padding-top: 3%; padding-bottom: 3%; background-color: rgba(255, 255, 255, 0.7); box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);>
            <div class="card-body">
                <h2 class="card-tittle">${name}</h2>
                <img src="https://openweathermap.org/img/wn/${icono}@2x.png" alt="icon" style="width: 150px; height: 150px; margin: 0 auto;>
                <p class="card-text">Temperatura: ${temperatura} °C</p>
                <p class="card-text">Ráfagas de viento: ${rafagasViento} m/s</p>
                <p class="card-text">% de humedad: ${humedad} %</p>
                <p class="card-text">Descripción: ${desc}</p>
            </div>
        </div>
    `;

    //Insertar el JS dentro del HTML (Unir con el div que está vacío en HTML)
    PronosticoDiv.innerHTML = pronosticoHTML;

}

function mostrarError(message){
    const errorHTML = `
        <div class="alert alert-danger" role="alert" style="margin-top: 5%; padding: 5px; display: inline-block; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);">
        ${message}
        </div>
    `;
    ErroMsg.innerHTML=errorHTML;

    // Desaparece el mensaje de error
    setTimeout(function(){
        ErroMsg.innerHTML = ''; // Limpiar el contenido del elemento ErroMsg
    }, 5000);
}