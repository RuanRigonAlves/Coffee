import * as model from "../../model.js";
import * as signupView from "../accountViews/signupView.js";
import * as globalFunctions from "../../helpers/globalFunctions.js";

export default function selectProduct() {}

export let isLoggedIn = false;

export function selectedProduct(clickedProduct) {
  const productID = extractClickedID(clickedProduct);

  if (productID === undefined) return;

  const productObject = getProduct(productID);

  renderProductPage(productObject, isLoggedIn);

  if (isLoggedIn) {
    productCalculator(productObject);
  } else {
    productLogin();
  }
}

function productLogin() {
  const mainSection = document.querySelector(".main-section");
  const productLogin = document.querySelector("#productLogin");

  productLogin.addEventListener("click", function () {
    globalFunctions.clearHTML(mainSection);

    signupView.displayLogin(mainSection);

    signupView.validateLogin();
  });
}

function renderProductPage(productObject, isLoggedIn) {
  let productMarkUpModal;

  if (isLoggedIn) {
    productMarkUpModal = markUpModalLoggedIn(productObject);
  } else {
    productMarkUpModal = markUpModalLoggedOut(productObject);
  }
  renderMarkup(productMarkUpModal);
}

function extractClickedID(clicked) {
  clicked = clicked.target;
  if (clicked.tagName === "UL") return;

  let parent = clicked;
  while (parent !== null) {
    if (parent.tagName === "LI" && parent.classList.contains("product-main")) {
      break;
    }
    parent = parent.parentNode;
  }
  if (parent === null) {
    return null;
  }
  return globalFunctions.extractNum(parent.id);
}

function getProduct(id) {
  const productObject = model.myCoffee.Coffee.products.find(
    (product) => +product.id === id
  );

  if (productObject !== undefined) {
    return productObject;
  }
}

function markUpModalLoggedIn(product) {
  return `

  <div class="modal-content animated-element-opacity">
  <div class="image-modal">
  <img src="${product.image}" alt="">
  </div>
  
  <div class="modal-title">
  <h3>${product.name} </h3>
  <p>" ${product.description} "</p>
  </div>
  
  <div class="modal-about">
  
  <div>
  <p><img src="images/icons/star.png" alt="">${product.rating}</p>
  <p><img src="images/icons/box.png" alt="">${product.stock}</p>
  <p><img src="images/icons/sale.png" alt="">-${product.discount}%</p>
  <p>Price: R$<span id="productPrice">${product.price}</span></p>

  </div>
  </div>
  
  <div class="modal-carting">
  
  <input type="number" value="1" min="1" max="${product.stock}" id="quantity">
  <p id="totalPrice">Total Price: R$${product.price}</p>
  <button id="addToCart">Add to MyCart</button>
  </div>
  </div>
  
  `;
}
function markUpModalLoggedOut(product) {
  return `

  <div class="modal-content animated-element-opacity">
  <div class="image-modal">
  <img src="${product.image}" alt="">
  </div>
  
  <div class="modal-title">
  <h3>${product.name} </h3>
  <p>" ${product.description} "</p>
  </div>
  
  <div class="modal-about">
  
  <div>
  <p><img src="images/icons/star.png" alt="">${product.rating}</p>
  <p><img src="images/icons/box.png" alt="">${product.stock}</p>
  <p><img src="images/icons/sale.png" alt="">-${product.discount}%</p>
  <p>Price: R$<span id="productPrice">${product.price}</span></p>

  </div>
  </div>
  
  <div class="modal-carting">
  <button id="productLogin">Login</button>
  </div>
  </div>
  
  `;
}

function renderMarkup(markup) {
  const productModal = document.querySelector(".product-modal");
  const modalOverlay = document.querySelector(".modal-overlay");

  productModal.style.display = "block";
  productModal.innerHTML = markup;
  modalOverlay.style.display = "block";
}

export function closeModal(modal, handleWindowClick) {
  const modalOverlay = document.querySelector(".modal-overlay");
  modal.style.display = "";
  modal.innerHTML = "";
  modalOverlay.style.display = "";
  window.removeEventListener("click", handleWindowClick);
}

export function checkWindowClick(e) {
  const modal = document.querySelector(".product-modal");

  if (
    e.target.classList[0] === "modal-overlay" ||
    e.target.id === "addToCart"
  ) {
    closeModal(modal, checkWindowClick);
  }
}

export function productCalculator(product) {
  const quantityInput = document.getElementById("quantity");
  const productPriceSpan = document.getElementById("productPrice");
  const totalPriceSpan = document.getElementById("totalPrice");
  const addToCartButton = document.getElementById("addToCart");

  updateTotalPrice();

  addToCartButton.addEventListener("click", addToCart);

  quantityInput.addEventListener("input", updateTotalPrice);
  function updateTotalPrice() {
    const quantity = parseInt(quantityInput.value);
    const productPrice = parseFloat(productPriceSpan.textContent);

    if (quantity >= 1 && quantity <= parseInt(quantityInput.max)) {
      const total = quantity * productPrice;
      totalPriceSpan.textContent = total.toFixed(2);
    } else {
      totalPriceSpan.textContent = "Invalid quantity";
    }
  }

  function addToCart() {
    const quantity = parseInt(quantityInput.value);
    const total = parseFloat(totalPriceSpan.textContent);

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      total: total,
    };
    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    cartItems.push(cartItem);

    localStorage.setItem("cart", JSON.stringify(cartItems));
  }
}

export function checkIsLoggedIn() {
  fetch("php/includes/isLoggedIn.inc.php") // Replace with the actual PHP script URL
    .then((response) => response.text())
    .then((data) => {
      // Handle the JSON response here
      // document.getElementById("result").textContent = JSON.stringify(data);
      if (data === "true") {
        isLoggedIn = true;
      } else {
        isLoggedIn = false;
      }
    })
    .catch((error) => {
      // Handle errors here
      console.log(error);
    });
}
