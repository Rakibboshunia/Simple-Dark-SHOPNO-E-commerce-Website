const PRODUCTS = [
      {id:'p1',title:'Rice',price:24.99},
      {id:'p2',title:'Milk',price:1.99},
      {id:'p3',title:'Sugar',price:2.49},
      {id:'p4',title:'Olive Oil',price:9.99}
    ];

    const CART_KEY = 'growsary_cart';
    function loadCart(){return JSON.parse(localStorage.getItem(CART_KEY))||{}};
    function saveCart(cart){localStorage.setItem(CART_KEY,JSON.stringify(cart));updateCartUI();}

    function addToCart(id){const c=loadCart();c[id]=(c[id]||0)+1;saveCart(c);} 
    function removeFromCart(id){const c=loadCart();delete c[id];saveCart(c);} 

    function getCartItems(){
      const cart=loadCart();
      return Object.keys(cart).map(id=>({product:PRODUCTS.find(p=>p.id===id),qty:cart[id]}));
    }

    function updateCartUI(){
      const items=getCartItems();
      document.getElementById('cartBtn').textContent=`Cart (${items.reduce((s,i)=>s+i.qty,0)})`;
      const list=document.getElementById('cartItems');list.innerHTML='';
      if(items.length===0){list.innerHTML='<div class="cart-empty">Your cart is empty</div>';}
      else{
        items.forEach(it=>{
          const div=document.createElement('div');div.className='cart-item';
          div.innerHTML=`<span>${it.product.title} x ${it.qty}</span><span>$${(it.product.price*it.qty).toFixed(2)}</span>`;
          list.appendChild(div);
        });
      }
      const total=items.reduce((s,i)=>s+i.product.price*i.qty,0);
      document.getElementById('cartTotal').textContent=`$${total.toFixed(2)}`;
    }

    function checkout(){alert('Checkout successful (demo)');localStorage.removeItem(CART_KEY);updateCartUI();closeCart();}

    function openCart(){document.getElementById('cartPanel').style.display='block';}
    function closeCart(){document.getElementById('cartPanel').style.display='none';}

    document.getElementById('cartBtn').addEventListener('click',openCart);

    function scrollToSection(id){document.getElementById(id).scrollIntoView({behavior:'smooth'});} 

    // Render products
    const grid=document.getElementById('productGrid');
    PRODUCTS.forEach(p=>{
      const div=document.createElement('div');div.className='card';
      div.innerHTML=`<h4>${p.title}</h4><p class='muted'>$${p.price.toFixed(2)}</p><button class='btn primary' onclick="addToCart('${p.id}')">Add to Cart</button>`;
      grid.appendChild(div);
    });

    updateCartUI();