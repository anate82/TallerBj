document.getElementById('signupButton').addEventListener("click", function(){
    if(validEmail(document.getElementById('inputEmail').value)){
      if(validPassword(document.getElementById('inputPassword4').value, document.getElementById("inputRePassword4").value)) {
          axios
            .post('http://localhost:3000/api/auth/signup', {
                name: document.getElementById('inputName').value,
                surname: document.getElementById('inputSurname').value,
                dni: document.getElementById('inputDNI').value,
                phone: document.getElementById('inputPhone').value,
                email: document.getElementById('inputEmail').value,
                code: document.getElementById('inputCode').value,
                password: document.getElementById('inputPassword4').value
            
            })
            .then(function (response) {
                if(response.data && response.data.token) {
                  localStorage.setItem('token', response.data.token)
                  localStorage.setItem('email', response.data.email)
                  localStorage.setItem('name', response.data.name)
                  localStorage.setItem('surname', response.data.surname);
                  goHome();
                } else {
                  alert('Datos erroneos')
                  window.location = "http://localhost:3000/signup.html"
                }
            })
            .catch(function (error) {
                alert('El usuario ya esta registrado')
            });
      } else {
        alert("Las contraseñas no coinciden")
      }
    } else {
      alert("Email incorrecto")
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
    window.location = "http://localhost:3000/home.html"
  }
