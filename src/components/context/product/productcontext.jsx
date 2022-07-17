import { createContext, useReducer, useState } from "react";
import ProductReducer from "../../reducers/product/ProductReducer";
import axios from 'axios'
import {toast} from 'react-toastify'

const ENDPOINT = process.env.REACT_APP_BASE_URL



const ProductContext = createContext();

export const  ProductContextProvider = ({children}) =>{

    const local_shipping_details = localStorage.getItem('shippingDetails') ? JSON.parse(localStorage.getItem('shippingDetails')): null

    const [showCart, setShowCart] = useState(false);
    const [shippingValue, setShippingValue] = useState('Assam')
    const [coupon, setCoupon] = useState([])


    const initialState = {
        products:[],
        categories:[],
        cartItems:[],
        shippingDetails:local_shipping_details,
        allOrders:[],
        loading:true,
    }

    const [state, dispatch] = useReducer(ProductReducer, initialState)


    // get all the products from the backend
    const getProducts = async ()=>{
        try {
            const {data} = await axios.get('https://api.manxho.co.in/api/products/')
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
            const {data} = await axios.get('https://api.manxho.co.in/api/categories/')
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
                weight:product.qty,
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

    const addShippingDetails = (data)=>{
        dispatch({
            type:'SHIPPING_DETAILS',
            payload:data
        })
        localStorage.setItem('shippingDetails', JSON.stringify(data))
    }

    const getAllOrdersByUser = async (token)=>{
        const {data} = await axios.get('https://api.manxho.co.in/api/users/get_all_orders/', {
            headers:{
                'content-type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        dispatch({
            type:'GET_ALL_ORDERS_BY_USER',
            payload:data
        })
    }

    const updateOrder = async (orderId, transactionId, token)=>{
        const response = await axios.post('https://api.manxho.co.in/api/edit_order/', {'order_id':orderId, "transactionId":transactionId},
        {
            headers:{
                'content-type':'application/json',
                'Authorization':`Bearer ${token}`
            }
        }
        )
        console.log(response)
    }

    


    return <ProductContext.Provider value={{
        products:state.products,
        categories:state.categories,
        cartItems:state.cartItems,
        shippingDetails:state.shippingDetails,
        allOrders:state.allOrders,
        loading:state.loading,
        showCart:showCart,
        setShowCart:setShowCart,
        shippingValue:shippingValue,
        setShippingValue:setShippingValue,
        coupon:coupon,
        setCoupon:setCoupon,
        

        // functions
        dispatch:dispatch,
        getProducts:getProducts,
        getCategories:getCategories,
        getAllOrdersByUser:getAllOrdersByUser,
        addtoCart:addtoCart,
        removeFromCart:removeFromCart,
        addShippingDetails:addShippingDetails,
        updateOrder:updateOrder,


    }}>
        {children}

    </ProductContext.Provider>

}

export default ProductContext;