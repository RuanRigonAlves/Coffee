export default function initCart() {}

import * as globalFunction from "../../helpers/globalFunctions.js";

export const renderCart = function (section) {
  section.classList = "main-section";

  section.style.overflow = "auto";

  section.insertAdjacentHTML(
    "afterbegin",
    `
    
    <div class="cart-container animated-element-opacity">
    <ul class="cart-products">
      <li>
        <!-- <div class="cart-product-holder"> -->

          <div class="cart-image">
            <img src="./images/product-images/ginger ale (1).jpg" alt="">
          </div>
          <input type="number" value="1" min="1" max="50">
          <p>R$2.5</p>
        <!-- </div> -->
      </li>
      <li>
        <!-- <div class="cart-product-holder"> -->

          <div class="cart-image">
            <img src="./images/product-images/ginger ale (1).jpg" alt="">
          </div>
          <input type="number" value="1" min="1" max="50">
          <p>R$2.5</p>
        <!-- </div> -->
      </li>
      <li>
        <!-- <div class="cart-product-holder"> -->

          <div class="cart-image">
            <img src="./images/product-images/ginger ale (1).jpg" alt="">
          </div>
          <input type="number" value="1" min="1" max="50">
          <p>R$2.5</p>
        <!-- </div> -->
      </li>
      <li>
        <!-- <div class="cart-product-holder"> -->

          <div class="cart-image">
            <img src="./images/product-images/ginger ale (1).jpg" alt="">
          </div>
          <input type="number" value="1" min="1" max="50">
          <p>R$2.5</p>
        <!-- </div> -->
      </li>
      <li>
        <!-- <div class="cart-product-holder"> -->

          <div class="cart-image">
            <img src="./images/product-images/ginger ale (1).jpg" alt="">
          </div>
          <input type="number" value="1" min="1" max="50">
          <p>R$2.5</p>
        <!-- </div> -->
      </li>
      <li>
        <!-- <div class="cart-product-holder"> -->

          <div class="cart-image">
            <img src="./images/product-images/ginger ale (1).jpg" alt="">
          </div>
          <input type="number" value="1" min="1" max="50">
          <p>R$2.5</p>
        <!-- </div> -->
      </li>

    </ul>
  </div>

    `
  );
};
