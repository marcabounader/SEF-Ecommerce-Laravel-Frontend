window.addEventListener('load',() => {
    let token=localStorage.getItem('token');
    if(token=null){
        window.location.replace('login.html')        
    }
    document.addEventListener("DOMContentLoaded", getItems());
})



function getItems() {
  let token=localStorage.getItem('token');
    fetch(`http://localhost:8000/api/user/carts`, {
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
            console.log(items)
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
        <p>${item.product_description}</p>
        <img src='src\\img\\shopping-bag.svg' alt='product image'>
        <div> 
                <i class="fa-solid fa-trash btn-cart btn-cart-${item.id}"></i>
              
        </div>
        </div>`;
        let btn_cart=item_div.getElementsByClassName(`btn-cart-${item.id}`)[0];

        btn_cart.addEventListener('click',(e)=>{
            removeCart(item.id);
        })
        products_container.appendChild(item_div);
    });


}

function removeCart(product_id) {
    let token=localStorage.getItem('token');
    fetch(`http://localhost:8000/api/user/delete-cart/${product_id}`, {
      method: "DELETE",
      cache: "no-cache",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`
      }  
    })
    .then((response) => response.json())
    .then((items) => {
        if(items.status=='success'){
          location.reload();
        }
    })
    .catch((error) => console.log(error))
  }