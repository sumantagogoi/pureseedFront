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

            case 'CLEAR_CART':
                return {
                    ...state,
                    cartItems:[]
                }

            case 'INCREMENT':
                const incrementItem = action.payload
                const incrementExistItem = state.cartItems.find((x)=> x._id === incrementItem._id)
                if (incrementExistItem){
                    return {
                        ...state,
                        cartItems: state.cartItems.map((item)=>{
                            if(item._id === incrementExistItem._id){
                                return {...item, qty:item.qty+1}
                            }
                            return item;
                        })
    
                    }
                }

                case 'DECREMENT':
                    const decremnetItem = action.payload
                    const decrementExistItem = state.cartItems.find((x)=> x._id === decremnetItem._id)
                    if (decremnetItem){
                        return {
                            ...state,
                            cartItems: state.cartItems.map((item)=>{
                                if(item._id === decrementExistItem._id){
                                    if(item.qty > 1){
                                        return {...item, qty:item.qty - 1}
                                    }
                                    // return {...item, qty:item.qty - 1}
                                }
                                return item;
                            })
        
                        }
                    }
                case 'SHIPPING_DETAILS':

                    return {
                        ...state,
                        shippingDetails: action.payload,
                        loading:false
                    }
                case 'GET_ALL_ORDERS_BY_USER':
                    return {
                        ...state,
                        allOrders : action.payload,
                        loading:false
                    }
 
        default:
            return state
    }
}

export default ProductReducer;