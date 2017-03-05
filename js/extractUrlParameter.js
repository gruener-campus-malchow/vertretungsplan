var parameters = {};

/**
  reads parameters in URL and adds them to the parameters map
*/
function setParametersFromURL() {
  var params = document.location.search.split('&');
  params[0] = params[0].replace('?', '');

  for (var i = 0; i < params.length; i++) {
    var param = params[i];
    parameters[param.substring(0, param.indexOf('='))] = param.substring(
      param.indexOf('=') + 1,
      param.length
    );
  }
}

setParametersFromURL();
