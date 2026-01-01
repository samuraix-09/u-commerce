import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import SignIn from './pages/Signin'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Root'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "/signin", element: <SignIn /> },
        { path: "/login", element: <Login /> },
      ],
    }
  ])

  return <RouterProvider router={router}></RouterProvider>
}

export default App
