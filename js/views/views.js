export default function initView() {}

import header from "./header.js";
import productsView from "./productsViews/productsView.js";
import sideBarView from "./productsViews/productsSideBar.js";
import selectProduct from "./productsViews/selectionView.js";

selectProduct();
productsView();
sideBarView();
header();
