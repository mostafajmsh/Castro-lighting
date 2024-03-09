import { supabase } from "./database.js";

const getAllProducts = async () => {
    let { data: products, error } = await supabase
        .from('products')
        .select('*')

    let allProducts = await products

    return allProducts
}

const getAllCategories = async () => {

    let { data: categories, error } = await supabase
        .from('categories')
        .select('*')
    let allCategories = categories

    return allCategories
}

const insertMenuDropdownItemsHtmlTemplate = (parentElement) => {
    parentElement.innerHTML = ''

    getAllCategories().then(categories => {
        categories.forEach(cat => {
            parentElement.forEach(parent => {
                parent.insertAdjacentHTML('beforeend', `
                <li class="dropdown-item"><a href="./category.html?cat=${cat.name}&page=1">${cat.title}</a></li>
            ` )
            })
        })
    })

}

const getProductsByCategory = async (categoryID) => {

    let { data: products, error } = await supabase
        .from('products')
        .select("*")
        .eq('categoryID', categoryID)

    let categoryProducts = products
    console.log(categoryProducts);
    return categoryProducts
}

const insertProductsGroupingHtmlTemplate = (products, parentElement) => {
    parentElement.innerHTML = ''
    products.forEach(item => {
        parentElement.insertAdjacentHTML('beforeend', `
        <div class="swiper-slide">
            <div class="groupping__content-item">
                <a class="groupping__content-link" href="./category.html?cat=${item.name}&page=1">
                    <img class="category-cover" src="./images/${item.cover}" alt="" />
                    <div class="content__item-text">
                        <p>${item.title}</p>
                        <div>
                            <img src="images/Iconsax/Outline/arrowleft.png" alt="" />
                        </div>
                    </div>
                </a>
            </div>
        </div>
        ` )
    })
}

const insertMobileProductsGroupingHtmlTemplate = (products, parentElement) => {
    parentElement.innerHTML = ''
    products.forEach(item => {
        parentElement.insertAdjacentHTML('beforeend', `
        <div class="groupping__content-item">
            <a class="groupping__content-link" href="./category.html?cat=${item.name}&page=1">
                <img
                    class="content__item-img"
                    src="./images/${item.cover}"
                    alt=""
                />
                <div class="content__item-text">
                    <p>${item.title}</p>
                    <div>
                        <img src="images//Iconsax/Outline/arrowleft.svg" alt="" />
                    </div>
                </div>
            </a>
        </div>
        ` )
    })
}

const insertNewProductsHtmlTemplate = (products, parentElement) => {
    parentElement.innerHTML = ''
    products.slice(0, 9).map((product) => {
        parentElement.insertAdjacentHTML('beforeend', `
        <div class="swiper-slide">
            <div class="products__item">
                <div class="item__image-wrapper">
                    <img class="products__item-cover" src="./images/${product.cover}" alt="" />
                </div>
                <p class="products__item-title">${product.name}</p>
                <div class="products__item-score">
                    <span>${product.score}</span>
                    <img src="images/Iconsax/Bold/star1.png" alt="" />
                    <p>_ ${product.categoryTitle}</p>
                </div>
                <div class="products__item-price">
                    <div>
                        <a href="./product.html?name=${product.href}">
                            <img
                            class="basket-icon"
                            src="images/Iconsax/Outline/bag2.png"
                            alt=""
                            />
                        </a>
                    </div>
                    <p lang="fa-IR">${product.price.toLocaleString()} <span>تومان</span></p>
                </div>
            </div>
        </div>
        ` )
    })
}

const insertAllProductsHtmlTemplate = (products, parentElement) => {
    parentElement.innerHTML = ''
    products.forEach((product) => {
        parentElement.insertAdjacentHTML('beforeend', `
        <div class="products-item">
        <div class="products-item__image-box">
          <img
            class="product-cover"
            src="./images/${product.cover}"
            alt=""
          />
        </div>
        <div class="products-item__content">
          <p class="product-title">${product.name}</p>
          <div class="products__item-category">
            <p>_ ${product.categoryTitle}</p>
            <div class="products__item-score">
              <span>${product.score}</span>
              <img src="images/Iconsax/Bold/star1.png" alt="" />
            </div>
          </div>
          <div class="product__price-wrapper">
            <p class="product__price-label">قیمت:</p>
            <p class="product-price">${product.price.toLocaleString()} <span>تومان</span></p>
          </div>
          <a class="item__more-info" href="./product.html?name=${product.href}">
            <img
              class="basket-icon"
              src="images/Iconsax/Outline/bag2.png"
              alt=""
            />
            <p>مشاهده و خرید</p>
            <i class="fas fa-arrow-left"></i>
          </a>
        </div>
      </div>
        ` )
    })
}

