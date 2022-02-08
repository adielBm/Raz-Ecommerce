import React, { createContext, useReducer } from 'react'

export const NoticesContext = createContext()

const NoticesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      return { notices: [action.payload, ...state.notices] }
    case 'REMOVE_ITEM':
      return { notices: [...state.notices.filter((i) => i !== action.payload)] }
    default:
      throw new Error()
  }
}

const NoticesContextProvider = ({ children }) => {
  const initialState = {
    notices: [],
  }

  const [state, dispatch] = useReducer(NoticesReducer, initialState)

  const addNotice = (payload) => {
    dispatch({ type: 'ADD_ITEM', payload })
  }

  const removeNotice = (payload) => {
    dispatch({ type: 'REMOVE_ITEM', payload })
  }

  const contextValues = {
    addNotice,
    removeNotice,
    ...state,
  }

  return (
    <NoticesContext.Provider value={contextValues}>
      {children}
    </NoticesContext.Provider>
  )
}

export default NoticesContextProvider
