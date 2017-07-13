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

function showElement(e) {
  e.classList.remove('hidden');
}

function hideElement(e) {
  e.classList.add('hidden');
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

function setKlassenstufeTextInHeader() {
  var klassenstufe = parameters['klassenstufe'];
  if (klassenstufe !== undefined && klassenstufe !== '') {
    var textKlassenstufe = document.querySelector('#text-klassenstufe');
    
    textKlassenstufe.innerText = klassenstufe;
    showElement(textKlassenstufe);
    showById('label-klassenstufe');
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
