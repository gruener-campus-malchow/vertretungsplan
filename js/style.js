window.onresize = updatePlanPaddingTop;

function updatePlanPaddingTop() {
  var plan = document.getElementById('kasten-container');
  plan.style.height = window.innerHeight - getHeaderHeight() - 15 + 'px';
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

    addTextWithBRs(document.getElementById('info-text'), text);

    text = text.replace(/;/g, ' ');
    setInfoButtonText(text);
  } else {
    hideInfoText();
  }
}

function addTextWithBRs(e, text) {
  var lines = text.split(';');
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];

    e.innerText += line;
    e.innerHTML += '<br>';
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
