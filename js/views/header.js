export default function headerInit() {}

import * as model from "../model.js";
import * as globalFunctions from "../globalFunctions.js";
import * as productView from "./productsViews/productsView.js";
import * as startView from "./startViews/start.js";

const mainSection = document.querySelector(".main-section");
const headerSection = document.querySelector(".header-container");
const headerContainer = document.querySelector(".header-container");

window.addEventListener(
  "DOMContentLoaded",
  startView.displayStartPage(mainSection)
);

headerSection.addEventListener("click", function (e) {
  if (e.target.nodeName !== "LI") return;

  if (e.target.classList[0] === "header-logo") {
    globalFunctions.clearHTML(mainSection);

    console.log(e.target);
    startView.displayStartPage(mainSection);
  }

  if (e.target.classList[0] === "header-products") {
    globalFunctions.clearHTML(mainSection);

    productView.displayTypes(model.myCoffeeData.Coffee.productsCategories);
    productView.displayProducts(model.myCoffeeData.Coffee.products);
  }
});
