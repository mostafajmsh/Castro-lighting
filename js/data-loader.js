import { supabase } from "./database.js";

// let products = [
//     {
//         id: 1,
//         name: "لوستر مدل مرغ مینا",
//         categoryName: "لوستر مدرن",
//         category: "modern",
//         price: 1230000,
//         score: 4.5,
//         cover: "./images/instagram_090223423218-min-convert.io_-860x1075.webp"
//     },
//     {
//         id: 2,
//         name: "لوستر مدل کاترینا",
//         categoryName: "لوستر مدرن",
//         category: "modern",
//         price: 4800000,
//         score: 4,
//         cover: "./images/IMG-20230901-WA0140-min-860x1182.webp"
//     },
//     {
//         id: 3,
//         name: "لوستر مدل گل برجسته",
//         categoryName: "لوستر مدرن",
//         category: "modern",
//         price: 2700000,
//         score: 4.3,
//         cover: "./images/IMG-20230901-WA0099-min-e1693671127961.webp"
//     },
//     {
//         id: 4,
//         name: "لوستر آویز بلند مشکی",
//         categoryName: "لوستر مدرن",
//         category: "modern",
//         price: 850000,
//         score: 4.5,
//         cover: "./images/CE1041-e1703514682256-860x834.webp"
//     },
//     {
//         id: 5,
//         name: "لوستر مدل منحنی کد ۱۳۱",
//         categoryName: "لوستر مدرن",
//         category: "modern",
//         price: 2977000,
//         score: 4.2,
//         cover: "./images/M1011-1.webp"
//     },
//     {
//         id: 6,
//         name: "لوستر مدل ام کی لایتینگ",
//         categoryName: "لوستر مدرن",
//         category: "modern",
//         price: 2133000,
//         score: 4.6,
//         cover: "./images/M1015.webp"
//     },
//     {
//         id: 7,
//         name: "لوستر مدل شش ضلعی",
//         categoryName: "لوستر مدرن",
//         category: "modern",
//         price: 2255000,
//         score: 4.2,
//         cover: "./images/M1020.webp"
//     },
//     {
//         id: 8,
//         name: "لوستر مدل پروانه",
//         categoryName: "لوستر مدرن",
//         category: "modern",
//         price: 2080000,
//         score: 4.1,
//         cover: "./images/IMG-20230901-WA0099-min-e1693671127961.webp"
//     },
//     {
//         id: 9,
//         name: "لوستر مدل شب طلایی",
//         categoryName: "لوستر مدرن",
//         category: "modern",
//         price: 2260000,
//         score: 4.3,
//         cover: "./images/CE9257.webp"
//     },
//     {
//         id: 10,
//         name: "لوستر مدل ام کی لایتینگ کد X78",
//         categoryName: "لوستر مدرن",
//         category: "modern",
//         price: 1450000,
//         score: 4.1,
//         cover: "./images/1d7b832a8d79c7cfda23df863788c799e5d8e91f_1662666153.webp"
//     },
//     {
//         id: 11,
//         name: "لوستر ام کی ای لایتینگ مدل مدرن کد CRS60",
//         categoryName: "لوستر مدرن",
//         category: "modern",
//         price: 4500000,
//         score: 4.3,
//         cover: "./images/42cd06c215f418bc6b981e72908f3b9cf6da2f2f_1660302391.webp"
//     },
//     {
//         id: 12,
//         name: "لوستر مدل 5555",
//         categoryName: "لوستر کریستالی",
//         category: "crystal",
//         price: 2100000,
//         score: 3.8,
//         cover: "./images/2cae80e2505a6546d14246b4e507b721c10416f1_1636404076.webp"
//     },
//     {
//         id: 13,
//         name: "لوستر مدل E316",
//         categoryName: "لوستر کریستالی",
//         category: "crystal",
//         price: 365000,
//         score: 4.1,
//         cover: "./images/6972cf58777c1ed8bccb2db492a1be4da46085b2_1628109931.webp"
//     },
//     {
//         id: 14,
//         name: "لوستر مدل آبشار",
//         categoryName: "لوستر کریستالی",
//         category: "crystal",
//         price: 2500000,
//         score: 3.7,
//         cover: "./images/1ead8e22a2cefa54959934b7b4a9d52854ffd5fb_1628948497.webp"
//     },
//     {
//         id: 15,
//         name: "لوستر مدل آبشار 52",
//         categoryName: "لوستر کریستالی",
//         category: "crystal",
//         price: 370000,
//         score: 4,
//         cover: "./images/517fef1f7bdb06b303a0d4894867d9c5a838b9be_1618809175.webp"
//     },
//     {
//         id: 16,
//         name: "لوستر مدل MS30",
//         categoryName: "لوستر کریستالی",
//         category: "crystal",
//         price: 826000,
//         score: 4,
//         cover: "./images/7523b9a75ec316a8e4c716836e02fe5e4eadde5e_1628693020.webp"
//     },
//     {
//         id: 17,
//         name: "لوستر مدل DS40",
//         categoryName: "لوستر کریستالی",
//         category: "crystal",
//         price: 987000,
//         score: 4.1,
//         cover: "./images/Montage-88-2-1.jpg"
//     },
//     {
//         id: 18,
//         name: "لوستر کد ۱۳۱۱",
//         categoryName: "لوستر روستیک",
//         category: "rostik",
//         price: 2100000,
//         score: 3.8,
//         cover: "./images/8f6b7a96f37602316da88ac1922ad388.jpg"
//     },
//     {
//         id: 19,
//         name: "لوستر کد ۱۳۱۲",
//         categoryName: "لوستر روستیک",
//         category: "rostik",
//         price: 365000,
//         score: 4.1,
//         cover: "./images/99d2a86172cee13c9812af5a1accf7cc.jpg"
//     },
//     {
//         id: 20,
//         name: "لوستر کد ۱۳۱۳",
//         categoryName: "لوستر روستیک",
//         category: "rostik",
//         price: 2500000,
//         score: 3.7,
//         cover: "./images/117d877af69aaad8e04aa416ec69de22b7570a90_1699167749-300x300.webp"
//     },
//     {
//         id: 21,
//         name: "لوستر کد ۱۳۱۴",
//         categoryName: "لوستر روستیک",
//         category: "rostik",
//         price: 370000,
//         score: 4,
//         cover: "./images/203fce17008e9df65338f1cafaae4da0.jpg"
//     },
//     {
//         id: 22,
//         name: "لوستر کد ۱۳۱۵",
//         categoryName: "لوستر روستیک",
//         category: "rostik",
//         price: 826000,
//         score: 4,
//         cover: "./images/297bc20d4d14019553a957b5d468e7245a7fa5ed_1699165753-300x300.webp"
//     },
//     {
//         id: 23,
//         name: "لوستر کد ۱۳۱۶",
//         categoryName: "لوستر روستیک",
//         category: "rostik",
//         price: 987000,
//         score: 4.1,
//         cover: "./images/210438cfc59c1719a9deba5dc66d5c69.jpg"
//     },
//     {
//         id: 24,
//         name: "لوستر کد ۱۳۱۷",
//         categoryName: "لوستر روستیک",
//         category: "rostik",
//         price: 365000,
//         score: 4.1,
//         cover: "./images/40986512f9144515d5360eda27937dfb.jpg"
//     },
//     {
//         id: 25,
//         name: "لوستر کد ۱۳۱۸",
//         categoryName: "لوستر روستیک",
//         category: "rostik",
//         price: 2500000,
//         score: 3.7,
//         cover: "./images/f2d330db2c1d302715223f7cd15cd5fa.jpg"
//     },
//     {
//         id: 26,
//         name: "لوستر کد ۱۳۱۹",
//         categoryName: "لوستر روستیک",
//         category: "rostik",
//         price: 370000,
//         score: 4,
//         cover: "./images/3e05df80eed685c5a5dc8c00a31b5ab8.jpg"
//     },
//     {
//         id: 27,
//         name: "لوستر کد ۱۳۲۰",
//         categoryName: "لوستر روستیک",
//         category: "rostik",
//         price: 826000,
//         score: 4,
//         cover: "./images/dad4cc0d4252a23808b319a83d0fa06891c02286_1699166996-300x300.webp"
//     },
//     {
//         id: 28,
//         name: "لوستر کد ۱۲۲۵",
//         categoryName: "لوستر مولکولی",
//         category: "molecular",
//         price: 2100000,
//         score: 3.8,
//         cover: "./images/molecular-chandelier-for-interior-decoration-2.jpg"
//     },
//     {
//         id: 29,
//         name: "لوستر کد ۱۲۲۶",
//         categoryName: "لوستر مولکولی",
//         category: "molecular",
//         price: 365000,
//         score: 4.1,
//         cover: "./images/molecular-chandelier-for-interior-decoration-13.jpg"
//     },
//     {
//         id: 30,
//         name: "لوستر کد ۱۲۲۷",
//         categoryName: "لوستر مولکولی",
//         category: "molecular",
//         price: 2500000,
//         score: 3.7,
//         cover: "./images/molecular-chandelier-for-interior-decoration-15.jpg"
//     },
//     {
//         id: 31,
//         name: "لوستر کد ۱۲۲۸",
//         categoryName: "لوستر مولکولی",
//         category: "molecular",
//         price: 370000,
//         score: 4,
//         cover: "./images/b9e3ac979fc7d460e78beaeeb0d39ae155d11600_1697229090.webp"
//     },
//     {
//         id: 32,
//         name: "لوستر کد ۱۲۲۹",
//         categoryName: "لوستر مولکولی",
//         category: "molecular",
//         price: 826000,
//         score: 4,
//         cover: "./images/4ae25abe5951ad77f96bed6137b17c267a86653a_1679042904.webp"
//     },
//     {
//         id: 33,
//         name: "لوستر کد ۱۲۳۰",
//         categoryName: "لوستر مولکولی",
//         category: "molecular",
//         price: 987000,
//         score: 4.1,
//         cover: "./images/mol.webp"
//     },
//     {
//         id: 34,
//         name: "لوستر کد ۱۲۳۱",
//         categoryName: "لوستر مولکولی",
//         category: "molecular",
//         price: 365000,
//         score: 4.1,
//         cover: "./images/ac1379ea9974fda8a309983c12c7e79402aa1837_1667653641.webp"
//     },
//     {
//         id: 35,
//         name: "لوستر کد ۱۲۳۲",
//         categoryName: "لوستر مولکولی",
//         category: "molecular",
//         price: 2500000,
//         score: 3.7,
//         cover: "./images/8da8686fda73b6b50c1b34268236c683fbc7d0da_1669397256.webp"
//     },
//     {
//         id: 36,
//         name: "چراغ رومیزی مدل RockStar",
//         categoryName: "چراغ رومیزی",
//         category: "table",
//         price: 650000,
//         score: 4.4,
//         cover: "./images/f7f4fdf5df418217a66c8fa85ce4f58f878de82c_1675184062.jpg"
//     },
//     {
//         id: 37,
//         name: "چراغ رومیزی مدل قدیمی",
//         categoryName: "چراغ رومیزی",
//         category: "table",
//         price: 470000,
//         score: 3.9,
//         cover: "./images/703efe216435950d435721408709c28946c6e57d_1687543428.webp"
//     },
//     {
//         id: 38,
//         name: "چراغ رومیزی مدل کریستالی مدل استوانه",
//         categoryName: "چراغ رومیزی",
//         category: "table",
//         price: 320000,
//         score: 3.7,
//         cover: "./images/19a13bd89920e48333ba274f606b08068ed7b867_1683997313.jpg"
//     },
//     {
//         id: 39,
//         name: "چراغ رومیزی مدل ربات",
//         categoryName: "چراغ رومیزی",
//         category: "table",
//         price: 450000,
//         score: 3.9,
//         cover: "./images/972480def063b51315740432a41b371dbb70acee_1669903252.jpg"
//     },
//     {
//         id: 40,
//         name: "چراغ رومیزی مدل شعله طلایی",
//         categoryName: "چراغ رومیزی",
//         category: "table",
//         price: 760000,
//         score: 4.2,
//         cover: "./images/3159386.jpg"
//     },
//     {
//         id: 41,
//         name: "چراغ رومیزی مدل کهکشان",
//         categoryName: "چراغ رومیزی",
//         category: "table",
//         price: 420000,
//         score: 3.7,
//         cover: "./images/2749372.webp"
//     },
//     {
//         id: 42,
//         name: "چراغ رومیزی مدل شن زار",
//         categoryName: "چراغ رومیزی",
//         category: "table",
//         price: 230000,
//         score: 3.8,
//         cover: "./images/24e630c686c088fcb542f2d097bb3a2235ee3c75_1683460431.jpg"
//     },
//     {
//         id: 43,
//         name: "چراغ رومیزی چوبی مدل مدرن",
//         categoryName: "چراغ رومیزی",
//         category: "table",
//         price: 470000,
//         score: 4.0,
//         cover: "./images/1901950.jpg"
//     },
//     {
//         id: 44,
//         name: "چراغ رومیزی مدل گل مریخی",
//         categoryName: "چراغ رومیزی",
//         category: "table",
//         price: 560000,
//         score: 4.5,
//         cover: "./images/1fba1ca6de8e00d8308f6ccd73aea8ef26239d5f_1700043889.webp"
//     },
//     {
//         id: 45,
//         name: "چراغ دیواری مدل منشور",
//         categoryName: "چراغ دیواری",
//         category: "wall",
//         price: 1030000,
//         score: 4.1,
//         cover: "./images/20d45089cb264d82c2de4791b3a2176462b5995d_1641716556.webp"
//     },
//     {
//         id: 46,
//         name: "چراغ دیواری مدل کاکتوس",
//         categoryName: "چراغ دیواری",
//         category: "wall",
//         price: 110000,
//         score: 3.6,
//         cover: "./images/1445c14547a8ed77960797939bd8f5ef11f41245_1693992762.jpg"
//     },
//     {
//         id: 47,
//         name: "چراغ دیواری مدل BL53E",
//         categoryName: "چراغ دیواری",
//         category: "wall",
//         price: 237000,
//         score: 4.1,
//         cover: "./images/1b9732d286c1c3049202ebacc2442c946f1604f4_1621430271.webp"
//     },
//     {
//         id: 48,
//         name: "چراغ تزئینی مدل نئون لوگو یوتیوب",
//         categoryName: "چراغ دیواری",
//         category: "wall",
//         price: 320000,
//         score: 4.5,
//         cover: "./images/fbf34ba248cd1363b7a2705d9d8252f967c8f97c_1687531791.webp"
//     },
//     {
//         id: 49,
//         name: "چراغ دیواری لوستر ماد مدل D1p101",
//         categoryName: "چراغ دیواری",
//         category: "wall",
//         price: 59000,
//         score: 3.8,
//         cover: "./images/111702867.webp"
//     },
//     {
//         id: 50,
//         name: "چراغ دیواری مدل شیدی کد 1078",
//         categoryName: "چراغ دیواری",
//         category: "wall",
//         price: 160000,
//         score: 4.2,
//         cover: "./images/8fcdc77b92b94b87d29e252f3fd54681df86df14_1642175158.webp"
//     },
//     {
//         id: 51,
//         name: "چراغ دیواری مدل اسکلت طرح مانستر",
//         categoryName: "چراغ دیواری",
//         category: "wall",
//         price: 684000,
//         score: 4.5,
//         cover: "./images/0038f7f14d7ff5370d0185ba69811396100f23a9_1638679842.webp"
//     },
//     {
//         id: 52,
//         name: "چراغ دیواری مدل Rosha Pars",
//         categoryName: "چراغ دیواری",
//         category: "wall",
//         price: 400000,
//         score: 3.6,
//         cover: "./images/676c7960ba2050ca22f6988856856500ee60525e_1631104664.webp"
//     },
//     {
//         id: 53,
//         name: "چراغ دیواری مدل شیپوری ",
//         categoryName: "چراغ دیواری",
//         category: "wall",
//         price: 199000,
//         score: 4.3,
//         cover: "./images/b4a37b75651942b88c3710015d0b5ce9b6f2bc38_1687785167.webp"
//     },
//     {
//         id: 54,
//         name: "چراغ دیواری مدل NA622 ",
//         categoryName: "چراغ دیواری",
//         category: "wall",
//         price: 133000,
//         score: 4.1,
//         cover: "./images/113047706.webp"
//     },
//     {
//         id: 55,
//         name: "چراغ دیواری مدل مدرن کد DL60",
//         categoryName: "چراغ دیواری",
//         category: "wall",
//         price: 950000,
//         score: 3.8,
//         cover: "./images/fd821c1a1fd97aab09cd972739face2c75db96fb_1660284382.webp"
//     }
// ]
let categories = [
    {
        title: "modern",
        name: "لوستر مدرن",
        cover: "./images/b3f52d55d84e4c58c49299579239c615cadb9771_1633519730.webp"
    },
    {
        title: "crystal",
        name: "لوستر کریستالی",
        cover: "./images/6972cf58777c1ed8bccb2db492a1be4da46085b2_1628109931.webp"
    },
    {
        title: "rostik",
        name: "لوستر روستیک",
        cover: "./images/210438cfc59c1719a9deba5dc66d5c69.jpg"
    },
    {
        title: "molecular",
        name: "لوستر ملکولی",
        cover: "./images/molecular-chandelier-for-interior-decoration-13.jpg"
    },
    {
        title: "table",
        name: "چراغ رومیزی",
        cover: "./images/f7f4fdf5df418217a66c8fa85ce4f58f878de82c_1675184062.jpg"
    },
    {
        title: "wall",
        name: "چراغ دیواری",
        cover: "./images/65ee000e6f764024d098aa2e08763e5b.jpg"
    }
]

