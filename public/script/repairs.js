function budgetState (budget){
    let state = ""
    if(budget.length === 0){
        state = "Sin presupuesto"
    } else {
        if(budget[0].acepted){
            state = "Presupuesto aceptado"
        } else {
            state = "Presupuesto pendiente de aceptar"
        }
    }
    return state;
}

function convertDate(date){
    let dateResult = new Date(date);
    return dateResult.toLocaleString("es-ES");
}

function showAllProcess(arrayComments){
    let commentResult ="";
    arrayComments.forEach(comment => {
        if (comment.comment_pro.length > 0 && comment.comment_client.length > 0) {
        commentResult += `<div class="boxCar row">
                <div class="card">
                    <div class="card-header bg-warning row">
                        Taller
                    </div>
                    <div class="card-body">
                        <div class=" col-11">
                            <p class="card-text">${comment.comment_pro}</p>
                            <footer class="blockquote-footer">${convertDate(comment.date_pro)}</footer> 
                        </div>
                        <div class=" col-1">
                            <button type="button" style="display:none" class="btn btn-warning replyClient" data-bs-toggle="modal" data-bs-target="#addComment" data-bs-whatever="addComment"><i class="fas fa-reply"></i></button>
                        </div>
                    </div>
                    <div class="card-header row bg-secondary">
                    Cliente
                    </div>
                    <div class="card-body">
                    <p class="card-text col-12">${comment.comment_client}</p>
                    <footer class="blockquote-footer">${convertDate(comment.date_client)}</footer> 
                    </div>
                </div>
            </div>`;
        } else {
            if(comment.comment_pro.length > 0) {
            commentResult += `<div class="boxCar row">
                <div class="card">
                    <div class="card-header bg-warning row">
                        Taller
                    </div>
                    <div class="card-body">
                        <div class=" col-10">
                            <p class="card-text">${comment.comment_pro}</p>
                            
                            <footer class="blockquote-footer">${convertDate(comment.date_pro)}</footer> 
                        </div>
                        <div class=" col-1">
                            <button type="button" class="btn btn-warning replyClient" data-bs-toggle="modal" data-bs-target="#addComment" data-bs-whatever="addComment"><i class="fas fa-reply"></i></button>
                        </div>
                    </div>`
            } else {
                if(comment.comment_client.length > 0){
                    commentResult += `<div class="boxCar row">
                        <div class="card">
                            <div class="card-header row">
                            Cliente
                            </div>
                            <div class="card-body">
                            <p class="card-text col-11">${comment.comment_client}</p>
                            <footer class="blockquote-footer">${convertDate(comment.date_client)}</footer> 
                            </div>
                        </div>
                    </div>`;
                }
            }
        }
    })
    commentResult += `</form>`
    return commentResult;
}

function showDateOut (objRepair) {
    if(objRepair.hasOwnProperty('date_out')){
        return convertDate(objRepair.date_out);
    } else {
        return "Pendiente";
    }
}

document.getElementById('navBarSalir').addEventListener("click", function() {
    localStorage.clear();
    window.location.reload()
})

document.getElementById('addCommentModal').addEventListener("click", function() {
    axios
    .put(`http://localhost:3000/api/repairs/${localStorage.getItem('idRepair')}/process/${localStorage.getItem('idProcess')}`, {
        comment:document.getElementById('textareaModal').value
    }, { headers: { token: localStorage.getItem('token')}})
    .then(response => {
      console.log('Se ha añadido correctamente un vehículo')
    })
    .catch(function (error) {
      console.log('No se ha podido añadir el vehículo')
    });
    window.location = 'http://localhost:3000/reparaciones.html'
})

function showAllCarsRepair() {
    axios
        .get(`http://localhost:3000/api/repairs/repairCar/${localStorage.getItem('idCar')}`, { headers: { token: localStorage.getItem('token')}})
        .then(arrayRepairs => {
            arrayRepairs.data.forEach((repair, index) => {
                let p = document.getElementById('repairSection');
                p.innerHTML +=`<form class="row">
                <legend> ${repair.car.reg_veh} </legend>
                <div class="mb-3 row">
                    <label for="dateIn" class="col-sm-2 col-form-label">Fecha entrada:</label>
                    <div class="col-sm-8">
                    <input type="text" readonly class="form-control" id="dateIn" value="${convertDate(repair.date_in)}">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="dateOut" class="col-sm-2 col-form-label">Fecha salida:</label>
                    <div class="col-sm-8">
                    <input type="text" readonly class="form-control" id="dateOut" value="${showDateOut(repair)}">
                    </div>
                </div>
                <div class="mb-3 row">
                    <label for="secure" class="col-sm-2 col-form-label">Seguro:</label>
                    <div class="col-sm-8">
                    <input type="text" class="form-control" id="secure" value="${repair.secure}">
                    </div>
                </div>
                <!-- Presupuesto -->
                <div class="mb-3 row">
                    <label for="budget" class="col-sm-2 col-form-label">Presupuesto:</label>
                    <div class="col-sm-8">
                    <input type="text" readonly class="form-control" id="budget" value="${budgetState(repair.budget)}" >
                    </div>
                    <div class="col-sm-1">
                        <button type="button" class="btn btn-warning"data-bs-toggle="modal" data-bs-target="#addBudget" data-bs-whatever="addBudget"><i class="fas fa-download"></i></button>
                    </div>
                </div>`
                if(repair.process_repair.length === 0){
                    p.innerHTML += `</form>`;
                } else {
                    p.innerHTML += showAllProcess(repair.process_repair);
                }
                let replyClient = document.getElementsByClassName('replyClient');
                for(let i=0; i < replyClient.length; i++){
                    replyClient[i].onclick = function () {
                        localStorage.setItem('idRepair',repair._id)
                        localStorage.setItem('idProcess', repair.process_repair[i]._id)
                    };
                }
            });
        })
        .catch(function (error) {
            console.log('Catch No se ha podido encontrar los vehículos del usuario')
        });
}


window.onload = function () {
    document.getElementById('navUser').innerHTML = localStorage.getItem('name') + " " + localStorage.getItem('surname');
    showAllCarsRepair()
}