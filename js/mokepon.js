const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque');
const sectionReiniciar = document.getElementById('reiniciar');
const botonMascotaJugador = document.getElementById('boton-mascota');
/* 
const botonFuego = document.getElementById('boton-fuego');
const botonAgua = document.getElementById('boton-agua');
const botonTierra = document.getElementById('boton-tierra'); 
*/
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

// Diferent
const tarjetas = document.getElementById('tarjetas');
const botonesAtaque = document.getElementById('botones-ataque');

let vidasJugador = 3;
let vidasEnemigo = 3;
let mascotaJugador;
let mascotaEnemigo;
let ataqueJugador;
let ataqueEnemigo;
let ataquesJugador;
let ataquesEnemigos;

let mokepones = [];
let ataques = [];

class Mokepon {
    constructor(nombre, foto, vida, elemento, ataques){
        this.nombre = nombre;
        this.foto = foto;
        this.vida = vida;
        this.elemento = elemento;
        this.ataques = ataques;
        mokepones.push(this);
    }
}
class Ataque {
    constructor(elemento, nombre, emoji, damageMin, damageMax, damageCritico, prob){
        this.elemento = elemento;
        this.nombre = nombre;
        this.emoji = emoji;
        this.damage = {
            min: damageMin,
            max: damageMax,
            critico: damageCritico,
            prob: prob,
        };
        ataques.push(this);
    }
}

let hipodogeImg = './assets/mokepons_mokepon_hipodoge_attack.png';
let capipepoImg = './assets/mokepons_mokepon_capipepo_attack.png';
let ratigueyaImg = './assets/mokepons_mokepon_ratigueya_attack.png';
let rattataImg = './assets/Rattata.png';
let ratatuilleImg = './assets/ratatuille.png';

const bolaFuego = new Ataque('FUEGO', 'BOLA DE FUEGO', '🔥', 200, 350, 150, 5);
const llamarada = new Ataque('FUEGO', 'LLAMARADA', '🔥', 150, 250, 100, 3);
const bolaAgua = new Ataque('AGUA', 'BOLA DE AGUA', '💧', 220, 310, 120, 4);
const aguada = new Ataque('AGUA', 'AGUADA', '💧', 120, 240, 80, 2);
const bolaTierra = new Ataque('TIERRA', 'BOLA DE TIERRA', '🌱', 250, 300, 180, 8);
const tierrada = new Ataque('TIERRA', 'TIERRADA', '🌱', 100, 200, 130, 2);
const bolaViento = new Ataque('VIENTO','BOLA DE VIENTO', '🌪️', 220, 300, 80, 2);
const vientada = new Ataque('VIENTO','VIENTADA', '🌪️', 80, 300, 200, 6);

let hipodoge = new Mokepon('Hipodoge', hipodogeImg, 1200, 'AGUA', [bolaAgua, aguada]);
let capipepo = new Mokepon('Capipepo', capipepoImg, 1500, 'TIERRA', [bolaTierra, tierrada]);
let ratigueya = new Mokepon('Ratigueya', ratigueyaImg, 1000, 'FUEGO', [bolaFuego, llamarada]);
let rattata = new Mokepon('Rattata', rattataImg, 1100, 'TIERRA', [bolaTierra, tierrada]);
let ratatuille = new Mokepon('Ratatuille', ratatuilleImg, 1400, 'VIENTO', [bolaViento, vientada]);

let nuevoInputMascota;
let nuevoLabelMascota;
let nuevoParrafoMascota;
let nuevaImgMascota ;
function loadImages(){
    mokepones.forEach(mokepon => {
        nuevoInputMascota = document.createElement('input');
        nuevoInputMascota.type = 'radio';
        nuevoInputMascota.name = 'mascota';
        nuevoLabelMascota = document.createElement('label');
        nuevoLabelMascota.className = 'tarjeta-de-mokepon';
        nuevoParrafoMascota = document.createElement('p');
        nuevaImgMascota = document.createElement('img');
        nuevoLabelMascota.appendChild(nuevoParrafoMascota);
        nuevoLabelMascota.appendChild(nuevaImgMascota);

        nuevoLabelMascota.htmlFor = nuevoInputMascota.id = mokepon.nombre.toLowerCase();
        nuevaImgMascota.alt = nuevoParrafoMascota.innerHTML = mokepon.nombre;
        nuevaImgMascota.src = mokepon.foto;
        tarjetas.append(nuevoInputMascota);
        tarjetas.append(nuevoLabelMascota);
    })
}

