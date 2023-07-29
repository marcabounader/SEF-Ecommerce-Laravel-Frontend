const btn=document.getElementById('btn-signin');

btn.addEventListener('click',()=>{
    let email=document.getElementById('email');
    let password=document.getElementById('password');
    fetch("http://localhost:8000/api/user-login",{
        method: "POST",
        // mode: "cors",
        cache: "no-cache",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'email':email.value,
            'password':password.value
        }),
    })
    .then((response) => response.json())
    .then((response) => {
        if(response.status='success'){
            localStorage.setItem('user_id',response.user.id);
            localStorage.setItem('user_name',response.user.name);
            localStorage.setItem('user_email',response.user.email);
            localStorage.setItem('token',response.authorisation.token);
            window.location.replace('shop.html')        
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });

});