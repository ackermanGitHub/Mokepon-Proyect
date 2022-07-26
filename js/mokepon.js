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

// Map
const watchMapSection = document.getElementById("watch-map");
const openMapBtn = document.getElementById("open-map-btn");
const map = document.getElementById("map");
//let openMap = false;
let canvas = map.getContext("2d");
let interval;
let mapBackground = new Image();
mapBackground.src = './assets/mokemap.png';
let mapWidth = window.innerWidth - 20;
if (mapWidth > 350) {
    mapWidth = 330;
}
let mapHeight = mapWidth * 600 / 800;
map.width = mapWidth;
map.height = mapHeight;

// backend
let enemiesMokepons = null;
let playerId = null;
let enemyId = null;
let enemyDamage = null;
let playerDamage = null;

let playerLives = 3;
let enemyLives = 3;
let playerMokepon;
let enemyMokepon;
let attackPlayer;
let attackEnemy;
let attackListPlayer;
let attackListEnemy;

let mokepons = [];
let attacksList = [];

class Mokepon {
    constructor(name, image, lives, element, mapImg = image, id = null){
        this.name = name;
        this.image = image;
        this.lives = lives;
        this.element = element;
        this.width = 40;
        this.height = 40;
        this.x = randomNum(0, map.width - this.width);
        this.y = randomNum(0, map.height - this.height);
        this.mapImg = new Image();
        this.mapImg.src = mapImg;
        this.speedX = 0;
        this.speedY = 0;
        this.id = id;
        mokepons.push(this);
    }
    paint() {
        canvas.drawImage(
            this.mapImg,
            this.x,
            this.y,
            this.width,
            this.height,
        );
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

let hipodogeImg = new Image();
hipodogeImg.src = './assets/mokepons_mokepon_hipodoge_attack.png';
let capipepoImg = new Image();
capipepoImg.src = './assets/mokepons_mokepon_capipepo_attack.png';
let ratigueyaImg = new Image();
ratigueyaImg.src = './assets/mokepons_mokepon_ratigueya_attack.png';
let rattataImg = new Image();
rattataImg.src = './assets/Rattata.png';
let ratatuilleImg = new Image();
ratatuilleImg.src = './assets/ratatuille.png';
let charmanderImg = new Image();
charmanderImg.src = './assets/charmander.png';

let hipodogeMapImg = new Image();
hipodogeMapImg.src = './assets/hipodoge.png';
let capipepoMapImg = new Image();
capipepoMapImg.src = './assets/capipepo.png';
let ratigueyaMapImg = new Image();
ratigueyaMapImg.src = './assets/ratigueya.png';

const bolaFuego = new Attack('FUEGO', 'BOLA DE FUEGO', '🔥', 200, 350, 150, 5);
const llamarada = new Attack('FUEGO', 'LLAMARADA', '🔥', 150, 250, 100, 3);
const bolaAgua = new Attack('AGUA', 'BOLA DE AGUA', '💧', 220, 310, 120, 4);
const tsunami = new Attack('AGUA', 'TSUNAMI', '💧', 120, 240, 80, 2);
const bolaTierra = new Attack('TIERRA', 'BOLA DE TIERRA', '🌱', 250, 300, 180, 8);
const avalancha = new Attack('TIERRA', 'AVALANCHA', '🌱', 100, 200, 130, 2);
const bolaViento = new Attack('VIENTO','BOLA DE VIENTO', '🌪️', 220, 300, 80, 2);
const tormenta = new Attack('VIENTO','TORMENTA', '🌪️', 80, 300, 200, 6);
const pinchos = new Attack('FUEGO','PINCHOS', '🔥', 80, 300, 200, 6);

let hipodoge = new Mokepon('Hipodoge', hipodogeImg.src, 1200, 'AGUA', hipodogeMapImg.src);
let capipepo = new Mokepon('Capipepo', capipepoImg.src, 1500, 'TIERRA', capipepoMapImg.src);
let ratigueya = new Mokepon('Ratigueya', ratigueyaImg.src, 1000, 'FUEGO', ratigueyaMapImg.src);
let rattata = new Mokepon('Rattata', rattataImg.src, 1100, 'TIERRA');
let ratatuille = new Mokepon('Ratatuille', ratatuilleImg.src, 1400, 'VIENTO');
let charmander = new Mokepon('Charmander', charmanderImg.src, 900, 'FUEGO');

let newInputMokepon;
let newLabelMokepon;
let newParagraphMokepon;
let newImageMokepon ;

function loadImages(){
    mokepons.forEach(mokepon => {
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
    setTimeout(printLifes, 1500);
}
function printLifes(){
    livesPlayerParagraph.innerHTML = playerLives;
    checkLives();
}

function startGame() {
    loadImages();
    selectAttackSection.style.display = 'none';
    restartDiv.style.display = 'none';
    watchMapSection.style.display = 'none';

    //selectMokeponBtn.addEventListener('click', selectPlayerMokepon);
    openMapBtn.addEventListener('click', () => {
        //openMap = true;
        selectPlayerMokepon();
    })
    
    restartBtn.addEventListener('click', restartGame);

    joinGame();
}

function joinGame(){
    fetch('http://localhost:8080/unirse')
        .then((res) => {
            console.log(res)
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
    let selectedMokepon = mokepons.find(mokepon => document.getElementById(mokepon.name.toLowerCase()).checked);

    if(selectedMokepon === undefined){
        alert('Selecciona una mascota');
        location.reload();
    }

    playerMokepon = selectedMokepon;
    playerMokeponParagraph.innerHTML = playerMokepon.name;
    livesPlayerParagraph.innerHTML = playerLives = playerMokepon.lives;

    selectMokepon(playerMokepon)
 
    watchMapSection.style.display = 'flex';   
    initMap();
    //selectEnemyMokepon(playerMokepon);
    //loadAttacks();
}

function initMap(){
    //map.width = 320;
    //map.height = 240;
    interval = setInterval(paintCanvas, 50);

    window.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'ArrowUp':
                moveUp();
                break;
            case 'ArrowDown':
                moveDown();
                break;
            case 'ArrowRight':
                moveRight();
                break;
            case 'ArrowLeft':
                moveLeft();
                break; 
            default:
                break;
        }
    });
    window.addEventListener('keyup', stopMoving);

}

function selectMokepon(playerMokepon){
    fetch(`http://localhost:8080/mokepon/${playerId}`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            mokepon: playerMokepon.name
        })
    })
}

