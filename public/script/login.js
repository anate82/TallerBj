document.getElementById('loginButton').addEventListener("click", function(){
    if(validEmail(document.getElementById('inputEmailLogin').value)){
        axios
            .post('http://localhost:3000/api/auth/login', {
                email:document.getElementById('inputEmailLogin').value,
                password:document.getElementById('inputPasswordLogin').value
            })
            .then(function (response) {
                if(response.data && response.data.token) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('email', response.data.email);
                    localStorage.setItem('name', response.data.name);
                    localStorage.setItem('surname', response.data.surname);
                    localStorage.setItem('role',  response.data.role);
                    goHome();
                } else {
                    console.log('Email o password erroneos')
                }
            })
            .catch(function (error) {
                console.log('Email o password erroneos')
            });
    } else {
        console.log("Email incorrecto")
    }
})

window.onload = function(){
    $('#myToast').toast();
    $('#myToast').toast('show'); 
}



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
