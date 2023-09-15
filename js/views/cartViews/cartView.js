export default function initCart() {}

import * as globalFunction from "../../helpers/globalFunctions.js";
import * as selection from "../productsViews/selectionView.js";

/* <li>
<!-- <div class="cart-product-holder"> -->

  <div class="cart-image">
    <img src="./images/product-images/ginger ale (1).jpg" alt="">
  </div>
  <input type="number" value="1" min="1" max="50">
  <p>R$2.5</p>
<!-- </div> -->
</li> */
// let sessionUsername = null;

export const renderCartPage = function (section) {
  section.classList = "main-section";

  section.style.overflow = "auto";

  section.insertAdjacentHTML(
    "afterbegin",
    `

    <div class="cart-container animated-element-opacity">
      <ul class="cart-products" id="cart-list">
      </ul>
    </div>

    `
  );
};

export const renderCartProducts = function () {
  let cartItems =
    JSON.parse(localStorage.getItem(selection.sessionUsername)) || [];

  if (!cartItems.length) {
    displayNoItem();
  }

  const cartList = document.getElementById("cart-list");

  cartList.innerHTML = "";

  const cartItemsById = {};

  for (const cartItem of cartItems) {
    // Define productPrice and maxQuantity outside the loop
    const productPrice = cartItem.price; // Assuming each cart item has a productPrice property
    const maxQuantity = cartItem.maxQuantity; // Assuming each cart item has a maxQuantity property

    if (!cartItemsById[cartItem.id]) {
      cartItemsById[cartItem.id] = cartItem;
    } else {
      const updatedQuantity =
        cartItemsById[cartItem.id].quantity + cartItem.quantity;

      if (updatedQuantity > maxQuantity) {
        cartItemsById[cartItem.id].quantity = maxQuantity;
      } else {
        cartItemsById[cartItem.id].quantity = updatedQuantity;
      }
    }

    cartItemsById[cartItem.id].total =
      productPrice * cartItemsById[cartItem.id].quantity;
  }

  cartItems = Object.values(cartItemsById);

  for (const cartItem of cartItems) {
    displayItem(cartItem);
  }
};

export const displayItem = function (product) {
  const cartList = document.getElementById("cart-list");

  const listItem = document.createElement("li");

  listItem.innerHTML = `
    <div class="cart-image">
      <img src="${product.image}" alt="">
    </div>
    <h2>${product.name}</h2>
    <input type="number" value="${product.quantity}" min="1" max="50">
    <p>R$${product.total.toFixed(2)}</p>
  `;

  cartList.appendChild(listItem);
};

selection.checkIsLoggedIn();

export const displayNoItem = function () {
  const mainSection = document.querySelector(".main-section");

  mainSection.insertAdjacentHTML(
    "afterbegin",
    `
  <h1 style="display:flex;justify-content:center;color:white;"> Empty Cart</h1>
  `
  );
};
