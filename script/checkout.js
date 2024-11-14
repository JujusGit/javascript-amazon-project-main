import {renderOrderSummery} from './checkout/orderSummery.js';
import {renderPaymentsummery} from './checkout/paymentSummery.js';
import { cart, loadCart } from './cart.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js'
import { loadProductsFetch  } from '../data/products.js';
//import '../data/cart-class.js';



async function loadPage(){
  
  await loadProductsFetch()

  await  new Promise((resolve) => {
    loadCart(()=> {
      resolve()
    })
  })

  renderCheckoutHeader(cart);
  renderPaymentsummery();
  renderOrderSummery();

}

loadPage()

/*
Promise.all(
  [
   loadProductsFetch(),

    new Promise((resolve) => {
      loadCart(()=> {
        resolve()
      })
    })
  ]
).then(()=>{
  renderCheckoutHeader(cart);
  renderPaymentsummery();
  renderOrderSummery();
})
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });
})

.then(() => {
  return new Promise((resolve) => {
    loadCart(()=> {
      resolve()
    })
  })
})

.then(()=>{
  renderCheckoutHeader(cart);
  renderPaymentsummery();
  renderOrderSummery();
})
  */
 
/*
loadProducts(() => {
  loadCart(()=> {
    renderCheckoutHeader(cart);
    renderPaymentsummery();
    renderOrderSummery();
  });
});
*/

