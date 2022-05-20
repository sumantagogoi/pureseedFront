import { createContext, useReducer } from "react";
import ProductReducer from "../../reducers/product/ProductReducer";
import axios from 'axios'



const ProductContext = createContext();

export const  ProductContextProvider = ({children}) =>{


    const initialState = {
        products:[],
        loading:false,
    }

    const [state, dispatch] = useReducer(ProductReducer, initialState)


    // get all the products from the backend
    const getProducts = async ()=>{
        try {
            const {data} = await axios.get('/api/products/')
            dispatch({
                type: 'GET_ALL_PRODUCTS',
                payload: data
              })
        } catch (error) {
            console.log(error)
        }
      
    }


    return <ProductContext.Provider value={{
        products:state.products,
        loading:state.loading,

        // functions
        getProducts:getProducts,

    }}>
        {children}

    </ProductContext.Provider>

}

export default ProductContext;