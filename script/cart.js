export let cart;

/*
class Cart {
  productId;
  quantity;
  optionsId;
  orderDate;

  constructor(productDetails){
    this.productId = productDetails.productId
    this.quantity = productDetails.quantity
    this.optionsId = productDetails.optionsId
    this.orderDate = productDetails.orderDate
  }
}

cart = cart.map((productDetails) => {
  if(productDetails.orderDate === cart.forEach((cartItem)=>{
    cartItem.orderDate === productDetails.orderDate
  })){
      return new Cart(productDetails)
  }
});
*/

loadFromStorage()

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart'));

  if(!cart){
  
    cart = [
      {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 2,
        optionsId: '1',
      },
      {
        productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 3,
        optionsId: '1',
    }
  ]
  }
}

export function cartCount(productId){
let matchingitem;

cart.forEach((cartItem)=>{
  if(productId === cartItem.productId){
    matchingitem = cartItem;
  }
});

  const dropDown = document.querySelector(`.js-select-${productId}`);

if(matchingitem){
    matchingitem.quantity += 1;
  }

else if(!matchingitem){
    cart.push(
      {
        productId,
        quantity: Number(dropDown.value),
        optionsId: '1',
      }
    )
  }

saveToCartStorae();
}


export function saveToCartStorae(){
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

saveToCartStorae();
}

export function updateQuantity(productId, newQuantity){

let matchingitem;
cart.forEach((cartItem)=>{
  if(productId === cartItem.productId){
    matchingitem = cartItem;
  }
})
matchingitem.quantity = newQuantity
saveToCartStorae();
}

export function updateDeliveryOptions(productID, optionsId){
let matchingitem;

cart.forEach((cartItem)=>{
  if(productID === cartItem.productId){
    matchingitem = cartItem
  }
});

matchingitem.optionsId = optionsId;
saveToCartStorae()
}


export function loadCart(fun){
  const xhr =  new XMLHttpRequest();
 
  xhr.addEventListener('load',  () => {
   console.log(xhr.response);
   
   fun();
  })
  xhr.open('GET', '');
  xhr.send();
 }


 export async function loadCartFetch(fun){
  try{
    const response = await fetch('https://supersimplebackend.dev/cart');
    const text = await response.text();
    console.log(text);
    return text
 }
  catch(error){
    console.log('some error occured. please try again later');
  }

  fun();
 }