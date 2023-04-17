import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import {router} from './Routes'
import CartContextProvider from './context/CartContex'
import {CookiesProvider} from 'react-cookie'
import AuthContextProvider from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <CartContextProvider>
      <RouterProvider router={router}>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </RouterProvider>
    </CartContextProvider>
  </AuthContextProvider>
);