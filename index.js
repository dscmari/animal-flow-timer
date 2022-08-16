
//global time variables
let breakSecondsLeft = 8;
let interval;
let breakInterval;
let secondsLeft = 8;
let intervalLength;
let breakIntervalLength;
let executedTime = false;
let timerRunning = false;
let breakRunning = false;
let resetSeconds = secondsLeft;
let resetBreakSeconds = breakSecondsLeft;
let soundFile;

function init() {
    updateBreak();
    updateTime();
}
window.onload = init;

//decrement and increment break 
function decrementBreakMinutes() {
    if(breakSecondsLeft < 60){
        return;
    }
    breakSecondsLeft -=60;
    updateBreak();
}
function incrementBreakMinutes(){
    breakSecondsLeft +=60;
    updateBreak();
}
function decrementBreakSeconds(){
    if(breakSecondsLeft === 0){
        return;
    }
    breakSecondsLeft--;
    updateBreak();
}
function incrementBreakSeconds() {
    breakSecondsLeft++;
    updateBreak();
}
//decrement and increment timer
function decrementMinutes() {
    if(secondsLeft < 60){
        return;
    }
    secondsLeft -= 60;
    updateTime();
}
function incrementMinutes() {
    secondsLeft += 60;
    updateTime();
}
function decrementSeconds() {
    if(secondsLeft === 0){
        return;
    }
    secondsLeft--
    updateTime();
}
function incrementSeconds() {
    secondsLeft++;
    updateTime();
}

function updateTime(){
    const min = Math.floor(secondsLeft / 60);
    const sec = secondsLeft % 60;  
    document.getElementById("minutes").innerText= min.toString().padStart(2,"0");
    document.getElementById("seconds").innerText = sec.toString().padStart(2,"0");
}

function updateBreak(){
    const min = Math.floor(breakSecondsLeft / 60);
    const sec = breakSecondsLeft % 60;

    document.getElementById("break-minutes").innerText = min.toString().padStart(2,"0");
    document.getElementById("break-seconds").innerText = sec.toString().padStart(2,"0");
}

function startCountdown() {

    timerRunning = true;
    changeColorTimer();
    
   if(!executedTime){
    intervalLength = secondsLeft;
    executedTime = true;
   } 
    
   if(secondsLeft === 0){
    return;
   }

   interval = setInterval(()=>{
        secondsLeft--;
        updateTime();
        if(secondsLeft < 0){
            endCountdown();
        }
   }, 1000)
   
   updateTime();
}

function stopCountdown(){
    clearInterval(interval)
    updateTime();
}

function startStopCountdown(){

    if(breakRunning){
        return;
    }

    else if(!timerRunning){
        timerRunning = true;
        startCountdown();
    } else{
        timerRunning = false;
        stopCountdown();
    }
}

function endCountdown(){
    timerRunning = false;
    changeColorTimer();
    clearInterval(interval);
    secondsLeft = intervalLength;
    updateTime();
    executedTime = false;
    breakTime();
}

function breakTime(){

    breakRunning = true;
    changeColorBreak();
    playAudio();

    breakIntervalLength = breakSecondsLeft; 

    breakInterval = setInterval(()=>{
        breakSecondsLeft--;
        updateBreak();
        if(breakSecondsLeft < 0){
            endBreak();
        }
     },1000)

    
    updateBreak(); //unnötig
}

function endBreak(){
    breakRunning = false;
    changeColorBreak();
    clearInterval(breakInterval);
    breakSecondsLeft = breakIntervalLength;
    updateBreak();
    playAudio();
    startCountdown();
}

function resetTimer(){
    timerRunning = false;
    breakRunning = false;
    changeColorBreak();
    changeColorTimer();
    secondsLeft = resetSeconds;
    breakSecondsLeft = resetBreakSeconds;
    clearInterval(breakInterval);
    clearInterval(interval);
    updateBreak();
    updateTime();
}

function playAudio(){
    const animalNoise = document.getElementById("audio");
    //console.log("test sound")
    animalNoise.src = "http://soundbible.com/mp3/Red_stag_roar-Juan_Carlos_-2004708707.mp3"
    animalNoise.load();
    animalNoise.play();
    
}

function changeColorTimer(){

    if(timerRunning){
        document.getElementById("timer-label").style.color = "orange";
        document.getElementById("timer-label").style.fontSize = "1.5rem";
    }
    else{
        document.getElementById("timer-label").style.color = "white";
        document.getElementById("timer-label").style.fontSize = "1rem";
    }
    
}

function changeColorBreak(){

    if(breakRunning){
        document.getElementById("break-label").style.color = "orange";
        document.getElementById("break-label").style.fontSize = "1.5rem";
    }
    else{
        document.getElementById("break-label").style.color = "white";
        document.getElementById("break-label").style.fontSize = "1rem";
    }
    
}
