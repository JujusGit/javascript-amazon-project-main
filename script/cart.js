export const cart =[ ]

export function cartCount(productId){
  let matchingitem;
    cart.forEach((cartItem)=>{
      if(productId === cartItem.productId){
       matchingitem = cartItem;
      }
    });

    if(matchingitem){
      matchingitem.quantity++;
    }
    else{
      cart.push(
        {
          productId,
          quantity: 1
        }
      )
    }
}