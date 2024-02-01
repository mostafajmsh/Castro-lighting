import { supabase } from './database.js'

const $ = document
let saveBtnElem = $.querySelector('#save');
let successCard = $.querySelector('.success');
let errorCard = $.querySelector('.danger');
let statusCardBtn = $.querySelector('#successBtn')
let errorCardBtn = $.querySelector('#errorBtn')

statusCardBtn.addEventListener('click', () => {
    successCard.style.visibility = 'hidden'
})

errorCardBtn.addEventListener('click', () => {
    errorCard.style.visibility = 'hidden'
})

saveBtnElem.addEventListener('click', async e => {
    e.preventDefault()
    let name = $.querySelector('.name').value.trim();
    let price = $.querySelector('.price').value.trim();
    let score = $.querySelector('.score').value.trim();
    let description = $.querySelector('#product-description').value.trim();
    let cover = $.querySelector('.cover').value.trim();
    let category = $.querySelector('.category').value.trim();
    let categoryName = $.querySelector(`option.${category}`).innerHTML.trim();

    const { data, error } = await supabase
        .from('products')
        .insert([
            {
                name,
                price,
                cover,
                category,
                score,
                categoryName,
                description
            },
        ])
        .select()
    console.log(data, error)
    if (data) {
        successCard.style.visibility = 'visible'
    } else {
        errorCard.style.visibility = 'visible'
    }
})
