import { products, insertAllProductsHtmlTemplate } from "./data-loader.js";

const allProductsWrapper = document.querySelector('.products-wrapper')

insertAllProductsHtmlTemplate(products, allProductsWrapper)