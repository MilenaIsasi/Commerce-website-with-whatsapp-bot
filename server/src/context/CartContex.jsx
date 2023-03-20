import { createContext, useState } from "react";

export const CartContext = createContext();

const initialCart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []

export default function CartContextProvider({ children }) {
    const [products, setProducts] = useState( initialCart );
    return (
        <CartContext.Provider value={{
          products, setProducts
      }}>
          {children}
        </CartContext.Provider>
  )
}
