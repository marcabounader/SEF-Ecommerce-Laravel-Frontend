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
            <i class="fa-solid fa-star btn-favorite btn-favorite-${item.id}"></i>
            <i class="fa-solid fa-cart-shopping btn-cart btn-cart-${item.id}"></i>
        </div>
        <p class="item-description">${item.product_description}</p>`;
        let btn_favorite=item_div.getElementsByClassName(`btn-favorite-${item.id}`)[0];
        btn_favorite.addEventListener('click',()=>{
            addFavorite(item.id);
        })
        let btn_cart=item_div.getElementsByClassName(`btn-cart-${item.id}`)[0];

        btn_cart.addEventListener('click',(e)=>{
            addCart(item.id);
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
            window.location.reload();
        }
    })
    .catch((error) => console.log(error))
  }

  function addCart(product_id) {
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
            window.location.reload();
        }
    })
    .catch((error) => console.log(error))
  }