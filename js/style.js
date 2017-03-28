window.onresize = updatePlanPaddingTop;

function updatePlanPaddingTop() {
  var plan = document.getElementById('kasten-container');
  plan.style.paddingTop=getHeaderHeight() + 10 + "px";
}

function getHeaderHeight() {
  var height = $("#header").height();

  if ($('#header-info').is(':visible')) {
    height += $("#header-info").height();
  }

  return height;
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

    setInfoButtonText(text);
  } else {
    hideInfoText();
  }
}

var infoButton = document.getElementById('info-button');
function setInfoButtonText(text) {
  infoButton.addEventListener('click', function() { alert(text); });
}

function hideInfoText() {
  hideById('info-text');
}

function showInfoText() {
  showById('info-text');
}