const getAllProducts = async () => {
    let { data: products, error } = await supabase
        .from('products')
        .select('*')

    let allProducts = await products

    return allProducts
}

const insertMenuDropdownItemsHtmlTemplate = (categories, parentElement) => {
    parentElement.innerHTML = ''
    categories.forEach(cat => {
        parentElement.forEach(parent => {
            parent.insertAdjacentHTML('beforeend', `
            <li class="dropdown-item"><a href="#">${cat.name}</a></li>
        ` )
        })
    })
}

// const insertProductsGroupingHtmlTemplate = (products, parentElement) => {
//     parentElement.innerHTML = ''
//     products.forEach(item => {
//         parentElement.insertAdjacentHTML('beforeend', `
//         <div class="swiper-slide">
//             <div class="groupping__content-item">
//                 <img class="category-cover" src="${item.cover}" alt="" />
//                 <div class="content__item-text">
//                     <p>${item.name}</p>
//                     <div>
//                         <img src="images/Iconsax/Outline/arrowleft.png" alt="" />
//                     </div>
//                 </div>
//             </div>
//         </div>
//         ` )
//     })
// }

// const insertMobileProductsGroupingHtmlTemplate = (products, parentElement) => {
//     parentElement.innerHTML = ''
//     products.forEach(item => {
//         parentElement.insertAdjacentHTML('beforeend', `
//         <div class="groupping__content-item">
//             <img
//                 class="content__item-img"
//                 src="${item.cover}"
//                 alt=""
//             />
//             <div class="content__item-text">
//                 <p>${item.name}</p>
//                 <div>
//                     <img src="images//Iconsax/Outline/arrowleft.svg" alt="" />
//                 </div>
//             </div>
//         </div>
//         ` )
//     })
// }

