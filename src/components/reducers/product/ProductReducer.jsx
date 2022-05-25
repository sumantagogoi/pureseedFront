const ProductReducer = (state, action) =>{
    switch(action.type){
        case 'GET_ALL_PRODUCTS':
            return {
                ...state, 
                products : action.payload,
                loading : false
            }
        case 'GET_ALL_CATEGORIES':
            return {
                ...state,
                categories : action.payload,
                loading : false
            }

        case 'ADD_TO_CART':
            const item = action.payload
            const existItem = state.cartItems.find((x)=>x._id === item._id)
                return {
                    ...state,
                    cartItems:[...state.cartItems, item]
                }


            
        default:
            return state
    }
}

export default ProductReducer;