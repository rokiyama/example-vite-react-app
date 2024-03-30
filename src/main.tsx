import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import {
  Outlet,
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
} from 'react-router-dom'
import './index.css'
import { App } from './pages/Home'
import { UserDetail } from './pages/UserDetail'
import { api } from './redux/reducers/api'
import { setupStore } from './redux/store'

const store = setupStore()

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Outlet />
        <ScrollRestoration />
      </>
    ),
    children: [
      {
        index: true,
        element: <App />,
        loader: async () => {
          const promise = store.dispatch(api.endpoints.getUsers.initiate({}))
          promise.unsubscribe()
          return { data: (await promise).data }
        },
      },
      {
        path: '/user/:id',
        element: <UserDetail />,
        loader: async ({ params }) => {
          const id = Number(params.id)
          if (!id) {
            return { data: null }
          }
          const promise = store.dispatch(api.endpoints.getUser.initiate({ id }))
          promise.unsubscribe()
          return { data: (await promise).data }
        },
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
