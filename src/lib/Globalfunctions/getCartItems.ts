export function getCartItems() {
  let CART_DATA: string[] = [];

  let ID_LIST : string[] = [];

  let collectedIds :string[] = JSON.parse(sessionStorage.getItem("ID_ARRAY"));



  for (let key in collectedIds) {
    ID_LIST.push(collectedIds[key]);
  }

  for (let key in collectedIds) {
    
    CART_DATA.push(sessionStorage.getItem(collectedIds[key]));

  }

  return CART_DATA
}
