
import { cart,cartCount } from "./cart.js";
import { formmatCurrency } from "./utils/money.js";
import { products } from "../data/products.js";


const jsProductsGrid = document.querySelector('.js-products-grid');
const jsCartQuantity = document.querySelector('.js-cart-quantity');
let producthtML = '';

export function renderPage(){
  products.forEach((products) => {
    const html = `
    <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${products.image}">
            </div>
  
            <div class="product-name limit-text-to-2-lines">
             ${products.name}
            </div>
  
            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="images/ratings/rating-${products.rating.stars * 10}.png">
              <div class="product-rating-count link-primary">
                ${products.rating.count}
              </div>
            </div>
  
            <div class="product-price">
            $${formmatCurrency(products.priceCents)}
            </div>
  
            <div class="product-quantity-container">
              <select class="js-select-${products.id}">
                <option selected value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
  
            <div class="product-spacer"></div>
  
            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>
  
            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${products.id}">
              Add to Cart
            </button>
          </div>
    `
    producthtML += html;
  });

  jsProductsGrid.innerHTML = producthtML; 
}
//this function is used to call the render button
renderPage();

function updateCartQuantity(){
  let cartQuantity = 0;
    cart.forEach((cartItem)=>{
      cartQuantity += cartItem.quantity
    })

  jsCartQuantity.innerHTML = cartQuantity;
}
updateCartQuantity();

//this code is used to display the number of items in the cart in the amazon basket
document.querySelectorAll('.js-add-to-cart').forEach((button) =>{
  button.addEventListener('click', ()=>{
   const productId = button.dataset.productId;
   cartCount(productId);
   updateCartQuantity()
   saveToStorae();
  })
})