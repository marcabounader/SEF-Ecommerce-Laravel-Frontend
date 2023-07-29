window.addEventListener('load',() => {
    const btn_logout=document.getElementById('btn-logout');
    btn_logout.style.display="block";
    document.addEventListener("DOMContentLoaded", getItems());

});

function getItems() {
    fetch(`http://localhost:8000/api/products`, {
      method: "GET",
      cache: "no-cache",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
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
        item_div.innerHTML=`
        <div class='item' id='item-${item.id}'>
        <h4>${item.product_name}</h4>
        <p>${item.product_category}</p>
        <img src='${item.product_image}' alt='product image'>
        <div>   
            <i class="fa-solid fa-trash btn-item btn-item-${item.id}"></i>
        </div>
        <p class="item-description">${item.product_description}</p>
        </div>`;
        let btn_favorite=item_div.getElementsByClassName(`btn-item-${item.id}`)[0];
        btn_favorite.addEventListener('click',()=>{
            removeProduct(item.id);
        })
        let item_description=item_div.getElementsByClassName(`item-description`)[0];
        item_div.addEventListener('mouseover',()=>{
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