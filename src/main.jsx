// Imports
import ReactDOM from "react-dom/client";
import React, { useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
} from "react-router-dom";
import { useDarkMode } from "usehooks-ts";

// Import global css
import "./index.css";

// Import pages
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Address from "./pages/Address";
import Transaction from "./pages/Transaction";

import ScrollToTop from "./utils/ScrollToTop";

// Seperated Root component for handling dark mode toggle
const Root = () => {
  const { isDarkMode } = useDarkMode();
  useEffect(() => {
    document.querySelector('html').setAttribute('data-theme', isDarkMode ? "dark" : "light");
  }, [isDarkMode]);
  return (
    <NextUIProvider>
      <ScrollToTop />
      <main
        className={`${
          isDarkMode ? "dark" : "light"
        } text-foreground bg-background font-sans antialiased`}
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/address/:address" element={<Address />} />
          <Route path="/transaction/:transaction" element={<Transaction />} />
        </Routes>
        <Footer />
      </main>
    </NextUIProvider>
  );
};

// react-router-dom to handle client-side navigation

const router = createBrowserRouter([{ path: "*", Component: Root }]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
