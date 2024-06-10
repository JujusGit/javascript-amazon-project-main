export const cart =[ 
  {
    productId:'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 1
  },

  {
    productId:'83d4ca15-0f35-48f5-b7a3-1ea210004f2e',
    quantity: 2
  }
  
]

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