function loadAtaques(){
    ataquesJugador = ataques.filter(ataque => ataque.elemento === mascotaJugador.elemento);
    let nuevoBotonAtaque;
    ataquesJugador.forEach(ataque => {
        nuevoBotonAtaque = document.createElement('button');
        nuevoBotonAtaque.className = 'boton-ataque';
        nuevoBotonAtaque.innerHTML = ataque.nombre + ' ' + ataque.emoji;
        ataque.id = nuevoBotonAtaque.id = ataque.nombre.split(' ').join('-').toLowerCase();
        botonesAtaque.appendChild(nuevoBotonAtaque);
    });
    waitForAtack();
}

function waitForAtack(){
    ataquesJugador.forEach(currentAtack => {
        document.getElementById(currentAtack.id).addEventListener('click', ()=>{
            ataqueJugador = currentAtack;
            battle();
        });
    });
}

function randomDamage(atack){
    let b = aleatorio(atack.damage.min, atack.damage.max);
    if ((1, atack.damage.prob) === 1) {
        b += atack.damage.critico;
    }
    return b;
}

function battle(){
    let dañoJugador = randomDamage(ataqueJugador);
    a = ataquesEnemigos[aleatorio(0, 1)];
    let dañoEnemigo = randomDamage(a);
    vidasEnemigo -= dañoJugador;
    vidasJugador -= dañoEnemigo;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
    setTimeout(printLifes, 2000);
}
function printLifes(){
    spanVidasJugador.innerHTML = vidasJugador;
    revisarVidas();
}

function iniciarJuego() {
    loadImages();
    sectionSeleccionarAtaque.style.display = 'none';
    sectionReiniciar.style.display = 'none';

    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador);
    
    /* 
    botonFuego.addEventListener('click', ataqueFuego);
    botonAgua.addEventListener('click', ataqueAgua);
    botonTierra.addEventListener('click', ataqueTierra); 
    */
    
    botonReiniciar.addEventListener('click', reiniciarJuego);
}

function seleccionarMascotaJugador() {
    sectionSeleccionarMascota.style.display = 'none';
    let mascotaSeleccionada = mokepones.find(mokepon => document.getElementById(mokepon.nombre.toLowerCase()).checked);

    if(mascotaSeleccionada === undefined){
        alert('Selecciona una mascota');
        location.reload();
    } else {
        mascotaJugador = mascotaSeleccionada;
        spanMascotaJugador.innerHTML = mascotaJugador.nombre;
    }
    spanVidasJugador.innerHTML = vidasJugador = mascotaJugador.vida;    
    seleccionarMascotaEnemigo(mascotaJugador);
    loadAtaques();
}

function seleccionarMascotaEnemigo(mascotaJugador) {
    let mascotaAleatoria = deepCopy(mokepones[aleatorio(0, mokepones.length - 1)]);
    let i = 0
    if (mascotaAleatoria.nombre === mascotaJugador.nombre) {
        console.log('Se llevó a cabo una seleccion semejante de mascota enemiga: ' + mascotaAleatoria.nombre)
        seleccionarMascotaEnemigo(mascotaJugador);
    } else {
        mascotaEnemigo = deepCopy(mascotaAleatoria);
        spanMascotaEnemigo.innerHTML = mascotaAleatoria.nombre;
        spanVidasEnemigo.innerHTML = vidasEnemigo = mascotaAleatoria.vida;
        sectionSeleccionarAtaque.style.display = 'flex';
        ataquesEnemigos = ataques.filter(atack => atack.elemento === mascotaEnemigo.elemento);
    }
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
    if (vidasJugador <= 0) {
        crearMensajeFinal('LO SIENTO, PERDISTE');
    } else if(vidasEnemigo <= 0) {
        crearMensajeFinal('FELICITACIONES GANASTE');
    }
}

function finDelJuego(){ 
    /* 
    botonFuego.disabled = true;
    botonAgua.disabled = true;
    botonTierra.disabled = true; 
    */
    ataquesJugador.forEach(currentAtack => {
        document.getElementById(currentAtack.id).disabled = true;
    });
    sectionReiniciar.style.display = 'block';
}
function reiniciarJuego(){
    location.reload();
}

function aleatorio(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', iniciarJuego);

function isObject(subject) {
    return typeof subject == "object";
}
function isArray(subject) {
    return Array.isArray(subject);
}
function deepCopy(subject, newName) {
    let copy;
    const subjectIsArray = isArray(subject);
    const subjectIsObject = isObject(subject);

    if (subjectIsArray) {
        copy = [];
    } else if (subjectIsObject) {
        copy = {};
    } else {
        return subject;
    }

    for (key in subject) {
        const keyIsObject = isObject(subject[key])
        if (keyIsObject) {
            copy[key] = deepCopy(subject[key]);
        } else {
            if (subjectIsArray) {
                copy.push(subject[key]);
            } else {
                copy[key] = subject[key];
            }
        }
    }
    copy.name = newName;
    return copy;
}