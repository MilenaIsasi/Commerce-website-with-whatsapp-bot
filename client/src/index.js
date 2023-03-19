import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider } from 'react-router-dom';
import {router} from './Routes'
import CartContextProvider from './context/CartContex'
import {CookiesProvider} from 'react-cookie'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <CartContextProvider>
    <RouterProvider router={router}>
        <CookiesProvider>
            <App/>
        </CookiesProvider>
    </RouterProvider>
    </CartContextProvider>
);