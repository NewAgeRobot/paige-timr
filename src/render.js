var fs = require('fs');

var labelsImport;
var labelsArray;

var labelsLoaded = 0;

var subject1 = "";
var subject2 = "";
var subject3 = "";
var subject4 = "";

var task1 = "";
var task2 = "";
var task3 = "";
var task4 = "";
var task5 = "";
var task6 = "";
var task7 = "";
var task8 = "";

var subjectState = "";

fs.readFile('C:/Users/seanm/OneDrive/Desktop/PaigeTimr/paige-timr/Labels.csv', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  labelsImport = data;
  labelsArray = labelsImport.split(/[\n,]+/);

  subject1 = labelsArray[0];
  subject1 = labelsArray[1];
  subject1 = labelsArray[2];
  subject1 = labelsArray[3];

  for(var i = 0;i < labelsArray.length;i++){
    console.log(i + ' = ' + labelsArray[i]);
  }
});


window.addEventListener("keydown", checkKeyPressed, false);
function checkKeyPressed(evt) {

//Subject Checks
  if(subjectState == ""){             //to prevent multi-button pressing jumping states
    if (evt.keyCode == "90") {      //key Z
        subjectState = subject1;
        //work in subtasks where necessary
        task1 = labelsArray[4];
        console.log(task1);
        task2 = labelsArray[8];
        console.log(task2);
        task3 = labelsArray[12];
        console.log(task3);
        task4 = labelsArray[16];
        console.log(task4);
        task5 = labelsArray[20];
        console.log(task5);
        task6 = labelsArray[24];
        console.log(task6);
        task7 = labelsArray[28];
        console.log(task7);
        task8 = labelsArray[32];
        console.log(task8);
        document.getElementById("task1").innerHTML = task1;
        document.getElementById("task2").innerHTML = task2;
        document.getElementById("task3").innerHTML = task3;
        document.getElementById("task4").innerHTML = task4;
        document.getElementById("task5").innerHTML = task5;
        document.getElementById("task6").innerHTML = task6;
        document.getElementById("task7").innerHTML = task7;
        document.getElementById("task8").innerHTML = task8;
    }
    else if (evt.keyCode == "88") { //key X
        subjectState = "Work";
        option1 = "Timer";
        option2 = "Task Pomodoro";
        option3 = "History";
        document.getElementById("option1").innerHTML = option1;
        document.getElementById("option2").innerHTML = option2;
        document.getElementById("option3").innerHTML = option3;
        document.getElementById("optionBox").style.visibility = "visible";
    }
    else if (evt.keyCode == "67") { //key C
        subjectState = "House";
        option1 = "Timer";
        option2 = "Pomodoro";
        option3 = "History";
        document.getElementById("option1").innerHTML = option1;
        document.getElementById("option2").innerHTML = option2;
        document.getElementById("option3").innerHTML = option3;
        document.getElementById("optionBox").style.visibility = "visible";
    }
    else if (evt.keyCode == "65") { //key A
        subjectState = "Leisure";
        option1 = "Timer";
        option2 = "Wank Pomodoro";
        option3 = "History";
        document.getElementById("option1").innerHTML = option1;
        document.getElementById("option2").innerHTML = option2;
        document.getElementById("option3").innerHTML = option3;
        document.getElementById("optionBox").style.visibility = "visible";
    }
  }
}
