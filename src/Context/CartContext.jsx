import axios from "axios";
import { createContext } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
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
      return response;
    } catch (error) {
      console.error("error in deleteCartItem: ", error.message);
      return error;
    }
  }

  return (
    <CartContext.Provider value={{ addToCart, getCart, deleteCartItem }}>
      {children}
    </CartContext.Provider>
  );
}
