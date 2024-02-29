const showUserInfosOnDashboard = (
    user,
    profileTitle,
    profileEmail,
    fullNameElem,
    userAgeElem,
    emailAddressElem,
    phoneNumberElem,
    userAddressElem) => {
    profileTitle.innerHTML = user.user_metadata.full_name
    profileEmail.innerHTML = user.email

    fullNameElem.innerHTML = `
        <span>نام و نام خانوادگی: </span>${user.user_metadata.full_name}
    `
    userAgeElem.innerHTML = `
        <span>سن شما: </span>${user.user_metadata.age ? user.user_metadata.age : '----'} <span>سال</span>
    `
    emailAddressElem.innerHTML = `
        <span>آدرس ایمیل: </span>${user.email}
    `
    phoneNumberElem.innerHTML = `
        <span>شماره تلفن: </span>${user.user_metadata.phone ? user.user_metadata.phone : '----'}</p>
    `
    userAddressElem.innerHTML = user.user_metadata.address ? user.user_metadata.address : 'هنوز هیچ آدرسی وارد نکرده اید!'
}

export {
    showUserInfosOnDashboard
}