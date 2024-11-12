import {renderOrderSummery} from './checkout/orderSummery.js';
import {renderPaymentsummery} from './checkout/paymentSummery.js';
import { cart } from './cart.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js'
//import '../data/cart-class.js';

renderCheckoutHeader(cart);
renderPaymentsummery();
renderOrderSummery();



