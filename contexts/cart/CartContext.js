import React, { createContext, useReducer } from 'react'
import { getLocalStorage } from '../../utils'
import { CartReducer } from './CartReducer'

export const CartContext = createContext()

const CartContextProvider = ({ children }) => {
  const initialState = () => {
    const state = {
      items: [],
      delivery: {},
    }

    if (typeof window !== 'undefined') {
      for (const [key, value] of Object.entries(getLocalStorage('cart'))) {
        state[key] = value
      }
    }

    return state
  }

  const [state, dispatch] = useReducer(CartReducer, initialState())

  const contextValues = {
    ...state,
    removeProduct: (payload) => {
      dispatch({ type: 'REMOVE_ITEM', payload })
    },
    addProduct: (payload) => {
      dispatch({ type: 'ADD_ITEM', payload })
    },
    increase: (payload) => {
      dispatch({ type: 'INCREASE', payload })
    },
    decrease: (payload) => {
      dispatch({ type: 'DECREASE', payload })
    },
    clearCart: () => {
      dispatch({ type: 'CLEAR' })
    },
    setDelivery: (payload) => {
      dispatch({ type: 'DELIVERY', payload })
    },
  }

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
