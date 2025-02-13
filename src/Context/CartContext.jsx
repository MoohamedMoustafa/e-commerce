import axios from "axios";
import { createContext, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(null);
  const headers = {
    token: localStorage.getItem("UserToken"),
  };
  async function addToCart(productId) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: productId },
        { headers: headers }
      );
      setNumOfCartItems(response.data.numOfCartItems);
      return response;
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
      return error;
    }
  }

  async function getCart() {
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { headers: headers }
      );
      setNumOfCartItems(response.data.numOfCartItems);
      console.log("num of cart items", response.data.numOfCartItems);
      return response;
    } catch (error) {
      console.error("Error getting cart:", error.message);
      return error;
    }
  }

  async function deleteCartItem(productId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { headers: headers }
      );
      setNumOfCartItems(response.data.numOfCartItems);
      return response;
    } catch (error) {
      console.error("error in deleteCartItem: ", error.message);
      return error;
    }
  }

  async function uptadeProductCount(productId, count) {
    try {
      const response = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: count },
        { headers: headers }
      );
      setNumOfCartItems(response.data.numOfCartItems);
      return response;
    } catch (error) {
      console.error("error in updateProductCount", error.message);
      return error;
    }
  }

  async function checkout(cartId, url, values) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,
        { shippingAddress: values },
        { headers: headers }
      );
      return response;
    } catch (error) {
      console.error("error in checkout: ", error.message);
      return error;
    }
  }

  async function clearCart() {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        { headers: headers }
      );
      setNumOfCartItems(response.data.numOfCartItems);
      return response;
    } catch (error) {
      console.error("error in clearCart: ", error.message);
      return error;
    }
  }

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getCart,
        deleteCartItem,
        uptadeProductCount,
        checkout,
        numOfCartItems,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
