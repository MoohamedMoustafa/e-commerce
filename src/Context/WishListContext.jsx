import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const WishListContext = createContext();

export default function WishListContextProvider({ children }) {
  const [wishList, setWishList] = useState([]);
  const headers = {
    token: localStorage.getItem("UserToken"),
  };

  async function getWishList() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/wishlist",
        { headers: headers }
      );
      setWishList(response.data.data);
      return response;
    } catch (error) {
      console.error("Error fetching wishlist:", error.message);
    }
  }

  async function AddToWishList(productId) {
    try {
      const response = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: productId },
        { headers: headers }
      );
      await getWishList();
      return response;
    } catch (error) {
      console.error("Error adding product to wishlist:", error.message);
    }
  }

  async function removeFromWishList(productId) {
    try {
      const response = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
        { headers: headers }
      );
      await getWishList();
      return response;
    } catch (error) {
      console.error("Error removing product from wishlist:", error.message);
    }
  }
  useEffect(() => {
    getWishList()
  }, []);

  return (
    <WishListContext.Provider
      value={{ AddToWishList, getWishList, removeFromWishList, wishList }}
    >
      {children}
    </WishListContext.Provider>
  );
}
