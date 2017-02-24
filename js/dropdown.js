if (parameters['user']==='foyer') {
  hideById('dropdown-label');
}

function dropdownChanged() {
  if(getDropdown().value !== "Alle") {
    parameters["klasse"] = getDropdown().value;
  } else {
    parameters["klasse"] = "";
  }
  redirect(urlPlanhtml + getUrlArguments(), 0);
}

function addClassNamesToDropdown() {
  for (var i = 0; i < allClassNames.length; i++) {
    var className = allClassNames[i];
    var option = new Option();
    option.text = className;
    getDropdown().options.add(option);
  }

  if (allClassNames.includes(parameters['klasse'])) {
    getDropdown().value=parameters['klasse'];
  }
}

function getDropdown() {
  return document.getElementById('klassendropdown');
}
