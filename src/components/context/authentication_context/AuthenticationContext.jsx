import { createContext, useReducer } from "react";
import { toast } from "react-toastify";
import UserAuthenticationReducer from "../../reducers/authentication/UserAuthentication";
import axios from 'axios'


const AuthenticationContext = createContext();


export const AuthenticationProvider = ({children})=>{
   const localstorageUserLoginDetails = localStorage.getItem('userLoginDetails') ? JSON.parse(localStorage.getItem("userLoginDetails")): null;

    const initialState = {
        userLoginDetails:localstorageUserLoginDetails,
        profile:[]
    }
    const [state, dispatch] = useReducer(UserAuthenticationReducer, initialState)



    const Logout = ()=>{
        localStorage.removeItem('userLoginDetails')
        dispatch({
            type:'USER_LOGOUT'
        })
        toast.success('Logout Successfully')
    }

    const getProfile = async(token)=>{
        const {data} = await axios.get('https://api.manxho.co.in/api/users/profile/', {
            headers:{
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        dispatch({
            type:'GET_PROFILE',
            payload:data
        })
    }

    return <AuthenticationContext.Provider value={{
        userLoginDetails:state.userLoginDetails,
        
        // Function
        Logout:Logout,
        dispatch:dispatch,
        profile:state.profile,
        getProfile:getProfile,

    }}>
            {children}
    </AuthenticationContext.Provider>
}

export default AuthenticationContext;