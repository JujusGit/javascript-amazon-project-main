import {cart} from "../cart.js";
import { products } from "../../data/products.js";
import { formmatCurrency } from "../utils/money.js";
import {delivaryOptions} from "../../data/deliveryOptons.js";
import { addOrder } from "../../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'


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
  
            <button class="place-order-button button-primary js-place-order">
              Place your order
            </button>
          </div>
`



paymentSummery.innerHTML = html;


document.querySelector('.js-place-order').addEventListener('click', async () => {
  try{
    const response = await fetch('https://supersimplebackend.dev/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cart: cart
      })
    });
    const order = await response.json()
    addOrder(order)
   
  }
  catch(error){
    console.log('unexpected error. try again later')
  }

  const today = dayjs();
  const todayFormat = today.format('MMMM D');

  cart.forEach((cartItem)=>{
    cartItem.orderDate = todayFormat;
  })
  console.log(todayFormat);

  window.location.href="orders.html"
});
}

async function displayName(){
const response = fetch('https://supersimplebackend.dev/greeting', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: "alhassan muhammad"
  })
});

const myName = (await response).text();
console.log(myName);
}

async function getError(){
  try{
    const errorMessage = await fetch('https://amazon.com');
  }
  catch(error){
    console.log('CORS error. your request was blocked by the backend')
  }
}

async function postGreeting() {
  try {
    const response = await fetch('https://supersimplebackend.dev/greeting', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.status >= 400) {
      throw response;
    }

    const text = await response.text();
    console.log(text);

  } catch (error) {
    if (error.status === 400) {
      const errorMessage = await error.json();
      console.log(errorMessage);
    } else {
      console.log('Network error. Please try again later.');
    }
  }
}
