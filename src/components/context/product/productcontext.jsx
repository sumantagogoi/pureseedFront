import { createContext, useReducer } from "react";
import ProductReducer from "../../reducers/product/ProductReducer";
import axios from 'axios'



const ProductContext = createContext();

export const  ProductContextProvider = ({children}) =>{


    const initialState = {
        products:[],
        categories:[],
        loading:true,
    }

    const [state, dispatch] = useReducer(ProductReducer, initialState)


    // get all the products from the backend
    const getProducts = async ()=>{
        try {
            const {data} = await axios.get('/api/products')
            dispatch({
                type: 'GET_ALL_PRODUCTS',
                payload: data
              })
        } catch (error) {
           
        }
    }

    // Get all the categories from the backend
    const getCategories = async()=>{
        try {
            const {data} = await axios.get('/api/categories')
            dispatch({
                type:'GET_ALL_CATEGORIES',
                payload:data
            })
        } catch (error) {
            console.log(error)
        }
    }


    return <ProductContext.Provider value={{
        products:state.products,
        categories:state.categories,
        loading:state.loading,

        // functions
        getProducts:getProducts,
        getCategories:getCategories,

    }}>
        {children}

    </ProductContext.Provider>

}

export default ProductContext;