const btn=document.getElementById('btn-register');

btn.addEventListener('click',()=>{
    let name=document.getElementById('name');
    let email=document.getElementById('email');
    let password=document.getElementById('password');
    fetch("http://localhost:8000/api/user-register",{
        method: "POST",
        cache: "no-cache",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            'name':name.value,
            'email':email.value,
            'password':password.value
        }),
    })
    .then((response) => response.json())
    .then((response) => {
        if(response.status='success'){
            window.location.replace('login.html')        }
        console.log(response);
    })
    .catch((error) => {
        console.error("Error:", error);
    });

});