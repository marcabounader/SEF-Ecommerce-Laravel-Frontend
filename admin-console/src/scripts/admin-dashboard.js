window.addEventListener('load',() => {
    if(localStorage.getItem('admin_token')==null){
      window.location.replace('./admin-login.html');
    }
    const btn_logout=document.getElementById('btn-logout');
    btn_logout.style.display="block";
    document.addEventListener("DOMContentLoaded", getItems());

});

function getItems() {
  let token=localStorage.getItem('admin_token');

    fetch(`http://localhost:8000/api/admin/products`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`

      },
    })
    .then((response) => response.json())
    .then((items) => {
        if(items.status=='success'){
            displayItems(items.products);
        }
    })
    .catch((error) => console.log(error))
  }

  function displayItems(items){
    let products_container=document.getElementById('products');
    items.forEach(item => {
        const item_div=document.createElement("div");
        item_div.classList.add('item');
        item_div.id=`item-${item.id}`;

        item_div.innerHTML=`
        <img src='${item.product_image}' alt='product image'>
        <a href="admin-update.html?product_id=${item.id}&product_name=${item.product_name}&product_description=${item.product_description}&product_category=${item.product_category}&product_image=${item.product_image}"><h4>${item.product_name}</h4></a>
        <p>${item.product_category}</p>
        <div>   
            <i class="fa-solid fa-trash btn-item btn-item-${item.id}"></i>
        </div>
        <p class="item-description">${item.product_description}</p>
        `;
        let btn_favorite=item_div.getElementsByClassName(`btn-item-${item.id}`)[0];
        btn_favorite.addEventListener('click',()=>{
            removeProduct(item.id);
        })
        let item_description=item_div.getElementsByClassName(`item-description`)[0];
        item_div.addEventListener('mouseover',(e)=>{
            item_description.style.display="block";
        });
        item_div.addEventListener('mouseout',()=>{
            item_description.style.display="none";
        });
        products_container.appendChild(item_div);
    });


}
function removeProduct(product_id) {
    let token=localStorage.getItem('admin_token');
    fetch(`http://localhost:8000/api/admin/delete-product/`, {
      method: "DELETE",
      cache: "no-cache",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`
      },
      body: JSON.stringify({
        'id':product_id
    }),
        
    })
    .then((response) => response.json())
    .then((items) => {
        if(items.status=='success'){
          location.reload();
        }
    })
    .catch((error) => console.log(error))
  }