import React from "react";
import type { RouteObject } from "react-router";
import App from "../App";
import {
  Home,
  CyberCrimes,
  MissingPersons,
  ViolentCrimes,
  ErrorPage,
  Login,
  Profile,
} from "../pages";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/cyber", element: <CyberCrimes /> },
      { path: "/missing-persons", element: <MissingPersons /> },
      { path: "/violent-crimes", element: <ViolentCrimes /> },
      { path: "/login", element: <Login /> },
      { path: "/profile", element: <Profile /> },
    ],
  },
];

export default routes;
