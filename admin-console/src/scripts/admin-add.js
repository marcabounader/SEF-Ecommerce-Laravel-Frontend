window.addEventListener('load',() => {
    if(localStorage.getItem('admin_token')==null){
        window.location.replace('./admin-login.html');
      }
    const btn_logout=document.getElementById('btn-logout');
    btn_logout.style.display="block";
    let image_doc=document.querySelector('input[type="file"]');
    const fd=new FormData;
    // document.addEventListener("DOMContentLoaded", getItems());
    const btn_add=document.getElementById('btn-add');

        image_doc.addEventListener('change', function (e) {
          if (this.files&&this.files[0]) {
            let img = document.getElementById('img-content');
            img.onload = () => {
              URL.revokeObjectURL(img.src);
            }
            img.src = URL.createObjectURL(this.files[0]);
            image =this.files[0];
            
          }
        });
      
    btn_add.addEventListener('click', (event)=>{
        event.preventDefault();

        let image_doc=document.querySelector('input[type="file"]');
        let selectedImage=image_doc.files[0];
        if (!selectedImage) {
            alert('Please select an image.');
            return;
        }
        const reader = new FileReader();
        reader.onloadend = function () {
            const base64Image = reader.result.split(',')[1];
            addProduct(base64Image);
        };
        reader.readAsDataURL(selectedImage);
    })
});

async function addProduct(base64Image){
    let token=localStorage.getItem('admin_token');
    let product_name=document.getElementById('product-name');
    let product_description=document.getElementById('product-description');
    let product_category=document.getElementById('product-category');
    await fetch("http://localhost:8000/api/admin/add-product",{
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
            'image': base64Image
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
}
