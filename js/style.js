window.onresize = updatePlanPaddingTop;

function updatePlanPaddingTop() {
  var plan = document.getElementById('kasten-container');
  plan.style.paddingTop=getHeaderHeight() + 10 + "px";
}

function getHeaderHeight() {
  return $("#header").height() + $("#header-info").height();
}
