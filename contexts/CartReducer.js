const Storage = (cartItems) => {
  localStorage.setItem('cart', JSON.stringify(cartItems.length > 0 ? cartItems : []));
}

export const sumItems = cartItems => {
  Storage(cartItems);
  let itemCount = cartItems.reduce((total, product) => total + product.quantity, 0);
  let total = cartItems.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
  return { itemCount, total }
}

export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (!state.cartItems.find(item => item.slug === action.payload.slug)) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1
        })
      }
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems]
      }
    case "REMOVE_ITEM":
      return {
        ...state,
        ...sumItems(state.cartItems.filter(item => item.slug !== action.payload.slug)),
        cartItems: [...state.cartItems.filter(item => item.slug !== action.payload.slug)]
      }
    case "INCREASE":
      state.cartItems[state.cartItems.findIndex(item => item.slug === action.payload.slug)].quantity++
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems]
      }
    case "DECREASE":
      state.cartItems[state.cartItems.findIndex(item => item.id === action.payload.id)].quantity--
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems]
      }
    case "CHECKOUT":
      return {
        cartItems: [],
        checkout: true,
        ...sumItems([]),
      }
    case "CLEAR":
      return {
        cartItems: [],
        ...sumItems([]),
      }
    case "DELIVERY":
      state.delivery = action.payload
      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems]
      }
    default:
      return state

  }
}