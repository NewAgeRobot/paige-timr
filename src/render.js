var fs = require('fs');
var parse = require('csv-parse');
const asana = require('asana');
var Chart = require('chart.js');
var asanaCollegeArray = [];
var asanaWorkArray = [];
var asanaHomeArray = [];
var asanaLifeArray = [];
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

var csvTimerArray = [];

var allSubjectChartTimes = [0,0,0,0];
var subject1ChartTimes = [0,0,0,0,0,0,0,0]; //filter through all times saved, store ones that match to current subject in this
var subject2ChartTimes = [0,0,0,0,0,0,0,0];
var subject3ChartTimes = [0,0,0,0,0,0,0,0];
var subject4ChartTimes = [0,0,0,0,0,0,0,0];

//auth token - 1/1199906203295061:3e0be57da5c97ebc3ee5d20ec409e418

//pull in times from CSV
//run through and add values for each label
//grab the values for each of the assignments


//add tasks to content area
//add in graphs to homepage
//add in timer functionality
//add in button conditions



const client = asana.Client.create().useAccessToken('1/1199906203295061:3e0be57da5c97ebc3ee5d20ec409e418');

//TO DO: store in local excel, have button that pulls down latest
//TO DO: try and combine into one query with optional fields to take down all the information - loop through it

//College Array Pulldown
client.tasks.getTasksForProject('1199906289002007', {param: "value", param: "value", opt_pretty: true, opt_fields: 'name, memberships.section.name'})
  .then((result) => {
    console.log(result);
        for(var taskCounter = 0; taskCounter < result.data.length; taskCounter++){
          asanaCollegeArray.push([result.data[taskCounter].memberships[0].section.name,result.data[taskCounter].name]);
        }
      console.table(asanaCollegeArray);
  });

//Work Array Pulldown
client.tasks.getTasksForProject('1199909235624453', {param: "value", param: "value", opt_pretty: true, opt_fields: 'name, memberships.section.name'})
  .then((result) => {
    console.log(result);
        for(var taskCounter = 0; taskCounter < result.data.length; taskCounter++){
          asanaWorkArray.push([result.data[taskCounter].memberships[0].section.name,result.data[taskCounter].name]);
        }
      console.table(asanaWorkArray);
  });

//Home Array Pulldown
client.tasks.getTasksForProject('1199909235624471', {param: "value", param: "value", opt_pretty: true, opt_fields: 'name, memberships.section.name'})
  .then((result) => {
    console.log(result);
        for(var taskCounter = 0; taskCounter < result.data.length; taskCounter++){
          asanaHomeArray.push([result.data[taskCounter].memberships[0].section.name,result.data[taskCounter].name]);
        }
      console.table(asanaHomeArray);
  });

//Life Array Pulldown
client.tasks.getTasksForProject('1199909235624487', {param: "value", param: "value", opt_pretty: true, opt_fields: 'name, memberships.section.name'})
  .then((result) => {
    console.log(result);
        for(var taskCounter = 0; taskCounter < result.data.length; taskCounter++){
          asanaLifeArray.push([result.data[taskCounter].memberships[0].section.name,result.data[taskCounter].name]);
        }
      console.table(asanaLifeArray);
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
  console.log("yay");
}


//show list of asana tasks
function taskLister(sub){
console.log(sub);
}



//listener for keypresses
window.addEventListener("keydown", checkKeyPressed, false);
function checkKeyPressed(evt) {

//Subject Checks
  if(subjectState == ""){             //to prevent multi-button pressing jumping states
    if (evt.keyCode == "90") {      //key Z
        subjectState = subject1;
        document.getElementById("myChart").style = "visibility: hidden;";
        taskLister(subject1);
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
    else if (evt.keyCode == "88") { //key X
        subjectState = subject2;
        document.getElementById("myChart").style = "visibility: hidden;";
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
    else if (evt.keyCode == "67") { //key C
        subjectState = subject3;
        document.getElementById("myChart").style = "visibility: hidden;";
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
    else if (evt.keyCode == "65") { //key A
        subjectState = subject4;
        document.getElementById("myChart").style = "visibility: hidden;";
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
    else if (evt.keyCode == "53") { //key 5//add toggle to get back to overall subject chart
      subjectChartTimesPrep(subject1,subject1Labels,subject1ChartTimes);
      chartMaker(subject1Labels,subject1ChartTimes);
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
  else if (evt.keyCode == "13") {
    subjectState = "";
    homepageInit();
  }

}
