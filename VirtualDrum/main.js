const tiempoEnPantalla = document.querySelector('.box2');
const otroTiempo = document.querySelector('.box3');
const playStop = document.querySelector('.play');
const kick = new Audio('./sounds/Kick.wav');
const Snare = new Audio('./sounds/Snare.wav');
const Ch = new Audio('./sounds/Ch.wav');
const crash = new Audio('./sounds/Crash.wav');

let intervaloId;
let count = 0;
let encendido = false;
let bpm = 240;


function cambiaNumero(){
    intervaloId = setInterval(cambiaColor, 60000/bpm);
}

function cambiaColor(){
    count++;
    if(count > 8) {
        count = 1;
    }
    let step = count.toString();
    let celda = document.querySelector(`.step input:nth-child(${step})`);
    let celda2 = document.querySelector(`.step2 input:nth-child(${step})`);
    if(celda.checked){
        if(!kick)return;
        kick.currentTime = 0;
        kick.play();
    }
    if(celda2.checked){
        if(!Snare)return;
        Snare.currentTime = 0;
        Snare.play();
    }
    tiempoEnPantalla.textContent = count;  
}

playStop.addEventListener('click', () =>{
    count = 0;
    if(!encendido){
        cambiaNumero();
        encendido = true;
        playStop.textContent = 'Stop';
    } else {
        encendido = false;
        playStop.textContent = 'Play';
        clearInterval(intervaloId);
        count = 0;
        tiempoEnPantalla.textContent = count;
    }
});

