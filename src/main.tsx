import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Account } from "./Components/Account/Account.component.tsx";
import { Login } from "./Components/Login/login.component.tsx";
import { Properties } from "./Components/Account/AccountProperties/Properties.component.tsx";
import { Plants } from "./Components/Account/AccountPlant/Plant.component.tsx";
import { Error404 } from "./Components/404/404.component.tsx";
import { MapPage } from "./Components/Map/mapPage.component.tsx";
import { Register } from "./Components/Register/register.component.tsx";
import { AccountHome } from "./Components/Account/AccountHome/AccountHome.component.tsx";
import { AuthProvider } from "./Contexte/AuthContext.tsx";
import ProtectedRoute from "./Contexte/ProtectedRoute";
import { CGU } from "./Components/CGU/CGU.component.tsx";
import { DetailsPlant } from "./Components/Account/AccountDetailsPlant/DetailsPlant.component.tsx";
import { EditPlant } from "./Components/Account/AccountEditPlant/EditPlant.component.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/*",
    element: <Error404 />,
  },
  {
    path: "/CGU",
    element: <CGU />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/map",
    element: <MapPage />,
  },
  {
    path: "/account",
    element: <ProtectedRoute />,
    children: [
      { path: "", element: <AccountHome /> },
      { path: "settings", element: <Account /> },
      { path: "properties", element: <Properties /> },
      { path: "plants", element: <Plants /> },
      { path: "plants/DetailsPlant", element: <DetailsPlant /> },
      { path: "plants/DetailsPlant/EditPlant", element: <EditPlant /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
