window.onresize = updatePlanPaddingTop;

function updatePlanPaddingTop() {
  var plan = document.getElementById('kasten-container');
  plan.style.paddingTop=$("#header").height() + $("#header-info").height() + 10 + "px";
}
