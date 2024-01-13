document.addEventListener("DOMContentLoaded", function () {
    const minuteDisplay = document.querySelector(".text-minute");
    const secondDisplay = document.querySelector(".text-sec");
    const millisecondDisplay = document.querySelector(".text-msec");
    const playButton = document.querySelector(".play");
    const resetButton = document.querySelector(".reset");
    const lapButton = document.querySelector(".lap");
    const lapsList = document.querySelector(".laps");
    const lapClearButton = document.querySelector(".lap-clear-button");
  
    let isPlay = false;
    let interval;
  
    let minutes = 0;
    let seconds = 0;
    let milliseconds = 0;
  
    function updateDisplay() {
      minuteDisplay.textContent = padNumber(minutes) + " : ";
      secondDisplay.textContent = padNumber(seconds) + " : ";
      millisecondDisplay.textContent = padNumber(milliseconds);
    }
  
    function padNumber(number) {
      return number < 10 ? "0" + number : number;
    }
  
    function clearLaps() {
      while (lapsList.firstChild) {
        lapsList.removeChild(lapsList.firstChild);
      }
    }
  
    function startStopwatch() {
      clearLaps(); // Clear laps before starting
      interval = setInterval(function () {
        milliseconds++;
        if (milliseconds === 100) {
          milliseconds = 0;
          seconds++;
          if (seconds === 60) {
            seconds = 0;
            minutes++;
          }
        }
        updateDisplay();
      }, 10);
      isPlay = true;
      playButton.textContent = "Pause";
      lapButton.classList.remove("hidden");
      resetButton.classList.remove("hidden");
    }
  
    function pauseStopwatch() {
      clearInterval(interval);
      isPlay = false;
      playButton.textContent = "Play";
      lapButton.classList.add("hidden");
      resetButton.classList.add("hidden");
    }
  
    function resetStopwatch() {
      clearInterval(interval);
      isPlay = false;
      minutes = 0;
      seconds = 0;
      milliseconds = 0;
      updateDisplay();
      playButton.textContent = "Play";
      lapButton.classList.add("hidden");
      resetButton.classList.add("hidden");
      clearLaps();
    }
  
    function lapStopwatch() {
      const lapItem = document.createElement("li");
      lapItem.classList.add("lap-item");
      const lapNumber = document.createElement("span");
      lapNumber.classList.add("number");
      lapNumber.textContent = lapsList.children.length + 1;
      const lapTime = document.createElement("span");
      lapTime.classList.add("time-stamp");
      lapTime.textContent =
        padNumber(minutes) +
        " : " +
        padNumber(seconds) +
        " : " +
        padNumber(milliseconds);
      lapItem.appendChild(lapNumber);
      lapItem.appendChild(lapTime);
      lapsList.appendChild(lapItem);
    }
  
    function lapClearAll() {
      clearLaps();
    }
  
    playButton.addEventListener("click", function () {
      if (!isPlay) {
        startStopwatch();
      } else {
        pauseStopwatch();
      }
    });
  
    resetButton.addEventListener("click", resetStopwatch);
  
    lapButton.addEventListener("click", lapStopwatch);
  
    lapClearButton.addEventListener("click", lapClearAll);
  });
  