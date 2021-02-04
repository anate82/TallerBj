const api = axios.create({
  baseURL: "https://tallerbj.herokuapp.com/api",
  timeout: 2000
})

function showAllUsers(){
    api
        .get('/users', { headers: { token: localStorage.getItem('token')}})
        .then(arrayUsers => {
            let arrId = [];
            let arrPswd = [];
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
                              <label for="pswd${index}">Password</label>
                              <input type="password" class="form-control" id="pswd${index}" placeholder="Password" value="${user.password}">
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
                arrId.push(user._id);
                arrPswd.push(user.password);
                let actUserBoton = document.getElementsByClassName('actUserBoton');  
                for(let i=0; i<actUserBoton.length; i++){
                    actUserBoton[i].onclick = function () {
                        api
                            .put('/users/me',{
                                _id:arrId[i],
                                name: document.getElementById(`name${i}`).value,
                                surname: document.getElementById(`surname${i}`).value,
                                dni: document.getElementById(`dni${i}`).value,
                                phone: document.getElementById(`phone${i}`).value,
                                email: document.getElementById(`email${i}`).value
                            }, { headers: { token: localStorage.getItem('token')}})
                            .then(response => {
                                showPopup('Vehículo Actualizado')
                                if(arrPswd[i] !== document.getElementById(`pswd${i}`).value){
                                    api
                                    .put('/users/me/password',{
                                        _id:arrId[i],
                                        password: document.getElementById(`pswd${i}`).value
                                    }, { headers: { token: localStorage.getItem('token')}})
                                    .then(response => {
                                        showPopup('Contraseña Actualizada');
                                        window.location.reload();
                                    })
                                    .catch(function (error) {
                                        showPopup('Error al actualizar la contraseña');
                                    });

                                } else {
                                    window.location.reload();
                                }
                                
                            })
                            .catch(function (error) {
                                showPopup('No se ha podido actualizar el vehículo')
                            });
                    };
                }
               
            })
        })
        .catch(function (error) {
            showPopup('No se ha podido mostrar los usuarios')
        });
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
  document.getElementById('navUser').innerHTML = localStorage.getItem('name') + " " + localStorage.getItem('surname');
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
  showAllUsers();
}