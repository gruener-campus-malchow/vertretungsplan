const SCROLL_DELAY = 3000;
var scrollDistance;
var intervalScroll;

function startScrolling() {
  intervalScroll = setInterval(scroll, SCROLL_DELAY);
}

function scroll() {
  calcScrollDistance();

  if(bottomReached()) {
    scrollToTop();
  } else {
    scrollDown();
  }
}

//animated scrolling source: https://stackoverflow.com/questions/14817874/animated-javascript-scrollby
function scrollToTop() {
  $('html,body').stop().animate({
    scrollTop: 0
  }, finishedScrollingToTop);
}

function scrollDown() {
  $('html,body').stop().animate({
    scrollTop: '+=' + scrollDistance
  }, finishedScrollingDownOnce);
}

function finishedScrollingToTop() {
  setDateText('');
}

function finishedScrollingDownOnce() {
  updateDateHeader();
}

function bottomReached() {
  return $(document).height()===getOffsetTop();
}

function calcScrollDistance() {
  scrollDistance = $(window).height() - getHeaderHeight() - 50;
}

function getOffsetTop() {
  return $(document).scrollTop() + $(window).height();
}

function stopScrolling() {
  clearInterval(intervalScroll);
}
