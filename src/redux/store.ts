import { configureStore } from '@reduxjs/toolkit'
import { countReducer } from './reducers/count'

export const rootReducer = {
  count: countReducer,
}

export const setupStore = () => {
  const store = configureStore({
    reducer: rootReducer,
  })

  return store
}

type AppStore = ReturnType<typeof setupStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
