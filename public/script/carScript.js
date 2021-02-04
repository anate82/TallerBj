//Es un modal que crea un vehículo (client)
document.getElementById('addCarButton').addEventListener("click", function() {
  axios
    .post('http://localhost:3000/api/cars/', {
            brand: document.getElementById('brandModal').value,
            car_model: document.getElementById('modelModal').value,
            frame_number: document.getElementById('frameModal').value,
            reg_veh: document.getElementById('regModal').value,
            kilometers: document.getElementById('kmModal').value,
            year: document.getElementById('yearModal').value
    }, { headers: { token: localStorage.getItem('token')}})
    .then(response => {
      showPopup('Se ha añadido correctamente un vehículo')
    })
    .catch(function (error) {
      showPopup('No se ha podido añadir el vehículo')
    });
})

//Es un modal que crea un vehículo y lo asigna a un usuario (admin)
document.getElementById('addCarUserButton').addEventListener("click", function() {
  axios
    .post(`http://localhost:3000/api/cars/${document.getElementById('selectUser').value}`, {
            brand: document.getElementById('brandModalUser').value,
            car_model: document.getElementById('modelModalUser').value,
            frame_number: document.getElementById('frameModalUser').value,
            reg_veh: document.getElementById('regModalUser').value,
            kilometers: document.getElementById('kmModalUser').value,
            year: document.getElementById('yearModalUser').value
    }, { headers: { token: localStorage.getItem('token')}})
    .then(response => {
      showPopup('Se ha añadido correctamente un vehículo')
      window.location.reload();
    })
    .catch(function (error) {
      showPopup('No se ha podido añadir el vehículo')
    });

})

//Muestra todos los vehículos 
function showAllCars(){
  axios
      .get('http://localhost:3000/api/cars/', { headers: { token: localStorage.getItem('token')}})
      .then(arrayCars => {
          let arrId = [];
          let barCars = document.getElementById('mainContent');
          barCars.innerHTML += `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
              <div class="col-11">
                  <span class="badge badge-light" id="badgeMenu">Vehiculos</span>
              </div>
              <div class="col-1" id="colPlus">
                <button type="button" class="btn btn-warning" id="plusCarButton" data-bs-toggle="modal" data-bs-target="#addCarUser" data-bs-whatever="addCarUser"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg></button>
              </div>
            </div>
          </nav>`
          arrayCars.data.forEach((car, index) =>{
            let p = document.getElementById('infoCarSection');
            p.innerHTML+= `<section class="row">
              <div class="accordion col-9" id="accordionCar${index}">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="heading${index}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                      ${car.reg_veh.toUpperCase()} ${car.brand} ${car.car_model}
                    </button>
                  </h2>
                  <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionCar${index}">
                    <div class="accordion-body">
                      <form class="form-row">
                        <div class="form-group col-8">
                          <label for="brand${index}">Marca</label>
                          <input type="text" class="form-control" id="brand${index}" placeholder="Marca" value="${car.brand}">
                        </div>
                        <div class="form-group col-8">
                          <label for="car_model${index}">Modelo</label>
                          <input type="text" class="form-control" id="car_model${index}" placeholder="Modelo" value="${car.car_model}">
                        </div>
                        <div class="form-group col-8">
                          <label for="frame${index}">Nº Bastidor</label>
                        <input type="text" class="form-control" id="frame${index}" placeholder="Nº Bastidor" value="${car.frame_number}">
                        </div>
                        <div class="form-group col-8">
                          <label for="reg${index}">Matrícula</label>
                          <input type="text" class="form-control" id="reg${index}" placeholder="Matrícula" value="${car.reg_veh}">
                        </div>
                        <div class="form-group col-8">
                          <label for="km${index}">Kilómetros</label>
                          <input type="text" class="form-control" id="km${index}" placeholder="Kilometros" value="${car.kilometers}">
                        </div>
                        <div class="form-group col-8">
                          <label for="year${index}">Año</label>
                          <input type="text" class="form-control" id="year${index}" placeholder="Año" value="${car.year}">
                        </div>
                        <div class="form-group col-8">
                          <button type="button" class="actCarButton btn btn-warning mb-3">Actualizar</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-1 buttonActivity">
                  <button type="button" class="deleteButton btn btn-dark"><i class="far fa-trash-alt"></i></button>
              </div>
              <div class="col-1 buttonActivity">
                  <button type="button" class="notifyButton btn btn-dark"><i class="fas fa-bell"> </i> <span class="badge bg-warning text-dark"></span></button>
              </div>
              <div class="col-1 buttonActivity">
                <button type="button" class="repairButton btn btn-dark"><i class="fas fa-tools"> </i> <span class="badge bg-warning text-dark"></span></button>
              </div>
            </section>`;  
            arrId.push(car._id);
            let deleteButton = document.getElementsByClassName('deleteButton');
            let notifyButton = document.getElementsByClassName('notifyButton');
            let repairButton = document.getElementsByClassName('repairButton');
            let actCarButton = document.getElementsByClassName('actCarButton'); 
            for(let i = 0; i < notifyButton.length; i++){
              notifyButton[i].onclick = function() {
                window.location = 'http://localhost:3000/notifyPage.html'
              };
              deleteButton[i].onclick = function(){
                axios
                  .delete(`http://localhost:3000/api/cars/${arrId[i]}`, { headers: { token: localStorage.getItem('token')}})
                  .then(response =>{
                    showPopup('Vehiculo Eliminado')
                    window.location = 'http://localhost:3000/carPage.html'
                  })
                  .catch(function (error) {
                    showPopup('No se ha podido eliminar el vehículo')
                  });
              }
              //Controla el evento de las reparaciones
              repairButton[i].onclick = function () {
                localStorage.setItem('idCar',arrId[i])
                window.location = "http://localhost:3000/repairPage.html"
              };
              //Evento que controla las actualizaciones del vehículo
              actCarButton[i].onclick = function () {
                axios
                .put(`http://localhost:3000/api/cars/${arrId[i]}`, {
                        brand: document.getElementById(`brand${i}`).value,
                        car_model:document.getElementById(`car_model${i}`).value,
                        frame_number: document.getElementById(`frame${i}`).value,
                        reg_veh: document.getElementById(`reg${i}`).value,
                        kilometers:  document.getElementById(`km${i}`).value,
                        year:  document.getElementById(`year${i}`).value,
                }, { headers: { token: localStorage.getItem('token')}})
                .then(response => {
                  showPopup('Vehículo Actualizado')
                })
                .catch(function (error) {
                  showPopup('No se ha podido actualizar el vehículo')
                });
              };
            }
          })
        showUsersSelect()
      })
}

