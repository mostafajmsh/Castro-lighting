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

    fullNameElem ? fullNameElem.innerHTML = `
        <span>نام و نام خانوادگی: </span>${user.user_metadata.full_name}
    ` : null
    userAgeElem ? userAgeElem.innerHTML = `
        <span>سن شما: </span>${user.user_metadata.age ? user.user_metadata.age : '----'} <span>سال</span>
    ` : null
    emailAddressElem ? emailAddressElem.innerHTML = `
        <span>آدرس ایمیل: </span>${user.email}
    `: null
    phoneNumberElem ? phoneNumberElem.innerHTML = `
        <span>شماره تلفن: </span>${user.user_metadata.phone ? user.user_metadata.phone : '----'}</p>
    ` : null
    userAddressElem ? userAddressElem.innerHTML = user.user_metadata.address ? `${user.user_metadata.address} (کد پستی: ${user.user_metadata.post_code})` : 'هنوز هیچ آدرسی وارد نکرده اید!' : null
}

export {
    showUserInfosOnDashboard,
}