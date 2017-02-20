window.onresize = updatePlanPaddingTop;

function updatePlanPaddingTop() {
  var plan = document.getElementById('kasten-container');
  plan.style.paddingTop=getHeaderHeight() + 10 + "px";
}

function getHeaderHeight() {
  return $("#header").height() + $("#header-info").height();
}

function showById(id) {
  document.getElementById(id).classList.remove('hidden');
}

function hideById(id) {
  document.getElementById(id).classList.add('hidden');
}

function setInfoText(text) {
  if(text!==undefined&&text!=='') {
    showInfoText();
    document.getElementById('info-text').innerText=text;
  } else {
    hideInfoText();
  }
}

function hideInfoText() {
  hideById('info-text');
}

function showInfoText() {
  showById('info-text');
}

function setDateText(text) {
  document.getElementById('date-text').innerText=text;
}
