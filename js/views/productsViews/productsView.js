"use strict";
import * as model from "../../model.js";
import * as globalFunctions from "../../globalFunctions.js";

export default function initView() {}

const mainSection = document.querySelector(".main-section");

export const displayProducts = function (products) {
  mainSection.classList = "main-section main-section-products";

  // console.log(products);
  const productsHTML = products
    .map(
      (product) => `
      <li class='product-main'>
        <div class="image-holder">
          <img src="${product.image}" alt="">
        </div>
        <p class="product-title">${product.name.substring(0, 30)}</p>
        <div class="product-main-text">
          <ul class="product-marks">
            <li>${product.subcategory}</li>
            <li>${product.rating}</li>
          </ul>
          <ul>
            <li class="product-price">R$ ${product.price}</li>
          </ul>
        </div>
      </li>
              `
    )
    .join("");

  const mainContent = document.querySelector(".main-content");

  mainContent.insertAdjacentHTML(
    "beforeend",
    `
    <section class="main-content">
      <div class="category-container">
        <ul class="category-name">
          ${productsHTML}
        </ul>
      </div>
    </section>
  `
  );
};

export const displayTypes = function (productCategories) {
  const typesHTML = Object.keys(productCategories)
    .map(
      (type) => `
    <li>
      <input type="radio" name="type-food" id="${type}" class="custom-input" />
      <label for="${type}">${globalFunctions.capitalizeFirstLetter(
        type
      )}</label>
    </li>
  `
    )
    .join("");

  mainSection.insertAdjacentHTML(
    "afterbegin",
    `
  <section class="side-menu">
      <div>
        <div>
            <input class="search-side-menu" type="text" placeholder="Search" />
        </div>
      </div>
        <div class="checkbox-wrapper">
          <p class="side-titles">Type</p>
          <ul class="side-menu-types">
            ${typesHTML}
          </ul>
        </div>
      </section>
        <section class="main-content">
      </section> 
  `
  );
};
