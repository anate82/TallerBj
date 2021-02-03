function getUserProfile (){
    axios
        .get('http://localhost:3000/api/users/me', { headers: { token: localStorage.getItem('token')}})
        .then(response => {
        document.getElementById('inputName').value=response.data.name;
        document.getElementById('inputSurname').value=response.data.surname;
        document.getElementById('inputDni').value=response.data.dni;
        document.getElementById('inputPhone').value=response.data.phone;
        document.getElementById('inputEmail').value=response.data.email;
        })
        .catch(function (error) {
            showPopup('Email o password erroneos')
        });
}

document.getElementById('saveButton').addEventListener('click', function() {
    axios
        .put('http://localhost:3000/api/users/me',{
            name: document.getElementById('inputName').value,
            surname: document.getElementById('inputSurname').value,
            dni: document.getElementById('inputDni').value,
            phone: document.getElementById('inputPhone').value,
            email: document.getElementById('inputEmail').value
        }, { headers: { token: localStorage.getItem('token')}})
        .then(response => {
            showPopup('Perfil Actualizado')
        })
        .catch(function (error) {
            showPopup('Error al actualizar el perfil')
        });

})

document.getElementById('btnProfile').addEventListener('click', function (){
    document.getElementById('sectionProfile').style.display = "block";
    document.getElementById('sectionPswd').style.display = "none";
})

document.getElementById('btnPswd').addEventListener('click', function (){
    document.getElementById('sectionProfile').style.display = "none";
    document.getElementById('sectionPswd').style.display = "block";
})

document.getElementById('saveButtonPswd').addEventListener('click', function() {
    let pswd = document.getElementById('inputRePswdRec').value;
    let repswd = document.getElementById('inputPswdRec').value;

    if(pswd === repswd) {
        axios
            .put('http://localhost:3000/api/users/me/password',{
                password: document.getElementById('inputRePswdRec').value
            }, { headers: { token: localStorage.getItem('token')}})
            .then(response => {
                showPopup('Contraseña Actualizada');
            })
            .catch(function (error) {
                showPopup('Error al actualizar la contraseña');
            });
    } else {
        showPopup('Las contraseñas no son iguales');
    }
})
 
function showPopup(message){
    $('#myToast').toast('show'); 
    var myToastEl = document.getElementsByClassName('toast-body');
    myToastEl[0].innerHTML += message;
}

window.onload = function () {
    $('#myToast').toast();
    var myToastEl = document.getElementById('myToast');
    myToastEl.addEventListener('hidden.bs.toast', function () {
        var myToastEl = document.getElementsByClassName('toast-body');
        myToastEl[0].innerHTML = "";
    })
    document.getElementById('sectionProfile').style.display = "block";
    document.getElementById('sectionPswd').style.display = "none";
    document.getElementById('navUser').innerHTML = localStorage.getItem('name') + " " + localStorage.getItem('surname');
    let nav = document.getElementById('navbarResponsive')
    if (localStorage.getItem('role') == 'admin'){
        nav.innerHTML += `<ul class="navbar-nav text-uppercase ml-auto">
                      <li class="nav-item">
                          <a class="nav-link js-scroll-trigger" aria-current="page" href="profile.html">Perfil</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link js-scroll-trigger" href="carPage.html">Vehiculos</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link js-scroll-trigger" href="notifyPage.html">Notificaciones</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link js-scroll-trigger" href="usersPage.html">Usuarios</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link js-scroll-trigger" id="navBarSalir" href="index.html">Salir</a>
                      </li>
                  </ul>`
  } else {
    nav.innerHTML += `<ul class="navbar-nav text-uppercase ml-auto">
                      <li class="nav-item">
                          <a class="nav-link js-scroll-trigger" aria-current="page" href="profile.html">Perfil</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link js-scroll-trigger" href="carPage.html">Vehiculos</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link js-scroll-trigger" href="notifyPage.html">Notificaciones</a>
                      </li>
                      <li class="nav-item">
                          <a class="nav-link js-scroll-trigger" id="navBarSalir" href="index.html">Salir</a>
                      </li>
                  </ul>`
  }
  document.getElementById('navBarSalir').addEventListener("click", function() {
    localStorage.clear();
    window.location.reload()
  })
    getUserProfile();
}