import {
    successColor,
    successIcon,
    dangerColor,
    dangerIcon,
    statusModalChanger,
    getUserRole
} from '../js/utils.js';

window.addEventListener('load', () => {
    console.log(getUserRole());
    if (!getUserRole()) {
        location.replace('../../register.html')
    }
})