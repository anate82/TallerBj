document.getElementById('addCarButton').addEventListener("click", function() {
  axios
    .post('http://localhost:3000/api/cars', {
            brand: document.getElementById('brandModal').value,
            car_model: document.getElementById('modelModal').value,
            frame_number: document.getElementById('frameModal').value,
            reg_veh: document.getElementById('regModal').value,
            kilometers: document.getElementById('kmModal').value,
            year: document.getElementById('yearModal').value
    }, { headers: { token: localStorage.getItem('token')}})
    .then(response => {
      console.log('Se ha añadido correctamente un vehículo')
    })
    .catch(function (error) {
      console.log('No se ha podido añadir el vehículo')
    });
})

document.getElementById('navBarSalir').addEventListener("click", function() {
  localStorage.clear();
  window.location.reload()
})


function getAllCars() {
  axios
    .get('http://localhost:3000/api/users/me/allCars', { headers: { token: localStorage.getItem('token')}})
    .then(arrayCars => {
        let arrId = [];
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
                        <button type="button" class="actCarBoton btn btn-primary mb-3">Actualizar</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-1 buttonActivity">
                <button type="button" class="notifyButton btn btn-dark"><i class="fas fa-bell"> </i> <span class="badge bg-warning text-dark"></span>
                <span class="visually-hidden">unread messages</span></button>
            </div>
            <div class="col-1 buttonActivity">
              <button type="button" class="repairButton btn btn-dark"><i class="fas fa-tools"> </i> <span class="badge bg-warning text-dark"></span>
              <span class="visually-hidden">unread messages</span></button>
            </div>
          </section>`;
          arrId.push(car._id);
          let notifyButton = document.getElementsByClassName('notifyButton');
          for(let i = 0; i < notifyButton.length; i++){
            notifyButton[i].onclick = redirectNotify;
          }
          let repairButton = document.getElementsByClassName('repairButton');
          for(let i = 0; i < repairButton.length; i++){
            repairButton[i].onclick = function () {
              localStorage.setItem('idCar',arrId[i])
              window.location = "http://localhost:3000/reparaciones.html"
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
                  console.log('Vehículo Actualizado')
                })
                .catch(function (error) {
                  console.log('No se ha podido actualizar el vehículo')
                });
              };
          }
        })
    })
    .catch(function (error) {
      console.log('No se ha podido encontrar los vehículos del usuario')
    });
}

function redirectNotify(e){
  window.location = "http://localhost:3000/notificaciones.html"
}
function redirectRepairs(e){
  window.location = "http://localhost:3000/reparaciones.html"
}

function updateCar(car){
  

}

window.onload = function () {
  document.getElementById('navUser').innerHTML = localStorage.getItem('name') + " " + localStorage.getItem('surname');
  getAllCars();
}