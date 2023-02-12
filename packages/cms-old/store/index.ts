import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import counterReducer from './counterSlice'

export function makeStore() {
  return configureStore({
    reducer: { counter: counterReducer },
  })
}

const store = makeStore()



export default store