function startBattle() {
    enemyMokeponParagraph.innerHTML = enemyMokepon.name;
    livesEnemyParagraph.innerHTML = enemyLives = enemyMokepon.lives;
    attackListEnemy = attacksList.filter(attack => attack.element === enemyMokepon.element);
    loadAttacks();
}

function paintCanvas(){
    playerMokepon.x += playerMokepon.speedX;
    playerMokepon.y += playerMokepon.speedY;
    canvas.clearRect(0, 0, map.width, map.height);
    canvas.drawImage(mapBackground, 0, 0, map.width, map.height);
    playerMokepon.paint();

    sendPosition(playerMokepon.x, playerMokepon.y);
    
    if (enemiesMokepons === null) {
        return;
    }

    enemiesMokepons.forEach(mokepon => {
        mokepon.paint();
    });

    if (playerMokepon.speedX !== 0 || playerMokepon.speedY !== 0) {
        enemiesMokepons.forEach(element => {
            if(element !== playerMokepon){
                collisionCheck(element);
            }
        });
    }
}
function sendPosition(x, y){
    fetch(`http://localhost:8080/mokepon/${playerId}/position`, {
        method: "post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            x,
            y
        })
    })
    .then((res) => {
        if (res.ok) {
            res.json()
                .then(({enemies}) => {
                    let newMokepon = null;
                    enemiesMokepons = enemies.map(enemy => {
                        let newPokemonName = enemy.mokepon.name;
                        newMokepon = mokepons.find(mokepon => newPokemonName === mokepon.name);
                        let result = new Mokepon(newMokepon.name, newMokepon.image, newMokepon.lives, newMokepon.element, newMokepon.mapImg.src, enemy.id)
                        result.x = enemy.x;
                        result.y = enemy.y;
                        return result;
                    })
                })
        }
    })
}

function moveRight(){
    playerMokepon.speedX = 5;
}
function moveLeft(){
    playerMokepon.speedX = -5;
}
function moveUp(){
    playerMokepon.speedY = -5;
}
function moveDown(){
    playerMokepon.speedY = 5;
}
function stopMoving(){
    playerMokepon.speedX = 0;
    playerMokepon.speedY = 0;
}
function collisionCheck(enemy) {
    let topEnemy = enemy.y + 25;
    let bottomEnemy = enemy.y + enemy.height - 25;
    let rightEnemy = enemy.x + enemy.width - 25;
    let leftEnemy = enemy.x + 25;
    let topPlayerMokepon = playerMokepon.y;
    let bottomPlayerMokepon = playerMokepon.y + enemy.height;
    let rightPlayerMokepon = playerMokepon.x + enemy.width;
    let leftPlayerMokepon = playerMokepon.x;

    if (
        bottomPlayerMokepon < topEnemy ||
        topPlayerMokepon > bottomEnemy ||
        rightPlayerMokepon < leftEnemy ||
        leftPlayerMokepon > rightEnemy
    ) {
        return;
    } else if(enemyMokepon === undefined){
        stopMoving();
        interval = false;
        enemyMokepon = enemy;
        selectAttackSection.style.display = 'flex';
        watchMapSection.style.display = 'none';
        startBattle();
    }
}

function printFinalMessage(message){
    resultParagraph.innerHTML = message;
    endGame();
}

function checkLives(){
    if (enemyLives <= 0) {
        printFinalMessage('FELICITACIONES GANASTE');
        clearInterval(interval);
    } else if(playerLives <= 0) {
        printFinalMessage('LO SIENTO, PERDISTE');
        clearInterval(interval);
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