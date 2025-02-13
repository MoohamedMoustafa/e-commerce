import React, { useEffect, useState } from "react";
import style from "./AllOrders.module.css";
import useOrders from "../../Hooks/useOrders";
import { ClipLoader } from "react-spinners";

export default function AllOrders() {
  const {data: ordersList, isLoading, isError, error} = useOrders();
  if (isLoading) {
    return (
      <>
        <div className="flex justify-center items-center min-h-screen w-full">
          <ClipLoader color={"green"} />
        </div>
      </>
    );
  }

  if (isError) {
    console.error("error from RecentProducts: ", error);
    return (
      <>
        <div
          class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 "
          role="alert"
        >
          <span class="font-medium">{error}</span>
        </div>
      </>
    );
  }
  console.log(ordersList);
  
  return (
    <>
      allOrders
    </>
  );
}
