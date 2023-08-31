import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/Home";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Address from "./pages/Address";
import Transaction from "./pages/Transaction";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,

  },
  {
    path: "/address/:address",
    element: <Address />
},
{
  path: "/transaction/:transaction",
  element: <Transaction />
}
])

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
