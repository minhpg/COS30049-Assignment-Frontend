import React from "react";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import "./index.css";

import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./pages/Home";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Address from "./pages/Address";
import Transaction from "./pages/Transaction";
import ScrollToTop from "./ScrollToTop";

import { useDarkMode } from 'usehooks-ts'

const Root = () => {
  const { isDarkMode } = useDarkMode()
  return (
    <>
      <ScrollToTop />
      <main
        className={`${isDarkMode ? 'dark' : 'light'} text-foreground bg-background font-sans antialiased`}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/address/:address" element={<Address />} />
          <Route path="/transaction/:transaction" element={<Transaction />} />
        </Routes>
        <Footer />
      </main>
    </>
  );
};

const router = createBrowserRouter([{ path: "*", Component: Root }]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NextUIProvider theme="dark">
      <RouterProvider router={router} />
    </NextUIProvider>
  </React.StrictMode>
);
