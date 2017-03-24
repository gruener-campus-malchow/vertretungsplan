var infoButton = document.getElementById('info-button');
infoButton.addEventListener('click', showInfoDialog);

function showInfoDialog() {
  alert(getInfoText());
}
