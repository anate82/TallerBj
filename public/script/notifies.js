const api = axios.create({
    baseURL: "https://tallerbj.herokuapp.com/api",
    timeout: 2000
})
function showNotifiesAdmin(){
    api
        .get(`/repairs`, { headers: { token: localStorage.getItem('token')}})
        .then(arrayRepairs => {
            let p = document.getElementById('tbodyNotify')
            let notififyCounter = 0;
            let arrProcess = [];
            let arrRepairs = [];
            arrayRepairs.data.forEach((repair, index) => {
                if (repair.process_repair.length > 0){
                    repair.process_repair.forEach(process =>{
                        if ((!process.readed) && (process.comment_client.length>0)){
                            notififyCounter ++;
                            p.innerHTML += `<tr>
                            <th scope="row">${repair.car.reg_veh}</th>
                            <td>${process.comment_client}</td>
                            <td><input type="checkbox" class="readNotify" value="false"  placeholder="Leido"></td>
                            </tr>`;
                            arrProcess.push(process._id);
                            arrRepairs.push(repair._id);
                            let notifyCheck = document.getElementsByClassName('readNotify');
                            for(let i = 0; i < notifyCheck.length; i++){
                                notifyCheck[i].onchange = function () {
                                    notifyReaded(arrProcess[i],arrRepairs[i]);
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
            showPopup('No se ha podido encontrar los vehículos del usuario')
        });
}

function showNotifies(){
    api
        .get(`/repairs/repairsUser`, { headers: { token: localStorage.getItem('token')}})
        .then(arrayRepairs => {
            let p = document.getElementById('tbodyNotify')
            let notififyCounter = 0;
            let arrProcess = [];
            let arrRepairs = [];
            arrayRepairs.data.forEach((repair, index) => {
                if (repair.process_repair.length > 0){
                    repair.process_repair.forEach(process =>{
                        if ((!process.readed) && (process.comment_pro.length>0)){
                            notififyCounter ++;
                            p.innerHTML += `<tr>
                            <th scope="row">${repair.car.reg_veh}</th>
                            <td>${process.comment_pro}</td>
                            <td><input type="checkbox" class="readNotify" value="false"  placeholder="Leido"></td>
                            </tr>`
                            arrProcess.push(process._id)
                            arrRepairs.push(repair._id)
                            let notifyCheck = document.getElementsByClassName('readNotify');
                            for(let i = 0; i < notifyCheck.length; i++){
                                notifyCheck[i].onchange = function () {
                                    notifyReaded(arrProcess[i],arrRepairs[i]);
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
            showPopup('No se ha podido encontrar los vehículos del usuario')
        });
}
function notifyReaded(idProcess,idRepair){
    api
        .put(`/repairs/${idRepair}/notifyReaded/${idProcess}`, {
            readed:true
        }, { headers: { token: localStorage.getItem('token')}})
        .then(response => {
            showPopup('Notificacion marcada como leída')
            window.location = 'notifyPage.html'
        })
        .catch(function (error) {
            showPopup('No se ha podido marcar como leída la notificación')
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
        showNotifiesAdmin();
    } else {
        showNotifies();
    }
    document.getElementById('navBarSalir').addEventListener("click", function() {
        localStorage.clear();
        window.location.reload()
    })
    
}