window.addEventListener('load',() => {
    let token=localStorage.getItem('token');
    let a_login=document.getElementById('a-login');
    let a_register=document.getElementById('a-register');
    let btn_logout=document.getElementById('btn-logout');

    if(token!=null){
        let welcome_name=document.getElementById('welcome-name');

        welcome_name.innerText=localStorage.getItem('user_name').toUpperCase();
        btn_logout.style.display="block";

    } else{
        a_login.style.display="list-item";
        a_register.style.display="list-item";

    }

    document.addEventListener("DOMContentLoaded", getItems());
})



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
        item_div.classList.add('item');
        item_div.id=`item-${item.id}`;
        item_div.innerHTML=`
        <h4>${item.product_name}</h4>
        <p>${item.product_category}</p>
        <img src='${item.product_image}' alt='product image'>
        <div>   
            <i class="fa-regular fa-star btn-favorite btn-favorite-${item.id}"></i>
            <i class="fa-solid fa-cart-shopping btn-cart btn-cart-${item.id}"></i>
        </div>
        <p class="item-description">${item.product_description}</p>`;

        let star=item_div.getElementsByClassName('fa-star')[0];
        let btn_favorite=item_div.getElementsByClassName(`btn-favorite-${item.id}`)[0];

        isFavorite(item.id,star);

        btn_favorite.addEventListener('click', ()=>{

          if(star.classList.contains('fa-regular')){
            addFavorite(item.id);

          } else if(star.classList.contains('fa-solid')){
            removeFavorite(item.id);
          }
          star.classList.toggle('fa-regular');
          star.classList.toggle('fa-solid');
        })
        let btn_cart=item_div.getElementsByClassName(`btn-cart-${item.id}`)[0];

        btn_cart.addEventListener('click', (e)=>{
            addCart(item.id, item);
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

function addFavorite(product_id) {
      let token=localStorage.getItem('token');
      fetch(`http://localhost:8000/api/user/add-favorite`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`
      },
      body: JSON.stringify({
        'product_id': product_id,
        })    
    })
    .then((response) => response.json())
    .then((items) => {
        if(items.status=='success'){
        }
    })
    .catch((error) => console.log(error))
  }

  function addCart(product_id,products) {
    let token=localStorage.getItem('token');
    fetch(`http://localhost:8000/api/user/add-cart`, {
      method: "POST",
      cache: "no-cache",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`
      },
      body: JSON.stringify({
        'product_id': product_id
        })    
    })
    .then((response) => response.json())
    .then((items) => {
        if(items.status=='success'){
            displayCartItem(products);
        }
    })
    .catch((error) => console.log(error))
  }

  function displayCartItem(item){
        let products_container=document.getElementsByClassName('cart-content')[0];
        const item_div=document.createElement("div");
        item_div.classList.add('item');
        item_div.id=`item-${item.id}`;
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
          <input type="text" name="name" value="1" class="quantity-value">
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

}

function removeFavorite(product_id) {
  let token=localStorage.getItem('token');
  fetch(`http://localhost:8000/api/user/delete-favorite/${product_id}`, {
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
        // location.reload();
      }
  })
  .catch((error) => console.log(error))
}

function isFavorite(product_id,star) {
  let token=localStorage.getItem('token');
  fetch(`http://localhost:8000/api/user/is-favorite/${product_id}`, {
    method: "GET",
    cache: "no-cache",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization':`Bearer ${token}`
    }  
  })
  .then((response) => response.json())
  .then((items) => {
      if(items.status=='success' && items.product.length=="1"){
        star.classList.toggle('fa-regular');
        star.classList.toggle('fa-solid');
      }
  })
  .catch((error) => console.log(error))
}