export let cart = JSON.parse(localStorage.getItem('cart'))||[ 
  {
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 1
  },

  {
    productId:'83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
    quantity: 2
  }
  
]


//THIS FUNCTION ADDS ITEMS TO THE CART USING THEIR PRODUCT ID TO KNOW WHAT ITEM IS BEING ADDED TO THE CART
export function cartCount(productId){
  let matchingitem;
    cart.forEach((cartItem)=>{
      if(productId === cartItem.productId){
       matchingitem = cartItem;
      }
    });

    if(matchingitem){
      matchingitem.quantity++;
    }
    else{
      cart.push(
        {
          productId,
          quantity: 1
        }
      )
    }
    saveToStorae();
}
//THIS ITEM SAVES THE CONTENTS OF THE CART ARRAY IN LOCAL STORAGE
function saveToStorae(){
  localStorage.setItem('cart',JSON.stringify(cart));
}


export function removeFromCart(productId){
const newCart = []
cart.forEach((cartItem) =>{
  if(cartItem.productId !== productId){
    newCart.push(cartItem)
  }
});
cart = newCart
//AFTER WE SAVE THE CONTENTS OF CART TO NEW CART WE SAVE THE CONTENTS OF CART AGAIN
saveToStorae();
}