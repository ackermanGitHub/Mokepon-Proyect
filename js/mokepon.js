const selectAttackSection = document.getElementById('select-attack');
const restartDiv = document.getElementById('restart-button-container');
const selectMokeponBtn = document.getElementById('select-mokepon-btn');

const restartBtn = document.getElementById('restart-button');

const selectMokeponSection = document.getElementById('select-mokepon-section');
const playerMokeponParagraph = document.getElementById('player-mokepon');

const enemyMokeponParagraph = document.getElementById('enemy-mokepon');

const livesPlayerParagraph = document.getElementById('lives-player');
const livesEnemyParagraph = document.getElementById('lives-enemy');

const resultParagraph = document.getElementById('result');
const attackPlayerDiv = document.getElementById('attacks-player');
const attackEnemyDiv = document.getElementById('attacks-enemy');

// Diferent
const cardsArticle = document.getElementById('mokepon-cards');
const attackBtnsArticle = document.getElementById('attack-btns');

let playerId = null
let playerLives = 3;
let enemyLives = 3;
let playerMokepon;
let enemyMokepon;
let attackPlayer;
let attackEnemy;
let attackListPlayer;
let attackListEnemy;

let mokepones = [];
let attacksList = [];

class Mokepon {
    constructor(name, image, lives, element){
        this.name = name;
        this.image = image;
        this.lives = lives;
        this.element = element;
        mokepones.push(this);
    }
}
class Attack {
    constructor(element, name, emoji, damageMin, damageMax, damageCrit, prob){
        this.element = element;
        this.name = name;
        this.emoji = emoji;
        this.damage = {
            min: damageMin,
            max: damageMax,
            critic: damageCrit,
            prob: prob,
        };
        attacksList.push(this);
    }
}

let hipodogeImg = './assets/mokepons_mokepon_hipodoge_attack.png';
let capipepoImg = './assets/mokepons_mokepon_capipepo_attack.png';
let ratigueyaImg = './assets/mokepons_mokepon_ratigueya_attack.png';
let rattataImg = './assets/Rattata.png';
let ratatuilleImg = './assets/ratatuille.png';
let charmanderImg = './assets/charmander.png';

const bolaFuego = new Attack('FUEGO', 'BOLA DE FUEGO', '🔥', 200, 350, 150, 5);
const llamarada = new Attack('FUEGO', 'LLAMARADA', '🔥', 150, 250, 100, 3);
const bolaAgua = new Attack('AGUA', 'BOLA DE AGUA', '💧', 220, 310, 120, 4);
const tsunami = new Attack('AGUA', 'TSUNAMI', '💧', 120, 240, 80, 2);
const bolaTierra = new Attack('TIERRA', 'BOLA DE TIERRA', '🌱', 250, 300, 180, 8);
const avalancha = new Attack('TIERRA', 'AVALANCHA', '🌱', 100, 200, 130, 2);
const bolaViento = new Attack('VIENTO','BOLA DE VIENTO', '🌪️', 220, 300, 80, 2);
const tormenta = new Attack('VIENTO','TORMENTA', '🌪️', 80, 300, 200, 6);
const pinchos = new Attack('FUEGO','PINCHOS', '🔥', 80, 300, 200, 6);

let hipodoge = new Mokepon('Hipodoge', hipodogeImg, 1200, 'AGUA');
let capipepo = new Mokepon('Capipepo', capipepoImg, 1500, 'TIERRA');
let ratigueya = new Mokepon('Ratigueya', ratigueyaImg, 1000, 'FUEGO');
let rattata = new Mokepon('Rattata', rattataImg, 1100, 'TIERRA');
let ratatuille = new Mokepon('Ratatuille', ratatuilleImg, 1400, 'VIENTO');
const charmander = new Mokepon('Charmander', charmanderImg, 900, 'FUEGO');

let newInputMokepon;
let newLabelMokepon;
let newParagraphMokepon;
let newImageMokepon ;
function loadImages(){
    mokepones.forEach(mokepon => {
        newInputMokepon = document.createElement('input');
        newInputMokepon.type = 'radio';
        newInputMokepon.name = 'mokepon';
        newLabelMokepon = document.createElement('label');
        newLabelMokepon.className = 'mokepon-card';
        newParagraphMokepon = document.createElement('p');
        newImageMokepon = document.createElement('img');
        newLabelMokepon.appendChild(newParagraphMokepon);
        newLabelMokepon.appendChild(newImageMokepon);

        newLabelMokepon.htmlFor = newInputMokepon.id = mokepon.name.toLowerCase();
        newImageMokepon.alt = newParagraphMokepon.innerHTML = mokepon.name;
        newImageMokepon.src = mokepon.image;
        cardsArticle.append(newInputMokepon);
        cardsArticle.append(newLabelMokepon);
    })
}

