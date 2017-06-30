const SCROLL_PLAN_DELAY = 10 * 1000, SCROLL_INFO_DELAY = 10 * 1000;
var intervalScrollPlan, intervalScrollInfo;

function startScrolling() {
  intervalScrollPlan = setInterval(scrollPlan, SCROLL_PLAN_DELAY);
  intervalScrollInfo = setInterval(scrollInfo, SCROLL_INFO_DELAY);
}

function scrollInfo() {
  if (rightReached()) {
    scrollToLeft();
  } else {
    var distance = calcInfoScrollDistance();
    scrollRight(distance);
  }
}

function rightReached() {
  return getInfoContainer().scrollWidth - $(getInfoContainer()).scrollLeft() === $(document).width();
}

function scrollToLeft() {
  $(getInfoContainer()).stop().animate({
    scrollLeft: 0
  });
}

function scrollRight(distance) {
  $(getInfoContainer()).stop().animate({
    scrollLeft: '+=' + distance
  });
}

function calcInfoScrollDistance() {
  return window.innerWidth - 200;
}

function scrollPlan() {
  if(bottomReached()) {
    scrollToTop();
  } else {
    var scrollDistance = calcPlanScrollDistance();
    scrollDown(scrollDistance);
  }
}

var kastenContainer = document.getElementById('kasten-container');
//animated scrolling source: https://stackoverflow.com/questions/14817874/animated-javascript-scrollby
function scrollToTop() {
  $(kastenContainer).stop().animate({
    scrollTop: 0
  });
}

function scrollDown(distance) {
  $(kastenContainer).stop().animate({
    scrollTop: '+=' + distance
  });
}

function bottomReached() {
  return kastenContainer.scrollHeight === $(kastenContainer).scrollTop() + $(kastenContainer).innerHeight();
}

function calcPlanScrollDistance() {
  return $(window).height() - getHeaderHeight() - 50;
}

function stopScrollingPlan() {
  clearInterval(intervalScrollPlan);
}