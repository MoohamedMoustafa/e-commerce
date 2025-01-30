import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useProducts() {
  async function getRecentProducts() {
    try {
      const response = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      return response;
    } catch (err) {
      console.error("error from RecentProducts: ", err.message);
      throw new Error("fails to fetch recent products ", err.message);
    }
  }
  const productsObject =
    useQuery({
      queryKey: ["recentProducts"],
      queryFn: getRecentProducts,
      staleTime: 60000,
      retry: 4,
      retryDelay: 3000,
      select: (data) => data.data.data,
    });
  return productsObject;
}
