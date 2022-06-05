import React from 'react'
import { ToastContainer } from 'react-toastify'

const AlertToast = () => {
  return (
    <ToastContainer
    theme='dark'
    position="bottom-left"
    autoClose={1000}
 
    />
  )
}

export default AlertToast