import React, { useEffect, useState } from "react";
import style from "./AllOrders.module.css";
import useOrders from "../../Hooks/useOrders";
import { ClipLoader } from "react-spinners";
import OrderItem from "../OrderItem/OrderItem";

export default function AllOrders() {
  const { data: ordersList, isLoading, isError, error } = useOrders();

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
    console.error("error from AllOrders: ", error);
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

  return (
    <>
      <h3 className="text-emerald-600 text-2xl font-semibold text-center py-3 px-2  rounded-lg  mb-6 w-full md:w-1/3 mx-auto">
        Your Orders
      </h3>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Brand
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
              </tr>
            </thead>
            <tbody>
              {ordersList?.map((order) => {
                return (
                  <React.Fragment key={order.id}>
                    <OrderDate order={order} />
                    {order.cartItems.map((product) => (
                      <OrderItem key={product.product.id} product={product} />
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
        {/* <Link to="/checkout" state={{ cartId: cartDetails.cartId }}>
        <button className="btn my-5 ">Check out Now</button>
      </Link> */}
      </>
    
  );
}

function OrderDate({ order }) {
  const isoString = order.createdAt;
  const date = new Date(isoString);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const formattedTime = `${hours}:${minutes}`;

  return (
    <tr className="bg-gray-100">
      <td colSpan="4" className="px-6 py-3 font-medium">
        Order Date: {formattedDate} at {formattedTime}
      </td>
      <OrderPrice order={order} />
    </tr>
  );
}

function OrderPrice({order}) {
  return (
    <td colSpan="1" className="px-6 py-3 font-mediu">
      Total Price: {order.totalOrderPrice} EGP
    </td>
  )
}
