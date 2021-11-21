import React, { createContext, useEffect, useReducer } from 'react';
import { CartReducer, sumItems } from './CartReducer';

export const CartContext = createContext()

const CartContextProvider = ({ children }) => {
 
  if (typeof window !== 'undefined') {
    const storage = window.localStorage.getItem('cart') === null ? [] : JSON.parse(localStorage.getItem('cart'))
  }
  
  const initialState = () => {
    if (typeof window !== 'undefined') {
      return { cartItems: storage, ...sumItems(storage), checkout: false };
    }
    return { cartItems: [], checkout: [] }; 
  }

  const [state, dispatch] = useReducer(CartReducer, initialState())


  const increase = payload => {
    dispatch({ type: 'INCREASE', payload })
  }

  const decrease = payload => {
    dispatch({ type: 'DECREASE', payload })
  }

  const addProduct = payload => {
    dispatch({ type: 'ADD_ITEM', payload })
  }

  const removeProduct = payload => {
    dispatch({ type: 'REMOVE_ITEM', payload })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR' })
  }

  const handleCheckout = () => {
    console.log('CHECKOUT', state);
    dispatch({ type: 'CHECKOUT' })
  }

  const clearAlert = () => {
    dispatch({ type: 'CLEAR_ALERT' })
  }

  const contextValues = {
    removeProduct,
    addProduct,
    increase,
    decrease,
    clearCart,
    handleCheckout,
    clearAlert,
    ...state
  }

  return (
    <CartContext.Provider value={contextValues} >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;