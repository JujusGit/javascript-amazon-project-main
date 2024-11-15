export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order){
orders.unshift(order);
saveToStorae()
}

function saveToStorae(){
  localStorage.setItem('orders', JSON.stringify(orders))
}