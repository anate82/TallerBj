const api = axios.create({
  baseURL: "https://tallerbj.herokuapp.com/api",
  timeout: 2000
})
document.getElementById('signupButton').addEventListener("click", function(){
  if(validEmail(document.getElementById('inputEmail').value)){
    if(validPassword(document.getElementById('inputPassword4').value, document.getElementById("inputRePassword4").value)) {
        api
          .post('/auth/signup', {
              name: document.getElementById('inputName').value,
              surname: document.getElementById('inputSurname').value,
              dni: document.getElementById('inputDNI').value,
              phone: document.getElementById('inputPhone').value,
              email: document.getElementById('inputEmail').value,
              code: document.getElementById('inputCode').value,
              password: document.getElementById('inputPassword4').value
          })
          .then(response => {
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('email', response.data.email)
                localStorage.setItem('name', response.data.name)
                localStorage.setItem('surname', response.data.surname);
                localStorage.setItem('role',  response.data.role);
                goHome();
          })
          .catch(function (error) {
              showPopup('El usuario ya esta registrado')
          });
    } else {
      showPopup("Las contraseñas no coinciden")
    }
  } else {
    showPopup("Email incorrecto")
  }
})

  
function validEmail(email) {
  var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
  return(String(email).search (filter) != -1);
}
function validPassword(psw, repsw){
  return(psw === repsw)
}

function goHome(){
  window.location.href = "carPage.html";
}

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
