/*const columna1 = document.querySelector('.columna1');
const columna2 = document.querySelector('.columna2');
const columna3 = document.querySelector('.columna3');
const columna4 = document.querySelector('.columna4');*/
const tiempoEnPantalla = document.querySelector('.contador');


const playStop = document.querySelector('.play');

//seleccion de todas las columnas y carga en vector 
let columnas = [];
const columnaM = document.querySelectorAll('.columnas');


function cargarEnVector(column){
    columnas.push(column);
}
columnaM.forEach(column => cargarEnVector(column));


let encendido = false; // para el boton de play
let bpm = 240;
let tempo = 14;
let count = 0; 
let intervalId;
let pad;
let matriz = [];
let sequencer = [];

//matriz para ver si suena o no;
for (let i = 0; i < tempo; i++){
    let vector = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    matriz.push(vector);
}
//console.log(matriz);
// aca creo otra matriz pero con cada div.
for (let i = 0; i < tempo; i++){
    //console.log("estoy mirando la columna "+[i+1]);
    let seq = [];
    for (let j = 0; j < 13; j++){
        //console.log("estoy mirando el pad " + [j + 1]);
        seq[j] = columnas[i].children[j];
        pad = columnas[i].children[j];
        //console.log(pad.id);
    } 
    //console.log(seq);
    seq.id = i;
    sequencer[i] = seq;
}
// seleccion de pad y escucha de click
const pads = document.querySelectorAll('.pad');

function toggleOpen(){
    this.classList.toggle('open');
}

pads.forEach(cajita => cajita.addEventListener('click', toggleOpen));


//cambio de valor de 0 a 1 o 1 a 0 en la matriz principal

sequencer.forEach(element => element.forEach(dato => dato.addEventListener('click', ()=>{
    if(matriz[element.id][dato.id - 1] == 0){
        matriz[element.id][dato.id - 1] = 1;
    }else {
        matriz[element.id][dato.id - 1] = 0;
    }
    /*console.log(matriz[element.id][dato.id - 1]);*/
})));





//funcion cada cierto intervalo de tiempo
function llamarTempo(){
    intervalId = setInterval(mirarColumna, 60000/bpm);
}
//prende la columna por la que pasa
function encenderColumna(columna){
    columna.classList.toggle("open");
}



//constante de audio para probar
const kick = new Audio('./kick.wav');
const audioContext = new AudioContext();
const primaryGainControl = audioContext.createGain();
primaryGainControl.gain.setValueAtTime(0.05, 0);
primaryGainControl.connect(audioContext.destination);

const notes = [
    { name : "C", frecuency: 261.63},
    { name : "C#", frecuency: 277.18},
    { name : "D", frecuency: 293.66},
    { name : "D#", frecuency: 311.13},
    { name : "E", frecuency: 329.63},
    { name : "F", frecuency: 349.23},
    { name : "F#", frecuency: 369.99},
    { name : "G", frecuency: 392.0},
    { name : "G#", frecuency: 415.3},
    { name : "A", frecuency: 440.0},
    { name : "A#", frecuency: 466.16},
    { name : "B", frecuency: 493.99},
    { name : "C", frecuency: 523.25},
];

function reconocerNota(columVectorial){
    for(let i = 0; i < 13; i++){
        let valor =columVectorial[i];        
        if (valor == 1){
            const noteOcillator = audioContext.createOscillator();
            noteOcillator.type = "square";
            noteOcillator.frequency.setValueAtTime(notes[i].frecuency, audioContext.currentTime);
            noteOcillator.connect(primaryGainControl);
            noteOcillator.start();
            noteOcillator.stop(audioContext.currentTime + 0.3);
        }
    }


}
    
    /*if(columVectorial[1] == 1){
        const noteOcillator = audioContext.createOscillator();
        noteOcillator.type = "square";
        noteOcillator.frequency.setValueAtTime(notes[0].frecuency, audioContext.currentTime);
        noteOcillator.connect(primaryGainControl);
        noteOcillator.start();
        noteOcillator.stop(audioContext.currentTime + 0.3);
    }*/



function mirarColumna(){
    count++;
    if(count > tempo){
        count = 1;
        encenderColumna(columnas[tempo-1]);
    }
    //console.log(columnas[count - 1].children);
    tiempoEnPantalla.textContent = count;
    reconocerNota(matriz[count-1]);

    if(count == 1){
        encenderColumna(columnas[count-1]);
    }else {
        encenderColumna(columnas[count-1]);
        encenderColumna(columnas[count-2]);
    }
    
}
//boton de inicion de Loop
playStop.addEventListener("click",()=>{
    if(!encendido){
        llamarTempo();
        encendido = true;
        playStop.textContent = "Stop";
    }else {
        encendido = false;
        clearInterval(intervalId);
        encenderColumna(columnas[count-1]);
        count = 0;
        playStop.textContent = "Play";
        tiempoEnPantalla.textContent = count;
    }

});



