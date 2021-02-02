var fs = require('fs');

var latchState = "";
var optionState = "";
var timerActive = "";
var pauseState = new Boolean(0);
var start;
var pauseTime = 0;
var unpauseTime = 0;
var pauseDiff = 0;
var pauseDiffTotal = 0;
var totalTime = 0;
var delta;
var time;
var seconds;
var minutes;
var hours;
var currentCSVValue;
var timerCSVUpdateValue;

var option1 = "";
var option2 = "";
var option3 = "";
var option4 = "";
var option5 = "";


window.addEventListener("keydown", checkKeyPressed, false);
function checkKeyPressed(evt) {
  console.log("latch: " + latchState + " option: " + optionState);
//RECORDING STATES
  if(latchState == ""){             //to prevent multi-button pressing jumping states
    if (evt.keyCode == "90") {      //key Z
        latchState = "College";
        //work in subtasks where necessary
        option1 = "Timer";
        option2 = "Subject Pomodoro";
        option3 = "History";
        document.getElementById("option1").innerHTML = option1;
        document.getElementById("option2").innerHTML = option2;
        document.getElementById("option3").innerHTML = option3;
        document.getElementById("optionBox").style.visibility = "visible";
    }
    else if (evt.keyCode == "88") { //key X
        latchState = "Work";
        option1 = "Timer";
        option2 = "Task Pomodoro";
        option3 = "History";
        document.getElementById("option1").innerHTML = option1;
        document.getElementById("option2").innerHTML = option2;
        document.getElementById("option3").innerHTML = option3;
        document.getElementById("optionBox").style.visibility = "visible";
    }
    else if (evt.keyCode == "67") { //key C
        latchState = "House";
        option1 = "Timer";
        option2 = "Pomodoro";
        option3 = "History";
        document.getElementById("option1").innerHTML = option1;
        document.getElementById("option2").innerHTML = option2;
        document.getElementById("option3").innerHTML = option3;
        document.getElementById("optionBox").style.visibility = "visible";
    }
    else if (evt.keyCode == "65") { //key A
        latchState = "Leisure";
        option1 = "Timer";
        option2 = "Wank Pomodoro";
        option3 = "History";
        document.getElementById("option1").innerHTML = option1;
        document.getElementById("option2").innerHTML = option2;
        document.getElementById("option3").innerHTML = option3;
        document.getElementById("optionBox").style.visibility = "visible";
    }
  }

  //? adding for testing purposes to "unclick" switch/reset state
  else if (evt.keyCode == "13") { //key Enter
      latchState = "";
      if(timerActive !== ""){
        timerActive = "stop";
      }
      document.getElementById("optionBox").style.visibility = "hidden";
      document.getElementById("timer").style.visibility = "hidden";
  }



  if (latchState !== ""){
    //program back button

    if ((evt.keyCode == "49") && (timerActive == "")){//cant change at the moment while timer is active - eventually fix to just have it stop the timer and save it out
      optionState = option1;
    }
    else if ((evt.keyCode == "50") && (timerActive == "")){
      optionState = option2;
    }
    else if ((evt.keyCode == "51") && (timerActive == "")){
      optionState = option3;
    }

    if (optionState == "Timer"){
      document.getElementById("timer").style.visibility = "visible";
      //TIMER SUB COMMANDS
      if ((evt.keyCode == "49") && (timerActive == "")) {      //key 1 START TIMER
        if(latchState !== ""){
          resetTimer();
          start = Date.now();
          timerActive = "active";
        }
      }
      else if ((evt.keyCode == "50") && ((timerActive == "active")||(timerActive == "pause"))) {      //key 2 PAUSE TIMER
        if(pauseState == 0){
          pauseTime = Date.now();
          pauseState = 1;
        }
        else if(pauseState == 1){
          unpauseTime = Date.now();
          pauseState = 0;
        }
        timerActive = "pause";
      }

      else if ((evt.keyCode == "51") && ((timerActive == "active")||(timerActive == "pause"))) {      //key 2 UNPAUSE TIMER
        timerActive = "stop";
      }
    }//Timer optionState end
  }//latchState subcommand end
}

