import { cart,removeFromCart, updateDeliveryOptions } from "./cart.js";
import { products } from "../data/products.js";
import { formmatCurrency } from "./utils/money.js";
import {delivaryOptions} from "../data/deliveryOptons.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

console.log(dayjs());

let jsCheckOutAmount = document.querySelector('.js-checkout-amount');
//save an empty variable
let cartSummeryHTML = '';
//next we loop through the array 

cart.forEach((cartItem) => {
//we save the product id as "productID"
const productID = cartItem.productId;
let matchingitem;

products.forEach((product)=>{
  if(product.id === productID){
    //this line of code is for us to be able to locate specific items by using their properties 
    matchingitem = product;
  }
})

const delivaryOptionId = cartItem.delivaryOptionsId

let deliveryOption;

delivaryOptions.forEach((option)=>{
if(option.id === delivaryOptionId){
  deliveryOption = option;
}
})
const today = dayjs();
const dateOption = today.add(deliveryOption.delivaryDays, 'day');
const dateString = dateOption.format('dddd, MMMM D');

cartSummeryHTML += (
 `<div class="cart-item-container 
 js-cart-item-container-${matchingitem.id}">
 <div class="delivery-date js-delivery-date">
   Delivery date: ${dateString}
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
         Quantity: <span class="quantity-label  js-cartitem-quantity-${matchingitem.id}">${cartItem.quantity}</span>
       </span>
       
       <span class="update-quantity-link link-primary js-update-link disappear-update" data-product-id="${matchingitem.id}">
          Update
       </span>
       <input class="quantity-input js-quantity-input-${matchingitem.id}">
       <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingitem.id}" >
       Save
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
        ${deliveryOptionsHTML(matchingitem, cartItem)}
     </div>
   </div>
 </div>
</div>
 ` 
)
});

function deliveryOptionsHTML(matchingitem, cartItem){
  let html = ''
  delivaryOptions.forEach((option) => {
    const today = dayjs();
    const dateOption = today.add(option.delivaryDays, 'day');
    const dateString = dateOption.format('dddd, MMMM D');
    const priceString = option.priceCents === 0
    ?'FREE'
    :`$${formmatCurrency(option.priceCents)} - `
      const isChecked = option.id === cartItem.delivaryOptionsId
  html += `
  <div class="delivery-option js-delivery-option"
  data-product-id="${matchingitem.id}";
  data-delivery-option-id="${delivaryOptions.id}">
        <input type="radio" 
        ${isChecked
          ?'checked'
          :''
        }
        class="delivery-option-input"
          name="delivery-option-${matchingitem.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
  `
  });
  return html;
}


document.querySelector('.js-order-summery').innerHTML = cartSummeryHTML;

//this code is for the delete link
//we call the data product ID
document.querySelectorAll('.js-delete-link').forEach((link)=>{
link.addEventListener('click', () => {
const productID = link.dataset.productId;
removeFromCart(productID);
const container = document.querySelector(`.js-cart-item-container-${productID}`);
container.remove();
updateCartQuabntity()
})
})

//thiis line pf code is for the update link
document.querySelectorAll('.js-update-link').forEach((link)=>{
  link.addEventListener('click', ()=>{ 
    const productID = link.dataset.productId;
    //select the container using the DOM 
    const container = document.querySelector(`.js-cart-item-container-${productID}`);
    //add the class list when you click the update button
    container.classList.add('is-editing-quantity');

  })
  })

 
//this code is for the dave link button
//its functions are
//1 - when clicking save the field should be returned back to its oriinal form
//2 - the numbber present in the input field should be entered into the quantity as the new quantity 
//3 - and this should only apply if cart items are less than 10 and greater than 0

  document.querySelectorAll('.js-save-link').forEach((link)=>{
    link.addEventListener('click', ()=>{
      const productID = link.dataset.productId;
      const container = document.querySelector(`.js-cart-item-container-${productID}`);
      container.classList.remove('is-editing-quantity')
      const quantityInput = document.querySelector(`.js-quantity-input-${productID}`)
      const newQuantity = Number(quantityInput.value);
      if(newQuantity > 0 && newQuantity <= 10){
        updateQuantity(productID, newQuantity);
        document.querySelector(`.js-cartitem-quantity-${productID}`).innerHTML =  newQuantity;
        updateCartQuabntity()
      }

    })
  })

  
//this bit of code calculates the quantity of items in thr cart in the (cart icon) in the checkout section when ites are (added and deleted)

function updateCartQuabntity(){
  let cartQuantity = 0;

    cart.forEach((cartItem) =>{
      cartQuantity += cartItem.quantity;
  })

  jsCheckOutAmount.innerHTML =`${cartQuantity} items`;
  
}
updateCartQuabntity();

document.querySelectorAll('.js-delivery-option').forEach((element)=>{
  element.addEventListener('click', ()=>{
    const {productId, delivaryOptionId} = element.dataset;
    updateDeliveryOptions(productId, delivaryOptionId)
})
})
