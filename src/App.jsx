import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import SignIn from './pages/Signin'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Root'
import EnterPage from './pages/EnterPage'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {path:"/enter" , element:<EnterPage/>},
        { path: "/signin", element: <SignIn /> },
        { path: "/login", element: <Login /> },
      ],
    }
  ])

  return <RouterProvider router={router}></RouterProvider>
}

export default App
