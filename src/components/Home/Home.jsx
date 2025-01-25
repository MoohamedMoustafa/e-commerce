import React, { useEffect, useState } from "react";
import style from "./Home.module.css";
import RecentProducts from "../RecentProducts/RecentProducts";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import HomeSlider from "./../HomeSlider/HomeSlider";

export default function Home() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {}, []);

  return (
    <>
      <HomeSlider />
      <CategoriesSlider />
      <RecentProducts />
    </>
  );
}
