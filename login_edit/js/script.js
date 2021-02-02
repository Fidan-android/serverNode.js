  document.getElementById("but").addEventListener("click", function(e){
  e.preventDefault();
  let registerForm = document.forms["registerForm"];
  let login = registerForm.elements["username"].value;
  let password = registerForm.elements["password"].value;
  registerForm.elements["username"].value = "";
  registerForm.elements["password"].value = "";
  let user = JSON.stringify({login: login, password: password});
  let request = new XMLHttpRequest();
  request.open("POST", "/login_edit", true);
  request.setRequestHeader("Content-Type", "application/json");
  request.addEventListener("load", function () {
    let receivedUser = JSON.parse(request.response);
      //console.log(receivedUser.login, "-", receivedUser.password);   // смотрим ответ сервера
    });
  request.send(user);
});