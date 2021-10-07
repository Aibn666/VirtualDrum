
/*var synth = new Tone.PolySynth().toMaster();

var notes = ['C','D','E','F','G','A','B'];*/

const audioContext = new AudioContext();
const primaryGainControl = audioContext.createGain();
primaryGainControl.gain.setValueAtTime(0.05, 0);
primaryGainControl.connect(audioContext.destination);

const notes = [
    { name : "C", frecuency: 261.63, code: "65"},
    { name : "C#", frecuency: 277.18, code: "87"},
    { name : "D", frecuency: 293.66,code: "83"},
    { name : "D#", frecuency: 311.13, code: "69"},
    { name : "E", frecuency: 329.63, code: "68"},
    { name : "F", frecuency: 349.23, code: "70"},
    { name : "F#", frecuency: 369.99, code: "84"},
    { name : "G", frecuency: 392.0, code: "71"},
    { name : "G#", frecuency: 415.3, code: "89"},
    { name : "A", frecuency: 440.0, code: "72"},
    { name : "A#", frecuency: 466.16, code: "85"},
    { name : "B", frecuency: 493.99, code: "74"},
    { name : "C", frecuency: 523.25, code: "75"},
];

var html = "";
for (let i = 0; i < 13; i++){
    html += `<div class="whitenote" id="${i}" data-key="${parseInt(notes[i].code)}"></div>`;
}

document.getElementById('container').innerHTML = html;
const teclas = document.querySelectorAll('.whitenote');
function mirarTecla(){
    console.log(this.dataset.key);
    const noteOcillator = audioContext.createOscillator();
    noteOcillator.type = "square";
    noteOcillator.frequency.setValueAtTime(notes[this.id].frecuency, audioContext.currentTime);
    noteOcillator.connect(primaryGainControl);
    noteOcillator.start();
    noteOcillator.stop(audioContext.currentTime + 0.3);
}
teclas.forEach(tecla => tecla.addEventListener('click', mirarTecla));

function playSound(e){
/*const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
if(!audio) return; // stop the function from all together
    audio.currentTime = 0; //rewind to the start
    audio.play();
*/
    const note = notes.find(nota => nota.code == e.keyCode);
    const noteOcillator = audioContext.createOscillator();
    noteOcillator.type = "sine";
    noteOcillator.frequency.setValueAtTime(note.frecuency, audioContext.currentTime);
    noteOcillator.connect(primaryGainControl);
    noteOcillator.start();
    noteOcillator.stop(audioContext.currentTime + 0.3);
}

window.addEventListener('keydown', playSound);
