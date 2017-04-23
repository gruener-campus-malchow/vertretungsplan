const SCROLL_PLAN_DELAY = 3000, SCROLL_INFO_DELAY = 3000;
var intervalScrollPlan, intervalScrollInfo;
var infoContainer = document.getElementById('info-container');

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
  return infoContainer.scrollWidth - $(infoContainer).scrollLeft() === $(document).width();
}

function scrollToLeft() {
  $(infoContainer).stop().animate({
    scrollLeft: 0
  });
}

function scrollRight(distance) {
  $(infoContainer).stop().animate({
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

//animated scrolling source: https://stackoverflow.com/questions/14817874/animated-javascript-scrollby
function scrollToTop() {
  $('html,body').stop().animate({
    scrollTop: 0
  });
}

function scrollDown(distance) {
  $('html,body').stop().animate({
    scrollTop: '+=' + distance
  });
}

function bottomReached() {
  return $(document).height()===getOffsetTop();
}

function calcPlanScrollDistance() {
  return $(window).height() - getHeaderHeight() - 50;
}

function getOffsetTop() {
  return $(document).scrollTop() + $(window).height();
}

function stopScrollingPlan() {
  clearInterval(intervalScrollPlan);
}