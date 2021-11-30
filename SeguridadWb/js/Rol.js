function loadTable() {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://localhost:44319/api/Rol");
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        console.log(this.responseText);
        var trHTML = ''; 
        const objects = JSON.parse(this.responseText);
        for (let object of objects) {
          trHTML += '<tr>'; 
          trHTML += '<td>'+object['id']+'</td>';
          trHTML += '<td>'+object['nombre']+'</td>';
          trHTML += '<td><button type="button" class="btn btn-outline-success" onclick="showRolEditBox('+object['id']+')">🖉 Edit</button>';
          trHTML += '<button type="button" class="btn btn-outline-danger" onclick="rolDelete('+object['id']+')">🗑Del</button></td>';
          trHTML += "</tr>";
        }
        document.getElementById("mytable").innerHTML = trHTML;
      }
    };
  }
  
  loadTable();
  function showRolCreateBox() {
    Swal.fire({
      title: 'Crear Nuevo Rol',
      html: 
        '<label for="">Nombre</label>' +
        '<input id="nombre" class="swal2-input" placeholder="nombre"><br>',
      focusConfirm: false,
      preConfirm: () => {
        rolCreate();
      }
    })
  }
  
  function rolCreate() {
    const nombre = document.getElementById("nombre").value;
      
    const xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://localhost:44319/api/Rol");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
    "nombre": nombre, 
    }));
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        Swal.fire(objects['message']);
        loadTable();
      }
    };
  }
  function showRolEditBox(id) {
    console.log(id);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", "https://localhost:44319/api/Rol/{id}");
    xhttp.send();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        const objects = JSON.parse(this.responseText);
        const rol = objects['rol'];
        console.log(rol);
        Swal.fire({
          title: 'Editar Rol',
          html:
            '<input id="id" type="hidden" value='+rol['id']+'>' +
            '<input id="nombre" class="swal2-input" placeholder="nombre" value="'+rol['nombre']+'">',
          focusConfirm: false,
          preConfirm: () => {
            rolEdit();
          }
        })
      }
    };
  }
  
  function rolEdit() {
    const id = document.getElementById("id").value;
    const nombre = document.getElementById("nombre").value;
      
    const xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "https://localhost:44319/api/Rol/{id}");
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.send(JSON.stringify({ 
     "nombre": nombre,
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
  function rolDelete(id) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "https://localhost:44319/api/Rol/id");
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