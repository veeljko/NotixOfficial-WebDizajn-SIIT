import  { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import mainrouter from "./router/mainrouter.jsx";



createRoot(document.getElementById('root')).render(
  //<StrictMode>
    <RouterProvider router={mainrouter}/>
  //</StrictMode>,
)
