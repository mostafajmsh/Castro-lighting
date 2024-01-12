import { products, insertAllProductsHtmlTemplate, paginateItems,addParamToUrl,getUrlParam } from "./data-loader.js";

const allProductsWrapper = document.querySelector('.products-wrapper')

window.addParamToUrl = addParamToUrl

window.addEventListener('load', () => {

    const productsPaginationWrapperElem = document.querySelector('#products-pagination')

    const currentPage = getUrlParam("page");

    let shownProducts = paginateItems([...products], 8, productsPaginationWrapperElem, currentPage)
    insertAllProductsHtmlTemplate([...shownProducts], allProductsWrapper)

    console.log(shownProducts);
})