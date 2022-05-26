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
            if(existItem){
                return {
                    ...state, 
                    cartItems : state.cartItems.map((item)=>{
                        if(item._id === existItem._id){
                            return { ...item, qty:item.qty + 1};
                        }
                        return item;
                    }),
                };
            } else {
                return {
                    ...state,
                    cartItems : [...state.cartItems, item],
                };
            }

            case 'REMOVE_FROM_CART':
                return {
                    ...state, 
                    cartItems: state.cartItems.filter((item)=>item._id !== action.payload)
                }



            
        default:
            return state
    }
}

export default ProductReducer;