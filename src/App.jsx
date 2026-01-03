import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Root from './Root'
import { useState } from 'react'
import EnterPage from './pages/EnterPage'
import Login from './pages/Login'
import SignIn from './pages/Signin'
import Home from './pages/Home'
import Search from './pages/Search'
import Saved from './pages/Saved'
import Cart from './pages/Cart'
import Account from './pages/Account'

function App() {
  const [status , setStatus] = useState("entering")
  const router = createBrowserRouter([
    {
      path:"/",
      element:<Root status={status}/>,
      children:[
        {path:"/", element:<EnterPage/>},
        {path:"/login" , element:<Login setStatus={setStatus}/>},
        {path:"/signin" , element:<SignIn/>},
        {path:"/home" , element:<Home changeStatus={setStatus}/>},
        {path:"/search" , element:<Search/>},
        {path:"/saved" , element:<Saved/>},
        {path:"/cart" , element:<Cart/>},
        {path:"/account" , element:<Account/>}
      ]
    }
  ])
  return <RouterProvider router={router}></RouterProvider>
}

export default App
