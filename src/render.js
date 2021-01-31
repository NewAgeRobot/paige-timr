var modeState = "";
var timerActive = "";
var pauseState = new Boolean(0);
var start;
var pauseTime = 0;
var delta;
var time;
var seconds;
var minutes;
var hours;

window.addEventListener("keydown", checkKeyPressed, false);
function checkKeyPressed(evt) {
//RECORDING STATES
  if(modeState == ""){              //to prevent multi-button pressing jumping states
    if (evt.keyCode == "90") {      //key Z
        modeState = "College";
    }
    else if (evt.keyCode == "88") { //key X
        modeState = "Work";
    }
    else if (evt.keyCode == "67") { //key C
        modeState = "House";
    }
    else if (evt.keyCode == "65") { //key A
        modeState = "Leisure";
    }
  }

  //? adding for testing purposes to "unclick" switch/reset state
  else if (evt.keyCode == "13") { //key A
      modeState = "";
  }

  //RECORDING SUB COMMANDS
  if (modeState !== ""){
    //START TIMER
    if ((evt.keyCode == "49") && (timerActive == "")) {      //key 1
      start = Date.now();
      if(modeState !== "" ){
          timerActive = "active";
      }
    }
    else if ((evt.keyCode == "50") && ((timerActive = "active")||(timerActive = "pause"))) {      //key 2
      if(pauseState == 0){
        pauseTime = Date.now();
        pauseState = 1;
      }
      else if(pauseState == 1){
        pauseState = 0;
      }
      timerActive = "pause";
    }

    else if ((evt.keyCode == "51") && ((timerActive = "active")||(timerActive = "pause"))) {      //key 2
      timerActive = "pause";
      totalTime = document.getElementById("timer").innerHTML();
    }
  }
}

window.addEventListener("keyup", checkKeyUp, false);
function checkKeyUp(evt) {
      //! taken out for the moment to test without latch switches
      //modeState = "";
}


window.setInterval( function(){ //Timer Tracker
  switch (timerActive) {
    case "active":
      document.getElementById("timer").classList.remove('blink');
      delta = Date.now() - start; // milliseconds elapsed since start
      time = (Math.floor(delta / 1000));
      seconds = time % 60 < 10 ? "0"+time % 60: time % 60; // in seconds
      minutes = Math.floor(time / 60)< 10 ? "0"+Math.floor(time / 60): Math.floor(time / 60);
      hours = Math.floor(minutes / 60)< 10 ? "0"+Math.floor(minutes / 60): Math.floor(minutes / 60);
      document.getElementById("timer").innerHTML = hours+':'+minutes+':'+seconds;
      break;
    case "pause":
      if(pauseState == 0){//unpaused state
        timerActive = "active";
      }
      else if(pauseState == 1){//paused state
        console.log( "paused");
        document.getElementById("timer").classList.add('blink');
      }
      break;
    case "stop":

      break;
  }
},100)

window.setInterval( function(){ //State Tracker
  switch (modeState) {
    case "":
      document.getElementById("stateBox").innerHTML = "Idling";
    //  document.body.style.backgroundColor = "white";
      break;
    case "College":
      document.getElementById("stateBox").innerHTML = "Working on College";
    //  document.body.style.backgroundColor = "#AFF8D8";
      break;
    case "Work":
      document.getElementById("stateBox").innerHTML = "Actually doing Work";
    //  document.body.style.backgroundColor = "#FFBEBC";
      break;
    case "House":
      document.getElementById("stateBox").innerHTML = "Working on House Stuff";
    //  document.body.style.backgroundColor = "#D5AAFF";
      break;
    case "Leisure":
      document.getElementById("stateBox").innerHTML = "Leisure time!";
    //  document.body.style.backgroundColor = "#85E3FF";
      break;
  }
},10)
