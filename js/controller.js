import initModel from "./model.js";
import initGlobalFunction from "./helpers/globalFunctions.js";
import * as model from "./model.js";
import * as globalFunctions from "./helpers/globalFunctions.js";
import * as productView from "./views/productsViews/productsView.js";
import * as startView from "./views/startViews/start.js";
import * as selection from "./views/productsViews/selectionView.js";
import * as sideBar from "./views/productsViews/productsSideBar.js";
import * as signupView from "./views/accountViews/signupView.js";
import * as accountView from "./views/accountViews/accountView.js";
import * as cartView from "./views/cartViews/cartView.js";

const mainSection = document.querySelector(".main-section");
const headerSection = document.querySelector(".header-container");

function headerListener() {
  window.addEventListener(
    "DOMContentLoaded",
    startView.displayStartPage(mainSection)
    // accountView.displayAccount(mainSection)
  );
  headerSection.addEventListener("click", function (e) {
    if (e.target.nodeName !== "LI") return;

    if (e.target.classList[0] === "header-logo") {
      globalFunctions.clearHTML(mainSection);

      startView.displayStartPage(mainSection);
    }

    if (e.target.classList[0] === "header-products") {
      globalFunctions.clearHTML(mainSection);

      productView.displayMenu(model.myCoffee.Coffee.productsCategories);
      productView.displayProducts(model.myCoffee.Coffee.products);

      selection.checkIsLoggedIn();
      productListner();
    }

    if (e.target.classList[0] === "header-signup") {
      globalFunctions.clearHTML(mainSection);

      signupView.displayLogin(mainSection);

      signupView.validateLogin();
    }

    if (e.target.classList[0] === "header-account") {
      globalFunctions.clearHTML(mainSection);

      accountView.displayAccount(mainSection);
    }

    if (e.target.classList[0] === "header-cart") {
      globalFunctions.clearHTML(mainSection);

      cartView.renderCart(mainSection);
    }
  });
}

function productListner() {
  mainSection.addEventListener("click", function (e) {
    const productMain = e.target.closest(".product-main");
    if (productMain && productMain.classList.contains("product-main")) {
      const modalContent = document.querySelector(".modal-content");

      modalContent &&
        selection.closeModal(modalContent, selection.checkWindowClick);

      e.stopPropagation();

      selection.selectedProduct(e);

      window.addEventListener("click", selection.checkWindowClick);
    }
  });
}

function sideMenuListner() {
  mainSection.addEventListener("click", function (e) {
    const sideMenu = mainSection.querySelector(".side-menu") !== null;

    if (sideMenu) {
      const clicked = e.target;
      const searchBar = document.querySelector(".search-side-menu");

      if (clicked.name === "type-food") {
        sideBar.handleTypeFoodClick(clicked);
      }

      if (clicked.classList[0] === "sub-category-items") {
        sideBar.handleSubCategoryClick();
      }

      let debounceTimer;
      if (searchBar) {
        searchBar.addEventListener("input", function () {
          clearTimeout(debounceTimer);

          debounceTimer = setTimeout(function () {
            sideBar.searchedItemTyped(searchBar.value);
          }, 300);
        });
      }

      const productsContainer = document.querySelector(".category-name");
      productsContainer.addEventListener("click", selection.selectedProduct);
    }
  });
}

function init() {
  initModel();
  initGlobalFunction();
  headerListener();
  sideMenuListner();
}

init();
