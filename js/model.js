"use strict";

export default function initModel() {}

export const myCoffeeData = {};

export async function fetchCoffeeData() {
  try {
    const response = await fetch("./json/coffee.json");
    const jsonData = await response.json();
    myCoffeeData["Coffee"] = jsonData;

    getCategories(jsonData.products);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}
fetchCoffeeData();

const getCategories = function (arrayProducts) {
  myCoffeeData.Coffee.productsCategories = {};

  for (const product of arrayProducts) {
    const category = product.category;
    if (!(category in myCoffeeData.Coffee.productsCategories)) {
      myCoffeeData.Coffee.productsCategories[category] = [];
    }
    myCoffeeData.Coffee.productsCategories[category].push(product);
  }
};

const getSubCategories = function (arrayProducts) {
  myCoffeeData.Coffee.productsSubCategories = {};

  for (const product of arrayProducts) {
    const subCategory = product.subcategory;
    if (!(subCategory in myCoffeeData.Coffee.productsSubCategories)) {
      myCoffeeData.Coffee.productsSubCategories[subCategory] = [];
    }
    myCoffeeData.Coffee.productsSubCategories[subCategory].push(product);
  }
};

export const getSubCategoryByID = function (id) {
  const allProducts = myCoffeeData.Coffee.products;

  const productsWithCategory = allProducts.filter(
    (product) => product.category === id
  );

  getSubCategories(productsWithCategory);
};
