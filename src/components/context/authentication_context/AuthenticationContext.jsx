import { createContext, useReducer } from "react";
import { toast } from "react-toastify";
import UserAuthenticationReducer from "../../reducers/authentication/UserAuthentication";


const AuthenticationContext = createContext();


export const AuthenticationProvider = ({children})=>{
   const localstorageUserLoginDetails = localStorage.getItem('userLoginDetails') ? JSON.parse(localStorage.getItem("userLoginDetails")): null;

    const initialState = {
        userLoginDetails:localstorageUserLoginDetails,
    }
    const [state, dispatch] = useReducer(UserAuthenticationReducer, initialState)



    const Logout = ()=>{
        localStorage.removeItem('userLoginDetails')
        dispatch({
            type:'USER_LOGOUT'
        })
        toast.success('Logout Successfully')
    }

    return <AuthenticationContext.Provider value={{
        userLoginDetails:state.userLoginDetails,
        
        // Function
        Logout:Logout,
        dispatch:dispatch,
    }}>
            {children}
    </AuthenticationContext.Provider>
}

export default AuthenticationContext;