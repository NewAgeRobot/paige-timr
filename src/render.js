var fs = require('fs');
var parse = require('csv-parse');
const asana = require('asana');
var Chart = require('chart.js');
var asanaSub1Array = [];
var asanaSub2Array = [];
var asanaSub3Array = [];
var asanaSub4Array = [];
var labelsImport;
var labelsArray;
var subject1Labels = [];
var subject2Labels = [];
var subject3Labels = [];
var subject4Labels = [];

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
var activeTask = "";

var csvTimerArray = [];

var allSubjectChartTimes = [0,0,0,0];
var subject1ChartTimes = [0,0,0,0,0,0,0,0]; //filter through all times saved, store ones that match to current subject in this
var subject2ChartTimes = [0,0,0,0,0,0,0,0];
var subject3ChartTimes = [0,0,0,0,0,0,0,0];
var subject4ChartTimes = [0,0,0,0,0,0,0,0];

//auth token - 1/1199906203295061:3e0be57da5c97ebc3ee5d20ec409e418

//add in timer functionality
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



//add in button conditions



const client = asana.Client.create().useAccessToken('1/1199906203295061:3e0be57da5c97ebc3ee5d20ec409e418');

//TO DO: store in local excel, have button that pulls down latest
//TO DO: try and combine into one query with optional fields to take down all the information - loop through it - client.projects.getProjects

//College Array Pulldown
client.tasks.getTasksForProject('1199906289002007', {param: "value", param: "value", opt_pretty: true, opt_fields: 'name, memberships.section.name'})
  .then((result) => {
    console.log(result);
        for(var taskCounter = 0; taskCounter < result.data.length; taskCounter++){
          asanaSub1Array.push([result.data[taskCounter].memberships[0].section.name,result.data[taskCounter].name]);
        }
      console.table(asanaSub1Array);
  });

//Work Array Pulldown
client.tasks.getTasksForProject('1199909235624453', {param: "value", param: "value", opt_pretty: true, opt_fields: 'name, memberships.section.name'})
  .then((result) => {
    console.log(result);
        for(var taskCounter = 0; taskCounter < result.data.length; taskCounter++){
          asanaSub2Array.push([result.data[taskCounter].memberships[0].section.name,result.data[taskCounter].name]);
        }
      console.table(asanaSub2Array);
  });

//Home Array Pulldown
client.tasks.getTasksForProject('1199909235624471', {param: "value", param: "value", opt_pretty: true, opt_fields: 'name, memberships.section.name'})
  .then((result) => {
    console.log(result);
        for(var taskCounter = 0; taskCounter < result.data.length; taskCounter++){
          asanaSub3Array.push([result.data[taskCounter].memberships[0].section.name,result.data[taskCounter].name]);
        }
      console.table(asanaSub3Array);
  });

//Life Array Pulldown
client.tasks.getTasksForProject('1199909235624487', {param: "value", param: "value", opt_pretty: true, opt_fields: 'name, memberships.section.name'})
  .then((result) => {
    console.log(result);
        for(var taskCounter = 0; taskCounter < result.data.length; taskCounter++){
          asanaSub4Array.push([result.data[taskCounter].memberships[0].section.name,result.data[taskCounter].name]);
        }
      console.table(asanaSub4Array);
  });




//read CSV for Labels
fs.readFile('C:/Users/seanm/OneDrive/Desktop/PaigeTimr/paige-timr/Labels.csv', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  labelsImport = data;
  labelsArray = labelsImport.split(/[\n,\r]+/);

  subject1 = labelsArray[0];
  for(var i = 4; i < labelsArray.length-1;i+=4){
      subject1Labels.push(labelsArray[i]);
  }

  subject2 = labelsArray[1];
  for(var i = 5; i < labelsArray.length-1;i+=4){
      subject2Labels.push(labelsArray[i]);
  }

  subject3 = labelsArray[2];
  for(var i = 6; i < labelsArray.length-1;i+=4){
      subject3Labels.push(labelsArray[i]);
  }

  subject4 = labelsArray[3];
  for(var i = 7; i < labelsArray.length-1;i+=4){
      subject4Labels.push(labelsArray[i]);
  }
  //pull Timer data into nested array
  fs.readFile('C:/Users/seanm/OneDrive/Desktop/PaigeTimr/paige-timr/TimerData.csv', 'utf8' , (err, data) => {
    parse(data, {columns: false, trim: true}, function(err, rows) {
      csvTimerArray = rows; // Your CSV data is in an array of arrys passed to this callback as rows.
    //  console.table(csvTimerArray);
      homepageInit();
    })
  })

});

