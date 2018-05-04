if (parameters['user'] === 'foyer') {
  hideById('dropdown-label');
}

function dropdownChanged() {
  if (getDropdown().value !== 'ALLE') {
    parameters['klasse'] = getDropdown().value;
  } else {
    parameters['klasse'] = '';
  }
  redirect(urlPlanhtml + getUrlArguments(), 0);
}

function addClassNamesToDropdown(classNames) {
  for (var i = 0; i < classNames.length; i++) {
    var className = classNames[i];
    var option = new Option();
    option.text = className;
    getDropdown().options.add(option);
  }

  if (classNames.indexOf(parameters['klasse']) >= 0) {
    getDropdown().value = parameters['klasse'];
  }
}

function sortClassNames(classNames) {
  var numberPattern = new RegExp('^\\d+');

  classNames.sort(function(s1, s2) {
    var ret = parseInt(numberPattern.exec(s1)) -
      parseInt(numberPattern.exec(s2));
    if (ret != 0) {
      return ret;
    } else if (s1 < s2) {
      return -1;
    } else if (s1 > s2) {
      return 1;
    }
    return 0;
  });

  return classNames;
}

function getDropdown() {
  return document.getElementById('klassendropdown');
}
