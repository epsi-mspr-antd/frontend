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
import { AddPlant } from "./Components/Account/AccountAddPlant/AddPlant.component.tsx";
import { AddProperty } from "./Components/Account/AccountProperties/AddProperty/AddProperty.component.tsx";
import { EditProperty } from "./Components/Account/AccountProperties/EditProperty/EditProperty.component.tsx";
import { TipsList } from "./Components/Tip/TipsList/TipsList.component.tsx";
import { EditTip } from "./Components/Tip/EditTip/EditTip.component.tsx";
import { AddTip } from "./Components/Tip/AddTip/AddTip.component.tsx";
import { EditSettingsProfile } from "./Components/Account/AccountMain_Settings/SettingsComponents/Profil/EditSettingsProfile/EditSettingsProfile.component.tsx";

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
      {
        path: "settings/EditSettingsProfile",
        element: <EditSettingsProfile />,
      },
      { path: "properties", element: <Properties /> },
      { path: "plants", element: <Plants /> },
      { path: "properties/AddProperty", element: <AddProperty /> },
      { path: "properties/EditProperty", element: <EditProperty /> },
    ],
  },
  {
    path: "/plants",
    element: <ProtectedRoute />,
    children: [
      { path: "DetailsPlant/:id", element: <DetailsPlant /> },
      { path: "AddPlant", element: <AddPlant /> },
      { path: "EditPlant/:id", element: <EditPlant /> },
    ],
  },
  {
    path: "/Tip",
    element: <ProtectedRoute />,
    children: [
      { path: ":plantId/TipsList", element: <TipsList /> },
      { path: ":plantId/EditTip/:tipId", element: <EditTip /> },
      { path: ":plantId/AddTip", element: <AddTip /> },
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
