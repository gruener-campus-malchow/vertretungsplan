window.onload=updateTime;

function updateTime() {
    var hours_div = document.getElementById("hours");
    var minutes_div = document.getElementById("minutes");

    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();

    if(hours < 10) {
      hours_div.innerText = '0' + hours;
    } else {
      hours_div.innerText = hours;
    }

    if(minutes < 10) {
      minutes_div.innerText = '0' + minutes;
    } else {
      minutes_div.innerText = minutes;
    }

}
window.setInterval(updateTime, 1000);
