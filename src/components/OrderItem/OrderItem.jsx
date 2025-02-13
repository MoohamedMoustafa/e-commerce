import React, { useEffect, useState } from "react";
import style from "./OrderItem.module.css";

export default function OrderItem() {
  const [counter, setCounter] = useState(0);
  useEffect(() => {}, []);

  return (
    <>
      <>
        <tr className="bg-white border-b  border-gray-200 hover:bg-gray-50 ">
          <td className="p-4">
            {/* Static */}
            <img
              src="https://ecommerce.routemisr.com/Route-Academy-products/1680403266739-cover.jpeg"
              className="w-16 md:w-32 max-w-full max-h-full"
              alt="Apple Watch"
            />
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900 ">
            {/* Static */}
            "Woman Shawl"
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center">
              <div>
                {/* Static */}
                <span>5</span>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900 ">
            {/* Static */}
            Price: 100 EGP
          </td>
          <td className="px-6 py-4">
            <span>
              {/* Static */}
              Total Price: 500 EGP
            </span>
          </td>
        </tr>
      </>
    </>
  );
}
