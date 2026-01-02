import { useState } from 'react'
import './App.css'
import Login from './pages/Login'
import SignIn from './pages/Signin'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './Root'
import EnterPage from './pages/EnterPage'
import Home from './pages/Home'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {path:"/enter" , element:<EnterPage/>},
        {path:"/" , element:<EnterPage/>},
        { path: "/signin", element: <SignIn /> },
        { path: "/login", element: <Login /> },
        {path:"/home" , element:<Home/>}
      ],
    }
  ])

  return <RouterProvider router={router}></RouterProvider>
}

export default App