//reset the timers and everything so they're fresh for a new timer to start
function resetTimer(){
  document.getElementById("timer").classList.remove('blink');
  document.getElementById("timer").classList.remove('stoppedTime');
  document.getElementById("timer").classList.remove('counting');
  pauseState = 0;
  start = 0;
  delta = 0;
  time = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  pauseTime = 0;
  unpauseTime = 0;
  pauseDiff = 0;
  pauseDiffTotal = 0;
  totalTime = 0;
}

//concatenate the value that is being amended into the CSV file
function timerCSVUpdateCalculation(){
  fs.readFile('C:/Users/seanm/OneDrive/Desktop/PaigeTimr/paige-timr/TimerData.csv', 'utf8' , (err, data) => {
    if (err) {
      console.error(err)
      return
    }
    currentCSVValue = data;
    console.log(currentCSVValue);
  })
  let d = new Date()
  let day = d.getDay();
  switch (day){
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
  }
  let currentTimeReading = document.getElementById("timer").innerHTML = hours+':'+minutes+':'+seconds;
  timerCSVUpdateValue = day + "," + latchState + "," + time + "," + currentTimeReading + "\r\n";
}

window.addEventListener("keyup", checkKeyUp, false);
function checkKeyUp(evt) {
      //! taken out for the moment to test without latch switches
      //latchState = "";
}


window.setInterval( function(){ //Timer Tracker
  switch (timerActive) {
    case "active":
      document.getElementById("timer").classList.remove('blink');
      document.getElementById("timer").classList.add('counting');
      delta = (Date.now() - (start+pauseDiffTotal)); // milliseconds elapsed since start
      time = (Math.floor(delta / 1000));
      seconds = time % 60 < 10 ? "0"+time % 60: time % 60; // in seconds
      minutes = Math.floor(time / 60)< 10 ? "0"+Math.floor(time / 60): Math.floor(time / 60);
      hours = Math.floor(minutes / 60)< 10 ? "0"+Math.floor(minutes / 60): Math.floor(minutes / 60);
      document.getElementById("timer").innerHTML = hours+':'+minutes+':'+seconds;
      break;
    case "pause":
      if(pauseState == 0){//unpaused state
        pauseDiffTotal += (unpauseTime-pauseTime);
        timerActive = "active";
      }
      else if(pauseState == 1){//paused state
        document.getElementById("timer").classList.add('blink');
      }
      break;
    case "stop":
      totalTime = time;
      timerCSVUpdateCalculation();
      fs.appendFile('C:/Users/seanm/OneDrive/Desktop/PaigeTimr/paige-timr/TimerData.csv',timerCSVUpdateValue,function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
      resetTimer();
      document.getElementById("timer").classList.add('stoppedTime');
      timerActive = "";
      //put the write to file code here
      break;
  }
},100)

window.setInterval( function(){ //State Tracker
  switch (latchState) {
    case "":
      document.getElementById("latchBox").innerHTML = "Idling";
    //  document.body.style.backgroundColor = "white";
      break;
    case "College":
      document.getElementById("latchBox").innerHTML = "College";
    //  document.body.style.backgroundColor = "#AFF8D8";
      break;
    case "Work":
      document.getElementById("latchBox").innerHTML = "Work";
    //  document.body.style.backgroundColor = "#FFBEBC";
      break;
    case "House":
      document.getElementById("latchBox").innerHTML = "House";
    //  document.body.style.backgroundColor = "#D5AAFF";
      break;
    case "Leisure":
      document.getElementById("latchBox").innerHTML = "Leisure";
    //  document.body.style.backgroundColor = "#85E3FF";
      break;
  }
},10)
