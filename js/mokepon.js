let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

function iniciarJuego() {
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    sectionSeleccionarAtaque.style.display = 'none';

    let sectionReiniciar = document.getElementById('reiniciar');
    sectionReiniciar.style.display = 'none';

    let botonMascotaJugador = document.getElementById('boton-mascota');
    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    
    spanAtaqueJugador = document.getElementById('ataque-jugador');
    spanAtaqueEnemigo = document.getElementById('ataque-enemigo');
    
    let botonFuego = document.getElementById('boton-fuego');
    botonFuego.addEventListener('click', ataqueFuego);
    let botonAgua = document.getElementById('boton-agua');
    botonAgua.addEventListener('click', ataqueAgua);
    let botonTierra = document.getElementById('boton-tierra');
    botonTierra.addEventListener('click', ataqueTierra);
    
    let botonReiniciar = document.getElementById('boton-reiniciar');
    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function combate(){
    let spanVidasJugador = document.getElementById('vidas-jugador');
    let spanVidasEnemigo = document.getElementById('vidas-enemigo');

    if(ataqueJugador == ataqueEnemigo){
        crearMensaje('EMPATE');
    } else if(ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA'){
        crearMensaje('GANASTE');
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if(ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO'){
        crearMensaje('GANASTE');
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else if(ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA'){
        crearMensaje('GANASTE');
        vidasEnemigo--;
        spanVidasEnemigo.innerHTML = vidasEnemigo;
    } else {
        crearMensaje('PERDISTE');
        vidasJugador--;
        spanVidasJugador.innerHTML = vidasJugador;
    }
    revisarVidas();
}
function revisarVidas(){
    if (vidasJugador == 0) {
        crearMensajeFinal('LO SIENTO, PERDISTE');
    } else if(vidasEnemigo == 0) {
        crearMensajeFinal('FELICITACIONES GANASTE');
    }
}

function crearMensaje(resultado){
    let sectionMensajes = document.getElementById('resultado');
    let ataqueDelJugador = document.getElementById('ataques-jugador');
    let ataqueDelEnemigo = document.getElementById('ataques-enemigo');

    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;
    
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}
function crearMensajeFinal(resultadoFinal){
    let sectionMensajes = document.getElementById('resultado');
    sectionMensajes.innerHTML = resultadoFinal;
    finDelJuego();
}

function ataqueFuego(){
    ataqueJugador = 'FUEGO';
    seleccionarAtaqueEnemigo();
}
function ataqueAgua(){
    ataqueJugador = 'AGUA';
    seleccionarAtaqueEnemigo();
}
function ataqueTierra(){
    ataqueJugador = 'TIERRA';
    seleccionarAtaqueEnemigo();
}
function seleccionarAtaqueEnemigo(){
    let ataqueAleatorio = aleatorio(1, 3);
    switch (ataqueAleatorio) {
        case 1:
            ataqueEnemigo = 'FUEGO';
            break;
        case 2:
            ataqueEnemigo = 'AGUA';
            break;
        case 3:
            ataqueEnemigo = 'TIERRA';
            break;
    }
    combate()
}

function finDelJuego(){ 
    document.getElementById('boton-fuego').disabled = true;
    document.getElementById('boton-agua').disabled = true;
    document.getElementById('boton-tierra').disabled = true;
    let sectionReiniciar = document.getElementById('reiniciar');
    sectionReiniciar.style.display = 'block';
}
function reiniciarJuego(){
    location.reload();
}

function seleccionarMascotaJugador() {
    let sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
    sectionSeleccionarMascota.style.display = 'none';
    
    let inputHipoDoge = document.getElementById('hipodoge');
    let inputCapipepo = document.getElementById('capipepo');
    let inputRatigueya = document.getElementById('ratigueya');
    let spanMascotaJugador = document.getElementById('mascota-jugador');

    let mascotaJugador;
    if(inputHipoDoge.checked){
        mascotaJugador = spanMascotaJugador.innerHTML = 'Hipodoge';
    } else if(inputCapipepo.checked) {
        mascotaJugador = spanMascotaJugador.innerHTML = 'Capipepo';
    } else if(inputRatigueya.checked) {
        mascotaJugador = spanMascotaJugador.innerHTML = 'Ratigueya';
    } else {
        alert('Selecciona una mascota');
        location.reload();
    }
    seleccionarMascotaEnemigo();
}
function seleccionarMascotaEnemigo() {
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo');
    let mascotaAleatoria = aleatorio(1, 3);
    let mascotaEnemigo;
    switch (mascotaAleatoria) {
        case 1:
            mascotaEnemigo = 'Hipodoge';
            break;
        case 2:
            mascotaEnemigo = 'Capipepo';
            break;
        case 3:
            mascotaEnemigo = 'Ratigueya';
            break;
    }
    spanMascotaEnemigo.innerHTML = mascotaEnemigo;
    let sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
    sectionSeleccionarAtaque.style.display = 'flex';
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', iniciarJuego);