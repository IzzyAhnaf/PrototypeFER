import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Record from './Pages/Record.jsx'
import Capture from './Pages/Capture.jsx'

const Router = createBrowserRouter([
  {
    path: '/FaceCapture/',
    element: <App />,
    children: [
      {
        path: '/FaceCapture/Record',
        element: <Record />,
      },
      {
        path: '/FaceCapture/Capture',
        element: <Capture />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>,
)
