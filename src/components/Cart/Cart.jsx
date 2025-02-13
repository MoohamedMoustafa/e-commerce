import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import CartItem from "../CartItem/CartItem";
import { ClipLoader } from "react-spinners";
import toast from "react-hot-toast";

export default function Cart() {
  const [cartDetails, setCartDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const { getCart, deleteCartItem, uptadeProductCount, clearCart } =
    useContext(CartContext);

  async function getCartItems() {
    setIsLoading(true);
    const response = await getCart();
    if (response.data.status === "success") {
      console.log("cartDetails", response.data);
      setCartDetails(response.data);
      setIsLoading(false);
      console.log("response fron getCartItems", response.data.data.products);
    } else {
      console.error("Failed to get cart items", response.data);
      setIsLoading(false);
    }
  }

  async function deleteItem(productId) {
    try {
      const response = await deleteCartItem(productId);
      if (response.data.status === "success") {
        // getCartItems(); // Refresh cart
        console.log("from deleteItem", response);
        setCartDetails(response.data);
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
    } finally {
    }
  }

  async function updateCount(productId, count) {
    try {
      const response = await uptadeProductCount(productId, count);
      if (response.data.status === "success") {
        setCartDetails(response.data);
      }
    } catch (error) {
      console.error("error from updateCount", error.message);
    }
  }
  async function handleClearCart() {
    const isConfirmed = window.confirm(
      "Are you sure you want to clear the cart?"
    );
    if (!isConfirmed) return;

    try {
      setIsClearing(true);
      const response = await clearCart();
      if (response.data.status === "success") {
        toast.success("Cart cleared successfully");
        await getCartItems();
      }
    } catch (error) {
      console.error("Failed to clear cart", error.message);
      toast.error("Failed to clear cart");
    } finally {
      setIsClearing(false);
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  if (isLoading)
    return (
      <div>
        <ClipLoader color="green" />
      </div>
    );
  if (!cartDetails?.data?.products || cartDetails.data.products.length === 0)
    return (
      <>
        <div className="flex flex-col items-center justify-center gap-6 p-8">
          <div className="flex justify-center items-center min-h-[60vh] w-full text-xl font-semibold text-gray-600 bg-gray-50 rounded-lg shadow-sm border border-gray-200 p-8">
            No items in cart
          </div>
          <div className="text-center">
            <Link
              to="/products"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-slate-50 bg-emerald-500 hover:bg-emerald-600 rounded-md transition-colors duration-200"
            >
              Check new products now
            </Link>
          </div>
        </div>
      </>
    );
  return (
    <>
      <h3 className="text-lg font-semibold text-center py-3 px-4 bg-gray-50 rounded-lg shadow-sm mb-6 w-full md:w-1/3 mx-auto">
        Total Price: {cartDetails.data.totalCartPrice} EGP
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
                <CartItem
                  item={item}
                  key={item._id}
                  deleteItem={deleteItem}
                  updateCount={updateCount}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      <Link to="/checkout" state={{ cartId: cartDetails.cartId }}>
        <button className="btn mt-5 ">Check out Now</button>
      </Link>
      <button
      onClick={handleClearCart}
      disabled={isClearing}
      className="btn-danger mt-5 bg-red-500 "
    >
      {isClearing ? (
        <i className="fa-solid fa-spinner fa-spin" spin="true"></i>
      ) : (
        `Clear Cart`
      )}
    </button>
    </>
  );
}

// function ClearCartButton({ onClearCart, setCartDetails }) {
//   const [isClearing, setIsClearing] = useState(false);
//   async function handleClearCart() {
//     const isConfirmed = window.confirm(
//       "Are you sure you want to clear the cart?"
//     );
//     if (!isConfirmed) return;

//     try {
//       setIsClearing(true);
//       const response = await onClearCart();
//       if (response.data.status === "success") {
//         toast.success("Cart cleared successfully");
//         setCartDetails({});
//       }
//     } catch (error) {
//       console.error("Failed to clear cart", error.message);
//       toast.error("Failed to clear cart");
//     } finally {
//       setIsClearing(false);
//     }
//   }
//   return (
//     <button
//       onClick={handleClearCart}
//       disabled={isClearing}
//       className="btn-danger mt-5 bg-red-500 "
//     >
//       {isClearing ? (
//         <i className="fa-solid fa-spinner fa-spin" spin="true"></i>
//       ) : (
//         `Clear Cart`
//       )}
//     </button>
//   );
// }
