function showNotifies(){
    axios
        .get(`http://localhost:3000/api/repairs/repairsUser`, { headers: { token: localStorage.getItem('token')}})
        .then(arrayRepairs => {
            let p = document.getElementById('tbodyNotify')
            let notififyCounter = 0;
            let arrProcess = [];
            arrayRepairs.data.forEach((repair, index) => {
                
                if (repair.process_repair.length > 0){
                    arrProcess = [];
                    repair.process_repair.forEach(process =>{
                        if (!process.readed){
                            notififyCounter ++;
                            p.innerHTML += `<tr>
                            <th scope="row">${repair.car.reg_veh}</th>
                            <td>${process.comment_pro}</td>
                            <td><input type="checkbox" class="readNotify" value="false"  placeholder="Leido"></td>
                            </tr>`
                            arrProcess.push(process._id)
                            let notifyChecked = document.getElementsByClassName('readNotify');
                            for(let i = 0; i < notifyChecked.length; i++){
                                notifyChecked[i].onchange = function () {
                                    notifyReaded(arrProcess[i],repair._id);
                                };
                            }
                        }
                    })
                    
                } 
            });
            if(notififyCounter === 0) {
                p.innerHTML += `<tr>
                            <th scope="row">  </th>
                            <td>No hay notificaciones</td>
                            <td></td>
                            </tr>`
            }
        })
        .catch(function (error) {
            console.log('Catch No se ha podido encontrar los vehículos del usuario')
        });
}
function notifyReaded(idProcess,idRepair){
    axios
        .put(`http://localhost:3000/api/repairs/${idRepair}/notifyReaded/${idProcess}`, {
            readed:true
        }, { headers: { token: localStorage.getItem('token')}})
        .then(response => {
            console.log('Notificacion marcada como leída')
            window.location = 'http://localhost:3000/notifyPage.html'
        })
        .catch(function (error) {
            console.log('Catch No se ha podido marcar como leída la notificación')
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
    showNotifies();
}