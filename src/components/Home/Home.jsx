import React, { useContext, useEffect, useState } from "react";
import style from "./Home.module.css";
import RecentProducts from "../RecentProducts/RecentProducts";
import CategoriesSlider from "../CategoriesSlider/CategoriesSlider";
import HomeSlider from "./../HomeSlider/HomeSlider";
import { CartContext } from "../../Context/CartContext";

export default function Home() {
  const {getCart} = useContext(CartContext);
  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
      <HomeSlider />
      <CategoriesSlider />
      <RecentProducts />
    </>
  );
}
