const api = axios.create({
    baseURL: "https://tallerbj.herokuapp.com/api",
    timeout: 2000
})

document.getElementById('loginButton').addEventListener("click", function(){
    if(validEmail(document.getElementById('inputEmailLogin').value)){
        api
            .post('/auth/login', {
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
                    showPopup('Email o password erroneos')
                }
            })
            .catch(function (error) {
                showPopup('Email o password erroneos')
            });
    } else {
        showPopup('Email o password erroneos')
    }
})
function showPopup(message){
    $('#myToast').toast('show'); 
    var myToastEl = document.getElementsByClassName('toast-body');
    myToastEl[0].innerHTML += message;
}

window.onload = function(){
    $('#myToast').toast();
    var myToastEl = document.getElementById('myToast');
    myToastEl.addEventListener('hidden.bs.toast', function () {
        var myToastEl = document.getElementsByClassName('toast-body');
        myToastEl[0].innerHTML = "";
    })

}



function validEmail(email) {
    var filter = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    return(String(email).search (filter) != -1);
}
function validPassword(psw, repsw){
    return(psw === repsw)
}

function goHome(){
    window.location = "carPage.html"
}