//showLabels function
function showLabels(){
  document.getElementById("task1").getElementsByClassName("taskLabel")[0].innerHTML = task1;
  document.getElementById("task2").getElementsByClassName("taskLabel")[0].innerHTML = task2;
  document.getElementById("task3").getElementsByClassName("taskLabel")[0].innerHTML = task3;
  document.getElementById("task4").getElementsByClassName("taskLabel")[0].innerHTML = task4;
  document.getElementById("task5").getElementsByClassName("taskLabel")[0].innerHTML = task5;
  document.getElementById("task6").getElementsByClassName("taskLabel")[0].innerHTML = task6;
  document.getElementById("task7").getElementsByClassName("taskLabel")[0].innerHTML = task7;
  document.getElementById("task8").getElementsByClassName("taskLabel")[0].innerHTML = task8;
  document.getElementsByClassName("taskLabel")[0].style = "visibility: visible;background:black;";
  document.getElementsByClassName("taskLabel")[1].style = "visibility: visible;background:black;";
  document.getElementsByClassName("taskLabel")[2].style = "visibility: visible;background:black;";
  document.getElementsByClassName("taskLabel")[3].style = "visibility: visible;background:black;";
  document.getElementsByClassName("taskLabel")[4].style = "visibility: visible;background:black;";
  document.getElementsByClassName("taskLabel")[5].style = "visibility: visible;background:black;";
  document.getElementsByClassName("taskLabel")[6].style = "visibility: visible;background:black;";
  document.getElementsByClassName("taskLabel")[7].style = "visibility: visible;background:black;";
}

//hide Labels function
function hideLabels(){
  document.getElementById("task1").getElementsByClassName("taskLabel")[0].innerHTML = "";
  document.getElementById("task2").getElementsByClassName("taskLabel")[0].innerHTML = "";
  document.getElementById("task3").getElementsByClassName("taskLabel")[0].innerHTML = "";
  document.getElementById("task4").getElementsByClassName("taskLabel")[0].innerHTML = "";
  document.getElementById("task5").getElementsByClassName("taskLabel")[0].innerHTML = "";
  document.getElementById("task6").getElementsByClassName("taskLabel")[0].innerHTML = "";
  document.getElementById("task7").getElementsByClassName("taskLabel")[0].innerHTML = "";
  document.getElementById("task8").getElementsByClassName("taskLabel")[0].innerHTML = "";
  document.getElementsByClassName("taskLabel")[0].style = "visibility: hidden;background:black;";
  document.getElementsByClassName("taskLabel")[1].style = "visibility: hidden;background:black;";
  document.getElementsByClassName("taskLabel")[2].style = "visibility: hidden;background:black;";
  document.getElementsByClassName("taskLabel")[3].style = "visibility: hidden;background:black;";
  document.getElementsByClassName("taskLabel")[4].style = "visibility: hidden;background:black;";
  document.getElementsByClassName("taskLabel")[5].style = "visibility: hidden;background:black;";
  document.getElementsByClassName("taskLabel")[6].style = "visibility: hidden;background:black;";
  document.getElementsByClassName("taskLabel")[7].style = "visibility: hidden;background:black;";
}

//chartmaker, feeding it the subject assignment list and the times
function chartMaker(l,d){
  let myChart = document.getElementById('myChart').getContext('2d');

  let massPopChart = new Chart(myChart, {
    type: 'doughnut',
    data:{
      labels:l,
      datasets:[{
        data: d,
        backgroundColor: ['#f94043', '#f3742d', '#f9961f', '#f9c852', '#91be6d', '#44aa8c', '#57758f', '#5093cd','#f94043', '#f3742d', '#f9961f', '#f9c852', '#91be6d', '#44aa8c', '#57758f', '#5093cd','#f94043', '#f3742d', '#f9961f', '#f9c852', '#91be6d', '#44aa8c', '#57758f', '#5093cd','#f94043', '#f3742d', '#f9961f', '#f9c852', '#91be6d', '#44aa8c', '#57758f', '#5093cd']
      }]
    },
    options:{
      legend: {
        position: 'right',
        labels: {
                fontSize: 16,
                fontColor: '#FFF'
            }
      }
    }
  });
}

