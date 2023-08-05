"use strict";
import * as globalFunctions from "../../helpers/globalFunctions.js";

export default function initView() {}

const mainSection = document.querySelector(".main-section");

export const displayProducts = function (products) {
  mainSection.classList =
    "main-section main-section-products animated-element-opacity";

  const productsHTML = products
    .map(
      (product) => `
      <li class='product-main' id='product-id-${product.id}'>
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
      <div class="category-container">
        <ul class="category-name animated-element-opacity">
          ${productsHTML}
        </ul>
      </div>
      <div class="product-modal" style=""></div>
  `
  );
};

export const displayMenu = function (productCategories) {
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
          <p class="side-titles">Menu</p>
          <ul class="side-menu-types">
            ${typesHTML}
          </ul>
        </div>

        <div class="subcategory-checkbox-wrapper">
          <p class="side-titles">Sub Category</p>
        </div>
        
      </section>
        <section class="main-content">
      </section> 
  `
  );
};
