class Cart {

  cartItems;
  #localStorageKey;

  constructor(localStorageKey){
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }

  #loadFromStorage = function(){
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
    
    if(!this.cartItems){
      this.cartItems = [
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
    ]
    }
    };

    saveToStorae = function(){
      localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
      };
      
      cartCount = function(productId){
      let matchingitem;
      
      this.cartItems.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingitem = cartItem;
      }
      });
      
      const dropDown = document.querySelector(`.js-select-${productId}`);
      
      if(matchingitem){
        matchingitem.quantity += Number(dropDown.value);
      }
      
      else if(!matchingitem){
        this.cartItems.push(
          {
            productId,
            quantity: Number(dropDown.value),
            optionsId: '1'
          }
        )
      }
      
      this.saveToStorae();
      };


      removeFromCart(productId){
        const newCart = []
        this.cartItems.forEach((cartItem) =>{
        if(cartItem.productId !== productId){
        newCart.push(cartItem)
        }
        });
        this.cartItems = newCart
        
        this.saveToStorae();
        };


        updateQuantity(productId, newQuantity){
    
          let matchingitem;
          this.cartItems.forEach((cartItem)=>{
          if(productId === cartItem.productId){
            matchingitem = cartItem;
          }
          })
          matchingitem.quantity = newQuantity
          this.saveToStorae();
          };
          
          
          updateDeliveryOptions(productID, optionsId){
          let matchingitem;
          
          this.cartItems.forEach((cartItem)=>{
          if(productID === cartItem.productId){
            matchingitem = cartItem
          }
          });
          
          matchingitem.optionsId = optionsId;
          this.saveToStorae()
          }
          

}



const cart = new Cart('cart-oop')
const BusinessCart = new Cart('cart-business')

console.log(cart)
console.log(BusinessCart)

