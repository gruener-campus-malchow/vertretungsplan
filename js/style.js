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

function updateDateHeader() {
  var visibleY = getHeaderHeight();
  var invisibleDateBoxes = getInvisibleDateBoxes(visibleY);
  var highestOffset = getHighestOffset(invisibleDateBoxes);
  var latestDateBox = getDateBoxByOffset(invisibleDateBoxes, highestOffset);

  //setDateText(getDateBoxText(currentDateBox));
}

function getInvisibleDateBoxes(visibleY) {
  var invisibleDateBoxes = [];

  for (var i = 0; i < dateBoxes.length; i++) {
    var dateBox = dateBoxes[i];

    if (getDateBoxTopOffset(dateBox) < visibleY) {
      invisibleDateBoxes.push(dateBox);
    }
  }

  return invisibleDateBoxes;
}

function getHighestOffset(boxes) {
  var highestOffset = 0;

  for (var i = 0; i < boxes.length; i++) {
    var dateBox = boxes[i];
    var topOffset = getDateBoxTopOffset(dateBox);

    if(topOffset > highestOffset) {
      highestOffset = topOffset;
    }
  }

  return highestOffset;
}

function getDateBoxByOffset(boxes, offset) {
  for (var i = 0; i < boxes.length; i++) {
    var dateBox = boxes[i];

    if (getDateBoxTopOffset(dateBox) === offset) {
      return dateBox;
    }
  }
}

function getDateBoxTopOffset(dateBox) {
  var offset = dateBox.offsetTop;
  console.log(offset);   //always equals 0
  return offset;
}

function getDateBoxText(dateBox) {

}
