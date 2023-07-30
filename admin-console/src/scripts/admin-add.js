window.addEventListener('load',() => {
    const btn_logout=document.getElementById('btn-logout');
    btn_logout.style.display="block";
    // document.addEventListener("DOMContentLoaded", getItems());
    const btn_add=document.getElementById('btn-add');
    btn_add.addEventListener('click',()=>{
        let token=localStorage.getItem('admin_token');
        let product_name=document.getElementById('product-name');
        let product_description=document.getElementById('product-description');
        let product_category=document.getElementById('product-category');
        let product_image=document.getElementById('product-image');
        fetch("http://localhost:8000/api/admin/add-product",{
            method: "POST",
            cache: "no-cache",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify({
                'product_name':product_name.value,
                'product_description':product_description.value,
                'product_category':product_category.value,
                'product_image':product_image.value
            }),
        })
        .then((response) => response.json())
        .then((response) => {
            if(response.status=='success'){
                window.location.replace('admin-dashboard.html')        
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    })
});

