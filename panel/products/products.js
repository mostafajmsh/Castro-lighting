import { supabase } from '../../js/database.js'

const $ = document
let saveBtnElem = $.querySelector('.save-btn');
let successCard = $.querySelector('.success');
let errorCard = $.querySelector('.danger');
let statusCardBtn = $.querySelector('#successBtn')
let errorCardBtn = $.querySelector('#errorBtn')

statusCardBtn.addEventListener('click', () => {
    successCard.style.visibility = 'hidden'
    successCard.style.opacity = '0'
})

errorCardBtn.addEventListener('click', () => {
    errorCard.style.visibility = 'hidden'
    errorCard.style.opacity = '0'
})

saveBtnElem.addEventListener('click', async e => {
    e.preventDefault()
    saveBtnElem.innerHTML = 'در حال ثبت...'
    saveBtnElem.style.opacity = '0.8'
    let nameInputElem = $.querySelector('.name-input');
    let priceInputElem = $.querySelector('.price-input');
    let scoreInputElem = $.querySelector('.score-input');
    let descriptionInputElem = $.querySelector('#product-description');
    let coverInputElem = $.querySelector('.cover-selection');
    let category = $.querySelector('.category').value.trim();
    let categoryName = $.querySelector(`option.${category}`).innerHTML;

    const { data, error } = await supabase
        .from('products')
        .insert([
            {
                name: nameInputElem.value.trim(),
                price: priceInputElem.value.trim(),
                cover: coverInputElem.value.trim(),
                category,
                score: scoreInputElem.value.trim(),
                categoryName,
                description: descriptionInputElem.value.trim()
            },
        ])
        .select()
    console.log(data, error)
    if (data) {
        successCard.style.visibility = 'visible'
        successCard.style.opacity = '1'
        saveBtnElem.innerHTML = 'ثبت محصول'
        saveBtnElem.style.opacity = '1'
        nameInputElem.value = ''
        priceInputElem.value = ''
        scoreInputElem.value = ''
        descriptionInputElem.value = ''
        coverInputElem.value = ''
    } else {
        errorCard.style.visibility = 'visible'
        errorCard.style.opacity = '1'
    }
})
