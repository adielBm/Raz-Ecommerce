import { setLocalStorage } from "../../utils"

// const Storage = (items) => {
//   localStorage.setItem('items', JSON.stringify(items.length > 0 ? items : []));
// }
// export const sumItems = items => {
//   Storage(items)
//   let itemCount = items.reduce((total, product) => total + product.quantity, 0)
//   let total = items.reduce((total, product) => total + product.price * product.quantity, 0)
//   return { itemCount, total }
// }


export const CartReducer = (previousState, { type, payload }) => {

  const state = { ...previousState }

  switch (type) {
    case "ADD_ITEM":
      if (!state.items || !state.items.find(item => item.slug === payload.product.slug)) {
        state.items.push({
          ...payload.product,
          quantity: payload.count
        })
      } else {
        state.items[state.items.findIndex(item => item.slug === payload.product.slug)].quantity += payload.count
      }
      break

    case "REMOVE_ITEM":
      state.items = state.items.filter(item => item.slug !== payload.slug)
      break

    case "INCREASE":
      state.items[state.items.findIndex(item => item.slug === payload.slug)].quantity++
      break

    case "DECREASE":
      state.items[state.items.findIndex(item => item.slug === payload.slug)].quantity--
      break

    case "CLEAR":
      state.items = []
      break

    case "DELIVERY":
      state.delivery = payload
      break

    default:
      throw new Error()
  }

  // calculate total & count 
  state.total = state.items.reduce((total, product) => total + product.price * product.quantity, 0)
  state.count = state.items.reduce((total, product) => total + product.quantity, 0)

  setLocalStorage('cart', state)

  return state

}