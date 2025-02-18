import axios from "axios";
import { createContext } from "react";

export const WishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const headers = {
    token: localStorage.getItem("UserToken"),
  };
  async function AddToWishList(productId) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: productId },
        { headers: headers }
      );
      return response;
    } catch (error) {
      console.error("Error adding product to wishlist:", error.message);
    }
  }

  return (
    <WishListContext.Provider value={{ AddToWishList }}>
      {children}
    </WishListContext.Provider>
  );
}
