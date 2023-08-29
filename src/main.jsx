import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider theme="dark">
    <main className={`dark text-foreground bg-background font-sans antialiased`}>
      <Navbar />
        <RouterProvider router={router} />
      <Footer />
    </main>
    </NextUIProvider>
  </React.StrictMode>
);
