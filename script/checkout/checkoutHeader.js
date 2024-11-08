export function renderCheckoutHeaser(cart){
  let cartQuantity = 0;
   function updateCartQuantity() {
    
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  }
  updateCartQuantity() 
  
  const Html = `
  Checkout (<a class="return-to-home-link js-checkout-header"
    href="amazon.html">${cartQuantity} items</a>)
  `
  document.querySelector('.checkout-header-middle-section').innerHTML = Html
}

