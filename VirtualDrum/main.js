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
    intervaloId = setInterval(cambiaTexto, 60000/bpm);
}

function cambiaTexto(){
    count++;
    if(count == 1){
        if(!crash)return;
        crash.currentTime = 0; 
        crash.play();
    }
    if(count > 1){
        if(!Ch)return;
        Ch.currentTime = 0;
        Ch.play();
    }

    if(count >8){
        count = 1;
        crash.play();
    }
    if(count == 1 || count == 5 || count == 6){
        if(!kick) return;
        kick.currentTime = 0;
        kick.play();
    }
    if(count == 3 || count == 7){
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
    }
})