// funcion que carga todos los usuarios, esto se usa en la creacion de un vehículo y lo asigna a un usuario
function showUsersSelect(){
  let selectUser = document.getElementById('selectUser');
  axios
    .get('http://localhost:3000/api/users/', { headers: { token: localStorage.getItem('token')}})
    .then(arrayUsers => {
      arrayUsers.data.forEach((user, index) => {
        selectUser.innerHTML += `<option value="${user.email}">${user.name+" "+user.surname}</option>`
      });
    })
    .catch(function (error) {
      showPopup('No se ha podido actualizar el dropdown')
    });
}

//Muestra todos los vehículos del usuario
function getAllCars() {
  if(localStorage.role === 'admin'){
    showAllCars();
  } else{
    axios
      .get('http://localhost:3000/api/users/me/allCars', { headers: { token: localStorage.getItem('token')}})
      .then(arrayCars => {
          let arrId = [];
          let barCars = document.getElementById('mainContent');
          barCars.innerHTML += `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <div class="col-11">
                  <span class="badge badge-light" id="badgeMenu">Vehiculos</span>
                </div>
              <div class="col-1" id="colPlus">
                <button type="button" class="btn btn-warning" id="plusCarButton" data-bs-toggle="modal" data-bs-target="#addCar" data-bs-whatever="addCar"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16">
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                </svg></button>
              </div>
            </div>
          </nav>`
          arrayCars.data.forEach((car,index) =>{
            let p = document.getElementById('infoCarSection');
            p.innerHTML+= `<section class="row">
              <div class="accordion col-10" id="accordionCar${index}">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="heading${index}">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="false" aria-controls="collapse${index}">
                      ${car.reg_veh.toUpperCase()} ${car.brand} ${car.car_model}
                    </button>
                  </h2>
                  <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#accordionCar${index}">
                    <div class="accordion-body">
                      <form class="form-row">
                        <div class="form-group col-8">
                          <label for="brand${index}">Marca</label>
                          <input type="text" class="form-control" id="brand${index}" placeholder="Marca" value="${car.brand}">
                        </div>
                        <div class="form-group col-8">
                          <label for="car_model${index}">Modelo</label>
                          <input type="text" class="form-control" id="car_model${index}" placeholder="Modelo" value="${car.car_model}">
                        </div>
                        <div class="form-group col-8">
                          <label for="frame${index}">Nº Bastidor</label>
                        <input type="text" class="form-control" id="frame${index}" placeholder="Nº Bastidor" value="${car.frame_number}">
                        </div>
                        <div class="form-group col-8">
                          <label for="reg${index}">Matrícula</label>
                          <input type="text" class="form-control" id="reg${index}" placeholder="Matrícula" value="${car.reg_veh}">
                        </div>
                        <div class="form-group col-8">
                          <label for="km${index}">Kilómetros</label>
                          <input type="text" class="form-control" id="km${index}" placeholder="Kilometros" value="${car.kilometers}">
                        </div>
                        <div class="form-group col-8">
                          <label for="year${index}">Año</label>
                          <input type="text" class="form-control" id="year${index}" placeholder="Año" value="${car.year}">
                        </div>
                        <div class="form-group col-8">
                          <button type="button" class="actCarBoton btn btn-warning mb-3">Actualizar</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-1 buttonActivity">
                  <button type="button" class="notifyButton btn btn-dark"><i class="fas fa-bell"> </i> <span class="badge bg-warning text-dark"></span></button>
              </div>
              <div class="col-1 buttonActivity">
                <button type="button" class="repairButton btn btn-dark"><i class="fas fa-tools"> </i> <span class="badge bg-warning text-dark"></span></button>
              </div>
            </section>`;
           
            arrId.push(car._id);
            let notifyButton = document.getElementsByClassName('notifyButton');
            let repairButton = document.getElementsByClassName('repairButton');
            for(let i = 0; i < notifyButton.length; i++){
              notifyButton[i].onclick = function() {
                window.location = "http://localhost:3000/notifyPage.html"
              };
              repairButton[i].onclick = function () {
                localStorage.setItem('idCar',arrId[i])
                window.location = "http://localhost:3000/repairPage.html"
              };
            }
            
            let actCarBoton = document.getElementsByClassName('actCarBoton');  
            for(let i=0; i<actCarBoton.length; i++){
                actCarBoton[i].onclick = function () {
                  axios
                  .put(`http://localhost:3000/api/cars/${arrId[i]}`, {
                          brand: document.getElementById(`brand${i}`).value,
                          car_model:document.getElementById(`car_model${i}`).value,
                          frame_number: document.getElementById(`frame${i}`).value,
                          reg_veh: document.getElementById(`reg${i}`).value,
                          kilometers:  document.getElementById(`km${i}`).value,
                          year:  document.getElementById(`year${i}`).value,
                  }, { headers: { token: localStorage.getItem('token')}})
                  .then(response => {
                    showPopup('Vehículo Actualizado')
                  })
                  .catch(function (error) {
                    showPopup('No se ha podido actualizar el vehículo')
                  });
                };
            }
          })
    })
    .catch(function (error) {
        showPopup('No se ha podido encontrar los vehículos del usuario')
    });
  }
}

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

  //muestra el usuario que está logueado
  document.getElementById('navUser').innerHTML = localStorage.getItem('name') + " " + localStorage.getItem('surname');

  //Si el usuario es el administrator se carga una serie de opciones y si no lo es no se carga
  let upNav = document.getElementById('ulNavbar')
  if (localStorage.getItem('role') == 'admin'){
    let elem = document.createElement(`li`)
    let salir = document.getElementById('salirNav')
    elem.innerHTML = `<a class="nav-link js-scroll-trigger" href="usersPage.html">Usuarios</a>`
    elem.setAttribute('class','nav-item')
    upNav.insertBefore(elem,salir);
  } 
 
  document.getElementById('navBarSalir').addEventListener("click", function() {
    localStorage.clear();
    window.location.reload()
  })
  getAllCars();
}