const insertNewProductsHtmlTemplate = (products, parentElement) => {
    parentElement.innerHTML = ''
    products.slice(0, 9).map((product) => {
        parentElement.insertAdjacentHTML('beforeend', `
        <div class="swiper-slide">
            <div class="products__item">
                <div class="item__image-wrapper">
                    <img class="products__item-cover" src="${product.cover}" alt="" />
                </div>
                <p class="products__item-title">${product.name}</p>
                <div class="products__item-score">
                    <span>${product.score}</span>
                    <img src="images/Iconsax/Bold/star1.png" alt="" />
                    <p>_ ${product.categoryName}</p>
                </div>
                <div class="products__item-price">
                    <div>
                        <img
                        class="basket-icon"
                        src="images/Iconsax/Outline/bag2.png"
                        alt=""
                        />
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
            <p>_ ${product.categoryName}</p>
            <div class="products__item-score">
              <span>${product.score}</span>
              <img src="images/Iconsax/Bold/star1.png" alt="" />
            </div>
          </div>
          <div class="product__price-wrapper">
            <p class="product__price-label">قیمت:</p>
            <p class="product-price">${product.price.toLocaleString()} <span>تومان</span></p>
          </div>
          <a class="item__more-info" href="#">
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

// const shuffledArray = products.sort((a, b) => 0.5 - Math.random());

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

const productsCategorySelection = (array, categorySelect) => {
    let outputArray = [];

    switch (categorySelect) {
        case "modern": {
            outputArray = array.filter((product) => product.category === "modern");
            break;
        }
        case "crystal": {
            outputArray = array.filter((product) => product.category === "crystal");
            break;
        }
        case "rostik": {
            outputArray = array.filter((product) => product.category === "rostik");
            break;
        }
        case "molecular": {
            outputArray = array.filter((product) => product.category === "molecular");
            break;
        }
        case "table": {
            outputArray = array.filter((product) => product.category === "table");
            break;
        }
        case "wall": {
            outputArray = array.filter((product) => product.category === "wall");
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

export {
    getAllProducts,
    categories,
    insertMenuDropdownItemsHtmlTemplate,
    // insertMobileProductsGroupingHtmlTemplate,
    insertNewProductsHtmlTemplate,
    // insertProductsGroupingHtmlTemplate,
    insertAllProductsHtmlTemplate,
    // shuffledArray,
    productsSorting,
    productsCategorySelection,
}