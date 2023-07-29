const btn=document.getElementById('btn-register');

btn.addEventListener('click',()=>{
    let name=document.getElementById('name');
    let email=document.getElementById('email');
    let password=document.getElementById('password');
    fetch("http://localhost:8000/api/login/user-register",{
        method: "POST",
        // mode: "cors",
        cache: "no-cache",
        origin: "http://localhost:5500",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name,
            email,
            password
        }),
    })
    .then((response) => response.json())
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.error("Error:", error);
    });

});