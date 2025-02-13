import React, { useEffect, useState } from "react";
import style from "./OrderItem.module.css";

export default function OrderItem({ product }) {
  const [counter, setCounter] = useState(0);
  useEffect(() => {}, []);
  const imageCover = product.product.imageCover;
  const price = product.price;
  const ProductCount = product.count;
  const productName = product.product.title;
  const ProductBrand = product.product.brand.name;
  const productCategory = product.product.category.name;

  return (
    <>
      <>
        <tr className="bg-white border-b  border-gray-200 hover:bg-gray-50 ">
          <td className="p-4">
            <img
              src={imageCover}
              className="w-16 md:w-32 max-w-full max-h-full"
              alt="Apple Watch"
            />
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900 ">
            {productName}
          </td>
          <td className="px-6 py-4">
            <div className="flex items-center">
              <div>
                <span>{ProductCount}</span>
              </div>
            </div>
          </td>
          <td className="px-6 py-4 font-semibold text-gray-900 "> 
            {ProductBrand}
          </td>
          <td className="px-6 py-4">
            <span>
              {productCategory}
            </span>
          </td>
        </tr>
      </>
    </>
  );
}