function loadAttacks(){
    attackListPlayer = attacksList.filter(attack => attack.element === playerMokepon.element);
    let newAttackBtn;
    attackListPlayer.forEach(attack => {
        newAttackBtn = document.createElement('button');
        newAttackBtn.className = 'attack-btn';
        newAttackBtn.innerHTML = attack.name + ' ' + attack.emoji;
        attack.id = newAttackBtn.id = attack.name.split(' ').join('-').toLowerCase();
        attackBtnsArticle.appendChild(newAttackBtn);
    });
    waitForAttack();
}

function waitForAttack(){
    attackListPlayer.forEach(currentAttack => {
        document.getElementById(currentAttack.id).addEventListener('click', ()=>{
            attackPlayer = currentAttack;
            battle();
        });
    });
}

function randomDamage(attack){
    let result = randomNum(attack.damage.min, attack.damage.max);
    if ((1, attack.damage.prob) === 1) {
        result += attack.damage.critic;
    }
    return result;
}

function battle(){
    let playerDamage = randomDamage(attackPlayer);
    attackEnemy = attackListEnemy[randomNum(0, 1)];
    let enemyDamage = randomDamage(attackEnemy);
    enemyLives -= playerDamage;
    playerLives -= enemyDamage;
    livesEnemyParagraph.innerHTML = enemyLives;
    checkLives();
    setTimeout(printLifes, 2000);
}
function printLifes(){
    livesPlayerParagraph.innerHTML = playerLives;
    checkLives();
}

function startGame() {
    loadImages();
    selectAttackSection.style.display = 'none';
    restartDiv.style.display = 'none';

    selectMokeponBtn.addEventListener('click', selectPlayerMokepon);
    
    restartBtn.addEventListener('click', restartGame);

    joinGame()
}

function joinGame(){
    fetch('http://localhost:8080/unirse')
        .then((res) => {
            if (res.ok) {
                res.text()
                    .then((response) => {
                        playerId = response
                    })
            }
        })
}

function selectPlayerMokepon() {
    selectMokeponSection.style.display = 'none';
    let selectedMokepon = mokepones.find(mokepon => document.getElementById(mokepon.name.toLowerCase()).checked);

    if(selectedMokepon === undefined){
        alert('Selecciona una mascota');
        location.reload();
    } else {
        playerMokepon = selectedMokepon;
        playerMokeponParagraph.innerHTML = playerMokepon.name;
    }

    selectMokepon(playerMokepon)

    livesPlayerParagraph.innerHTML = playerLives = playerMokepon.lives;    
    selectEnemyMokepon(playerMokepon);
    loadAttacks();
}

function selectMokepon(playerMokepon){
    fetch('http://localhost:8080/mokepon/' + playerId,{
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: playerMokepon.name,
        })
    })
}

function selectEnemyMokepon(playerMokepon) {
    let randomMokepon = deepCopy(mokepones[randomNum(0, mokepones.length - 1)]);
    let i = 0
    if (randomMokepon.name === playerMokepon.name) {
        console.log('Se llevó a cabo una seleccion semejante de mascota enemiga: ' + randomMokepon.name)
        selectEnemyMokepon(playerMokepon);
    } else {
        enemyMokepon = deepCopy(randomMokepon);
        enemyMokeponParagraph.innerHTML = randomMokepon.name;
        livesEnemyParagraph.innerHTML = enemyLives = randomMokepon.lives;
        selectAttackSection.style.display = 'flex';
        attackListEnemy = attacksList.filter(attack => attack.element === enemyMokepon.element);
    }
}

function printFinalMessage(message){
    resultParagraph.innerHTML = message;
    endGame();
}

function checkLives(){
    if (enemyLives <= 0) {
        printFinalMessage('FELICITACIONES GANASTE');
    } else if(playerLives <= 0) {
        printFinalMessage('LO SIENTO, PERDISTE');
    }
}

function endGame(){ 
    attackListPlayer.forEach(currentAttack => {
        document.getElementById(currentAttack.id).disabled = true;
    });
    restartDiv.style.display = 'block';
}

function restartGame(){
    location.reload();
}

window.addEventListener('load', startGame);

//helpers
function randomNum(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function isObject(subject) {
    return typeof subject == 'object';
}
function isArray(subject) {
    return Array.isArray(subject);
}
function deepCopy(subject) {
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
    return copy;
}