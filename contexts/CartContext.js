import React, { createContext, useReducer } from 'react';
import { CartReducer, sumItems } from './CartReducer';

export const CartContext = createContext()

const CartContextProvider = ({ children }) => {

  if (typeof window !== 'undefined') {
    const storage = window.localStorage.getItem('cart') === null ? [] : JSON.parse(localStorage.getItem('cart'))
    const deliveryStorage = localStorage.getItem('delivery') === null ? {} : JSON.parse(localStorage.getItem('delivery'))
  }

  const initialState = () => {

    if (typeof window !== 'undefined') {
      return {
        cartItems: storage,
        ...sumItems(storage),
        checkout: false,
        delivery: deliveryStorage
      };
    }
    return {
      cartItems: [],
      checkout: [],
      delivery: {}
    };
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
    dispatch({ type: 'CHECKOUT' })
  }

  const handleDelivery = payload => {
    dispatch({ type: 'DELIVERY', payload })
  }

  const contextValues = {
    removeProduct,
    addProduct,
    increase,
    decrease,
    clearCart,
    handleCheckout,
    handleDelivery,
    ...state
  }

  return (
    <CartContext.Provider value={contextValues} >
      {children}
    </CartContext.Provider>
  );
}

export default CartContextProvider;