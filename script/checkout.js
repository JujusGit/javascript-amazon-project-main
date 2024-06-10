import { cart,removeFromCart } from "./cart.js";
import { products } from "../data/products.js";
import { formmatCurrency } from "./utils/money.js";


let jsOrderSummery = document.querySelector('.js-order-summery')

let cartSummeryHTML = '';
cart.forEach((cartItem) => {
  const productID = cartItem.productId;
  let matchingitem;

  products.forEach((product)=>{
if(product.id === productID){
  matchingitem = product;
}

  })


cartSummeryHTML += (
 `<div class="cart-item-container 
 js-cart-item-container-${matchingitem.id}">
 <div class="delivery-date">
   Delivery date: Wednesday, June 15
 </div>

 <div class="cart-item-details-grid">
   <img class="product-image"
     src="${matchingitem.image}">

   <div class="cart-item-details">
     <div class="product-name">
       ${matchingitem.name}
     </div>
     <div class="product-price">
      $${formmatCurrency(matchingitem.priceCents)}
     </div>
     <div class="product-quantity">
       <span>
         Quantity: <span class="quantity-label">${cartItem.quantity}</span>
       </span>
       <span class="update-quantity-link link-primary">
         Update
       </span>
       <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingitem.id}">
         Delete
       </span>
     </div>
   </div>

   <div class="delivery-options">
     <div class="delivery-options-title">
       Choose a delivery option:
     </div>

     <div class="delivery-option">
       <input type="radio" class="delivery-option-input"
         name="delivery-option-${matchingitem.id}">
       <div>
         <div class="delivery-option-date">
           Tuesday, June 21
         </div>
         <div class="delivery-option-price">
           FREE Shipping
         </div>
       </div>
     </div>
     <div class="delivery-option">
       <input type="radio" checked class="delivery-option-input"
         name="delivery-option-${matchingitem.id}">
       <div>
         <div class="delivery-option-date">
           Wednesday, June 15
         </div>
         <div class="delivery-option-price">
           $4.99 - Shipping
         </div>
       </div>
     </div>
     <div class="delivery-option">
       <input type="radio" class="delivery-option-input"
         name="delivery-option-${matchingitem.id}">
       <div>
         <div class="delivery-option-date">
           Monday, June 13
         </div>
         <div class="delivery-option-price">
           $9.99 - Shipping
         </div>
       </div>
     </div>
   </div>
 </div>
</div>
 ` 
)

});

jsOrderSummery.innerHTML = cartSummeryHTML;

document.querySelectorAll('.js-delete-link').forEach((link)=>{
link.addEventListener('click', () => {

const productID = link.dataset.productId;
removeFromCart(productID);

const container = document.querySelector(`.js-cart-item-container-${productID}`);
container.remove();
})
})

