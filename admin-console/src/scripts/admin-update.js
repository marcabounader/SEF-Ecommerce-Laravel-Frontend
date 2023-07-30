window.addEventListener('load',() => {
    if(localStorage.getItem('admin_token')==null){
        window.location.replace('./admin-login.html');
      }
    const btn_logout=document.getElementById('btn-logout');
    const btn_update=document.getElementById('btn-update');
    btn_logout.style.display="block";
    const params = new URLSearchParams(window.location.search);
    const product_id=params.get("product_id");
    const product_name=params.get("product_name");
    const product_description=params.get("product_description");
    const product_category=params.get("product_category");
    const product_image=params.get("product_image");
    document.getElementById('product-name').value=product_name;
    document.getElementById('product-description').value=product_description;
    document.getElementById('product-category').value=product_category;
    document.getElementById('product-image').value=product_image;

    btn_update.addEventListener('click',()=>{
        let token=localStorage.getItem('admin_token');
        let product_name=document.getElementById('product-name');
        let product_description=document.getElementById('product-description');
        let product_category=document.getElementById('product-category');
        let product_image=document.getElementById('product-image');
        fetch("http://localhost:8000/api/admin/update-product",{
            method: "POST",
            cache: "no-cache",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                'Authorization':`Bearer ${token}`
            },
            body: JSON.stringify({
                'id':product_id,
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

