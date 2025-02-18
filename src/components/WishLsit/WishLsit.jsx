import React, { useContext, useEffect, useState } from "react";
import style from "./WishLsit.module.css";
import { WishListContext } from "../../Context/WishListContext";
import { ClipLoader } from 'react-spinners';

export default function WishLsit() {
  const [wishList, setWishList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { getWishList } = useContext(WishListContext);

  async function getUerWishList() {
    setIsLoading(true);
    try {
      const response = await getWishList();
      console.log("respone from getWishList", response);
      console.log("respone wishList Items", response.data.data);
      setWishList(response.data.data);
    } catch (error) {
      console.error("Error fetching wishlist:", error.message);
    } finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUerWishList();
  }, []);

  if (isLoading)
    return (
      <div>
        <ClipLoader color="green" />
      </div>
    );


  return (
    <>
      <h3 className="text-lg font-semibold text-center py-3 px-4 bg-gray-50 rounded-lg shadow-sm mb-6 w-full md:w-1/3 mx-auto">
        My Wish List
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
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Remove
              </th>
              <th scope="col" className="px-6 py-3">
                Add To Cart
              </th>
            </tr>
          </thead>
          <tbody>
            {/* {cartDetails?.data.products.map((item) => {
              return (
                <CartItem
                  item={item}
                  key={item._id}
                  deleteItem={deleteItem}
                  updateCount={updateCount}
                />
              );
            })} */}
            {wishList.map((product) => {
              return <WishListItem key={product._id} product={product} />;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

function WishListItem({ product }) {
  return (
    <>
      <tr className="bg-white border-b  border-gray-200 hover:bg-gray-50 ">
        <td className="p-4">
          <img
            src={product.imageCover}
            className="w-16 md:w-32 max-w-full max-h-full"
            alt="Apple Watch"
          />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 ">
          {product.title}
        </td>
        <td className="px-6 py-4">{product.price} </td>
        <td className="px-6 py-4 font-semibold text-gray-900 ">
          <span className="text-red-500 cursor-pointer">Remove</span>
        </td>
        <td className="px-6 py-4">
          <span className="text-green-500 cursor-pointer">Add To Cart</span>
        </td>
      </tr>
    </>
  );
}
