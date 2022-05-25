import React from 'react'
import { ToastContainer } from 'react-toastify'

const AlertToast = () => {
  return (
    <ToastContainer
    theme='dark'
    position="top-right"
    autoClose={2000}
 
    />
  )
}

export default AlertToast