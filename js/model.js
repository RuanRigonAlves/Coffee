"use strict";

export default function initModel() {}

export const myCoffee = {};

const getSubCategories = function (arrayProducts) {
  myCoffee.Coffee.productsSubCategories = {};

  for (const product of arrayProducts) {
    const subCategory = product.subcategory;
    if (!(subCategory in myCoffee.Coffee.productsSubCategories)) {
      myCoffee.Coffee.productsSubCategories[subCategory] = [];
    }
    myCoffee.Coffee.productsSubCategories[subCategory].push(product);
  }
};

export const getSubCategoryByID = function (id) {
  const allProducts = myCoffee.Coffee.products;

  const productsWithCategory = allProducts.filter(
    (product) => product.category === id
  );

  getSubCategories(productsWithCategory);
};

export async function fetchProductsBackend() {
  try {
    const response = await fetch("./php/products/getProducts.php");
    const jsonData = await response.json();

    return (myCoffee["Coffee"] = jsonData);
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}
fetchProductsBackend();
