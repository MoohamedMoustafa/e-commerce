import { skipToken } from "@tanstack/react-query";
import axios from "axios";
import { createContext } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const headers = {
    token: localStorage.getItem("UserToken"),
  };
  async function addToCart(id) {
    try {
      const response = axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, { product: id }, { headers });
    return response;
    } catch (error) {
    //   console.error('Error adding product to cart:', error.message);
    // throw new Error(`Failed to add product to cart: ${error.message}`);
    return error;
    }
  }

return <CartContext.Provider value={{ addToCart }}>{children}</CartContext.Provider>;


}
