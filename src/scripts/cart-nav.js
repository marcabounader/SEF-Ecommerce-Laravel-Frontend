    let btn_cart=document.getElementById('btn-cart');
    let cart=document.getElementsByClassName('cart')[0];
    let btn_close=document.getElementById('close-cart');
    btn_close.addEventListener('click',()=>{
        cart.style.display='none';
    })
    btn_cart.addEventListener('click',()=>{
      cart.style.display='block';
      getCart()
    })



function getCart() {
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
            console.log(items);
            displayCartItems(items.products);
        }
    })
    .catch((error) => console.log(error))
  }

  function displayCartItems(items){
    let products_container=document.getElementsByClassName('cart-content')[0];
    items.forEach(item => {
        const item_div=document.createElement("div");
        item_div.classList.add('item');
        item_div.id=`item-${item.id}`;
        item_div.innerHTML=`
        <div>
        <img src='${item.product_image}' alt='product image'>
        </div>
        <div>
        <h4>${item.product_name}</h4>
        <p>${item.product_category}</p>
        </div>
        <i class="fa-solid fa-trash btn-cart btn-cart}"></i>`;
        let btn_cart=item_div.getElementsByClassName(`btn-cart`)[0];

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