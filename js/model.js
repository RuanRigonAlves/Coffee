"use strict";

export default function initModel() {}

// export const myCoffeeData = {};
export const myCoffee = {};

// export async function fetchCoffeeData() {
//   try {
//     const response = await fetch("./json/coffee.json");
//     const jsonData = await response.json();
//     myCoffeeData["Coffee"] = jsonData;

//     console.log(myCoffeeData);
//     getCategories(jsonData.products);
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }
// // fetchCoffeeData();

// const getCategories = function (arrayProducts) {
//   myCoffeeData.Coffee.productsCategories = {};

//   for (const product of arrayProducts) {
//     const category = product.category;
//     if (!(category in myCoffeeData.Coffee.productsCategories)) {
//       myCoffeeData.Coffee.productsCategories[category] = [];
//     }
//     myCoffeeData.Coffee.productsCategories[category].push(product);
//   }
// };

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

export async function backend() {
  try {
    const response = await fetch("php/products/getProducts.php");
    console.log(response);
    const jsonData = await response.json();

    return (myCoffee["Coffee"] = jsonData), jso;
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}
backend();

// console.log(myCoffee);
