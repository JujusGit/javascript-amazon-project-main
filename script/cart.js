export let cart = JSON.parse(localStorage.getItem('cart'));

if(!cart){

  cart = [
    {
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      optionsId: '1'
     
    },
    {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 3,
      optionsId: '1'
   
  }
]
}


//THIS FUNCTION ADDS ITEMS TO THE CART USING THEIR PRODUCT ID TO KNOW WHAT ITEM IS BEING ADDED TO THE CART
export function cartCount(productId){
  let matchingitem;

    cart.forEach((cartItem)=>{
      if(productId === cartItem.productId){
       matchingitem = cartItem;
      }
    });
    
      const dropDown = document.querySelector(`.js-select-${productId}`);
      //if the contents of the array are already in the array then the quantity of the item should be increased by the number of quantities added
      if(matchingitem){
        matchingitem.quantity += Number(dropDown.value);
      }
  //else if the item is not already in the array then we should add the item.
      else if(!matchingitem){
        cart.push(
          {
            productId,
            quantity: Number(dropDown.value),
            optionsId: '1'
          }
        )
      }
//save the cart to storage
    saveToStorae();
}

//THIS ITEM SAVES THE CONTENTS OF THE CART ARRAY IN LOCAL STORAGE
function saveToStorae(){
  localStorage.setItem('cart',JSON.stringify(cart));
}

//this code is for deleting ites from the cart
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

export function updateQuantity(productId, newQuantity){

let matchingitem;
cart.forEach((cartItem)=>{
  if(productId === cartItem.productId){
    matchingitem = cartItem;
  }
})
matchingitem.quantity = newQuantity
saveToStorae();
}

export function updateDeliveryOptions(productID, optionsId){
let matchingitem;

cart.forEach((cartItem)=>{
  if(productID === cartItem.productId){
    matchingitem = cartItem
  }
});

matchingitem.optionsId = optionsId;
saveToStorae()
}