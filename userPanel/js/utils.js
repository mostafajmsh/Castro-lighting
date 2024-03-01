import { supabase } from '../../js/database.js'


const getUserInfo = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
}

const reSignUser = async () => {
    let { error } = await supabase.auth.signOut()
    location.href = '../../register.html'
}

export {
    getUserInfo,
    reSignUser
}