var modeState = "";
document.getElementById("stateBox").innerHTML = "Idling";

window.addEventListener("keydown", checkKeyPressed, false);
function checkKeyPressed(evt) {
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

window.addEventListener("keyup", checkKeyUp, false);
function checkKeyUp(evt) {
      modeState = "";
}

window.setInterval( function(){
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
