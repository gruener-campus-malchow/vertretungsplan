if (parameters['wrongpw'] === 'true') {
  var pwinfo = document.getElementById('pw-info');
  pwinfo.classList.add('wrong-pw');
  pwinfo.innerText = 'Das eingegebene Passwort ist falsch.';
}
