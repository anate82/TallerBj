document.getElementById('sendMessageButton').addEventListener('click', function(){
    axios
        .post('http://localhost:3000/api/users/sendEmail', {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            text: document.getElementById('message').value
        }, { headers: { token: localStorage.getItem('token') } })
        .then(response => {
            console.log(response)
            showPopup("Mensaje enviado al taller");
        })
        .catch(function (error) {
            showPopup('No se ha podido enviar el mensaje');
        });
})


function showPopup(message){
    $('#myToast').toast('show'); 
    var myToastEl = document.getElementsByClassName('toast-body');
    myToastEl[0].innerHTML += message;
}

window.onload = function () {
    $('#myToast').toast();
    var myToastEl = document.getElementById('myToast');
    myToastEl.addEventListener('hide.bs.toast', function () {
        var myToastEl = document.getElementsByClassName('toast-body');
        myToastEl[0].innerHTML = "";
    })
}