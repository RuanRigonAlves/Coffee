import * as model from "../../model.js";
import * as globalFunctions from "../../globalFunctions.js";

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
    if (parent.tagName === "LI") {
      break;
    }
    parent = parent.parentNode;
  }
  if (parent === null) {
  }
  return globalFunctions.extractNum(parent.id);
}

function getProduct(id) {
  const productObject = model.myCoffeeData.Coffee.products.find(
    (product) => product.id === id
  );

  if (productObject !== undefined) {
    return productObject;
  }
}

function markUpModal(product) {
  return `
    <div class="modal-content">
      <p>ASDsaopdsakodaspdkasoasp<span>BUCETA</span>odaskdoaspda${product.name}</p>
    </div>
  `;
}

function renderMarkup(markup) {
  const productModal = document.querySelector(".product-modal");

  productModal.style.display = "block";
  // productModal.insertAdjacentHTML("beforeend", markup);
  productModal.innerHTML = markup;
}
