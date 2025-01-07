import React, { useEffect, useState } from "react";
import style from "./Layout.module.css";
import Navbar from './../Navbar/Navbar';
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {}, []);

  return (
    <>
      <Navbar />

      <div className="container py-20 lg:py-5 my-5">
        <Outlet />
      </div>

      <Footer />
    </>
  );
}
