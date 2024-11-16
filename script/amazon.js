
import { cart,cartCount } from "./cart.js";
import { formmatCurrency } from "./utils/money.js";
import { products, loadProducts, loadGreetings, loadGreetingAwait } from "../data/products.js";
import '../data/car.js'

loadProducts(renderProductsGrid);
loadGreetings();
loadGreetingAwait();

const jsProductsGrid = document.querySelector('.js-products-grid');
const jsCartQuantity = document.querySelector('.js-cart-quantity');

function renderProductsGrid(){
let producthtML = '';

 function renderPage(){
  const url = new URL(window.location.href);
  const search = url.searchParams.get('search');

  let filteredProducts = products;

  // If a search exists in the URL parameters,
  // filter the products that match the search.
  if (search) {
    filteredProducts = products.filter((product) => {
      let matchingKeyword = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingKeyword = true;
        }
      });

      return matchingKeyword ||
        product.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  filteredProducts.forEach((product) => {
    const html = `
    <div class="product-container">
            <div class="product-image-container">
              <img class="product-image"
                src="${product.image}">
            </div>
  
            <div class="product-name limit-text-to-2-lines">
             ${product.name}
            </div>
  
            <div class="product-rating-container">
              <img class="product-rating-stars"
                src="${product.getStarsUrl()}">
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>
  
            <div class="product-price">
              ${product.getPrice()}
            </div>
  
            <div class="product-quantity-container">
              <select class="js-select-${product.id}">
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

            ${product.extraInfoHtml()}
  
            <div class="product-spacer"></div>
  
            <div class="added-to-cart">
              <img src="images/icons/checkmark.png">
              Added
            </div>
  
            <button class="add-to-cart-button button-primary js-add-to-cart"
            data-product-id="${product.id}">
              Add to Cart
            </button>
          </div>
    `
    producthtML += html;
  });

  jsProductsGrid.innerHTML = producthtML; 
}

renderPage();

function updateCartQuantity(){
  let cartQuantity = 0;
    cart.forEach((cartItem)=>{
      cartQuantity += cartItem.quantity
    })

  jsCartQuantity.innerHTML = cartQuantity;
}

updateCartQuantity();


document.querySelectorAll('.js-add-to-cart').forEach((button) =>{
  button.addEventListener('click', ()=>{
   const productId = button.dataset.productId;
   cartCount(productId);
   updateCartQuantity()
   saveToStorae();
  })
})

document.querySelector('.js-search-button')
    .addEventListener('click', () => {
      const search = document.querySelector('.js-search-bar').value;
      window.location.href = `amazon.html?search=${search}`;
    });
}
