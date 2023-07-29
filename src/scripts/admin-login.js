const btn=document.getElementById('btn-signin');

btn.addEventListener('click',()=>{
    let email=document.getElementById('email');
    let password=document.getElementById('password');
    fetch("http://localhost:8000/api/admin-login",{
        method: "POST",
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
        if(response.status=='success'){
            localStorage.setItem('admin_id',response.user.id);
            localStorage.setItem('admin_name',response.user.name);
            localStorage.setItem('admin_email',response.user.email);
            localStorage.setItem('admin_token',response.authorisation.token);
            window.location.replace('admin-dashboard.html')  
            console.log(response);      
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });

});