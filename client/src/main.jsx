import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { VideoContextProvider } from "./components/ContextVideo";

import Home from "./pages/Home/Home";
import Filter from "./pages/Filter/Filter";
import Final from "./pages/Final/Final";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/filter/:type",
        element: <Filter />,
      },
      {
        path: "/final/:type/:id",
        element: <Final />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <VideoContextProvider>
      <RouterProvider router={router} />
    </VideoContextProvider>
  </React.StrictMode>
);
