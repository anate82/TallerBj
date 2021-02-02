function budgetState(budget) {
    let state = ""
    if (budget.length === 0) {
        state = "Sin presupuesto"
    } else {
        if (budget[0].accepted) {
            state = "Presupuesto aceptado"
        } else {
            state = "Presupuesto pendiente de aceptar"
        }
    }
    return state;
}

function convertDate(date) {
    let dateResult = new Date(date);
    return dateResult.toLocaleString("es-ES");
}

//Genera los comentarios visibles en presupuestos
function showAllProcess(arrayComments) {
    let commentResult = "";
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
            if (comment.comment_pro.length > 0) {
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
                if (comment.comment_client.length > 0) {
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

function showDateOut(objRepair) {
    if ((objRepair.hasOwnProperty('date_out')) && (objRepair.date_out !== 'Pendiente')) {
        return convertDate(objRepair.date_out);
    } else {
        return "Pendiente";
    }
}

//Salir de la sesion
document.getElementById('navBarSalir').addEventListener("click", function () {
    localStorage.clear();
    window.location.reload()
})

//Almacena la respuesta de un cliente a un comentario del taller
document.getElementById('addCommentModal').addEventListener("click", function () {
    axios
        .put(`http://localhost:3000/api/repairs/${localStorage.getItem('idRepair')}/process/${localStorage.getItem('idProcess')}`, {
            comment: document.getElementById('textareaModal').value
        }, { headers: { token: localStorage.getItem('token') } })
        .then(response => {
            console.log('Se ha añadido correctamente un comentario')
            window.location.reload()
        })
        .catch(function (error) {
            console.log('No se ha podido añadir el comentario')
        });
})
document.getElementById('addMessageModal').addEventListener("click", function () {
    
   

})

document.getElementById('addRepairCarButton').addEventListener("click", function () {
    let dateOut = document.getElementById('dateOutModal').value;
    if(dateOut === "") {
        dateOut = 'Pendiente'
    }
    let dateIn = document.getElementById('dateInModal').value;
    if( dateIn === ""){
        dateIn = Date.now();
    }
    if(document.getElementById('secureModal').value == ""){
        document.getElementById('secureModal').value = "Pendiente"
    }
    axios
        .post(`http://localhost:3000/api/repairs`,{
            carId:localStorage.getItem('idCar'),
            dateIn:dateIn,
            dateOut:dateOut,
            secure:document.getElementById('secureModal').value
        }, { headers: { token: localStorage.getItem('token') } })
        .then(newRepair => {
            window.location.reload()
        })
        .catch(function (error) {
            console.log('No se han podido crear nueva reparacion')
        });
})

//Controla que si el cliente acepta o no el presupuesto y lo actualiza en la base de datos
document.getElementById('addBudgetModal').addEventListener("click", function () {
    if (localStorage.getItem('role') === 'admin'){
        axios
            .put(`http://localhost:3000/api/repairs/${localStorage.getItem('idRepair')}/addBudget`, {
                date_create: document.getElementById('dateCreateModal').value,
                type: document.getElementById('typeModal').value,
                description: document.getElementById('descriptionModal').value,
                pieces: document.getElementById('piecesModal').value,
                hours_disas:document.getElementById('hoursDisModal').value,
                hours_repair:document.getElementById('hoursRepairModal').value,
                paint:document.getElementById('paintModal').value,
                auxiliary:document.getElementById('auxModal').value,
                price:document.getElementById('priceModal').value,
                accepted: document.getElementById('acceptedModal').checked
            }, { headers: { token: localStorage.getItem('token') } })
            .then(response => {
                console.log('Se ha actualizado correctamente un presupuesto')
                window.location.reload()
            })
            .catch(function (error) {
                console.log('No se ha podido crear el presupuesto')
            });
    } else {
        axios
            .put(`http://localhost:3000/api/repairs/${localStorage.getItem('idRepair')}/updateBudget/${localStorage.getItem('budgetId')}`, {

                accepted: document.getElementById('acceptedModal').checked

            }, { headers: { token: localStorage.getItem('token') } })
            .then(response => {
                console.log('Se ha actualizado correctamente un presupuesto')
                window.location = 'http://localhost:3000/reparaciones.html'
            })
            .catch(function (error) {
                console.log('No se ha podido actualizar el presupuesto')
            });
    }
})

function showRepairCarAdmin() {
    showRepairCar()
}


//Muestra la reparacion del vehículo
function showRepairCar() {
    axios
        .get(`http://localhost:3000/api/repairs/repairCar/${localStorage.getItem('idCar')}`, { headers: { token: localStorage.getItem('token') } })
        .then(arrayRepairs => {
            if (arrayRepairs.data.length > 0) {
                arrayRepairs.data.forEach((repair, index) => {
                    let p = document.getElementById('repairSection');
                    p.innerHTML += `<form class="row">
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
                            <button type="button" class="btn btn-warning" id="budgetButton" data-bs-toggle="modal" data-bs-target="#addBudget" data-bs-whatever="addBudget"><i class="fas fa-download"></i></button>
                        </div>
                    </div>`
                    if (repair.process_repair.length === 0) {
                        p.innerHTML += `</form>`;
                    } else {
                        p.innerHTML += showAllProcess(repair.process_repair);
                    }
                    localStorage.setItem('idRepair', repair._id)
                    let replyClient = document.getElementsByClassName('replyClient');
                    for (let i = 0; i < replyClient.length; i++) {
                        replyClient[i].onclick = function () {
                            localStorage.setItem('idRepair', repair._id)
                            localStorage.setItem('idProcess', repair.process_repair[i]._id)
                        };
                    }
                    if (repair.budget.length > 0) {
                        document.getElementById('budgetButton').addEventListener('click', function () {
                            localStorage.setItem('idRepair', repair._id)
                            localStorage.setItem('budgetId', repair.budget[0]._id);
                            document.getElementById('dateCreateModal').value = convertDate(repair.budget[0].date_create);
                            document.getElementById('typeModal').value = repair.budget[0].type;
                            document.getElementById('descriptionModal').value = repair.budget[0].description;
                            document.getElementById('piecesModal').value = getPieces(repair.budget[0].pieces);
                            document.getElementById('hoursDisModal').value = repair.budget[0].hours_disas;
                            document.getElementById('hoursRepairModal').value = repair.budget[0].hours_repare;
                            document.getElementById('paintModal').value = repair.budget[0].paint;
                            document.getElementById('auxModal').value = repair.budget[0].auxiliary;
                            document.getElementById('priceModal').value = repair.budget[0].price;
                            document.getElementById('acceptedModal').checked = repair.budget[0].accepted;
                        })
                    } else {
                        document.getElementById('budgetButton').disabled = true;
                    }
                });
            } else {
                let p = document.getElementById('repairSection');
                p.innerHTML += `<legend> No hay reparaciones disponibles </legend>`
            }
        })
        .catch(function (error) {
            console.log('Catch No se ha podido encontrar los vehículos del usuario')
        });
}

function getPieces(arrayPieces) {
    let resultString = "";
    arrayPieces.forEach(piece => {
        resultString += piece + " ";
    })
    return resultString.trim();
}
/*
function loadCarsInSelect(){
    axios
        .get(`http://localhost:3000/api/cars`, { headers: { token: localStorage.getItem('token') } })
        .then(arrayCars => {
            let selecthtml = document.getElementById('selectCar');
            arrayCars.data.forEach(car =>{
                selecthtml.innerHTML += `<option value="${car.reg_veh}">${car.reg_veh}</option>`
            })
        })
        .catch(function (error) {
            console.log('Catch No se ha podido encontrar los vehículos')
        });
}*/
function goCars(){
    window.location = 'http://localhost:3000/home.html'
}

function deleteRepair(){
    if(localStorage.getItem('idRepair') !== ""){
        axios
        .delete(`http://localhost:3000/api/repairs/${localStorage.getItem('idRepair')}`, { headers: { token: localStorage.getItem('token') } })
        .then(repairDeleted => {
            console.log(`Reparacion eliminada`);
            goCars();
        })
        .catch(function (error) {
            console.log('No se han podido encontrar los vehículos')
        });
    }
}



window.onload = function () {
    document.getElementById('navUser').innerHTML = localStorage.getItem('name') + " " + localStorage.getItem('surname');
    localStorage.setItem('idRepair', "")
    let mainhtml = document.getElementById('mainContent')
    if (localStorage.role === 'admin') {
        mainhtml.innerHTML += `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
                <div class="col-8">
                    <span class="badge badge-light" id="badgeMenu">Reparaciones</span>
                </div>
                <div class="col-1" id="colPlus">
                <button type="button" class="btn btn-warning" id="plusRepairButton" data-bs-toggle="modal" data-bs-target="#addRepairCar" data-bs-whatever="addRepairCar">
                <i class="fas fa-plus"></i>
                </button>
                </div>
                <div class="col-1">
                    <button type="button" class="btn btn-warning" id="messageButton" data-bs-toggle="modal" data-bs-target="#addMessage" data-bs-whatever="addMessage">
                        <i class="fas fa-envelope-open-text"></i>
                    </button>
                </div>
                <div class="col-1">
                    <button type="button" class="btn btn-warning" id="newBudgetButton" data-bs-toggle="modal" data-bs-target="#addBudget" data-bs-whatever="addBudget">
                        <i class="fas fa-file-contract"></i>
                    </button>
                </div>
                <div class="col-1">
                    <button type="button" class="btn btn-warning" id="deleteButton" data-bs-toggle="tooltip" data-bs-placement="top" title="Eliminar Reparación">
                        <i class="far fa-trash-alt"></i>
                    </button>
                </div>
                </div>   
        </nav>`
        showRepairCarAdmin();
        document.getElementById('newBudgetButton').addEventListener('click', function() {
            document.getElementById('dateCreateModal').readOnly = false;
            document.getElementById('dateCreateModal').value = convertDate(Date.now());
            document.getElementById('typeModal').readOnly = false;
            document.getElementById('typeModal').value = "";
            document.getElementById('descriptionModal').readOnly = false;
            document.getElementById('descriptionModal').value = "";
            document.getElementById('piecesModal').readOnly = false;
            document.getElementById('piecesModal').value = "";
            document.getElementById('hoursDisModal').readOnly = false;
            document.getElementById('hoursDisModal').value = "";
            document.getElementById('hoursRepairModal').readOnly = false;
            document.getElementById('hoursRepairModal').value = "";
            document.getElementById('paintModal').readOnly = false;
            document.getElementById('paintModal').value = "";
            document.getElementById('auxModal').readOnly = false;
            document.getElementById('auxModal').value = "";
            document.getElementById('priceModal').readOnly = false;
            document.getElementById('priceModal').value = "";
            //document.getElementById('selectCar').disabled = false;
            //loadCarsInSelect();
        })
        document.getElementById('deleteButton').addEventListener('click', function(){
            deleteRepair();
        })
        document.getElementById('plusRepairButton').addEventListener('click', function(){
            
        })
    } else {
        mainhtml.innerHTML += `<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <div class="col-11">
                    <span class="badge badge-light" id="badgeMenu">Reparaciones</span>
                    </div>
                </div>      
            </nav>`
        showRepairCar();
    }

}