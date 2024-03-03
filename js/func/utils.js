import { supabase } from "../database.js"
const $ = document

const successIcon = `
<svg
version="1.1"
id="checkmark"
xmlns="http://www.w3.org/2000/svg"
xmlns:xlink="http://www.w3.org/1999/xlink"
x="0px"
y="0px"
xml:space="preserve"
>
<path
  d="M131.583,92.152l-0.026-0.041c-0.713-1.118-2.197-1.447-3.316-0.734l-31.782,20.257l-4.74-12.65
c-0.483-1.29-1.882-1.958-3.124-1.493l-0.045,0.017c-1.242,0.465-1.857,1.888-1.374,3.178l5.763,15.382
c0.131,0.351,0.334,0.65,0.579,0.898c0.028,0.029,0.06,0.052,0.089,0.08c0.08,0.073,0.159,0.147,0.246,0.209
c0.071,0.051,0.147,0.091,0.222,0.133c0.058,0.033,0.115,0.069,0.175,0.097c0.081,0.037,0.165,0.063,0.249,0.091
c0.065,0.022,0.128,0.047,0.195,0.063c0.079,0.019,0.159,0.026,0.239,0.037c0.074,0.01,0.147,0.024,0.221,0.027
c0.097,0.004,0.194-0.006,0.292-0.014c0.055-0.005,0.109-0.003,0.163-0.012c0.323-0.048,0.641-0.16,0.933-0.346l34.305-21.865
C131.967,94.755,132.296,93.271,131.583,92.152z"
/>
<circle
  fill="none"
  stroke="#ffffff"
  stroke-width="5"
  stroke-miterlimit="10"
  cx="109.486"
  cy="104.353"
  r="32.53"
/>
</svg>
`
const dangerIcon = `
<svg
xmlns="http://www.w3.org/2000/svg"
fill="none"
viewBox="0 0 24 24"
stroke-width="1.5"
stroke="currentColor"
class="w-6 h-6"
>
<path
  stroke-linecap="round"
  stroke-linejoin="round"
  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
/>
</svg>
`
const successColor = '#8BC34A'
const dangerColor = '#c34a4a'

const statusModalChanger = (status, message, btnText, func) => {

  let statusModal = document.querySelector('.status-modal')
  let modalMessageText = document.querySelector('#message')
  let modalTopSection = document.querySelector('#upper-side')
  let statusCardBtn = document.querySelector('#statusBtn');


  statusModal.style.visibility = 'visible';
  statusModal.style.opacity = '1';
  modalTopSection.innerHTML = ''
  modalTopSection.insertAdjacentHTML('afterbegin', `
      ${status === 'SUCCESS' ? successIcon : dangerIcon}
      <h3 id="status">${status}</h3>
    `)
  modalMessageText.innerHTML = message
  modalTopSection.style.backgroundColor = status === 'SUCCESS' ? successColor : dangerColor
  statusCardBtn.innerHTML = btnText
  statusCardBtn.style.backgroundColor = status === 'SUCCESS' ? successColor : dangerColor
  statusCardBtn.addEventListener('click', () => {
    statusModal.style.visibility = 'hidden';
    statusModal.style.opacity = '0';
    func ? func() : null
  })

}

const productsFilteringHandler = (productsFilteringSelections, selectionTitleElem, sortFunc, products, template, allProductsWrapper) => {
  productsFilteringSelections.forEach((productFilteringSelection) => {
    productFilteringSelection.addEventListener("click", (event) => {
      productsFilteringSelections.forEach((selectionElem) =>
        selectionElem.classList.remove(
          "products-top-bar__selection-item--active"
        )
      );

      event.target.classList.add("products-top-bar__selection-item--active");

      selectionTitleElem.innerHTML = "";
      selectionTitleElem.insertAdjacentHTML(
        "beforeend",
        `
          ${event.target.innerHTML}
          <i class="fas fa-angle-down products-top-bar__selection-icon"></i>
      `
      );

      let userFilteringSelection = event.target.dataset.key;
      let shownFilteredProducts = sortFunc([...products], userFilteringSelection);
      template([...shownFilteredProducts], allProductsWrapper)

    });
  });
}

const productsCategoryHandler = (productsCategorySelections, categorySelectionTitleElem, selectionMethod, products, template, allProductsWrapper) => {
  productsCategorySelections.forEach((productsCategory) => {
    productsCategory.addEventListener("click", (event) => {
      productsCategorySelections.forEach((selectionElem) =>
        selectionElem.classList.remove(
          "products-category__selection-item--active"
        )
      );

      event.target.classList.add("products-category__selection-item--active");

      categorySelectionTitleElem.innerHTML = "";
      categorySelectionTitleElem.insertAdjacentHTML(
        "beforeend",
        `
          ${event.target.innerHTML}
          <i class="fas fa-angle-down products-category__selection-icon"></i>
      `
      );

      let userCategorySelection = event.target.dataset.key;
      let shownSelectedCategoryProducts = selectionMethod([...products], userCategorySelection);
      template([...shownSelectedCategoryProducts], allProductsWrapper)
    });
  });
}

const backToPrevPage = () => {
  history.back()
}

const getToken = () => {
  const userInfos = JSON.parse(localStorage.getItem('sb-lsryhmojytjylpzwrwwt-auth-token'));
  return userInfos ? userInfos.access_token : null;
}

const isLogin = () => {
  const userInfos = localStorage.getItem("sb-lsryhmojytjylpzwrwwt-auth-token");
  return userInfos ? true : false;
};

const getUrlParam = (key) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(key);
};

const addParamToUrl = (param, value) => {
  console.log(param, value)
  let url = new URL(location.href)
  let searchParams = url.searchParams

  searchParams.set(param, value)
  url.search = searchParams.toString()
  location.href = url.toString()
}

const paginateItems = (array, itemsPerPage, paginateParentElem, currentPage) => {
  paginateParentElem.innerHTML = ''
  let endIndex = itemsPerPage * currentPage
  let startIndex = endIndex - itemsPerPage
  let paginatedItems = array.slice(startIndex, endIndex)
  let paginatedCount = Math.ceil(array.length / itemsPerPage)

  for (let i = 1; i < paginatedCount + 1; i++) {
    paginateParentElem.insertAdjacentHTML('beforeend', `
      <li class="products__pagination-item">
        ${i === +currentPage ?
        `
            <a class="products__pagination-link products__pagination-link--active" onclick="addParamToUrl('page', ${i})">${i}</a>
          ` :
        `
            <a class="products__pagination-link" onclick="addParamToUrl('page', ${i})">${i}</a>
          `
      }
      </li>
    `)
  }

  return paginatedItems
}

const getUserInfo = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

window.addParamToUrl = addParamToUrl

export {
  isLogin,
  successColor,
  successIcon,
  dangerColor,
  dangerIcon,
  statusModalChanger,
  getUrlParam,
  addParamToUrl,
  paginateItems,
  productsFilteringHandler,
  productsCategoryHandler,
  backToPrevPage,
  getUserInfo,
}