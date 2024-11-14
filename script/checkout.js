import {renderOrderSummery} from './checkout/orderSummery.js';
import {renderPaymentsummery} from './checkout/paymentSummery.js';
import { cart } from './cart.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js'
import { loadProducts  } from '../data/products.js';
//import '../data/cart-class.js';

loadProducts(() => {
  renderCheckoutHeader(cart);
  renderPaymentsummery();
  renderOrderSummery();
})



