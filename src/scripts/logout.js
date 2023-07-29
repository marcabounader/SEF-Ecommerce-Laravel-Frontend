window.addEventListener('load',() => {
    let token=localStorage.getItem('token');
    if(token=null){
        window.location.replace('index.html')        
    }
    fetch("http://localhost:8000/api/user/logout",{
        method: "POST",
        cache: "no-cache",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            'Authorization':`Bearer ${token}`
        },
        body: JSON.stringify({
            'email':email.value,
            'password':password.value
        }),
    })
    .then((response) => response.json())
    .then((response) => {
        if(response.status='success'){
            window.location.replace('index.html')        
        }
    })
    .catch((error) => {
        console.error("Error:", error);
    });
})