import { configureStore } from '@reduxjs/toolkit'
import { api } from './reducers/api'
import { countReducer } from './reducers/count'

export const rootReducer = {
  count: countReducer,
  [api.reducerPath]: api.reducer,
}

export const setupStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  })

  return store
}

type AppStore = ReturnType<typeof setupStore>
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
