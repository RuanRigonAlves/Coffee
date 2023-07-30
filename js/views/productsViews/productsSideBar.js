import * as model from "../../model.js";
import * as productView from "./productsView.js";
import * as globalFunctions from "../../globalFunctions.js";
import * as selection from "./selectionView.js";

export default function productsSideBar() {}

const mainSection = document.querySelector(".main-section");

let currentSubCategoryWrapper = null; // Keep track of the current subcategory section.

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

mainSection.addEventListener("click", function (e) {
  const sideMenu = mainSection.querySelector(".side-menu") !== null;

  if (sideMenu) {
    const mainContent = document.querySelector(".main-content");

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
    const productsContainer = document.querySelector(".category-name");
    productsContainer.addEventListener("click", selection.selectedProduct);
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

function handleWindowClick(e) {
  const productModal = e.target.closest(".product-modal");

  if (productModal?.classList.contains("product-modal")) {
    console.log(productModal.classList.contains("product-modal"));
  } else {
    closeModal();
  }
}

function closeModal() {
  const modal = document.querySelector(".product-modal");
  modal.style.display = "none";
  modal.innerHTML = "";
  console.log("closemodal");
  isEventListenerAdded = false;

  // Remove the event listener
  window.removeEventListener("click", handleWindowClick);
}
