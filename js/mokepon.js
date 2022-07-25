const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionReiniciar = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton-mascota');
const botonFuego = document.getElementById('boton-fuego');
const botonAgua = document.getElementById('boton-agua');
const botonTierra = document.getElementById('boton-tierra');
const botonReiniciar = document.getElementById('boton-reiniciar');

const sectionSeleccionarMascota = document.getElementById('seleccionar-mascota');
const inputHipoDoge = document.getElementById('hipodoge');
const inputCapipepo = document.getElementById('capipepo');
const inputRatigueya = document.getElementById('ratigueya');
const spanMascotaJugador = document.getElementById('mascota-jugador');

const spanMascotaEnemigo = document.getElementById('mascota-enemigo');

const spanVidasJugador = document.getElementById('vidas-jugador');
const spanVidasEnemigo = document.getElementById('vidas-enemigo');

const sectionMensajes = document.getElementById('resultado');
const ataqueDelJugador = document.getElementById('ataques-jugador');
const ataqueDelEnemigo = document.getElementById('ataques-enemigo');

// testing
const tarjetas = document.getElementById('tarjetas');

let ataqueJugador;
let ataqueEnemigo;
let vidasJugador = 3;
let vidasEnemigo = 3;

let mokepones = [];
class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        mokepones.push(this);
    }
    getName(){
        return this.nombre;
    }
    setName(name){
        this.nombre = name;
    }
}

let hipodogeImg = './assets/mokepons_mokepon_hipodoge_attack.png';
let capipepoImg = './assets/mokepons_mokepon_capipepo_attack.png';
let ratigueyaImg = './assets/mokepons_mokepon_ratigueya_attack.png';

let hipodoge = new Mokepon('Hipodoge', hipodogeImg, 5);
let capipepo = new Mokepon('Capipepo', capipepoImg, 5);
let ratigueya = new Mokepon('Ratigueya', ratigueyaImg, 5);

function iniciarJuego() {
    sectionSeleccionarAtaque.style.display = 'none';
    sectionReiniciar.style.display = 'none';

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    
    botonFuego.addEventListener('click', ataqueFuego);
    botonAgua.addEventListener('click', ataqueAgua);
    botonTierra.addEventListener('click', ataqueTierra);
    
    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none';

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
    sectionSeleccionarAtaque.style.display = 'flex';
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

function combate(){
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

function crearMensaje(resultado){
    let nuevoAtaqueDelJugador = document.createElement('p');
    let nuevoAtaqueDelEnemigo = document.createElement('p');

    sectionMensajes.innerHTML = resultado;
    nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
    nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;
    
    ataqueDelJugador.appendChild(nuevoAtaqueDelJugador);
    ataqueDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}
function crearMensajeFinal(resultadoFinal){
    sectionMensajes.innerHTML = resultadoFinal;
    finDelJuego();
}

function revisarVidas(){
    if (vidasJugador == 0) {
        crearMensajeFinal('LO SIENTO, PERDISTE');
    } else if(vidasEnemigo == 0) {
        crearMensajeFinal('FELICITACIONES GANASTE');
    }
}

function finDelJuego(){ 
    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonTierra.disabled = true;
    sectionReiniciar.style.display = 'block';
}
function reiniciarJuego(){
    location.reload();
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', iniciarJuego);