function subjectChartTimesPrep(sub,labels,times){//expand potential params to accomodate getting every subject into whole new array for homepage/just breakdown of subjects

    for(var i = 1; i < csvTimerArray.length;i++){
    if(Array.isArray(sub)){
      for(var p = 0; p < sub.length; p++){
        if(csvTimerArray[i][2] == sub[p]){
          var m = parseInt(csvTimerArray[i][4]);
          times[p] += m;
        }
      }
    }
    else {
      if(csvTimerArray[i][2] == sub){
        for(var k = 0; k < labels.length; k++){
          if(csvTimerArray[i][3] == labels[k]){
            var l = parseInt(csvTimerArray[i][4]);
            times[k] += l;
          }
        }
      }
    }
  }
}


//homepage initilise
function homepageInit(){
  task1 = "Today";
  task2 = "Week";
  task3 = "Month";
  task4 = "Year";
  task5 = subject1;
  task6 = subject2;
  task7 = subject3;
  task8 = subject4;
  document.getElementById("myChart").style = "visibility: visible;";
  showLabels();
  subjectChartTimesPrep([subject1,subject2,subject3,subject4],[subject1,subject2,subject3,subject4],allSubjectChartTimes);
  chartMaker([subject1,subject2,subject3,subject4],allSubjectChartTimes);
  document.querySelectorAll('.taskItem').forEach(e => e.remove());
}


//show list of asana tasks
//Have it loop through to see how many sections there are and divide the content into that many columns
function taskLister(sub){
console.log(sub);
  for(var i = 0; i < sub.length;i++){
    var node = document.createElement("div");
    node.className = "taskItem";
    var textNode = document.createTextNode(sub[i][0]+": "+sub[i][1]);
    node.appendChild(textNode);
    var content = document.getElementById("contentBox");
    content.appendChild(node);
  }
}



