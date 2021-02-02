function showAllUsers(){
    axios
        .get('http://localhost:3000/api/users', { headers: { token: localStorage.getItem('token')}})
        .then(arrayUsers => {
            let arrId = [];
            arrayUsers.data.forEach((user,index) =>{
                let accordionSection = document.getElementById('notifySection');
                accordionSection.innerHTML+= `<section class="row">
                  <div class="accordion col-10" id="accordionUser${index}">
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="heading${index}">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                          ${user.name} ${user.surname}
                        </button>
                      </h2>
                      <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionUser${index}">
                        <div class="accordion-body">
                          <form class="form-row">
                            <div class="form-group col-8">
                              <label for="name${index}">Nombre</label>
                              <input type="text" class="form-control" id="name${index}" placeholder="Nombre" value="${user.name}">
                            </div>
                            <div class="form-group col-8">
                              <label for="surname${index}">Apellido</label>
                              <input type="text" class="form-control" id="surname${index}" placeholder="Apellido" value="${user.surname}">
                            </div>
                            <div class="form-group col-8">
                              <label for="dni${index}">Dni</label>
                            <input type="text" class="form-control" id="dni${index}" placeholder="Dni" value="${user.dni}">
                            </div>
                            <div class="form-group col-8">
                              <label for="phone${index}">Teléfono</label>
                              <input type="text" class="form-control" id="phone${index}" placeholder="Teléfono" value="${user.phone}">
                            </div>
                            <div class="form-group col-8">
                              <label for="email${index}">Email</label>
                              <input type="text" class="form-control" id="email${index}" placeholder="Email" value="${user.email}">
                            </div>
                            <div class="form-group col-8">
                              <button type="button" class="actUserBoton btn btn-warning mb-3">Actualizar</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>`;
               
            })
        })
        .catch(function (error) {
            console.log('No se ha podido mostrar los usuarios')
        });
}

window.onload = function () {
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
  showAllUsers();
}