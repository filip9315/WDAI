const timer = document.getElementById("stoper");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

let seconds = 0;
let running = false;

function formatTime(seconds){
    if (seconds < 60) return seconds + "s";
    else {
        let minutes = Math.floor(seconds/60);
        seconds = seconds % 60;
        return minutes + "min " + seconds + "s";
    }
}

async function start() {
    if (!running) {
        running = true;
        while (running) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (running) {
                seconds++;
                timer.textContent = formatTime(seconds);
            }
        }
    }
}

function stop() {
    running = false;
}

function reset() {
    running = false;
    seconds = 0;
    timer.textContent = "0s";
}

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);
