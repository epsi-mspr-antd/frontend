import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider,} from 'react-router-dom';
import { Account } from './Components/Account/Account.component.tsx';
import { Login } from './Components/Login/login.component.tsx';
import { Properties } from './Components/Account/AccountProperties/Properties.component.tsx';
import { Plants } from './Components/Account/AccountPlant/Plant.component.tsx';
import { Error404 } from './Components/404/404.component.tsx';
import { MapPage } from './Components/Map/mapPage.component.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path:"/*",
    element: <Error404/>
  },
  {
    path:"/login",
    element: <Login/>
  },
  {
    path:"/register",
    element: <div>Insérer le composant correspondant au register dans main.tsx !</div>
  },
  {
    path:"/map",
    element: <MapPage/>
  },
  {
    path:"/account/settings",
    element: <Account/>
  },
  {
    path:"/account/properties",
    element: <Properties/>
  },
  {
    path:"/account/plants",
    element: <Plants/>
  }

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