//listener for keypresses
window.addEventListener("keydown", checkKeyPressed, false);
function checkKeyPressed(evt) {
console.log(evt.keyCode);
//Subject Checks
    if (evt.keyCode == "90") {      //key Z
        if(subjectState == ""){           //to prevent multi-button pressing jumping states
          subjectState = subject1;
          document.getElementById("myChart").style = "visibility: hidden;";
          document.getElementById("myChart").style = "display: none;";
          taskLister(asanaSub1Array);
          //work in subtasks where necessary
          task1 = labelsArray[4];
          task2 = labelsArray[8];
          task3 = labelsArray[12];
          task4 = labelsArray[16];
          task5 = labelsArray[20];
          task6 = labelsArray[24];
          task7 = labelsArray[28];
          task8 = labelsArray[32];
          showLabels();
        }
    }
    else if (evt.keyCode == "88") { //key X
        if(subjectState == ""){
          subjectState = subject2;
          document.getElementById("myChart").style = "visibility: hidden;";
          document.getElementById("myChart").style = "display: none;";
          taskLister(asanaSub2Array);
          task1 = labelsArray[5];
          task2 = labelsArray[9];
          task3 = labelsArray[13];
          task4 = labelsArray[17];
          task5 = labelsArray[21];
          task6 = labelsArray[25];
          task7 = labelsArray[29];
          task8 = labelsArray[33];
          showLabels();
        }
    }
    else if (evt.keyCode == "67") { //key C
        if(subjectState == ""){
          subjectState = subject3;
          document.getElementById("myChart").style = "visibility: hidden;";
          document.getElementById("myChart").style = "display: none;";
          taskLister(asanaSub3Array);
          task1 = labelsArray[6];
          task2 = labelsArray[10];
          task3 = labelsArray[14];
          task4 = labelsArray[18];
          task5 = labelsArray[22];
          task6 = labelsArray[26];
          task7 = labelsArray[30];
          task8 = labelsArray[34];
          showLabels();
        }
    }
    else if (evt.keyCode == "65") { //key A
        if(subjectState == ""){
          subjectState = subject4;
          document.getElementById("myChart").style = "visibility: hidden;";
          document.getElementById("myChart").style = "display: none;";
          taskLister(asanaSub4Array);
          task1 = labelsArray[7];
          task2 = labelsArray[11];
          task3 = labelsArray[15];
          task4 = labelsArray[19];
          task5 = labelsArray[23];
          task6 = labelsArray[27];
          task7 = labelsArray[31];
          task8 = labelsArray[35];
          showLabels();
        }
    }
  else if (evt.keyCode == "13") {
    if(subjectState != ""){
      subjectState = "";
      activeTask = "";
      homepageInit();
    }
  }
  else if (evt.keyCode == "49") { //key 1
    console.log(subjectState);
    console.log(activeTask);
    if(subjectState != ""){//if they've entered a subject
      if(activeTask != ""){//if they've selected a task
        console.log("controlling timer");
      }
      else{//they're currently on a subject's task select screen
        activeTask = task1;
        console.log("choosing task");
      }
    }
    else{//they're currently on the homepage selecting a chart time filter
        console.log("selecting time filter");
    }
  }
  else if (evt.keyCode == "50") { //key 2
    if(subjectState != ""){//if they've entered a subject
      if(activeTask != ""){//if they've selected a task
        console.log("controlling timer");
      }
      else{//they're currently on a subject's task select screen
        activeTask = task2;
        console.log("choosing task");
      }
    }
    else{//they're currently on the homepage selecting a chart time filter
        console.log("selecting time filter");
    }
  }
  else if (evt.keyCode == "51") { //key 3
    if(subjectState != ""){//if they've entered a subject
      if(activeTask != ""){//if they've selected a task
        console.log("controlling timer");
      }
      else{//they're currently on a subject's task select screen
        activeTask = task3;
        console.log("choosing task");
      }
    }
    else{//they're currently on the homepage selecting a chart time filter
        console.log("selecting time filter");
    }
  }
  else if (evt.keyCode == "52") { //key 4
    if(subjectState != ""){//if they've entered a subject
      if(activeTask != ""){//if they've selected a task
        console.log("controlling timer");
      }
      else{//they're currently on a subject's task select screen
        activeTask = task4;
        console.log("choosing task");
      }
    }
    else{//they're currently on the homepage selecting a chart time filter
        console.log("selecting time filter");
    }
  }
  else if (evt.keyCode == "53") { //key 5//add toggle to get back to overall subject chart
    console.log("blah");
    if(subjectState != ""){//if they've entered a subject
      if(activeTask != ""){//if they've selected a task
        console.log("controlling timer");
      }
      else{//they're currently on a subject's task select screen
        activeTask = task4;
        console.log("choosing task");
      }
    }
    else{//they're currently on the homepage selecting a chart time filter
        console.log("selecting time filter");
        subjectChartTimesPrep(subject1,subject1Labels,subject1ChartTimes);
        chartMaker(subject1Labels,subject1ChartTimes);
    }
  }
  else if (evt.keyCode == "54") { //key 6
    subjectChartTimesPrep(subject2,subject2Labels,subject2ChartTimes);
    chartMaker(subject2Labels,subject2ChartTimes);
  }
  else if (evt.keyCode == "55") { //key 7
    subjectChartTimesPrep(subject3,subject3Labels,subject3ChartTimes);
    chartMaker(subject3Labels,subject3ChartTimes);
  }
  else if (evt.keyCode == "56") { //key 8
    subjectChartTimesPrep(subject4,subject4Labels,subject4ChartTimes);
    chartMaker(subject4Labels,subject4ChartTimes);
  }
}

/* commented out for the moment until the assignment states are set up
function createTimer(){
  var timeDiv = document.createElement("div");
  timeDiv.id = "timer";
  var contentForTimer = document.getElementById("contentBox");
  contentForTimer.appendChild(timeDiv);
}


window.setInterval( function(){
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
      document.getElementById("timer").classList.remove('defaultTime');
      document.getElementById("timer").style = "color:gold;font-style:italic;";
      timerActive = "";
      alert("stoppppp");
      break;
  }
},100)*/
