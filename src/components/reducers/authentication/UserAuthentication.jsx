const UserAuthenticationReducer = (state, action) =>{
    switch(action.type){
        case 'USER_LOGIN':
            return {
                ...state,
                userLoginDetails:action.payload,
                loading:false
            }

        case 'GET_PROFILE':
            return {
                ...state, 
                profile:action.payload,
                loading:false
            }
        case 'USER_LOGOUT':
            return {
                ...state,
                userLoginDetails:null,
                loading:false
            }
        default :
            return state
    }
}

export default UserAuthenticationReducer;