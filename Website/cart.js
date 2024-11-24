import { productDetails } from "./data.js";

const cartRenderTable = document.querySelector(".cart-table-body");
const urlParms = new URLSearchParams(window.location.search);
const productId = urlParms.get("id");
console.log("Got : " + productId);

// const cartItems = [];

function productIdSearch(items, id) {
  const index = items.findIndex((item, index) => {
    return item.id === id;
  });

  return productDetails[index];
}
const cartProduct = productIdSearch(productDetails, productId);
// cartItems.push(cartProduct);
// let cartItemsStorage;
let cartItemsStorage = JSON.parse(localStorage.getItem("cartProducts"));
function renderCartProduct(cartItemsStorage) {
  return (cartRenderTable.innerHTML = cartItemsStorage
    .map((item) => {
      return `
          <tr id="${item.id}" class="table-rows">
          <td><i class="far fa-times-circle cart-item-remove" data-cart-remove-btn></i></td>
          <td><img src="${item.img}" alt=""></td>
          <td>${item.name}</td>
          <td>$${item.price}</td>
          <td><input type="number" class="cart-item-quantity" value="1"></td>
          <td class="cart-price">$${item.price}</td>
          </tr>
          `;
    })
    .join(""));
}
renderCartProduct(cartItemsStorage);

//!======================================== Default Cart Total FUNCTIONALY===================================

function defaultCartTotal() {
  let defautTotal = 0;
  const cartTableBody = document.querySelector(".cart-table-body");
  const rows = cartTableBody.querySelectorAll(".table-rows");
  rows.forEach((row) => {
    const price = +row.lastElementChild.innerText.substring(1);
    defautTotal += price;
    // row.lastElementChild;
    // console.log(row.lastElementChild);
  });
  return defautTotal;
}
const defaulCartTotalPrice = defaultCartTotal();

//!======================================== CART  Quantity Change FUNCTIONALY===================================
function getQuantity() {
  const cartTableBody = document.querySelector(".cart-table-body");
  const items = cartTableBody.querySelectorAll(".cart-item-quantity");
  items.forEach((item) => {
    item.addEventListener("change", (event) => {
      const currentItem = event.currentTarget;
      const orignalPrice = currentItem.parentElement.previousElementSibling;
      const subTotalPrice = currentItem.parentElement.nextElementSibling;
      const newPrice = parseInt(orignalPrice.innerText.substring(1));

      if (currentItem.value < 1) {
        currentItem.value = 1;
      }
      const subTotal = orignalPrice * +currentItem.value;
      subTotalPrice.innerText = `$${newPrice * +currentItem.value}`;
      // selectedItemPrice.innerText = `$${selectedItemPrice.innerText * currentItem.value}`;
    });
  });
}
getQuantity();
// console.log(quantity);

//!========================================REMOVE ITEM FROM CART FUNCTIONALY===================================
const removeBtns = document.querySelectorAll(".cart-item-remove");

for (let i = 0; i < removeBtns.length; i++) {
  removeBtns[i].addEventListener("click", (event) => {
    const currentItem = event.currentTarget;
    const itemRow = currentItem.parentElement.parentElement;
    deleteItemFromCart(itemRow);
  });
}

function deleteItemFromCart(itemRow) {
  const index = cartItemsStorage.findIndex((items, index) => {
    return items.id === itemRow.id;
  });
  console.log("Item Selected on Index : " + index);
  cartItemsStorage.splice(index, 1);
  localStorage.setItem("cartProducts", JSON.stringify(cartItemsStorage));
  // cartItemsStorage = JSON.parse(localStorage.getItem("cartProducts"));
  window.location.reload();
}

//!======================================== CART Sub-Totall FUNCTIONALY===================================

// let totalPrice = 0;
// function getTotalPrice() {
//   const cartTableBody = document.querySelector(".cart-table-body");
//   const items = cartTableBody.querySelectorAll(".cart-item-quantity");
//   items.forEach((item) => {
//     item.addEventListener("change", (event) => {
//       const currentItem = event.currentTarget;
//       const subTotalPrice = currentItem.parentElement.nextElementSibling;
//       totalPrice += +subTotalPrice.innerText.substring(1);

//       console.log(totalPrice);
//     });
//   });
// }
// const finalPrice = getTotalPrice();


//!======================================== CART Totals FUNCTIONALY===================================

const cartSubTotal = document.getElementById("subtotal");

cartSubTotal.innerHTML = `
<h3>Cart Totals</h3>
<table>
    <tr class="sub-total">
        <td>Cart Subtotal</td>
        <td>$${defaulCartTotalPrice}</td>
    </tr>
    <tr class="cart-shipping">
        <td>Shipping</td>
        <td>Free</td>
    </tr>
    <tr class="cart-total">
        <td><strong>Total</strong></td>
        <td><strong>$${defaulCartTotalPrice}</strong></td>
    </tr>
</table>
<button class="normal">Proceed to checkout</button>
`;