import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import { App } from './pages/Home'
import { api } from './redux/reducers/api'
import { setupStore } from './redux/store'

const store = setupStore()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: async () => {
      const promise = store.dispatch(api.endpoints.getUsers.initiate({}))
      promise.unsubscribe()
      return { data: (await promise).data }
    },
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
