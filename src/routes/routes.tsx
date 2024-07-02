import React from "react";
import type { RouteObject } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import SubjectsList from "../pages/SubjectsList";
import CyberCrimes from "../pages/CyberCrimes";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cyber",
        element: <CyberCrimes />,
      },
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/subjects",
        element: <SubjectsList />,
      },
    ],
  },
];

export default routes;
