export function getCartItems() {
  let CART_DATA = [];

  let ID_LIST = [];

  let collectedIds = JSON.parse(sessionStorage.getItem("ID_ARRAY"));



  for (let key in collectedIds) {
    ID_LIST.push(collectedIds[key]);
  }

  for (let key in collectedIds) {
    
    CART_DATA.push(sessionStorage.getItem(collectedIds[key]));

    JSON.parse(collectedIds);
  }

  return CART_DATA
}
