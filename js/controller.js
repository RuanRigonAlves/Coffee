import initModel from "./model.js";
import initView from "./views/views.js";
import initGlobalFunction from "./helpers/globalFunctions.js";

import * as model from "./model.js";
import * as globalFunctions from "./helpers/globalFunctions.js";
import * as productView from "./views/productsViews/productsView.js";
import * as startView from "./views/startViews/start.js";
import * as selection from "./views/productsViews/selectionView.js";
import * as sideBar from "./views/productsViews/productsSideBar.js";

const mainSection = document.querySelector(".main-section");
const headerSection = document.querySelector(".header-container");

function headerListener() {
  window.addEventListener(
    "DOMContentLoaded",
    startView.displayStartPage(mainSection)
  );

  headerSection.addEventListener("click", function (e) {
    if (e.target.nodeName !== "LI") return;

    if (e.target.classList[0] === "header-logo") {
      globalFunctions.clearHTML(mainSection);

      startView.displayStartPage(mainSection);
    }

    if (e.target.classList[0] === "header-products") {
      globalFunctions.clearHTML(mainSection);

      productView.displayTypes(model.myCoffeeData.Coffee.productsCategories);
      productView.displayProducts(model.myCoffeeData.Coffee.products);
    }
  });
}

function productListner() {
  if (mainSection) {
    mainSection.addEventListener("click", function (e) {
      const productMain = e.target.closest(".product-main");

      if (productMain && productMain.classList.contains("product-main")) {
        selection.selectedProduct(e);

        e.stopPropagation();

        // Check if the event listener is already added
        function handleWindowClick(e) {
          const productModal = e.target.closest(".product-modal");
          const modal = document.querySelector(".product-modal");

          if (productModal?.classList.contains("product-modal")) {
            console.log(productModal.classList.contains("product-modal"));
          } else {
            modal.style.display = "";
            modal.innerHTML = "";
            console.log("closemodal");

            // Remove the event listener
            window.removeEventListener("click", handleWindowClick);
          }
        }
        // Add the event listener to the window
        window.addEventListener("click", handleWindowClick);
      }
    });
  }
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

      if (searchBar) {
        searchBar.addEventListener("input", function () {
          sideBar.searchedItemTyped(searchBar.value);
        });
      }
      const productsContainer = document.querySelector(".category-name");
      productsContainer.addEventListener("click", selection.selectedProduct);
    }
  });
}

function init() {
  initModel();
  initView();
  initGlobalFunction();
  headerListener();
  productListner();
  sideMenuListner();
}

init();
