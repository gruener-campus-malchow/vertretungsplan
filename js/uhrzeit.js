window.onload=updateTime;

function updateTime() {
    var hours_div = document.getElementById("hours");
    var minutes_div = document.getElementById("minutes");
    var now = new Date();
    hours_div.innerText = now.getHours();
    minutes_div.innerText = now.getMinutes();
}
window.setInterval(updateTime, 1000);
