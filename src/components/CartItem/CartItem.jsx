import React, { useEffect, useState } from "react";
import style from "./CartItem.module.css";

export default function CartItem({item, deleteItem}) {
  const [counter, setCounter] = useState(0);
  useEffect(() => {}, []);

  return (
    <>
      <tr
        
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
          <span
            className="font-medium text-red-600  hover:underline cursor-pointer"
            onClick={() => deleteItem(item.product.id)}
          >
            Remove
          </span>
        </td>
      </tr>
    </>
  );
}
