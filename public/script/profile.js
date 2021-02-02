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
            console.log('Email o password erroneos')
        });
}
  
document.getElementById('navBarSalir').addEventListener("click", function() {
    localStorage.clear();
    window.location.reload()
})

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
            console.log('Perfil Actualizado')
        })
        .catch(function (error) {
            console.log('Error al actualizar el perfil')
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
                console.log('Contraseña Actualizada');
            })
            .catch(function (error) {
                console.log('Error al actualizar la contraseña');
            });
    } else {
        console.log('Las contraseñas no son iguales');
    }
})
  
window.onload = function () {
    document.getElementById('sectionProfile').style.display = "block";
    document.getElementById('sectionPswd').style.display = "none";
    document.getElementById('navUser').innerHTML = localStorage.getItem('name') + " " + localStorage.getItem('surname');
    getUserProfile();
}