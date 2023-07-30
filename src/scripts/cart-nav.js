    let btn_cart=document.getElementById('btn-cart');
    let cart=document.getElementsByClassName('cart')[0];
    let btn_close=document.getElementById('close-cart');
    btn_close.addEventListener('click',()=>{
        cart.style.display='none';
    })
    btn_cart.addEventListener('click',()=>{
      cart.style.display='flex';
      getCart()
    })
    let btn_view_cart=document.getElementById('view-cart');
    btn_view_cart.addEventListener('click',()=>{
        window.location.replace('cart.html');
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
        console.log(item);
        item_div.innerHTML=`
        <div>
        <img src='${item.product_image}' alt='product image'>
        </div>
        <div>
        <h4>${item.product_name}</h4>
        </div>
        <div class="quantity">
          <button class="plus-btn" type="button" name="button">
            <i class="fa-solid fa-plus"></i>
          </button>
          <input type="text" name="name" value="${item.quantity}" class="quantity-value">
          <button class="minus-btn" type="button" name="button">
            <i class="fa-solid fa-minus"></i>
        </button>
      </div>
        <i class="fa-solid fa-trash btn-cart btn-cart}"></i>`;
        let btn_cart=item_div.getElementsByClassName(`btn-cart`)[0];
        let btn_plus=item_div.getElementsByClassName('plus-btn')[0];
        let btn_minus=item_div.getElementsByClassName('minus-btn')[0];

        btn_cart.addEventListener('click',(e)=>{
          e.preventDefault();
            removeCart(item.id,item_div);

        })
        btn_plus.addEventListener('click',(e)=>{
          e.preventDefault();
          updateQuantity(item.id,++item.quantity,item_div);


        })
        btn_minus.addEventListener('click',(e)=>{
          e.preventDefault();
          if(item.quantity>"1"){
            updateQuantity(item.id,--item.quantity,item_div);
          }else{
            removeCart(item.id,item_div);
          }
        })
        products_container.appendChild(item_div);
    });


}

function removeCart(product_id,item_div) {
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
          item_div.remove();
        }
    })
    .catch((error) => console.log(error))
  }

  function updateQuantity(id,quantity,item_div) {
    let token=localStorage.getItem('token');
    fetch(`http://localhost:8000/api/user/update-quantity`, {
      method: "PUT",
      cache: "no-cache",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`
      }  ,
      body: JSON.stringify({
        'product_id': id,
        'quantity':quantity
      })
    })

    .then((response) => response.json())
    .then((items) => {
        if(items.status=='success'){
          let quantity_value=item_div.getElementsByClassName('quantity-value')[0];
          quantity_value.value=quantity;
        }
    })
    .catch((error) => console.log(error))
  }