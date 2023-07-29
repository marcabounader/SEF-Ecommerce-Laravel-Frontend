window.addEventListener('load',() => {
    let token=localStorage.getItem('token');
    let a_login=document.getElementById('a-login');
    let a_register=document.getElementById('a-register');
    if(token==null){
        a_login.style.display="list-item";
        a_register.style.display="list-item"
    } 
})