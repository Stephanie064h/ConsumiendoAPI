function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://localhost:44319/api/Usuario");
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var trHTML = ''; 
        const objects = JSON.parse(this.responseText);
        for (let object of objects) {
          trHTML += '<tr>'; 
          trHTML += '<td>'+object['id']+'</td>';
          trHTML += '<td>'+object['idRol']+'</td>';
          trHTML += '<td>'+object['nombre']+'</td>';
          trHTML += '<td>'+object['apellido']+'</td>';
          trHTML += '<td>'+object['login']+'</td>';
          //trHTML += '<td>'+object['password']+'</td>';
          //trHTML += '<td>'+object['estatus']+'</td>';
          trHTML += '<td>'+object['fechaRegistro']+'</td>';
          trHTML += '<td><button type="button" class="btn btn-outline-success" onclick="showUserEditBox('+object['id']+')">🖉 Edit</button>';
          trHTML += '<button type="button" class="btn btn-outline-danger" onclick="userDelete('+object['id']+')">🗑Del</button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
  }
  
  loadTable();
  //////
  function showUserCreateBox() {
    Swal.fire({
      title: 'Crear Nuevo Usuario',
      html: 
         
        //'<input id="id" type="hidden">' +
        '<label for="">Rol</label>' +
        '<input id="idRol" class="swal2-input" placeholder="Rol"><br>' + 
        '<label for="">Nombre</label>' +
        '<input id="nombre" class="swal2-input" placeholder="nombre"><br>' +
        '<label for="">Apellido</label>' +
        '<input id="apellido" class="swal2-input" placeholder="apellido"><br>' +
        '<label for="">Login</label>' +
        '<input id="login" class="swal2-input" placeholder="login"><br>'+
        '<label for="">Contraseña</label>' +
        '<input id="nombre" class="swal2-input" placeholder="password"><br>' ,
        //'<label for="">Nombre</label>' +
        //'<input id="apellido" class="swal2-input" placeholder="status"><br>' +
        //'<label for="">Nombre</label>' +
        //'<input id="login" class="swal2-input" placeholder="login">',
      focusConfirm: false,
      preConfirm: () => {
        userCreate();
      }
    })
  }
  
  function userCreate() {
    const idRol = document.getElementById("idRol").value;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const login = document.getElementById("login").value;
      
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://localhost:44319/api/Usuario");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "idRol": idRol, "nombre": nombre, "apellido": apellido, "login": login, 
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      }
    };
  }
  ///
  function showUserEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://localhost:44319/api/Usuario/{id}");
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        const user = objects['user'];
        console.log(user);
        Swal.fire({
          title: 'Editar Usuario',
          html:
            '<input id="id" type="hidden" value='+user['id']+'>' +
            '<input id="idRol" class="swal2-input" placeholder="Rol" value="'+user['idRol']+'">' +
            '<input id="nombre" class="swal2-input" placeholder="nombre" value="'+user['nombre']+'">' +
            '<input id="apellido" class="swal2-input" placeholder="apellido" value="'+user['apellido']+'">' +
            '<input id="login" class="swal2-input" placeholder="login" value="'+user['login']+'">',
          focusConfirm: false,
          preConfirm: () => {
            userEdit();
          }
        })
      }
    };
  }
  
  function userEdit() {
    const id = document.getElementById("id").value;
    const idRol = document.getElementById("idRol").value;
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const login = document.getElementById("login").value;
      
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "https://localhost:44319/api/Usuario/{id}");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "id": id, "idRol": idRol, "nombre": nombre, "apellido": apellido, "login": login, 
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      }
    };
  }

  //////
  function userDelete(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "https://localhost:44319/api/Usuario/{id}");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
      "id": id
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      } 
    };
  }