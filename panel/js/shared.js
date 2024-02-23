import { supabase } from '../../js/database.js'
import {
    updateBtn,
    productNameEditorInput,
    productPriceEditorInput,
    productScoreEditorInput,
    productCountEditorInput,
    productNewDescriptionEditorInput,
    productNewCategoryEditorInput,
    productNewCoverSelection
} from '../products/products.js'

const $ = document

let errorMessage = $.querySelectorAll('.error-message')

const getAllProducts = async () => {
    let { data: products, error } = await supabase
        .from('products')
        .select('*')

    let allProducts = await products

    return allProducts
}


const productEditorHandler = async (inputName, obj, productID) => {
    updateBtn.innerHTML = 'اعمال تغییرات...';
    updateBtn.style.opacity = '0.8';

    if (inputName.value.trim()) {
        const { data, error } = await supabase
            .from('products')
            .update(obj)
            .eq('id', productID)
            .select()

        if (data) {
            updateBtn.innerHTML = 'ویرایش محصول';
            updateBtn.style.opacity = '1';
            statusModalChanger('SUCCESS', 'ویرایش محصول با موفقیت انجام شد', successColor, successIcon, 'ادامه')
            productNameEditorInput.value = ''
            productPriceEditorInput.value = ''
            productScoreEditorInput.value = ''
            productCountEditorInput.value = ''
            productNewDescriptionEditorInput.value = ''
            productNewCategoryEditorInput.value = ''
            productNewCoverSelection.value = ''
            errorMessage.forEach(error => {
                error.style.visibility = 'hidden'
            })
        } else if (error) {
            statusModalChanger('ERROR', 'خطایی هنگام ویرایش محصول رخ داد', dangerColor, dangerIcon, 'امتحان مجدد')
        }

    } else {
        errorMessage.forEach(error => {
            error.style.visibility = 'visible'
        })
        updateBtn.innerHTML = 'ویرایش محصول';
        updateBtn.style.opacity = '1';
    }
}

export {
    getAllProducts,
    productEditorHandler
}