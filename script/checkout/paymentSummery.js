import {cart} from "../cart.js";
import { products } from "../../data/products.js";
import { formmatCurrency } from "../utils/money.js";
import {delivaryOptions} from "../../data/deliveryOptons.js";

export function renderPaymentsummery(){
const paymentSummery = document.querySelector('.payment-summary');
const itemsInCart = document.querySelector('.total-items');
let totalPrice = 0;
let TotalShippingPrice = 0;
let totalBeforeTax = 0;
let estimatedTax = 0;
let html = ' ';
let total = 0;
cart.forEach(cartItem => {
  
const productID = cartItem.productId;


let matchingitem;
let shippingPrice = 0;
let eachPrice = 0;


products.forEach(product => {
  if(product.id === productID){
    matchingitem = product;
  }
})


if(productID === matchingitem.id){
   eachPrice = Number((formmatCurrency(matchingitem.priceCents) * cartItem.quantity).toFixed(2))
}

delivaryOptions.forEach(option => {
  if(cartItem.optionsId === option.id){
    shippingPrice = Number((formmatCurrency(option.priceCents)));
  }
})
    TotalShippingPrice += shippingPrice;
    totalPrice += eachPrice;
})

totalBeforeTax = Number((TotalShippingPrice + totalPrice).toFixed(2));
estimatedTax = Number(((totalBeforeTax/100) * 10).toFixed(2));
total = Number((totalBeforeTax + estimatedTax).toFixed(2))

let cartQuantity = 0;
function updateCartQuantity() {
  
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  })
}

updateCartQuantity();

html = `
<div class="payment-summary-title">
              Order Summary
            </div>
  
            <div class="payment-summary-row">
              <div> Items: (${cartQuantity})</div>
              
              <div class="payment-summary-money">$${totalPrice}</div>
            </div>
  
            <div class="payment-summary-row">
              <div>Shipping &amp; handling:</div>
              <div class="payment-summary-money">$${TotalShippingPrice}</div>
            </div>
  
            <div class="payment-summary-row subtotal-row">
              <div>Total before tax:</div>
              <div class="payment-summary-money">$${totalBeforeTax}</div>
            </div>
  
            <div class="payment-summary-row">
              <div>Estimated tax (10%):</div>
              <div class="payment-summary-money">$${estimatedTax}</div>
            </div>
  
            <div class="payment-summary-row total-row">
              <div>Order total:</div>
              <div class="payment-summary-money">$${total}</div>
            </div>
  
            <button class="place-order-button button-primary">
              Place your order
            </button>
          </div>
`



paymentSummery.innerHTML = html;


}
