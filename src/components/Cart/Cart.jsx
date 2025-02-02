import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";

export default function Cart() {
  const [cartDetails, setCartDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { getCart } = useContext(CartContext);
  async function getCartItems() {
    setIsLoading(true);
    const response = await getCart();
    if (response.data.status === "success") {
      setCartDetails(response.data);
      setIsLoading(false);
      console.log("response fron getCartItems", response.data.data.products);
    } else {
      console.error("Failed to get cart items", response.data);
      setIsLoading(false);
    }
  }
  useEffect(() => {
    getCartItems();
  }, []);
  useEffect(() => {
    console.log("cartDetails: ", cartDetails);
  }, [cartDetails]);


  if (isLoading) return <div>Loading...</div>;
  if (!cartDetails?.data?.products) return <div>No items in cart</div>;
  return (
    <>
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
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cartDetails?.data.products.map((item) => {
              return (
                <tr
                  key={item._id}
                  className="bg-white border-b  border-gray-200 hover:bg-gray-50 "
                >
                  <td className="p-4">
                    <img
                      src={item.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt="Apple Watch"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    {item.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 "
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <span>{item.count}</span>
                      </div>
                      <button
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 "
                        type="button"
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    {item.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    <a
                      href="#"
                      className="font-medium text-red-600  hover:underline"
                    >
                      Remove
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
