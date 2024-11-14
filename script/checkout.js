import {renderOrderSummery} from './checkout/orderSummery.js';
import {renderPaymentsummery} from './checkout/paymentSummery.js';
import { cart, loadCart } from './cart.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js'
import { loadProducts  } from '../data/products.js';
//import '../data/cart-class.js';


Promise.all(
  [
    new Promise((resolve) => {
      loadProducts(() => {
        resolve();
      });
    }),


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

