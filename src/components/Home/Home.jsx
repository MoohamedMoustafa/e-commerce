import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import RecentProducts from "../RecentProducts/RecentProducts";

export default function Home() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {}, []);

  return (
    <>
      <h1>Home</h1>
      <RecentProducts />
    </>
  );
}
