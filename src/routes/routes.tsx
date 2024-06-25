import React from "react";
import type { RouteObject } from "react-router";
import App from "../App";
import Home from "../pages/Home";
import TopTen from "../pages/TopTen";
import ErrorPage from "../pages/ErrorPage";

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
        path: "/top-ten",
        element: <TopTen />,
      },
    ],
  },
];

export default routes;