const productsSorting = (array, filterMethod) => {
    let outputArray = [];

    switch (filterMethod) {
        case "inexpensive": {
            outputArray = array.sort((a, b) => a.price - b.price);
            break;
        }
        case "expensive": {
            outputArray = array.sort((a, b) => b.price - a.price);
            break;
        }
        case "score": {
            outputArray = array.sort((a, b) => b.score - a.score);
            break;
        }
        case "default": {
            outputArray = array;
            break;
        }
        default: {
            outputArray = array;
        }
    }

    return outputArray;
};

const productsCategorySelection = async (array, categorySelect) => {
    let outputArray = [];
    
    switch (categorySelect) {
        case "3a4b46b1-f06f-41b5-abb1-0651ffa7ea04": {
            outputArray = array.filter((product) => product.categoryID === "3a4b46b1-f06f-41b5-abb1-0651ffa7ea04");
            break;
        }
        case "271e54da-88d3-4eba-bd98-8d278fb424d2": {
            outputArray = array.filter((product) => product.categoryID === "271e54da-88d3-4eba-bd98-8d278fb424d2");
            break;
        }
        case "deb517a4-f81f-49ce-9fc8-f4dd8a57cdc3": {
            outputArray = array.filter((product) => product.categoryID === "deb517a4-f81f-49ce-9fc8-f4dd8a57cdc3");
            break;
        }
        case "3d33d447-97aa-409e-8117-8282897499fb": {
            outputArray = array.filter((product) => product.categoryID === "3d33d447-97aa-409e-8117-8282897499fb");
            break;
        }
        case "b44d076d-d503-4a03-97eb-f42dbbe527d7": {
            outputArray = array.filter((product) => product.categoryID === "b44d076d-d503-4a03-97eb-f42dbbe527d7");
            break;
        }
        case "0fb9612d-a497-48f5-aeb5-859b9785e477": {
            outputArray = array.filter((product) => product.categoryID === "0fb9612d-a497-48f5-aeb5-859b9785e477");
            break;
        }
        case "default": {
            outputArray = array;
            break;
        }
        default: {
            outputArray = array;
        }
    }

    return outputArray;
};

const getProductByUrl = async (productUrl) => {

    let { data: products, error } = await supabase
        .from('products')
        .select('*')
        .eq('href', productUrl)

    let product = products

    return product

}

const addProductInfosToProductPage = (
    product,
    productTitleElem,
    productImageElem,
    productNameElem,
    productScoreElem,
    productCategoryElem,
    productPriceElem,
    productCountElem,
    productDescriptionElem) => {
    productTitleElem.innerHTML = product[0].name
    productImageElem.innerHTML = `
        <img
            src="./images/${product[0].cover}"
            alt=""
        />
    `
    productNameElem.innerHTML = `
        <p>
            <span>نام محصول: </span>
            ${product[0].name}
        </p>
    `
    productScoreElem.innerHTML = `
        <p>
            <span>امتیاز محصول: </span>
            ${product[0].score}
        </p>
    `
    productCategoryElem.innerHTML = `
        <p>
            <span>دسته بندی محصول: </span>
            ${product[0].categoryTitle}
        </p>
    `
    productPriceElem.innerHTML = `
        <p>
            <span>قیمت محصول: </span>
            ${product[0].price.toLocaleString()}
            <span>تومان</span>
        </p>
    `
    productCountElem.innerHTML = `

        <span>موجود در انبار: </span>
        ${product[0].count}
        <span> عدد</span>
    `
    productDescriptionElem.innerHTML = product[0].description
}

export {
    getAllProducts,
    getAllCategories,
    getProductsByCategory,
    insertMenuDropdownItemsHtmlTemplate,
    insertMobileProductsGroupingHtmlTemplate,
    insertNewProductsHtmlTemplate,
    insertProductsGroupingHtmlTemplate,
    insertAllProductsHtmlTemplate,
    productsSorting,
    productsCategorySelection,
    getProductByUrl,
    addProductInfosToProductPage,
}