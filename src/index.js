import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import  {ProductContextProvider}  from './components/context/product/productcontext';
import { AuthenticationProvider } from './components/context/authentication_context/AuthenticationContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProductContextProvider>
      <AuthenticationProvider>
    <App />
    </AuthenticationProvider>
    </ProductContextProvider>
  </React.StrictMode>
);


