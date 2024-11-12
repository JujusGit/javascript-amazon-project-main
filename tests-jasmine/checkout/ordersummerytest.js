import { renderOrderSummery } from "../../script/checkout/orderSummery.js";
import { loadFromStorage } from "../../script/cart.js"

describe('test suite: render order summery', ()=> {
  it('displays the cart', ()=> {
    document.querySelector('.js-test-container').innerHTML = `
    <div class="js-order-summery">

     </div>
    `;

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
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
    ]);
    });
    loadFromStorage();
    renderOrderSummery();

expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2); 
  })
})