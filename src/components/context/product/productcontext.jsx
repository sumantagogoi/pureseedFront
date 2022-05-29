import { createContext, useReducer } from "react";
import ProductReducer from "../../reducers/product/ProductReducer";
import axios from 'axios'
import {toast} from 'react-toastify'

const ENDPOINT = process.env.REACT_APP_BASE_URL



const ProductContext = createContext();

export const  ProductContextProvider = ({children}) =>{


    const initialState = {
        products:[],
        categories:[],
        cartItems:[],
        loading:true,
    }

    const [state, dispatch] = useReducer(ProductReducer, initialState)


    // get all the products from the backend
    const getProducts = async ()=>{
        try {
            const {data} = await axios.get(`${ENDPOINT}/api/products/`)
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
            const {data} = await axios.get(`${ENDPOINT}/api/categories/`)
            dispatch({
                type:'GET_ALL_CATEGORIES',
                payload:data
            })
        } catch (error) {
            console.log(error)
        }
    }

    const addtoCart = async (product)=>{
        dispatch({
            type:'ADD_TO_CART',
            payload: {
                _id : product._id,
                name:product.title,
                image:product.image,
                price:product.price,
                qty:1,
            }
        })
        toast.success('Added To Cart')
    }


    const removeFromCart = async (id)=>{
        dispatch({
            type:'REMOVE_FROM_CART',
            payload:id
        })
    }


    return <ProductContext.Provider value={{
        products:state.products,
        categories:state.categories,
        cartItems:state.cartItems,
        loading:state.loading,
        

        // functions
        dispatch:dispatch,
        getProducts:getProducts,
        getCategories:getCategories,
        addtoCart:addtoCart,
        removeFromCart:removeFromCart,


    }}>
        {children}

    </ProductContext.Provider>

}

export default ProductContext;