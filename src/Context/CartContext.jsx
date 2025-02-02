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
      // throw new Error(`Failed to add product to cart: ${error.message}`);
      return error;
    }
  }

  return (
    <CartContext.Provider value={{ addToCart }}>
      {children}
    </CartContext.Provider>
  );
}
