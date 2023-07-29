window.addEventListener('load',() => {
    let token=localStorage.getItem('admin_token');
    if(token=null){
        window.location.replace('admin-login.html')        
    }
    let btn_logout=document.getElementById("btn-logout");
    btn_logout.addEventListener('click',()=>{
        fetch("http://localhost:8000/api/admin/logout",{
            method: "POST",
            cache: "no-cache",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization':`Bearer ${token}`
            }
        })
        .then((response) => response.json())
        .then((response) => {
            if(response.status='success'){
                localStorage.clear();
                window.location.replace('admin-login.html')        
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    })
 
})