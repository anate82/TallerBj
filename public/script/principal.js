const api = axios.create({
    baseURL: "https://tallerbj.herokuapp.com/api",
    timeout: 2000
})


document.getElementById('sendMessageButton').addEventListener('click', function(){
        api
            .post('/users/sendEmail', {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                text: document.getElementById('message').value
            }, { headers: { token: localStorage.getItem('token') } })
            .then(response => {
                showPopup("Mensaje enviado al taller");
            })
            .catch(function (error) {
                showPopup('No se ha podido enviar el mensaje');
            });
})


function showPopup(message){
    document.getElementById('myToast').classList.remove('d-none')
    document.getElementById('myToast').classList.add('d-flex')
    $('#myToast').toast('show'); 
    var myToastEl = document.getElementsByClassName('toast-body');
    myToastEl[0].innerHTML += message;
  }
  
  window.onload = function () {
    $('#myToast').toast();
    document.getElementById('myToast').classList.remove('d-flex')
    document.getElementById('myToast').classList.add('d-none')
    var myToastEl = document.getElementById('myToast');
    myToastEl.addEventListener('hidden.bs.toast', function () {
  
        var myToastEl = document.getElementsByClassName('toast-body');
        myToastEl[0].innerHTML = "";
        document.getElementById('myToast').classList.remove('d-flex')
        document.getElementById('myToast').classList.add('d-none')
    })
}