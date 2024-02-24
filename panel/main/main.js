import {
    getUserRole,
    getUserInfo
} from '../js/utils.js';

window.addEventListener('load', () => {
    if (!getUserRole()) {
        location.replace('../../register.html')
    }
    getUserInfo().then(user => {
        const profileTitle = document.querySelector('.profile-title')
        const profileEmail = document.querySelector('.profile-email')
        profileTitle.innerHTML = user.user_metadata.full_name
        profileEmail.innerHTML = user.email
    })
})