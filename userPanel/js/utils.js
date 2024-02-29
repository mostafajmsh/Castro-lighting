import { supabase } from '../../js/database.js'


const getUserInfo = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    return user
}

export {
    getUserInfo
}