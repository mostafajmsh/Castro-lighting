import { categories, insertMenuDropdownItemsHtmlTemplate } from "./data-loader.js";

const menuDropdownElem = document.querySelectorAll('.dropdown')

insertMenuDropdownItemsHtmlTemplate(categories, menuDropdownElem)
console.log(menuDropdownElem, categories);