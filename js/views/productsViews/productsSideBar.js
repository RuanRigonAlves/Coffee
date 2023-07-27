import * as model from "../../model.js";
import * as productView from "./productsView.js";
import * as globalFunctions from "../../globalFunctions.js";

export default function productsSideBar() {}

const mainSection = document.querySelector(".main-section");

let currentSubCategoryWrapper = null; // Keep track of the current subcategory section.

mainSection.addEventListener("click", function (e) {
  const clicked = e.target;
  const searchBar = document.querySelector(".search-side-menu");

  if (clicked.name === "type-food") {
    handleTypeFoodClick(clicked);
  }

  if (clicked.classList[0] === "sub-category-items") {
    handleSubCategoryClick();
  }

  if (searchBar) {
    searchBar.addEventListener("input", function () {
      searchedItemTyped(searchBar.value);
    });
  }
});

function handleTypeFoodClick(clicked) {
  const parentEl = document.querySelector(".subcategory-checkbox-wrapper");
  const mainContent = document.querySelector(".main-content");

  // Update sub-categories and display products
  updateSubCategoriesAndDisplayProducts(clicked, mainContent);

  // Display sub-category checkboxes
  displaySubCategoryCheckboxes(parentEl);

  // Update the current sub-category wrapper
  updateCurrentSubCategoryWrapper();
}

function updateSubCategoriesAndDisplayProducts(clicked, mainContent) {
  model.getSubCategoryByID(clicked.id);
  globalFunctions.clearHTML(mainContent);

  const combinedProducts = Object.values(
    model.myCoffeeData.Coffee.productsSubCategories
  ).flat();

  productView.displayProducts(combinedProducts);
}

function displaySubCategoryCheckboxes(parentEl) {
  const subCategoryHTML = Object.keys(
    model.myCoffeeData.Coffee.productsSubCategories
  )
    .map(
      (subCategory) => `
    <li class="animated-element-down">
      <input type="checkbox" name="${subCategory}" id="${subCategory}" class="sub-category-items custom-input " />
      <label for="${subCategory}">${globalFunctions.capitalizeFirstLetter(
        subCategory
      )}</label>
    </li>
  `
    )
    .join("");

  removeCurrentSubCategoryWrapper();

  parentEl.insertAdjacentHTML(
    "beforeend",
    `
    <ul>
    ${subCategoryHTML}
    </ul>
    `
  );
}

function removeCurrentSubCategoryWrapper() {
  if (currentSubCategoryWrapper) {
    currentSubCategoryWrapper[0].remove();
  }
}

function updateCurrentSubCategoryWrapper() {
  const ulElements = document.querySelector(".subcategory-checkbox-wrapper");
  currentSubCategoryWrapper = ulElements.querySelectorAll("ul");
}

function checkedItems(nodeListItems) {
  const selectedSubCategoryProducts = [];

  nodeListItems.forEach((item) => {
    if (item.checked) {
      const subCategoryProducts =
        model.myCoffeeData.Coffee.productsSubCategories[item.id];

      const flattenedProducts = subCategoryProducts.flat();

      selectedSubCategoryProducts.push(...flattenedProducts);
    }
  });
  return selectedSubCategoryProducts;
}

function handleSubCategoryClick() {
  const mainContent = document.querySelector(".main-content");
  const subCatItems = document.querySelectorAll(".sub-category-items");
  globalFunctions.clearHTML(mainContent);

  const selectedSubCategory = checkedItems(subCatItems);

  if (!selectedSubCategory.length) {
    const currentType = Object.values(
      model.myCoffeeData.Coffee.productsSubCategories
    ).flat();
    productView.displayProducts(currentType);
  } else {
    productView.displayProducts(selectedSubCategory);
  }
}

function searchedItemTyped(query) {
  const mainContent = document.querySelector(".main-content");
  const productsArray = model.myCoffeeData.Coffee.products;
  const matchingProducts = [];
  const lowercaseQuery = query.toLowerCase();

  productsArray.forEach((product) => {
    const productString = JSON.stringify(product).toLowerCase();

    if (productString.includes(lowercaseQuery)) {
      matchingProducts.push(product);
    }
  });

  if (matchingProducts.length) {
    globalFunctions.clearHTML(mainContent);
    productView.displayProducts(matchingProducts);
  } else {
    globalFunctions.clearHTML(mainContent);

    mainContent.insertAdjacentHTML(
      "beforeend",
      `
    <div>
      <p>Sorry :( i couldnt found ${query}</p>
    </div>
    `
    );
  }
}
