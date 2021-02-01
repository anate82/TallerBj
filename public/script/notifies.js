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
            window.location = 'http://localhost:3000/notificaciones.html'
        })
        .catch(function (error) {
            console.log('Catch No se ha podido marcar como leída la notificación')
        });
}

//Salir de la sesion
document.getElementById('navBarSalir').addEventListener("click", function() {
    localStorage.clear();
    window.location.reload()
})

window.onload = function () {
    document.getElementById('navUser').innerHTML = localStorage.getItem('name') + " " + localStorage.getItem('surname');
    showNotifies();
}