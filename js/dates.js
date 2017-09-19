window.onload=updateTime;

var endTimes = [
  '8:00',
  '8:55',
  '9:40',
  '10:45',
  '11:40',
  '12:40',
  '13:30',
  '14:35',
  '15:25',
  '16:15'
];

var timeElement = document.getElementById("time");

function updateTime() {
    timeElement.innerText = getCurrentTime();
}
window.setInterval(updateTime, 1000);


function getEndTimeInMinutes(stunde) {
  return convertTimeToMinutes(endTimes[parseInt(stunde)]);
}

function getCurrentTime() {
  var date = new Date();

  var hours = date.getHours();
  var mins = date.getMinutes();

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (mins < 10) {
    mins = '0' + mins;
  }

  return hours + ':' + mins;
}

function convertTimeToMinutes(time) {
  time = time.split(':');
  return parseInt(time[0]) * 60 + parseInt(time[1]);
}

function getCurrentDate() {//https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
  var date = new Date();

  var dd = date.getDate();
  var mm = date.getMonth()+1;
  var yyyy = date.getFullYear();

  if (dd < 10) { dd = '0' + dd; }
  if (mm < 10) { mm = '0' + mm; }

  return yyyy + "-" + mm + "-" + dd;
}
