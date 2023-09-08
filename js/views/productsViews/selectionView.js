import * as model from "../../model.js";
import * as globalFunctions from "../../helpers/globalFunctions.js";

export default function selectProduct() {}

export function selectedProduct(clickedProduct) {
  const productID = extractClickedID(clickedProduct);

  if (productID === undefined) return;

  const productObject = getProduct(productID);

  const productMarkUpModal = markUpModal(productObject);

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

function markUpModal(product) {
  return `
    <div class="modal-content">
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
        </div>
      </div>

      <div class="modal-carting">
        <input type="number" value="1" min="1" max="${product.stock}">
        <p>R$${product.price}</p>
        <button type="button">Add to cart</button>
      </div>
    </div>

  `;
}

function renderMarkup(markup) {
  const productModal = document.querySelector(".product-modal");

  productModal.style.display = "block";
  productModal.innerHTML = markup;
}

export function closeModal(modal, handleWindowClick) {
  modal.style.display = "";
  modal.innerHTML = "";
  window.removeEventListener("click", handleWindowClick);
}

export function checkWindowClick(e) {
  const productModal = e.target.closest(".product-modal");
  const modal = document.querySelector(".product-modal");

  !productModal?.classList.contains("product-modal")
    ? closeModal(modal, checkWindowClick)
    : console.log("click inside");
}
