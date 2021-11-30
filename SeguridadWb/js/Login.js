$(document).ready(function () {
    $("#signup-form").submit(function () {
      var nm1 = $("#login-usuario1").val();
      var ps1 = $("#login-password1").val();
      localStorage.setItem("n1", nm1);
      localStorage.setItem("p1", ps1);

    });

    $("#login-form").submit(function () {
      var enteredName = $("#login-usuario2").val();
      var enteredPass = $("#login-password2").val();

      var storedName = localStorage.getItem("n1");
      var storedPass = localStorage.getItem("p1");

      if (enteredName == storedName && enteredPass == storedPass) {
        alert("Usuario y Contraseña Correcta! Click en Aceptar para Acceder a la aplicacion");
        window.open('Index.html');
      }
      else {
        alert("Nombre de usuario y contraseña no coinciden!");
      }

    });

  });