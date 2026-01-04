import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import './App.css'
import Root from './ProtectedRoot'
import { useState } from 'react'
import EnterPage from './pages/EnterPage'
import Login from './pages/Login'
import SignIn from './pages/Signin'
import Home from './pages/Home'
import Search from './pages/Search'
import Saved from './pages/Saved'
import Cart from './pages/Cart'
import Account from './pages/Account'
import PublicRoot from './PublicRoot'
import ProtectedRoot from './ProtectedRoot'
import ProtectedRoute from './ProtectedRoute'
import CardDetails from './pages/CardDetails'

function App() {
  const router = createBrowserRouter([
    {
      element: <PublicRoot />,
      children: [
        { path: "/login", element: <Login /> },
        { path: "/signin", element: <SignIn /> },
        { path: "/", element: <EnterPage /> },
      ],
    },
    {
      element: <ProtectedRoot />,
      children: [
        { path: "/home", element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "/search", element: <ProtectedRoute><Search /></ProtectedRoute> },
        { path: "/saved", element: <ProtectedRoute><Saved /></ProtectedRoute> },
        { path: "/cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "/account", element: <ProtectedRoute><Account /></ProtectedRoute> },
        { path: "/productDetails/:id", element: <ProtectedRoute><CardDetails /></ProtectedRoute>}
      ],
    },
    { path: "*", element: <Navigate to="/" /> },
  ]);

  return <RouterProvider router={router}></RouterProvider>
}

export default App
